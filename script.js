class Validator {
    constructor(form, fields) {
    this.form = form
    this.fields = fields
    }
    initialize() {
        this.validateOnEntry()
    }
    validateOnEntry() {
        const self = this
        this.fields.forEach(field => {
            const input = document.querySelector(`#${field}`);
            input.addEventListener ('input', () => {
                self.isRequired(input)
                self.checkEmailInput(input)
                self.checkDateInput(input)
                self.isSamePassword(input)
            })
        })
    }
    isRequired(field) {
        if(field.id === "fname" || field.id === "lname" || field.id === "psw" || field.id === "pswagain") {
            if(field.value === ""){
                this.setStatus(false, field.id);
            } else {
                this.setStatus(true, field.id);
            }
        }
    }
    checkEmailInput(field) {
        // if the field is empty set the field is required error message, 
        // else check if the email input is valid
        if(field.type === "email") {
            if(field.value === "") {
                this.setIsRequiredErrorText(field.id);
                this.setStatus(false, field.id);
            } else {
                this.isEmail(field);
            }
            
        }
    }
    isEmail(field) {
        const regex = /\S+@\S+\.\S+/;
        if(regex.test(field.value)){
            this.setStatus(true, field.id);
        } else {
            this.setIsEmailErrorText(field.id);
            this.setStatus(false, field.id);
        }
    }
    
    checkDateInput(field) {
        // if the field is empty show nothing, 
        // else check if the date input is valid
        if(field.id === "ageinput") {
            if (field.value === "") {
                this.setStatus("", field.id);
            } else {
                this.isDate(field);            
            }
        }
    }
    isDate(field) {
        // if date format is valid check if the year is valid else show Error
        const date_reg = /^(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.]\d{4}$/;
        if(date_reg.test(field.value)) {
            this.isYear(field);
        } else {
            this.setIsDateErrorText(field.id);
            this.setStatus(false, field.id);
        }
    }
    isYear(field) {
        const year = Number(field.value.slice(6));
        const currentYear = new Date().getFullYear();
        if(year < 1920 || year > currentYear) {
            this.setIsYearErrorText(field.id);
            this.setStatus(false, field.id);
        } else {
            this.setStatus(true, field.id);
        }
    }
    isSamePassword(field) {
        if(field.id === "pswagain") {
            const pswInput = document.getElementById(`psw`);
            //if the password confirmation input value is NOT the same as password value show special error
            if(field.value !== pswInput.value){
                this.setIsSamePasswordErrorText(field.id)
                this.setStatus(false, field.id)
            } else if (field.value === pswInput.value && field.value !== "") {
                // if the field is matching the password value show no error messages - success
                this.setStatus(true, field.id)
            } else {
                // if the field is empty show error the field is required
                this.setIsRequiredErrorText(field.id)
                this.setStatus(false, field.id)
            }
        }
    }
    setStatus(status, field_id) {
        if(status === true) {
            this.statusSuccess(field_id);
        } else if(status === false) {
            this.statusError(field_id);
        } else {
            this.statusDefault(field_id);
        }
    }
    //errors
    //errors-messages
    setIsRequiredErrorText (field_id) {
        const errorElement = document.getElementById(`${field_id}-error`);
        const isRequiredErrorText = `This field is required.`;
        errorElement.innerHTML = isRequiredErrorText;
    }
    setIsEmailErrorText (field_id) {
        const errorElement = document.getElementById(`${field_id}-error`);
        const isEmailErrorText = `The email address is invalid.`;
        errorElement.innerHTML = isEmailErrorText;
    }
    setIsDateErrorText (field_id) {
        const errorElement = document.getElementById(`${field_id}-error`);
        const isDateErrorText = "The date format is invalid.(Use\"dd/mm/yyyy\" / \"dd.mm.yyyy\" / \"dd-mm-yyyy\".";
        errorElement.innerHTML = isDateErrorText;
    }
    setIsYearErrorText (field_id) {
        const errorElement = document.getElementById(`${field_id}-error`);
        const isYearErrorText = "The year is not valid";
        errorElement.innerHTML = isYearErrorText;
    }
    setIsSamePasswordErrorText (field_id) {
        const errorElement = document.getElementById(`${field_id}-error`);
        const isSamePasswordErrorText = `The password confirmation does not match.`;
        errorElement.innerHTML = isSamePasswordErrorText;
    }
    //change styles depending on status value
    statusSuccess(field_id) {
        const element = document.getElementById(field_id);
        const errorMessage = document.getElementById(`${field_id}-error`);
        element.style.outlineColor = "green";
        element.style.border = "solid 1px green";
        errorMessage.style.visibility = "hidden";
    }
    statusError(field_id) {
        const element = document.getElementById(field_id);
        const errorMessage = document.getElementById(`${field_id}-error`);
        element.style.outlineColor = "red";
        element.style.border = "solid 1px red";
        errorMessage.style.visibility = "visible";
    }
    statusDefault(field_id) {
        const element = document.getElementById(field_id);
        const errorMessage = document.getElementById(`${field_id}-error`);
        errorMessage.style.visibility = "hidden";
        element.style.outlineColor = "";
        element.style.border = "solid 1px grey";
    }
};

const form = document.querySelector('.form_main');
const fields = ["fname", "lname", "email", "psw", "pswagain", "ageinput"];
const accountForm = new Validator(form, fields);
const validationResult = document.querySelector
accountForm.initialize();
