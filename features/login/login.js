document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/japi/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        alert('Login successful! Redirecting to jokes list...');
        window.location.href = '/features/jokelist/jokelist.html';
    } else {
        alert('Login failed. Please check your credentials.');
    }
});