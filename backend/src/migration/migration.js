// const mysql = require("mysql2");
// const konekMysql = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:""
// });
// const createUserTable = (koneksi) => {
//     const q = `CREATE TABLE IF NOT EXISTS users (
//     id INT(11) PRIMARY KEY AUTO_INCREMENT,
//     nama VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL
//     );`;
//     koneksi.query(q, (err, result) => {
//         if (err) {
//             console.error("error buat table user", err.stack);
//             return;
//         }
//         console.log("table user berhasil di buat");
//     });
// };

// const migration = () => {
//     konekMysql.connect((err) => {
//         if (err) {
//             console.error("Error koneksi ke database", err.stack);
//             return;
//         }
//         console.log("berhasil konek mysql");
//         konekMysql.query(
//             "CREATE DATABASE IF NOT EXISTS ukksm2pracillia_db",
//             (err, result) => {
//                 if (err) {
//                     console.error("Error membuat database", err.stack);
//                     return;
//                 }
//                 console.log("Database berhasil dibuat atau sudah ada.");

//                 const koneksi = require("../models/db");
//                 createUserTable(koneksi);

//                 konekMysql.end();
//             }
//         );
//     });
// };
// module.exports = migration;
