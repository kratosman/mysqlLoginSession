var btnlogout = document.getElementById('logout');

btnlogout.addEventListener('click', () => {
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        credentials: 'include'
    })
        .then(res => {
            if (res.redirected) {
                history.replaceState({}, null, window.location.href = res.url);
            }
        })
})

        