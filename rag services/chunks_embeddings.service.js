import { OllamaEmbeddings } from "@langchain/ollama"
const embeddingModel=new OllamaEmbeddings({
    model:"nomic-embed-text:latest",
    baseUrl:"http://localhost:11434"
})
async function generate_embeddings(chunks,article_Id) {
    const data = []
    //create embedding
    for( let [Chunk_index,Chunk_Text] of chunks.entries()){
        let embedding=await embeddingModel.embedQuery(Chunk_Text)
        data.push({embedding,Chunk_index,Chunk_Text,article_Id})
    }

    return data
}
export {generate_embeddings}