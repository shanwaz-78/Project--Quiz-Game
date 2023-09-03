const name_input = document.getElementById('nameInput');
const email_input = document.getElementById('emailInput');
const btn = document.getElementById('button');
const text_area = document.getElementById('textarea');

// success msg when the form is submitted.
let success_msg = document.createElement('p')
success_msg.classList.add('success_msg');

btn.addEventListener('click', event => {
    event.preventDefault();
    if (name_input.value.length === 0 || email_input.value.length === 0) {
        alert('Please Fill All Required Boxes');
    } else {
        success_msg.textContent = 'Form Submitted SuccessFully'
        text_area.parentNode.insertBefore(success_msg, text_area.nextSibling);
        input_checking();
        store_user_data()
    }
});

function input_checking() {
    const email_value = email_input.value.toLowerCase().trim();
    if (!email_value.includes('@') || email_value.startsWith('@')) {
        success_msg.textContent = 'Email is not Valid';
        success_msg.style.color = 'red';
    } else {
        success_msg.style.color = '';
    }
};

function store_user_data() {
    const user_details = {
        name: name_input.value.toLowerCase().trim(),
        email: email_input.value.toLowerCase().trim(),
    };

    if (user_details.name.length > 1 && user_details.email.length > 1) {
        localStorage.setItem('user_data', JSON.stringify(user_details));
    }
}
