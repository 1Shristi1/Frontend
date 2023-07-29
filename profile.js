document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('userId');

  
   fetchUserData(userId)
    .then((userData) => {
        displayUserData(userData);
        const eventIds = fetchEventIds(userData);
        return fetchEventNames(eventIds);
    })
    .then((eventNames) => {
        displayEventNames(eventNames);
    })
    .catch((error) => {
        console.error('error fetching user data', error);
    })

  
    document.getElementById('editInterestsBtn').addEventListener('click', () => {
        document.getElementById('editInterestsBtn').style.display = 'none';
        document.getElementById('addInterestForm').style.display = 'block';
    });

    document.getElementById('deleteInterestsBtn').addEventListener('click', () => {
        document.getElementById('deleteInterestsBtn').style.display = 'none';
        document.getElementById('deleteInterestForm').style.display = 'block';
    });

 
    document.getElementById('addInterestForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const newInterest = document.getElementById('newInterest').value;

        
        addInterest(userId, newInterest)
            .then(() => {
                location.reload();
            })
            .catch((error) => {
                console.error('Error adding interest:', error);
            });
    });
    document.getElementById('deleteInterestForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const interestToDelete = document.getElementById('interestToDelete').value;
    
      
        deleteInterest(userId, interestToDelete)
            .then(() => {
               
                location.reload();
            })
            .catch((error) => {
                console.error('Error deleting interest:', error);
            });
    });

});


function fetchUserData(userId) {
    return fetch(`http://localhost:8080/api/user/${userId}`)
    .then((res) => {
        if(!res.ok){
            throw new error('Network reponse for data was not ok');
        }
        return res.json();
    })
}

function fetchEventIds(userData)
{
    const eventIds = userData.events.flatMap((arr) => arr.map((event) => event.eventId));
    return eventIds;
}

function fetchEventNames(eventIds) {
    const eventPromises = eventIds.map((eventId) => {
        return fetch(`http://localhost:8080/api/event/${eventId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((eventData) => {
                return eventData.name.text;
            });
    });

    return Promise.all(eventPromises);
}

function displayEventNames(eventNames) {
    const eventsList = document.getElementById('events');
    eventsList.innerHTML = '';

    eventNames.forEach((eventName) => {
        const li = document.createElement('li');
        li.textContent = eventName;
        eventsList.appendChild(li);
    });
}



function displayUserData(userData) {

 
    document.getElementById('name').textContent = userData.firstName + ' ' + userData.lastName;
    document.getElementById('email').textContent = userData.email;
    document.getElementById('city').textContent = userData.city;

    const interestsList = document.getElementById('interests');
    interestsList.innerHTML = '';

    userData.interests.forEach((interest) => {
        const interestbox = document.createElement('div');
        interestbox.textContent = interest;
        interestbox.classList.add('interest-box');
        interestsList.appendChild(interestbox);
    });
}

function addInterest(userId, newInterest) {
   return fetch(`http://localhost:8080/api/user/${userId}/interest`,{
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: newInterest
   })
   .then((response) => {
       if(!response.ok) {
        throw new Error('nework error');
       }
       return response.text();
   })
   .then((message) => {
    console.log(message);
   })
   .catch((error) => {
    console.log('error adding interest',error);
   })
}

function deleteInterest(userId, interestToDelete) {
    return fetch(`http://localhost:8080/api/user/${userId}/interest`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: interestToDelete
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network error');
        }
        return response.text();
    })
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.error('Error deleting interest:', error);
    });
}