document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/japi/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    if (response.ok) {
        alert('Signup successful! Redirecting to login...');
        window.location.href = '/features/login/login.html';
    } else {
        const error = await response.json();
        alert(`Signup failed: ${error.message || 'Please try again.'}`);
    }
});