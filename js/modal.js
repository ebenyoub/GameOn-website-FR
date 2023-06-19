/*
**------------------------------------------------------------------------
**                  Listener
**------------------------------------------------------------------------
*/


// ouvre la modale
modalBtn.map(btn => btn.addEventListener("click", launchModal));

// ferme la modale avec click extérieur
modalbg.addEventListener("click", e => !modalBody.contains(e.target) && closeModal());

// ferme la modale avec la croix
closeBtn.addEventListener("click", closeModal);

// ferme la modale avec la touche 'echape'
window.addEventListener('keydown', closeModalWithEscape);

function closeModalWithEscape(event) {
    if (!topNav.classList.contains('responsive')) {
        if (event.key === 'Escape') {
            closeModal()
        } ;
    }
}


/*
**------------------------------------------------------------------------
**                  Functions
**------------------------------------------------------------------------
*/

// 
function launchModal() {
    modalbg.style.display = "block";
    thanks && changeModal();
    inputs.first.focus();
    // block background scrolling
    document.body.classList.add('modal-open');
}

function closeModal() {
    modalbg.style.display = "none";
    document.body.classList.remove('modal-open');
    thanks && resetModal();
}

function resetModal() {
    // suppress error messages
    confirmMsg.style.display = 'none';
    // re-displays all form fields
    formData.forEach(field => {
        field.classList.remove('hideField');
    })
    // reset form button
    btnSubmit.classList.remove('btn-confirm');
    btnSubmit.value = "C'est parti";
    //reset fields button color
    for (let input of Object.values(inputs)) {
        input.classList.remove('isValid');
    }
    thanks = false;
}

function changeModal() {
    formData.forEach(field => {
        field.classList.add('hideField');
    })
    btnSubmit.classList.add('btn-confirm');
    btnSubmit.value = 'Fermer';
    confirmMsg.style.display = 'block';
    thanks = true;
    reset = false;
}
