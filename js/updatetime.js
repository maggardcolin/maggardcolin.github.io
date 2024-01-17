/**
 * On the projects and experience pages, updates how much time was spent per week. This is so the sort works effectively.
 */
document.addEventListener('DOMContentLoaded', function () {
    const title = document.querySelector('.title');
    const titleText = title.textContent;
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        const timespent = project.getAttribute('time-spent');
        let timeContent = (titleText === "Projects") ? '+ hours' : ' hours per week';
        project.querySelector('h4').textContent += ` ${timespent}${timeContent}`;
    });
});