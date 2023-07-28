
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
      localStorage.setItem("userId", userId );
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
    

   
    console.log("Signup Email:", email);
    console.log("Signup Password:", password);
    console.log("Signup FirstName:", firstName);
    console.log("Signup LastName:", lastName);
    console.log("Signup city:", city);


    try {
      const response = await fetch("http://localhost:8080/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, city, password }),
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

