
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded");

  const loginForm = document.getElementById("loginForm");


  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
   

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    console.log("Login Email:", email);
    console.log("Login Password:", password);

    const response = await fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      console.log(data);
      const userId = data.userid;
      const email = data.email;
      localStorage.setItem("userId", userId );
      localStorage.setItem("email", email );
      window.location.href = "home.html";
    } else {
     
      alert(data.message || "Login failed. Please try again.");
    }


  });


 
});

