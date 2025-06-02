const express=require("express");
const bodyParser=require("body-parser");
const user = require("./models/user");
const Routes=require('./routes/routes');
const cors = require("cors")


const app = express();
const port = 3000;
app.use(cors({
    origin: 'http://localhost:5173', // ✅ alamat frontend React (Vite)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));


app.use(bodyParser.json());
app.use('/api', Routes);


user.createUserTable();
app.listen(port, () =>{
    console.log(`jalan di port 3000+${port}`);
});