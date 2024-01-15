document.addEventListener("DOMContentLoaded", function() {

    // select all project boxes and the options of the two dropdowns
    const title = document.querySelector('.title');
    const projects = document.querySelectorAll('.project');
    const affiliation = document.getElementById('affiliation');
    let languageFilter = undefined;
    let completionStatus = undefined;
    if (title.textContent === "Projects") {
        languageFilter = document.getElementById('filter-option');
        completionStatus = document.getElementById('completion-status');
    }
    const sortOrder = document.getElementById('sort-order');
    
    affiliation.addEventListener('change', filterProjects);
    sortOrder.addEventListener('change', filterProjects);
    if (title.textContent === "Projects") {
        languageFilter.addEventListener('change', filterProjects);
        completionStatus.addEventListener('change', filterProjects);
    }
    
    function filterProjects() {
        const selectedSortOrder = sortOrder.value;

        // show a given project if all is selected or if its language class is
        if (title.textContent === "Projects") {
            const selectedLanguage = languageFilter.value;
            const selectedCompletionStatus = completionStatus.value;
            const selectedAffiliation = affiliation.value;
            projects.forEach(project => {
                const language = selectedLanguage === 'all' || project.classList.contains(selectedLanguage);
                const status = selectedCompletionStatus === 'all' || project.classList.contains(selectedCompletionStatus);
                const affiliationtype = selectedAffiliation === 'all' || project.classList.contains(selectedAffiliation);
                const isVisible = language && status && affiliationtype;
                project.style.display = isVisible ? 'block' : 'none';
            });
        } else if (title.textContent === "Experience") {
            const selectedAffiliation = affiliation.value;
            projects.forEach(project => {
                const affiliationtype = selectedAffiliation === 'all' || project.classList.contains(selectedAffiliation);
                const isVisible = affiliationtype;
                project.style.display = isVisible ? 'block' : 'none';
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
        const section = document.querySelector('section');
        sortedProjects.forEach(project => {
            section.appendChild(project);
        });
    }

    filterProjects();
});