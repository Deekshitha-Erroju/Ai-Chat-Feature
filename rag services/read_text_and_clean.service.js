import { extractText } from "unpdf"
function cleanExtractedText(text) {
    return (
        text
            // Remove invisible null and byte-order-mark characters.
            .replace(/\u0000|\uFEFF/g, "")

            // Convert different line-ending styles to "\n".
            .replace(/\r\n?/g, "\n")

            // Replace non-breaking spaces with normal spaces.
            .replace(/\u00A0/g, " ")

            // Remove table-of-contents leaders such as:
            // "........" and ". . . . . ."
            .replace(/(?:\.[ \t]*){3,}/g, " ")

            // Remove spaces and tabs before line breaks.
            .replace(/[ \t]+\n/g, "\n")

            // Replace repeated spaces and tabs with one space.
            .replace(/[ \t]{2,}/g, " ")

            // Keep a maximum of one empty line between paragraphs.
            .replace(/\n{3,}/g, "\n\n")

            // Remove whitespace from the beginning and end.
            .trim()
    )
}
export async function Extraxt_text_from_pdf(fileBuffer) {
    try{
    const file_Data=new Uint8Array(fileBuffer)
    const {text}= await extractText(file_Data,{mergePages:true})
    const cleaned_text=cleanExtractedText(text)
    return cleaned_text
    }catch(err){
     res.json(err)
}
}