const form = document.getElementById("userForm");
const out = document.getElementById("out");

form.addEventListener("submit",async (e) => {
    const fd = new FormData(form);
    const payload = {
        username:fd.get("username"),
        password:fd.get("password"),
    };


const r = await fetch("http://localhost:5000/api/users",{
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify(payload),
});

out.textContent = `HTTP ${r.status}\n${await r.text()}`;
});



