document.addEventListener('DOMContentLoaded', () => {
    const userId = localStorage.getItem('userId');

   
    // fetchUserData(userId)
    //     .then((userId) => {
    //         return fetchUserInterests(userId);
    //     })
    //     .then((userInterests) => {
            
    //         const userData = {
    //             ...userInterests,
    //             interests: userInterests.interests
    //         };
    //         displayUserData(userData);
    //     })
    //     .catch((error) => {
    //         console.error('Error fetching user data:', error);
    //     });

    Promise.all([fetchUserData(userId),fetchUserInterests(userId)])
    .then(([userData,userInterests]) => {
        displayUserData(userData,userInterests);
    })
    .catch((error) => {
        console.error('error fetching user data and user interests', error);
    })

  
    document.getElementById('editInterestsBtn').addEventListener('click', () => {
        document.getElementById('editInterestsBtn').style.display = 'none';
        document.getElementById('addInterestForm').style.display = 'block';
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

function fetchUserInterests(userId) {
  
    return fetch(`http://localhost:8080/api/user/${userId}/interest`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response for interests was not ok');
            }
            return response.json();
        });
}


function displayUserData(userData, userInterests) {

    userData.interests = userInterests;
    document.getElementById('name').textContent = userData.firstName + ' ' + userData.lastName;
    document.getElementById('email').textContent = userData.email;
    document.getElementById('city').textContent = userData.city;

    const interestsList = document.getElementById('interests');
    interestsList.innerHTML = '';

    userData.interests.forEach((interest) => {
        const li = document.createElement('li');
        li.textContent = interest;
        interestsList.appendChild(li);
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