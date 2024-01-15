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
    return (windowWidth < screenWidth - threshold);
}
function isSmallWindow() {
    // less than 750px wide or 450px tall and it will not show
    return (window.innerWidth < 750) || (window.innerHeight < 450);
    
}
function handleResize() {
    const title = document.querySelector('.title');
    if (title.textContent === "Colin Maggard") {
        const listStructure = document.querySelector('.list-structure');
        listStructure.style.display = windowedMode() ? 'flex' : 'grid';
        listStructure.style.flexDirection = windowedMode() ? 'column' : ''; 
        const listBlocks = listStructure.querySelectorAll('.listblock');
            listBlocks.forEach(block => {
                block.style.paddingLeft = windowedMode() ? '4%' : '15%';
                block.style.paddingRight = windowedMode() ? '4%' : '15%';
            });
    } else if (title.textContent === "Interactive Course Map") {
        console.log("coursework");
        const courseMap = document.querySelector('.course-image');
        courseMap.style.display = isSmallWindow() ? 'none' : 'flex';
        const colorKey = document.querySelector('#color-key');
        colorKey.style.display = isSmallWindow() ? 'none' : 'flex';
        const message = document.querySelector('#course-message');
        message.textContent = isSmallWindow()
        ? "Please increase your window size to be able to see the interactive course map."
        : "I created the above display by creating an HTML image map over a Sankey diagram and using JavaScript to move the textbox to match the user's mouse position.";
        } else {
        const resultsButton = document.querySelector('.results');
        resultsButton.style.width = windowedMode() ? "50%": "400px";
    }
    // navbar handling
    navbarelements = document.querySelectorAll(".navbarelements");
    navbarelements.forEach(element => {
        element.style.fontSize = isSmallWindow() ? '10px' : '15px';
        element.style.width = isSmallWindow() ? '75px' : '100px';
    });
        
}

document.addEventListener('DOMContentLoaded', function () {
    if (!isMobile()) {
        const title = document.querySelector('.title');
        if (title.textContent === "Colin Maggard" || title.textContent === "Experience" || title.textContent === "Projects" || title.textContent === "Interactive Course Map") {
            window.addEventListener('resize', handleResize);
            handleResize();
        }
    } else {
        console.log("Mobile device detected");
        const navbarelements = document.querySelectorAll('.navbarelements');
        navbarelements.forEach(navbarelement => {
            navbarelement.style.width = '75px';
            const anchorElement = navbarelement.querySelector('a');
            anchorElement.style.fontSize = '10px';
        });
        const title = document.querySelector('.title');
        if (title.textContent === "Colin Maggard") {
            const listStructure = document.querySelector('.list-structure');
            listStructure.style.display = 'flex';
            listStructure.style.flexDirection = 'column';
            const listBlocks = listStructure.querySelectorAll('.listblock');
            listBlocks.forEach(block => {
                block.style.paddingLeft = '5%';
                block.style.paddingRight = '5%';
            });
        }
        if (title.textContent === "Experience" || title.textContent === "Projects") {
            const headers = document.querySelectorAll('h2');
            headers.forEach(header => {
                header.fontSize = "10px;"
            });
            const resultsButton = document.querySelector('.results');
            resultsButton.style.width = "285px";
            resultsButton.style.marginBottom = '5%';
        }
        if (title.textContent === "Interactive Course Map") {
            const courseMap = document.querySelector('.course-image');
            courseMap.style.display = 'none';
            const colorKey = document.querySelector('#color-key');
            colorKey.style.display = 'none';
            const message = document.querySelector('#course-message');
            message.textContent = "This feature does not currently work on mobile devices. Please view this page on a desktop computer.";
        }
        
    }
});