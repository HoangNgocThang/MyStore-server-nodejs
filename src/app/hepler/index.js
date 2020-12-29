function verifyToken(req, res, next) {
    console.log("vao verifyToken")
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        console.log("Lấy token từ header ok:", req.token);
        next();
    } else {
        // Forbidden
        console.log("Lỗi lấy token từ header:", req.token);
        res.json({
            status: 403,
            message: "Không xác thực token"
        });
    }
}


const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});

const upload = multer({
    // storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === "image/bmp" || file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            return cb('Only image are allowed!');
        }
    }
}).single("avatar");

const upload2 = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === "image/bmp" || file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            return cb('Only image are allowed!');
        }
    }
}).single("avatar");

// // Set The Storage Engine
// const storage2 = multer.diskStorage({
//     destination: './public/upload',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
//
// // Init Upload
// const uploadImage = multer({
//     storage: storage2,
//     limits: {fileSize: 1000000},
//     fileFilter: function (req, file, cb) {
//         checkFileType(file, cb);
//     }
// }).single('avatar');
//
// // Check File Type
// function checkFileType(file, cb) {
//     // Allowed ext
//     const filetypes = /jpeg|jpg|png|gif/;
//     // Check ext
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // Check mime
//     const mimetype = filetypes.test(file.mimetype);
//
//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb('Error: Images Only!');
//     }
// }

module.exports = {
    verifyToken,
    upload,
    // uploadImage,
    upload2
}