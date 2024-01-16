// regex from https://medium.com/geekculture/detecting-mobile-vs-desktop-browsers-in-javascript-ad46e8d23ce5#:~:text=User%20Agent%20String%20Detection&text=You%20can%20access%20the%20user,a%20mobile%20or%20desktop%20device.
function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}
function lessThan50() {
    const screenWidth = window.screen.width;
    const windowWidth = window.innerWidth;
    const threshold = 0.5 * screenWidth;

    // less than half of the max screen width, then set as columns
    return (windowWidth < screenWidth - threshold);
}
function lessThan90(){
    const screenWidth = window.screen.width;
    const windowWidth = window.innerWidth;
    const threshold = 0.25 * screenWidth;

    // less than 90% of the max screen width, then set as columns
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
        listStructure.style.display = lessThan50() ? 'flex' : 'grid';
        listStructure.style.flexDirection = lessThan50() ? 'column' : ''; 
        const listBlocks = listStructure.querySelectorAll('.listblock');
            listBlocks.forEach(block => {
                block.style.paddingLeft = lessThan50() ? '4%' : '15%';
                block.style.paddingRight = lessThan50() ? '4%' : '15%';
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
    } else if (title.textContent === "Projects" || title.textContent === "Experience") {
        const searchBar = document.querySelector('.search-bar');
        searchBar.style.display = lessThan90() ? 'flex' : 'grid';
        searchBar.style.flexDirection = lessThan90() ? 'column' : 'none';
        const labels = searchBar.querySelectorAll('.label');
        labels.forEach(label => {
            label.style.width = '285px';
        });
        const boxes = searchBar.querySelectorAll('.select');
        boxes.forEach(box => {
            box.style.width = '285px';
        });
        const resultsButton = document.querySelector('.results');
        resultsButton.style.width = lessThan50() ? "50%": "400px";
    } else {
        console.log("error");
    }

    const buttons = document.querySelectorAll('.navbarelements');
    buttons.forEach(button => {
        button.style.width = lessThan90() ? '100%' : '200px';
    });
    const dropButton = document.querySelector('.drop-button');
    dropButton.style.width = lessThan90() ? '100%' : '200px'; 

        
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
        const title = document.querySelector('.title');
        const buttons = document.querySelectorAll('.navbarelements');
        buttons.forEach(button => {
            button.style.width = '100%'; 
        });
        const dropButton = document.querySelector('.drop-button');
        dropButton.style.width = '100%'; 
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
            const searchBar = document.querySelector('.search-bar');    
            searchBar.style.display = 'flex';
            searchBar.style.flexDirection = 'column';
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