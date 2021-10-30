/*
System: PF Chat
Developer: Ahmad Hanan
Date: Sep 28, 2020
Organization: Programmer Force
Purpose: This file validation.js is responsible to handle all the validations required in Signup and Login and also
store data of users.
We use localStorage to save users data and sessionStorage to save sessions data, although localStorage is not
a good idea, as it is not secured way, but due to limitations we have use it.
*/


//getting data from localStorage and saving it in users array so that can be used it in the whole file
var users;
if (JSON.parse(localStorage.getItem("users")) === null) {
    users = [];
} else {
    users = JSON.parse(localStorage.getItem("users"));
}

//Signup fields
var fullName = document.getElementById('name');
var email = document.getElementById('email');
var pwd = document.getElementById('password');
var cpwd = document.getElementById('confirmpassword');
//Login fields
var loginEmail = document.getElementById('loginemail');
var loginPassword = document.getElementById('loginpassword');
// signup form
let signupForm = document.getElementById('signupform');
//login form
let loginForm = document.getElementById('loginform');
//validation Colors
const green = '#4CAF50';
const red = '#F44336';

// This function handle all the signup validations
function signupValidation() {

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        //if all the validations are true then store user data and redirect to login page
        if (validateName() && validateEmail() && validatePassword() && validateConfirmPassword()) {

            let user = {
                name: fullName.value,
                email: email.value,
                password: pwd.value,
                confirmPass: cpwd.value
            }
            if (users.length === 0) {

                addUser(user);
                saveUser();
                window.location.href = "login.html";
            } else {
                for (let i = 0; i < users.length; i++) {
                    if (users[i].email === user.email) {
                        setInvalid(email, `${email.name} already exists`);
                        return;
                    }

                }
                setValid(email);
                addUser(user);
                saveUser();
                window.location.href = "login.html";
            }
        }

    })

}

//This function is reponsible for all the login form validations
function loginValidation() {

    loginForm.addEventListener('submit', function(event) {

        event.preventDefault();

        //if all the validations are true then store login data in session and redirect to chat page
        if (validateLoginEmail() && validateLoginPassword()) {
            let userLogin = {
                email: loginEmail.value,
                password: loginPassword.value,
            }
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === userLogin.email && users[i].password === userLogin.password) {

                    setValid(loginPassword);
                    sessionStorage.setItem("Session", JSON.stringify(userLogin.email));
                    window.location.href = "chatBoard.html";
                    return;

                }

            }
            setInvalid(loginPassword, `Wrong credentials`);
            return;

        }
    })
}


//validators functions

//This function validate Name of the user
function validateName() {
    //check if empty
    if (checkIfEmpty(fullName)) return;

    //is if it has only letters
    if (!checkIfOnlyLetters(fullName)) return;
    return true;
}

//This function validate Email of the user
function validateEmail() {
    //check if empty
    if (checkIfEmpty(email)) return;
    return true;
}

//This function validate email of the user in login form
function validateLoginEmail() {
    //check if empty
    if (checkIfEmpty(loginEmail)) return;
    return true;
}

//This function used to validate password of the user
function validatePassword() {
    //check if empty
    if (checkIfEmpty(pwd)) return;
    //Must be in certain length
    if (!meetLength(pwd, 8, 100)) return;
    return true;
}

//This function used to validate password of the user in login form
function validateLoginPassword() {
    //check if empty
    if (checkIfEmpty(loginPassword)) return;
    //Must be in certain length
    if (!meetLength(loginPassword, 8, 100)) return;
    return true;
}

//This function used to validate confirm password field
function validateConfirmPassword() {
    //check if empty
    if (checkIfEmpty(cpwd)) return;
    //check password is same or not
    if (!samePassword(pwd, cpwd)) return
    return true;

}

//utility functions for validation

/*
This function check whether the value is empty of not
args: field (field need to check empty or not)
*/
function checkIfEmpty(field) {

    if (isEmpty(field.value.trim())) {
        //set field invalid
        setInvalid(field, `${field.name} must not be empty`)
        return true
    } else {
        //set field valid
        setValid(field);
        return false;
    }
}

/*
This function check whether the value is empty or not
args: value (value of the field)
*/
function isEmpty(value) {
    if (value === '') {
        return true;
    } else {
        return false;
    }
}

/*
This function set Invalid to input in case of wrong input
args: field, message (message to display as an error)
*/

function setInvalid(field, message) {
    field.classList.add('invalid');
    field.classList.remove('valid');
    field.nextElementSibling.innerHTML = message;
    field.nextElementSibling.style.color = red;
}

/*
This function set Valid to input in case of correct input
args: field
*/

function setValid(field) {
    field.classList.add('valid');
    field.classList.remove('invalid');
    field.nextElementSibling.innerHTML = "";

}

/*
This function check that input contain letters only.
args: field
*/
function checkIfOnlyLetters(field) {
    if (/^[a-zA-Z ]+$/.test(field.value)) {
        setValid(field);
        return true;
    } else {
        setInvalid(field, `${field.name} must contain only letters`);
        return false;
    }
}

/*
This function check that password meet the required length or not.
args: field, minLength (minimum length of password), maxLength (maximum length of password)
*/
function meetLength(field, minLength, maxLength) {
    if (field.value.length >= minLength && field.value.length <= maxLength) {
        setValid(field);
        return true;
    } else if (field.value.length < minLength) {
        setInvalid(field, `${field.name} must be at least ${minLength}`);
        return false;
    } else {
        setInvalid(field, `${field.name} must be shorter than ${maxLength}`);
        return false;
    }

}

/*
This function check that password and confirm password are same or not
args: field1,  field2
*/
function samePassword(field1, field2) {
    if (field1.value != field2.value) {
        setInvalid(field2, `Password not match`);
        return false;
    } else {
        setValid(field2);
        return true;
    }

}

/*
This function add user into users array
args: user (user object containing data of the user)
*/
function addUser(user) {
    users.push(user);

}

/*
This function save user into localStorage
*/
function saveUser() {
    localStorage.setItem("users", JSON.stringify(users))
}

/*
This function sigout the user and redirect user to login page and remove session storage
*/
function signOut() {
    sessionStorage.removeItem('Session');
    window.location.href = "login.html";
}