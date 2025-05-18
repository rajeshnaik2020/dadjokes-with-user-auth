// Add event listener to logout button(s)
document.addEventListener('DOMContentLoaded', function() {
    console.log('Logout script loaded');
    
    const logoutButtons = document.querySelectorAll('.logout-button');
    console.log('Found logout buttons:', logoutButtons.length);
    
    logoutButtons.forEach(button => {
      button.addEventListener('click', async function(e) {
        console.log('Logout button clicked');
        e.preventDefault();
        
        try {
          console.log('Sending logout request');
          const response = await fetch('/japi/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          console.log('Logout response:', response.status);
          if (response.ok) {
            alert('You have been logged out successfully.');
            window.location.href = '/';
          } else {
            alert('Logout failed. Please try again.');
          }
        } catch (error) {
          console.error('Logout error:', error);
          alert('An error occurred during logout.');
        }
      });
    });
});