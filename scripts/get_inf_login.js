const form = document.getElementById("userForm");
const out = document.getElementById("out");

form.addEventListener("submit",async (e) => {
    const fd = new FormData(form);
    const payload = {
        username:fd.get("username"),
        email:fd.get("email"),
        password:fd.get("password"),
    };


const r = await fetch("http://localhost:5000/api/users",{
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify(payload),
});

out.textContent = `HTTP ${r.status}\n${await r.text()}`;
});







// const { req } = require('agent-base');
// const express = require('express');
// const sql = require('mssql');

// const app = express();
// app.use(express.json());

// const databaseConfig = {
//     server: "A402PCPREPOD",
//     database: "Orlov_U",
//     driver: "msnodesqlv8",
//     options:{
//         trustedConection : true,
//         trustedServerCertificate:true
//     }
// };


// app.length("/users", async(req, res)=>{
//     const connect = await sql.connect(databaseConfig);

//     const result = await connect.request()
//     .query("SELECT * FROM dbo.users");

//     res.json(result.recordset);
// });


// app.post("/users", async(req,res) => {
//     const connect = await sql.connect(databaseConfig);

//     const {
//         name,
//         lastname,
//         birthday,
//         city,
//         phone_number,
//         group_id
//     } = req.body;

//     await connect.request().input("name", sql.NVarChar, name )
//     .input("lastname", sql.NVarChar, lastname )
//     .input("city", sql.NVarChar, city )
//     .input("birthday", sql.Date, birthday )
//     .input("name", sql.NVarChar, name )
//     .input("phone_number", sql.NChar, phone_number )
//     .input("group_id", sql.Int , group_id )
//     .query(`
//         INSERT INTO dbo.users( name,
//             lastname,
//             birthday,
//             city,
//             phone_number,
//             group_id)
//         VALUES(@name,
//             @lastname,
//             @birthday,
//             @city,
//             @phone_number,
//             @group_id)

//     `);

//     res.send("OK");

// });















// app.listen(3000, () =>{
//     console.log('Server start!!!!!!!!!!!!!!')
// });

