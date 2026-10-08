import multer from "multer"

export const upload=multer({
    //store the file temporarily
    storage:multer.memoryStorage(),
    fileFilter:(req,file,callback)=>{
        // the type of files allowed
         const allowedTypes=["application/pdf"]
         if(!allowedTypes.includes(file.mimetype)){
              const error=new Error("error in storing files in memory")
              error.StatusCode=(400)
              return callback(error)  
           }
         return callback(null,true)
    },
    limits:{
        files:1,
        fileSize:20*1024*1024
    }
})