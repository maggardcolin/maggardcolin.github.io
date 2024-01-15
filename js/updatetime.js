document.addEventListener('DOMContentLoaded', function () {
    const title = document.querySelector('.title');
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        const timespent = project.getAttribute('time-spent');
        if (title.textContent === "Projects") {
            project.querySelector('h4').textContent += ` ${timespent}+ hours`;
        } else if (title.textContent === "Experience") {
            project.querySelector('h4').textContent += ` ${timespent} hours per week`;
        } else {
            console.log("error");
        }
    });
});