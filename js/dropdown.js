document.addEventListener("DOMContentLoaded", function() {
    const menuButton = document.getElementById("navDrop");
    const buttons = document.querySelectorAll(".dropdown-content");
    buttons.forEach(button => {
        button.style.display = 'none';
    });

    // toggle menu
    function dropdown() {
        menuButton.classList.toggle("show");
        const buttons = document.querySelectorAll(".dropdown-content");
        buttons.forEach(button => {
            button.style.display = menuButton.classList.contains("show") ? 'block' : 'none';
        });
    }

    // close menu if user clicks outside of it
    window.onclick = function(e) {
        if (!e.target.matches('.drop-button') && !e.target.matches('.navbarelements')) {
            if (menuButton.classList.contains('show')) {
                menuButton.classList.remove('show');
            }
            const buttons = document.querySelectorAll(".dropdown-content");
            buttons.forEach(button => {
                button.style.display = menuButton.classList.contains("show") ? 'block' : 'none';
            });
        } else {
        }
    }

    menuButton.addEventListener('click', dropdown);
});
