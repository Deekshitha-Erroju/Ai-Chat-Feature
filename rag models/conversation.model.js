import {Schema, Types, model } from "mongoose"
const message_Schema=new Schema({
    role:{
       type:String,
        enum:{
            values:["Human","ai"]
        }
       
    },
    message:{
       type:String,
       trim:true
    }
    
},{
       versionKey:false,
       timestamps:true,
       strict:"throw"
})
const Conversation_Schema=new Schema({
     article_Id:{
         type:Types.ObjectId,
         ref:"rag article",
         trim:true
     },
     messages:{
         type:[message_Schema],
         default:[] 
     }
},{
       versionKey:false,
       timestamps:true,
       strict:"throw"
})

export const Conversation_Model=model("conversation",Conversation_Schema)