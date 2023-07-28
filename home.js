document.addEventListener("DOMContentLoaded", function () {
    
console.log("DOM content loaded");

const logoutlink = document.getElementById("logout")

logoutlink.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.removeItem("userId");
    window.location.href= "login.html";
})

async function fetchEvents() {
  try {
    const response = await fetch("http://localhost:8080/api/event");
    const eventData = await response.json();
    return eventData;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

async function renderEvents() {
    const eventsContainer = document.getElementById("events-container");
    eventsContainer.innerHTML = "Loading...";
  
    const eventsData = await fetchEvents();
  
    eventsContainer.innerHTML = "";
  
    const userId = localStorage.getItem("userId");
  
    eventsData.forEach(event => {
      const eventCard = document.createElement("div");
      
      eventCard.classList.add("event-card");
      eventCard.innerHTML = `
        <h3 class="event-name">${event.name.text}</h3>
        <p class="event-description">${event.description.text || ""}</p>
        <p class="event-date">${new Date(event.start.local).toDateString()}</p>
        <a href="" class="register-button" target="_blank" data-event-id="${event.id}">Register</a>
      `;
  
    
      const registerButton = eventCard.querySelector(".register-button");
      registerButton.addEventListener("click", async (event) => {
        event.preventDefault();
        const eventId = event.target.dataset.eventId;
        try {
          
          await registerForEvent(userId, eventId);
        
          alert("Registered for the event!");
        } catch (error) {
         
          alert("An error occurred while registering for the event.");
          console.error(error);
        }
      });
  
      eventsContainer.appendChild(eventCard);
    });
  }
  

  async function registerForEvent(userId, eventId) {
    const url = `http://localhost:8080/api/user/${userId}/event/${eventId}`;
   
    try {
        const response = await fetch(url, { method: "PUT" });
       if (!response.ok) {
        const responsedata = await response.json();
        console.error("API ERROR" , response);
      throw new Error(`Registration request failed: ${responsedata.message}`);
    }
    } catch (error) {
        throw new Error(`Error during registration : ${error.messgae}`);
    }
    
  }

renderEvents();
});