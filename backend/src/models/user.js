const db=require("./db");
const bcrypt=require("bcryptjs");

const createUserTable=() => {
    const q =`
    CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama varchar(100),
        email varchar(100) UNIQUE,
        password varchar(100)
    )
`;
db.query(q,(err, result) => {
    if(err) {
        console.error("error waktu buat table user", err.stack);
        return
    }
    console.log("tabel user berhasil dibuat");
   });
};
const insertUser=(nama, email, password, callback) => {
    if(password){
        const hashedPass= bcrypt.hashSync(password,10);
        const q= "INSERT INTO users(nama,email,password) VALUES(?,?,?)";
        db.query(q,[nama,email,hashedPass],callback);
    } else {
        console.error("Password is undefined");
    }
};
const selectUserByEmail= (email, callback) => {
    const q= "SELECT * FROM users WHERE email = ?";
    db.query(q, [email], callback);
};
const selectUserById= (id, callback) => {
    const q= "SELECT * FROM users Where id= ?";
    db.query(q, [id], callback);
};
const deleteUser= (id,callback) => {
    const q= "DELETE FROM users WHERE id= ?";
    db.query(q, [id], callback);
};
const selectUsers= (callback) => {
    const q = "SELECT * FROM users";
    db.query(q, callback);
};
const updateUser= (id, nama, email, password, callback) => {
    if(password){
        const hashedPass= bcrypt.hashSync(password, 10);
        const query= "UPDATE users SET nama=?, email=?, password=? WHERE id=?";
        db.query(query,[nama, email,hashedPass,id], callback);
    }else{
        const query = "UPDATE users SET nama=?, email=? WHERE id=?";
        db.query(query,[nama, email, id], callback);
    }
};

module.exports= {
    createUserTable,
    selectUserByEmail,
    selectUserById,
    selectUsers,
    insertUser,
    deleteUser,
    updateUser,
};