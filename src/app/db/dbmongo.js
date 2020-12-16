const mongoose = require('mongoose');

async function connectDb() {
    try {
        await mongoose.connect('mongodb+srv://taikhoan1:taikhoan1@cluster0.5mcgg.gcp.mongodb.net/test?retryWrites=true&w=majority',
            {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Kết nối db mongo thành công !!!");
    } catch (e) {
        console.log("Kết nối db mongo thất bại", e);
    }
}

module.exports = {
    connectDb
};