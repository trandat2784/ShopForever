import multer from "multer";
const storage= multer.diskStorage({
    filename: function (req,file,callback){
        callback(null,Date.now() + "-" + file.originalname)
    }
})
const upLoad = multer({storage})
export default upLoad 