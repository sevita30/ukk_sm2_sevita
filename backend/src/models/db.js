const db = require("mysql2")
const koneksi = db.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"ukk_sm2_sevitaa"
});
koneksi.connect((err)=>{
    if(err){
        console.error("error konek ke database",err.stack)
        return;
    }
    console.log("berhasil konek ke database");

})
module.exports= koneksi;