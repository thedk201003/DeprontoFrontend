const userListElement = document.getElementById('userList');  
let users = [];  
let filteredUsers = [];  

async function fetchUsers() {  
    const response = await fetch('https://randomuser.me/api/?results=500');  
    const data = await response.json();  
    users = data.results;  
    filteredUsers = users;  
    displayUsers(filteredUsers);  
}  
function displayUsers(usersToDisplay) {  
    userListElement.innerHTML = '';  
    usersToDisplay.forEach(user => {  
        const userCard = document.createElement('div');  
        userCard.className = 'user-card';  
        
        userCard.innerHTML = `  
            <img class="profile-picture" src="${user.picture.medium}" alt="${user.name.first} ${user.name.last}">  
            <h2>${user.name.first} ${user.name.last}</h2>  
            <p>Gender: ${user.gender}</p>  
            <p>Email: ${user.email}</p>  
            <p>Location: ${user.location.city}, ${user.location.country}</p>  
        `;  
        userListElement.appendChild(userCard);  
    });  
}  
function filterUsers(gender) {  
    const filterButtons = document.querySelectorAll('.filter-btn');  
    filterButtons.forEach(btn => btn.classList.remove('active'));  
    
    const activeButton = Array.from(filterButtons).find(btn => btn.innerText.toLowerCase() === gender || 'all');  
    if (activeButton) {  
        activeButton.classList.add('active');  
    }  

    if (gender === 'male') {  
        filteredUsers = users.filter(user => user.gender === 'male');  
    } else if (gender === 'female') {  
        filteredUsers = users.filter(user => user.gender === 'female');  
    } else {  
        filteredUsers = users;  
    }  
    displayUsers(filteredUsers);  
}  

function searchUsers() {  
    const query = document.getElementById('searchBar').value.toLowerCase();  
    filteredUsers = users.filter(user =>  
        user.name.first.toLowerCase().includes(query) ||   
        user.name.last.toLowerCase().includes(query)  
    );  
    displayUsers(filteredUsers);  
}  
fetchUsers();