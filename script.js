
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded");

  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");


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


  signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const city = document.getElementById("city").value;
    

   const userData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    city: city,
    password: password,
   }

   console.log(userData);

    try {
      const response = await fetch("http://localhost:8080/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
    
      const data = await response.json();
    
      if (response.ok) {

      
        window.location.href = "login.html";
      } 
    } catch (error) {
      console.log("error",error);
    }
   
  });
});

