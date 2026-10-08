import { ChatOllama } from "@langchain/ollama"

//craete an object for the llm 
const llm=new ChatOllama({
    model:"qwen3:8b",
    baseUrl:"http://localhost:11434",
    temperature:0
})
//llm responce generatiom
async function llm_response(query,results) {
    //extract the chunk text from the results
    const relavent_Chunk_Text=results.map(ChunksObj=>ChunksObj.Chunk_Text?.trim())
    //check the query and results whether the results exists or not
    if(!results){
        return "i did not recive any resluts from the search"
    }
    //combine the relevant chunks data as the llm expects just one parameter in form of a string not an array of strings
    const Combined_data=relavent_Chunk_Text.map((Chunk_Text,index)=>{
        return `chunk ${index+1} :\n ${Chunk_Text}`
    })
    //pass it into the llm
    const ai_Message=await llm.invoke([
        [
            "system",
            `you are a retrival agumented question-answering assistant.
             answer the user's question only using the information provided in the article
             
             Rules:
              1.Do not use outside knowledge
              2.Do not invent facts or details
              3.if the context does not contain enough information respond exactly "i could not find enough information in the article regarding this topic to answer your query"`
        ],
        [
            "human",
            `Artical Content:${Combined_data}
             User Question  :${query}  `
        ]
    ])
    return ai_Message.content.trim()
}
export {llm_response}