const email = document.getElementById("email");
const pass = document.getElementById("password");
const loginBtn = document.getElementById("btn")

loginBtn.addEventListener("click",(event)=>{
    if(email.value === "admin" && pass.value === "admin123"){
        

            window.location.replace("./home.html");
            event.preventDefault();
    }else{
        alert("LOGIN FAILED")
    }
    
})
