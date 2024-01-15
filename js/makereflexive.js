// regex from https://medium.com/geekculture/detecting-mobile-vs-desktop-browsers-in-javascript-ad46e8d23ce5#:~:text=User%20Agent%20String%20Detection&text=You%20can%20access%20the%20user,a%20mobile%20or%20desktop%20device.
function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}
function windowedMode() {
    const screenWidth = window.screen.width;
    const windowWidth = window.innerWidth;
    const threshold = 0.5 * screenWidth;

    // less than half of the max screen width, then set as columns
    return (
        (windowWidth < screenWidth - threshold)
    );
}
function handleResize() {
    const listStructure = document.querySelector('.list-structure');
    listStructure.style.flexDirection = windowedMode() ? 'column' : '';
}

document.addEventListener('DOMContentLoaded', function () {
    if (!isMobile()) {
        window.addEventListener('resize', handleResize);
        handleResize();
    } else {
        console.log("Mobile device detected");
        const navbarelements = document.querySelectorAll('.navbarelements');
        navbarelements.forEach(navbarelement => {
            navbarelement.style.width = '17%';
            const anchorElement = navbarelement.querySelector('a');
            anchorElement.style.fontSize = 'smaller';
        });
        const listStructure = document.querySelector('.list-structure');
        listStructure.style.flexDirection = 'column';
    }
});