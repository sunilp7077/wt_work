// Function to get data from the form, store it in localStorage, and send it using AJAX
document.getElementById('registrationForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    // Collecting user input from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create a user object
    const user = {
        name,
        email,
        password
    };

    // Push to local storage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // Simulating an AJAX POST request
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/submit', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onload = function () {
        if (xhr.status === 200) {
            document.getElementById('statusMessage').textContent = 'Registration successful!';
        } else {
            document.getElementById('statusMessage').textContent = 'Error in registration!';
        }
    };
    xhr.onerror = function () {
        document.getElementById('statusMessage').textContent = 'Error in registration!';
    };
    xhr.send(JSON.stringify(user));

    // Redirect to the list page after successful registration
    window.location.href = 'list.html';
});

// Function to display registered users on list.html
function displayUsers() {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userList = document.getElementById('userList');

    console.log("Displaying users:", users); // For debugging

    // Clear existing list items
    userList.innerHTML = '';

    users.forEach(function (user) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `Name: ${user.name}, Email: ${user.email}`;
        userList.appendChild(li);
    });
}

// Call displayUsers function if we are on list.html
if (window.location.pathname.includes('list.html')) {
    document.addEventListener('DOMContentLoaded', displayUsers);  // Ensure DOM is loaded before running
}
