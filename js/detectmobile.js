// regex from https://medium.com/geekculture/detecting-mobile-vs-desktop-browsers-in-javascript-ad46e8d23ce5#:~:text=User%20Agent%20String%20Detection&text=You%20can%20access%20the%20user,a%20mobile%20or%20desktop%20device.
function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  }


document.addEventListener('DOMContentLoaded', function () {
    // Your existing code here
    if (!isMobile()) {
        console.log("Mobile device detected");
    } else {
        console.log("Desktop device detected");
        const navbarelements = document.querySelectorAll('.navbarelements');
        navbarelements.forEach(navbarelement => {
            navbarelement.style.width = '15%';
            const anchorElement = navbarelement.querySelector('a');
            anchorElement.style.color = 'red';
            anchorElement.style.fontSize = 'smaller';

        });
    }
});