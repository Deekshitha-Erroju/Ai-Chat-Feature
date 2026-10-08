import {Schema,model,Types} from "mongoose"

const Chunk_schema= new Schema({
    article_Id:{
          type:Types.ObjectId,
          ref:"rag article "
    },
    Chunk_Text:{
        type:String,
        require:[true,"you are required to enter the chunk text"]
    },
    Chunk_index:{
        type:Number,
        require:[true,"chunk index is to be entered"]
    },
    embedding:{
        type:[Number],
         require:[true,"embeddings are to be entered"]
    }
},{
    versionKey:false,
    timestamps:true,
    strict:"throw"
})
export const Chunk_Model=model("rag chunk ",Chunk_schema)