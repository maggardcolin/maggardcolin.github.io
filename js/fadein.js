/**
 * For fading in content, namely on the projects/experience pages and the index/about pages.
 */
document.addEventListener("DOMContentLoaded", function() {
    const title = document.querySelector(".title");
    if (title) {

        // when fading in is determined by something other than page load
        let languageFilter = undefined;
        let completionStatus = undefined;
        if (title.textContent === "Projects") {
            languageFilter = document.getElementById('filter-option');
            completionStatus = document.getElementById('completion-status');
            languageFilter.addEventListener('change', fadeElementsInOrder);
            completionStatus.addEventListener('change', fadeElementsInOrder);
        }
        if (title.textContent === "Projects" || title.textContent === "Experience") {
            const affiliation = document.getElementById('affiliation');
            const sortOrder = document.getElementById('sort-order');
            const resetButton = document.querySelector('.reset-button');
            affiliation.addEventListener('change', fadeElementsInOrder);
            sortOrder.addEventListener('change', fadeElementsInOrder);
            resetButton.addEventListener('click', fadeElementsInOrder);
        }
    } else {
        console.log("error");
        return;
    } 
    setUpElements();
    fadeElementsInOrder();
});

/**
 * Assign fade CSS rules to elements that are meant to fade in
 */
function setUpElements() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((element) => {
        element.style.opacity = 0;
        element.style.transition = 'opacity 0.5s ease-in-out';
    }); 
}

function fadeElementsInOrder() {
    const title = document.querySelector(".title");
    let elements = undefined;
    if (title.textContent === "Colin Maggard" || title.textContent === "About This Website") {
        elements = document.querySelectorAll('.fade-in');
    } else if (title.textContent === "Projects" || title.textContent === "Experience") {
        elements = document.querySelectorAll('.project:is([style*="display: block"])');
    } else {
        console.log("error");
        return;
    }
    elements.forEach((element) => {
        element.style.opacity = 0;
    });
    if (title.textContent === "Colin Maggard" || title.textContent === "About This Website") {
        elements.forEach((element, index) => {
            setTimeout(() => {
            element.style.opacity = 1;
            }, index * 200);
        });
    } else if (title.textContent === "Projects" || title.textContent === "Experience") {
        elements.forEach((element, index) => {
            setTimeout(() => {
            element.style.opacity = 1;
            }, index * 200);
        });
    } else {
        console.log("error");
        return;
    }
    
}