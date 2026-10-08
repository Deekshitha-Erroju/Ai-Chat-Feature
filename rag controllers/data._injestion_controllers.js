import { Article_model } from "../rag models/data.model.js" 
 import { Chunk_Model } from "../rag models/chunk.model.js"
 import { Split_text_into_chunks } from "../rag services/chunks_splitter.service.js" 
 import { generate_embeddings } from "../rag services/chunks_embeddings.service.js" 

 //injestion of article
 async function Injestion_of_article(req,res) {
  
    let {title,article}=req.body
    //save it into the database
    let saved_article= await Article_model.create({title,article})
    //send the artile id and content into chunking service which divides the article into chunks
    const list_of_chunks= await Split_text_into_chunks(saved_article.article)
    //send the chunks to embedding service will will create mebedding for the chunks
    const data= await generate_embeddings(list_of_chunks)

    let saved_chunk_data= await Chunk_Model.insertMany(data)
    //send response
    res.status(201).json({success:true,messgae:"injestion_of_article",data:saved_chunk_data})
  
 }
 export {Injestion_of_article}