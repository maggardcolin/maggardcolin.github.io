document.addEventListener("DOMContentLoaded", function() {

    // select all project boxes and the options of the two dropdowns
    const title = document.querySelector('.title');
    const searchbar = document.querySelector('.search-bar');
    const projects = document.querySelectorAll('.project');
    const affiliation = document.getElementById('affiliation');
    const searchResults = document.querySelector('.results');
    let languageFilter = undefined;
    let completionStatus = undefined;
    let option = "hide";
    let count = 0;
    let total = 0;
    if (title.textContent === "Projects") {
        languageFilter = document.getElementById('filter-option');
        completionStatus = document.getElementById('completion-status');
    }
    const sortOrder = document.getElementById('sort-order');
    
    searchResults.addEventListener('click', changeButton);
    affiliation.addEventListener('change', filterProjects);
    sortOrder.addEventListener('change', filterProjects);
    if (title.textContent === "Projects") {
        languageFilter.addEventListener('change', filterProjects);
        completionStatus.addEventListener('change', filterProjects);
    }
    
    function filterProjects() {
        const selectedSortOrder = sortOrder.value;
        count = 0;
        total = 0;
        // show a given project if all is selected or if its language class is
        if (title.textContent === "Projects") {
            const selectedLanguage = languageFilter.value;
            const selectedCompletionStatus = completionStatus.value;
            const selectedAffiliation = affiliation.value;
            projects.forEach(project => {
                total += 1;
                const language = selectedLanguage === 'all' || project.classList.contains(selectedLanguage);
                const status = selectedCompletionStatus === 'all' || project.classList.contains(selectedCompletionStatus);
                const affiliationtype = selectedAffiliation === 'all' || project.classList.contains(selectedAffiliation);
                const isVisible = language && status && affiliationtype;
                project.style.display = isVisible ? 'block' : 'none';
                count += isVisible ? 1 : 0;
            });
        } else if (title.textContent === "Experience") {
            const selectedAffiliation = affiliation.value;
            projects.forEach(project => {
                total += 1;
                const affiliationtype = selectedAffiliation === 'all' || project.classList.contains(selectedAffiliation);
                const isVisible = affiliationtype;
                project.style.display = isVisible ? 'block' : 'none';
                count += isVisible ? 1 : 0;
            });
        } else {
            console.log("error");
        }
        
        // sort projects based on specified order
        const sortedProjects = Array.from(projects).sort((a, b) => {
            if (selectedSortOrder === 'chron-ascending' || selectedSortOrder === 'chron-descending') {
                const orderA = parseInt(a.getAttribute('chron-order'));
                const orderB = parseInt(b.getAttribute('chron-order'));     
                return selectedSortOrder === 'chron-ascending' ? orderA - orderB : orderB - orderA;
            } else if (selectedSortOrder === 'time-ascending' || selectedSortOrder === 'time-descending') {
                const orderA = parseInt(a.getAttribute('time-spent'));
                const orderB = parseInt(b.getAttribute('time-spent'));     
                return selectedSortOrder === 'time-ascending' ? orderA - orderB : orderB - orderA;
            } else {
                const orderA = parseInt(a.getAttribute('relevance'));
                const orderB = parseInt(b.getAttribute('relevance'));     
                return orderA - orderB;
            }
        });

        // reorder within the section division
        const section = document.querySelector('.section');
        sortedProjects.forEach(project => {
            section.appendChild(project);
        });

        searchResults.textContent = `Showing  ${count} out of ${total} results. (Press to ${option} advanced search)`;

    }

    filterProjects();

    function changeButton() {
        option = (option === "hide") ? "show": "hide";
        const searchBarContainer = document.querySelector('.search-bar-container');
        const resetButton = document.querySelector('.reset-button');
        if (option === "hide") {
            if (!isMobile()) {
                searchbar.style.display = lessThan90() ? 'flex' : 'grid';
                searchbar.style.flexDirection = lessThan90() ? 'column' : 'none';
                searchBarContainer.style.backgroundColor = '#bbb';
                searchBarContainer.style.border = '1px solid #000000';
                searchBarContainer.style.marginBottom = '20px';
                searchBarContainer.querySelector('.search-label').textContent = 'Advanced Search';
                resetButton.style.display = 'block';
            } else {
                searchbar.style.display = 'flex';
                searchbar.style.flexDirection = 'column';
                searchBarContainer.style.backgroundColor = '#bbb';
                searchBarContainer.style.border = '1px solid #000000';
                searchBarContainer.style.marginBottom = '20px';
                searchBarContainer.querySelector('.search-label').textContent = 'Advanced Search';
                resetButton.style.display = 'block';
            }
        } else {
            searchbar.style.display = 'none';
            resetButton.style.display = 'none';
            searchBarContainer.style.border = 'none';
            searchBarContainer.style.backgroundColor = '#DDD0C8';
            searchBarContainer.style.marginBottom = '0';
            searchBarContainer.querySelector('.search-label').textContent = '';
        }
        searchResults.textContent = `Showing  ${count} out of ${total} results. (Press to ${option} advanced search)`;
    }

    function lessThan90(){
        const screenWidth = window.screen.width;
        const windowWidth = window.innerWidth;
        const threshold = 0.25 * screenWidth;
    
        // less than 90% of the max screen width, then set as columns
        return (windowWidth < screenWidth - threshold);
    }

    // regex from https://medium.com/geekculture/detecting-mobile-vs-desktop-browsers-in-javascript-ad46e8d23ce5#:~:text=User%20Agent%20String%20Detection&text=You%20can%20access%20the%20user,a%20mobile%20or%20desktop%20device.
    function isMobile() {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return regex.test(navigator.userAgent);
    }
});