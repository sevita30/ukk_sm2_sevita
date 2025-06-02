const jwt= require("jsonwebtoken");
const bcrypt= require("bcryptjs");
const User= require("../models/user");

const storeUser= (req, res) => {
    const {nama, email, password }= req.body;
    User.insertUser(nama, email, password, (err, results) => {
        if (err) {
            return res.status(500).json({error:err.message});
        }
        res.status(201).json({message:"User Created", userId:results.insertId
});
    });
};
const showUser= (req, res) => {
    const { id } = req.params;
    User.selectUserById(id, (err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        if (results.lenght === 0) {
            return res.status(404).json({message: "user tidak ditemukan"});
        }
        res.status(200).json(results[0]);
    });
};
const destroyUser= (req, res) => {
    const { id } = req.params;
    User.deleteUser(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        res.status(200).json("data berhasil dihapus");
    });
};
const index= (req, res) => {
    User.selectUsers((err, results) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
        if (results.lenght === 0) {
            return res.status(404).json({message: "user tidak ditemukan"})
        }
        res.status(200).json(results);
    });
};
const login= (req, res) => {
    const { email, password } = req.body;
    User.selectUserByEmail(email, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        if (results.length === 0) {
            return res.status(404).json({message: "User not found"});
        }
        const user= results[0];
        const passwordisValid= bcrypt.compareSync(password, user.password);
        if (!passwordisValid) {
            return res.status(401).json({message: "password salah"});
        }
        const token = jwt.sign({id: user.id}, "ayoosekolah", {
            expiresIn: 86400,
        });
        res.status(200).json({auth: true, token});
    });
};
const logout=(req,res)=>{
    res.status(200).json({auth: false,token:null})
}
const updateUser= (req, res) => {
    const {nama, email, password} = req.body;
    const {id} = req.params;
    User.updateUser(id, nama, email, password, (err,results) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        res.status(201).json({message: 'User Updated'});
    });
}
module.exports = {
    storeUser,
    showUser,
    login,
    logout,
    index,
    destroyUser,
    updateUser,
};