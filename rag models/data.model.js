import { Schema ,model} from "mongoose"

const Article_Schema=new Schema({
    title:{
          type:String,
          require:[true,"you are required to enter the article"]
    },
    article:{
           type:String,
           require:[true,"you are required to enter the article"]
    }
},{
      versionKey:false,
      timestamps:true,
      strict:"throw"

})
export const Article_model=model("rag article ",Article_Schema)