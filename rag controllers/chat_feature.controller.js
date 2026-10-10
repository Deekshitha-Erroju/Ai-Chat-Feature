import { Conversation_Model } from "../rag models/conversation.model.js"
import { Article_model } from "../rag models/data.model.js"
import { query_embedding } from "../rag services/query.embeddings.js"
import { llm_chat_response } from "../rag services/llm.service.js"
import { standalone_query_generation } from "../rag services/llm.service.js"
import { Types } from "mongoose"
import { Chunk_Model } from "../rag models/chunk.model.js"
//chat feature
async function chatFeature(req,res) {
     let {article_Id,conversation_Id,query}=req.body
     let trimmed_Query=query.trim()
     
     let active_Article_Id;
     let active_conversation_Id;
     let active_conversation_History=[]
     let standAloneQuery=trimmed_Query
    
     if(conversation_Id){
        const conversation= await Conversation_Model.findById(conversation_Id)
        let article_Id=conversation.article_Id
        active_conversation_Id=new Types.ObjectId(conversation._id)
        let standAloneQuery = await standalone_query_generation(trimmed_Query,active_conversation_History)
     }else{
        active_Article_Id=new Types.ObjectId(article_Id)
        console.log("Database:", Article_model.db.name);
        console.log("Collection:", Article_model.collection.name);
        let article=await Article_model.findById(active_Article_Id)
         if(!article){
             return res.status(400).json({success:false,message:"no article found on this id"})
         }else{
            let conversation= await Conversation_Model.create({
                article_Id:active_Article_Id,
                messages:[]
            })
            active_conversation_Id = new Types.ObjectId(conversation._id)
          }
         }
      //generate query embeddings
     const embedded_query= await query_embedding(standAloneQuery)
     //perform vector search
     let results=await Chunk_Model.aggregate([
      {
        $vectorSearch:{
             index:"vector_index",
             path:"embedding",
             queryVector:embedded_query,
             numCandidates:100,
             limit:5
        }
      },
      {
        $project:{
        _id:0,
        Chunk_index:1,
        Chunk_Text:1,
        score:{
            $meta:"vectorSearchScore"
          }
        
        }  
       }
      ])
      const inserted_data=Conversation_Model.findByIdAndUpdate(conversation_Id,{
        $push:{
          messages:{
            $each:[
              {role:"Human",message:trimmed_Query},
              {role:"ai",message:results}
            ]
          }
        }
      })
      // pass the resukts to an llm
      console.log("Step 1: About to call LLM")
    let ai_response=await llm_chat_response(standAloneQuery,active_conversation_History,results)
    console.log("Step 2: LLM response received")
    return res.json(ai_response)
}
export {chatFeature}