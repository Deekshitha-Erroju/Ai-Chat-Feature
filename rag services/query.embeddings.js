import { OllamaEmbeddings } from "@langchain/ollama"
const embeddingModel=new OllamaEmbeddings({
    model:"nomic-embed-text:latest",
    baseUrl:"http://localhost:11434"
})
//generate embeddings
async function query_embedding(data) {
    let clean_query=data.trim()
    let embedding=await embeddingModel.embedQuery(clean_query)
    return embedding
}
export {query_embedding}