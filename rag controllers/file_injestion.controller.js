import { Extraxt_text_from_pdf } from "../rag services/read_text_and_clean.service.js"
import { Article_model } from "../rag models/data.model.js"
import { Split_text_into_chunks } from "../rag services/chunks_splitter.service.js"
import { generate_embeddings } from "../rag services/chunks_embeddings.service.js"
import { Chunk_Model } from "../rag models/chunk.model.js"
//file injestion 

export async function file_injestion(req,res) {
    //read the title and file of the req after procesed by the multer middleware
    const title=req.body.title
    const uploaded_file= req.file
    //extract and clean the file content
    const Extracted_pdf_data= await Extraxt_text_from_pdf(uploaded_file.buffer)
     //save it into the database
    let saved_article= await Article_model.create({title,article:Extracted_pdf_data})
    //send the artile id and content into chunking service which divides the article into chunks
    const list_of_chunks= await Split_text_into_chunks(saved_article.article)
    //send the chunks to embedding service will will create mebedding for the chunks
    const data= await generate_embeddings(list_of_chunks)
    //save the chunks 
    let saved_chunk_data= await Chunk_Model.insertMany(data)
    //send response
    res.status(201).json({success:true,message:"injestion_of_file", article_id:saved_article._id,data:saved_chunk_data})
}
