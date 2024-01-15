document.addEventListener("DOMContentLoaded", function() {

    // select all project boxes and the options of the two dropdowns
    const projects = document.querySelectorAll('.project');
    const languageFilter = document.getElementById('filter-option');
    const completionStatus = document.getElementById('completion-status');
    const sortOrder = document.getElementById('sort-order');

    function filterProjects() {
        const selectedLanguage = languageFilter.value;
        const selectedCompletionStatus = completionStatus.value;
        const selectedSortOrder = sortOrder.value;

        // show a given project if all is selected or if its language class is
        projects.forEach(project => {
            const language = project.classList.contains(selectedLanguage);
            const status = project.classList.contains(selectedCompletionStatus);
            const isVisible = (selectedLanguage === 'all' || language) && (selectedCompletionStatus === 'all' || status);
            project.style.display = isVisible ? 'block' : 'none';
        });

        // sort projects based on specified order
        const sortedProjects = Array.from(projects).sort((a, b) => {
            
            if (selectedSortOrder === 'ascending' || selectedSortOrder === 'descending') {
                const orderA = parseInt(a.getAttribute('chron-order'));
                const orderB = parseInt(b.getAttribute('chron-order'));     
                return selectedSortOrder === 'ascending' ? orderA - orderB : orderB - orderA;
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

    languageFilter.addEventListener('change', filterProjects);
    completionStatus.addEventListener('change', filterProjects);
    sortOrder.addEventListener('change', filterProjects);

    filterProjects();
});