document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // const fullname = document.querySelector('input[name="fullname"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const passwordConfirmation = document.querySelector('input[name="password_confirmation"]').value;

    // email validation
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        alert("Email tidak valid!");
        return;
    }

    // password 8 character
    if (password.length < 8) {
        alert("Password minimal 8 karakter!");
        return;
    }
    
    // password validation
    if (password !== passwordConfirmation) {
        alert("Password dan Konfirmasi Password tidak cocok!");
        return;
    }

    // show alert
    document.getElementById('alert').className = 'alert show';
    document.querySelector('.alert-email').textContent = email;

    // form reset
    document.getElementById('registerForm').reset();
});

document.querySelector('.btn-close').addEventListener('click', function() {
    document.getElementById('alert').className = 'alert';
});