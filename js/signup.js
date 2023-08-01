
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM content loaded");
    const signupForm = document.getElementById("signupForm");
    
  
  
    signupForm.addEventListener("submit", async function (event) {
      event.preventDefault();
     console.log("signup submitted");
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const city = document.getElementById("city").value;
  
  
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("firstname:", firstName);
      console.log("lastname:", lastName);
      console.log("city:", city);
  
  
      try {
        const response = await fetch("http://localhost:8080/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({firstName,lastName,email,city,password}),
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
  
  