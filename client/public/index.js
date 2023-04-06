var userVal = document.getElementById('email');
var passVal = document.getElementById('password');
var loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    var email = userVal.value;
    var pass = passVal.value;

    fetch('/loginPost', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            'email': email,
            'password': pass
        })
    })
        .then(res => {
            if (res.redirected) {
                history.replaceState({}, null, window.location.href = res.url);
            }
        })
})

fetch('/data') 
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })