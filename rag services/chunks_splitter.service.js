import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"

async function Split_text_into_chunks(Article_content) {
    const splitter=new RecursiveCharacterTextSplitter({
        chunkSize:800,
        chunkOverlap:120
    })
    let list_of_chunks= await splitter.splitText(Article_content)
    return list_of_chunks
}
export {Split_text_into_chunks}