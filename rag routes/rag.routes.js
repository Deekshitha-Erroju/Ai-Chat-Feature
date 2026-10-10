import exp from "express"
export const RagRouter=exp.Router()
import { Injestion_of_article } from "../rag controllers/data._injestion_controllers.js" 
import { retrival_of_article } from "../rag controllers/data_retrival.controller.js" 
import { upload } from "../rag file processing middleware/file_processing.middleware.js"
import { file_injestion } from "../rag controllers/file_injestion.controller.js"
import { chatFeature } from "../rag controllers/chat_feature.controller.js"

//ingestion of article
RagRouter.post("/ingestion",Injestion_of_article)
//retrival of data
RagRouter.post("/retrival/:article_Id/search",retrival_of_article)
//ingestion of file types
RagRouter.post("/upload",upload.single("files"),file_injestion)
//chat based conversation
RagRouter.post("/chat",chatFeature)