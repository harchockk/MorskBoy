// const form = document.getElementById("userForm");
// const out = document.getElementById("out");

// form.addEventListener("submit",async (e) => {
//     const fd = new FormData(form);
//     const payload = {
//         username:fd.get("username"),
//         email:fd.get("email"),
//         password:fd.get("password"),
//     };



// const r = await fetch("/registration",{
//     method:"POST",
//     headers:{"Content-Type": "application/json"},
//     body:JSON.stringify(payload),
// });

// out.textContent = `HTTP ${r.status}\n${await r.text()}`;
// });


// const password = document.getElementById("password").value;

// if (password.length < 8) {
//     alert("Пароль должен содержать минимум 8 символов");
//     return;
//   }

const registration = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector(".username").value;
    const email = document.querySelector(".email").value;
    const password = document.getElementById("password").value;
    const checkPassword = document.getElementById("check-password").value;
  
    if (password.length < 8) {
      alert("Пароль должен содержать минимум 8 символов");
      return;
    }
  
    if (password !== checkPassword) {
      alert("Пароли не совпадают");
      return;
    }
  
    try {
      const response = await fetch("/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
  
      const data = await response.json();
  
      console.log(data);
  
      if (!response.ok) {
        throw new Error(data.message);
      }
  
      alert("Регистрация успешна");
  
    } catch (error) {
      console.error(error);
      alert("Ошибка регистрации");
    }
  };
  
  document
    .getElementById("user-form")
    .addEventListener("submit", registration);






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

