const modal = document.querySelector('.js-modal');
const signupModal = document.querySelector('.js-auth-form-su');
const signupBtn = document.querySelector('.js-sign-up');
const cancelSuBtn = document.querySelector('.js-cancel-su');

const signinModal = document.querySelector('.js-auth-form-si');
const signinBtn = document.querySelector('.js-sign-in');
const cancelSiBtn = document.querySelector('.js-cancel-si');

const modalBody = document.querySelector('.js-modal__body');

function showSignupModal() {
    modal.classList.add('open');
    signupModal.classList.add('open');
}

function hideSignupModal() {
    modal.classList.remove('open');
    signupModal.classList.remove('open');
}

function showSinginModal() {
    modal.classList.add('open');
    signinModal.classList.add('open');
}

function hideSigninModal() {
    modal.classList.remove('open');
    signinModal.classList.remove('open');
}

signupBtn.addEventListener('click', showSignupModal);
cancelSuBtn.addEventListener('click', hideSignupModal);
signinBtn.addEventListener('click', showSinginModal);
cancelSiBtn.addEventListener('click', hideSigninModal);

// modal.addEventListener('click', hideSigninModal);

modalBody.addEventListener('click', function(event) {
    event.stopPropagation
});