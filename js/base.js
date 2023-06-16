/*
**------------------------------------------------------------------------
**                  DOM Elements
**------------------------------------------------------------------------
*/

const modalbg = document.querySelector(".bground");
const modalBody = document.querySelector(".modal-body");
const modalBtn = [
    document.querySelector('.modal-btn'),
    document.querySelector('.modal-btn--responsive')
];
const closeBtn = document.querySelector(".close");
const btnConfirm = document.querySelector('.btn-confirm');
const formConfirm = document.querySelector('.form-confirm');
const formData = document.querySelectorAll('.formData');
const btnSubmit = document.getElementById('inscription');
const burgerMenu = document.querySelector('.icon');
const topNav = document.getElementById("myTopnav");
const mainNavbar = document.querySelector('.main-navbar');
const overlay = document.querySelector('.overlay');
const main = document.querySelector('main');

const inputs = {
    first: document.getElementById('first'),
    last: document.getElementById('last'),
    email: document.getElementById('email'),
    birthdate: document.getElementById('birthdate'),
    quantity: document.getElementById('quantity')
}
const form = document.getElementById('subscription');
const radios = document.getElementsByName('location');
const selectRadio = document.getElementById('selectRadio');
const checkboxRadio = document.querySelectorAll('.checkbox-icon');
const terms = document.getElementById('checkbox1');
const notification = document.getElementById('checkbox2');
const confirmMsg = document.querySelector('.confirm-msg');
const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

let transitionTimeOut;
let revise = false;
let thanks = false;

/*
**------------------------------------------------------------------------
**                  Listener
**------------------------------------------------------------------------
*/


// close the menu when changing the size of the window
window.addEventListener('resize', handleResize);

// open/close the menu on click on the burger menu
burgerMenu.addEventListener('click', editNav);

// close the drop-down menu when clicking outside the area
overlay.addEventListener('click', closeMenuOutside);

// close the menu with esc otherwise the modal
window.addEventListener("keydown", closeWithEscape);

// jump from birthdate to quantity on ios
inputs.birthdate.addEventListener('blur', jumpField);

/*
**------------------------------------------------------------------------
**                  Navigation
**------------------------------------------------------------------------
*/

// close the menu when you click outside the menu
function closeMenuOutside(event) {
    if (!mainNavbar.contains(event.target)) {
        editNav();
    }
}

// forces the move to the next field when we are on the date
function jumpField(event) {
    if (event.target.value && event.target.validity.valid) {
        inputs.quantity.focus();
    }
}

// close the menu with 'esc'
function closeWithEscape(event) {
    if (event.key === "Escape" && topNav.classList.contains('responsive')) {
        editNav();
    }
}

// add the responsive class to the navbar when you click on the burger
function editNav() {
    topNav.classList.toggle('responsive');
    topNav.className === 'topnav' ?
        overlay.style.display = 'none' :
        overlay.style.display = 'block';
    if (topNav.classList.contains('responsive')) {
        topNav.setAttribute('tabindex', '-1');
    } else {
        topNav.removeAttribute('tabindex');
    }
}

// close the drop-down menu when changing the screen size
function handleResize() {
    if (topNav.classList.contains('responsive')) {
        topNav.classList.remove('responsive');
    }
    clearTimeout(transitionTimeOut);
    mainNavbar.style.transition = 'none';
    transitionTimeOut = setTimeout(() => {
        mainNavbar.style.transition = 'transform .5s ease';
    }, 100);
}

/*
**------------------------------------------------------------------------
**                  Main
**------------------------------------------------------------------------
*/

// choose the right button to open the modal
function toggleModalBtnResponsive() {
    let btn;
    if (window.innerWidth < 768) {
        btn = document.querySelector('.modal-btn--responsive')
    } else {
        btn = document.querySelector('.modal-btn');
    }
    return btn;
}