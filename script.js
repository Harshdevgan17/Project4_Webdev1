/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
	// Hides all error elements on the page
	hideErrors();

	// Determine if the form has errors
	if (formHasErrors()) {
		// Prevents the form from submitting
		e.preventDefault();

		// When using onSubmit="validate()" in markup, returning false would prevent
		// the form from submitting
		return false;
	}

	// When using onSubmit="validate()" in markup, returning true would allow
	// the form to submit
	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e){
    if (confirm('Clear form?')) {
		// Ensure all error fields are hidden
		hideErrors();

		// Set focus to the first text field on the form
		document.getElementById("name").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}
}

function formHasErrors(){
    let errorFlag = false;

    let firstErrorElement = null;

    let name = document.getElementById("name");
    if (!formFieldHasInput(name)) {
        document.getElementById("name_error").style.display = "block";

        if(!firstErrorElement){
            firstErrorElement = name;
        }
        errorFlag = true;
        
    }

    let email = document.getElementById("email");
    let emailRegex = RegExp(/^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})$/);

    if(!formFieldHasInput(email)){
        document.getElementById("email_error").style.display = "block";

        if(!firstErrorElement){
            firstErrorElement = email;
        }
        errorFlag = true;
    } else if(!emailRegex.test(email.value)){
		document.getElementById("invalid_email").style.display = "block";
		if(!firstErrorElement){
			firstErrorElement = document.getElementById("email");
		}
		errorFlag = true;
	}

    let phone = document.getElementById("phone");
    if(!formFieldHasInput(phone)){
        document.getElementById("phone_error").style.display = "block";

        if(!firstErrorElement){
            firstErrorElement = phone;
        }
        errorFlag = true;
    } else if(phone.value.trim().length != 10){
        document.getElementById('invalid_phone').style.display = "block";

        if(!firstErrorElement){
            firstErrorElement = phone;
        }
        errorFlag = true;
    }

    if(firstErrorElement){
		firstErrorElement.focus();
		firstErrorElement.select();
	}


    return errorFlag;

}

/*
 * Hides all of the error elements.
 */
function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for (let i = 0; i < error.length; i++) {
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement) {
	// Check if the text field has a value
	if (fieldElement.value == null || fieldElement.value.trim() == "") {
		// Invalid entry
		return false;
	}

	// Valid entry
	return true;
}

function load(){
    // Hide all the error messages
	hideErrors();

    // Add event listener for the form submit
	document.getElementById("questionform").addEventListener("submit", validate);

	// Add event listener for the form reset
	document.getElementById("questionform").addEventListener("reset", resetForm);

}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);