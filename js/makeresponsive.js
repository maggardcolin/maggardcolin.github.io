/**
 * Checks for mobile devices
 * regex from https://medium.com/geekculture/detecting-mobile-vs-desktop-browsers-in-javascript-ad46e8d23ce5#:~:text=User%20Agent%20String%20Detection&text=You%20can%20access%20the%20user,a%20mobile%20or%20desktop%20device.
 * @returns true if on mobile false otherwise
 */
function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}

/**
 * Checks if width is under half of its maximum value
 * @returns true if under 50 false otherwise
 */
function lessThan50() {
    const screenWidth = window.screen.width;
    const windowWidth = window.innerWidth;
    const threshold = 0.5 * screenWidth;

    // less than half of the max screen width, then set as columns
    return (windowWidth < screenWidth - threshold);
}

/**
 * Checks if width is under 90% of its maximum value
 * @returns true if under 90 false otherwise
 */
function lessThan90(){
    const screenWidth = window.screen.width;
    const windowWidth = window.innerWidth;
    const threshold = 0.25 * screenWidth;

    // less than 90% of the max screen width, then set as columns
    return (windowWidth < screenWidth - threshold);
}

/**
 * checks for under 750px wide or 450px tall, used for interactive course map display
 * @returns 
 */
function isSmallWindow() {
    // less than 750px wide or 450px tall and it will not show
    return (window.innerWidth < 750) || (window.innerHeight < 450);
    
}

/**
 * Handles various desktop resize operations
 */
function handleResize() {
    const title = document.querySelector('.title');

    // home page
    if (title.textContent === "Colin Maggard") {
        // show in a 2x2 grid if over 50% width, single column otherwise
        const listStructure = document.querySelector('.list-structure');
        listStructure.style.display = lessThan50() ? 'flex' : 'grid';
        listStructure.style.flexDirection = lessThan50() ? 'column' : ''; 
        const listBlocks = listStructure.querySelectorAll('.listblock');
            listBlocks.forEach(block => {
                block.style.paddingLeft = lessThan50() ? '4%' : '15%';
                block.style.paddingRight = lessThan50() ? '4%' : '15%';
            });
    } 
    
    // coursework page
    else if (title.textContent === "Interactive Course Map") {
        // turn off the interactive course map if under 50% width
        const courseMap = document.querySelector('.course-image');
        courseMap.style.display = isSmallWindow() ? 'none' : 'flex';
        const colorKey = document.querySelector('#color-key');
        colorKey.style.display = isSmallWindow() ? 'none' : 'flex';
        const message = document.querySelector('#course-message');
        message.textContent = isSmallWindow()
        ? "Please increase your window size to be able to see the interactive course map."
        : "I created the above display by creating an HTML image map over a Sankey diagram and using JavaScript to move the textbox to match the user's mouse position.";
    } 
    
    // projects/experience pages
    else if (title.textContent === "Projects" || title.textContent === "Experience") {
        const searchBar = document.querySelector('.search-bar');
        const resultsButton = document.querySelector('.results');
        const resetButton = document.querySelector('.reset');
        // 2x2 grid if over 90%, single column otherwise
        if (searchBar.style.display != 'none') {
            searchBar.style.display = lessThan90() ? 'flex' : 'grid';
            searchBar.style.flexDirection = lessThan90() ? 'column' : 'none';
        }
        // labels and boxes align differently and have different widths
        const labels = searchBar.querySelectorAll('.label');
        labels.forEach(label => {
            label.style.width = '285px';
            label.style.textAlign = lessThan90() ? 'center' : 'left';
            label.style.marginLeft = lessThan90() ? '0px' : '10px';
        });
        const boxes = searchBar.querySelectorAll('.select');
        boxes.forEach(box => {
            box.style.width = '285px';
            box.style.textAlign = lessThan90() ? 'center' : 'left';
            box.style.marginRight = lessThan90() ? '0px' : '10px';
        });
        // width of buttons changes per resolution
        resultsButton.style.width = lessThan90() ? "280px": "400px";
        resultsButton.style.minWidth = '280px';
        resetButton.style.width = lessThan90() ? "280px": "400px";
        resetButton.style.minWidth = '280px';
    } 
    
    // no other page needs resizing in a way that isn't handled by css
    else {
        console.log("error");
    }
        
}

document.addEventListener('DOMContentLoaded', function () {
    // desktop logic
    if (!isMobile()) {
        const title = document.querySelector('.title');
        if (title.textContent === "Colin Maggard" || title.textContent === "Experience" || title.textContent === "Projects" || title.textContent === "Interactive Course Map") {
            window.addEventListener('resize', handleResize);
            handleResize();
        }
    } 

    //mobile logic, done here instead of in a separate function
    else {
        console.log("Mobile device detected");
        const title = document.querySelector('.title');
        const dropButton = document.querySelector('.drop-button');
        dropButton.style.width = '100%'; 
        dropButton.style.backgroundColor = '#333';

        // home page needs its content in a single column
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

        // projects/experience pages have a specific way the searchbar must look
         else if (title.textContent === "Experience" || title.textContent === "Projects") {
            const headers = document.querySelectorAll('h2');
            headers.forEach(header => {
                header.fontSize = "10px;"
            });
            const resultsButton = document.querySelector('.results');
            resultsButton.style.width = "285px";
            resultsButton.style.marginBottom = '5%';
            const resetButton = document.querySelector('.reset');
            resetButton.style.width = "285px";
            resetButton.style.marginBottom = '2.5%';
            const searchBar = document.querySelector('.search-bar');    
            searchBar.style.display = 'flex';
            searchBar.style.flexDirection = 'column';
        }

        // coursework tab does not display the course map
        else if (title.textContent === "Interactive Course Map") {
            // do not display the map
            const courseMap = document.querySelector('.course-image');
            courseMap.style.display = 'none';
            const colorKey = document.querySelector('#color-key');
            colorKey.style.display = 'none';
            const message = document.querySelector('#course-message');
            message.textContent = "This feature does not currently work on mobile devices. Please view this page on a desktop computer.";
        }
        
    }
});

// google tag
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-22L0MR3QPQ');