function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const closeBtn = document.querySelector(".close");
const modalBtn = document.querySelectorAll(".modal-btn");

// modal
const launchModal = () => (modalbg.style.display = "block");
const closeModal = () => (modalbg.style.display = "none");

// listener
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.addEventListener("click", closeModal);

