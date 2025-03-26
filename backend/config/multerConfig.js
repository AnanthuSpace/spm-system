import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/resumes");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); 
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /pdf/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
        return cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"));
    }
};

const upload = multer({ storage, fileFilter });

export default upload;
