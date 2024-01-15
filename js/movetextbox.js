document.addEventListener("DOMContentLoaded", function () {
    const courseBoxes = document.querySelectorAll(".coursebox");

    courseBoxes.forEach((courseBox) => {
        courseBox.addEventListener("mousemove", (event) => {
            const textbox = courseBox.querySelector(".textbox");

            const mouseX = event.clientX + 5 + window.scrollX;
            const mouseY = event.clientY + window.scrollY;

            textbox.style.left = mouseX + "px";
            textbox.style.top = mouseY + "px";
        });
    });
});