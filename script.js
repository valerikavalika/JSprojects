class Validator {
    constructor(form, fields) {
    this.form = form
    this.fields = fields
    };
    initialize() {
        this.validateOnEntry()
    };
    validateOnEntry() {
        let self = this
        this.fields.forEach(field => {
            const input = document.querySelector(`#${field}`);
            input.addEventListener ('input', () => {
                self.isEmail(input)
                self.isRequired(input)
                self.isData(input)
                self.isSamePassword(input)
            })
        })
    };
    isEmail(field) {
        if(field.type === "email") {
            const emailElement = document.getElementById(`email-error`);
            // if field is empty write The field is required meessage 
            if(field.value === "") {
                emailElement.innerHTML = `This field is required.`;
                this.setStatus(false, field.id);
            } else {
                //if field is not empty show error message until the email format is valid
                const regex = /\S+@\S+\.\S+/;
                if(regex.test(field.value)){
                    this.setStatus(true, field.id);
                } else {
                    emailElement.innerHTML = `The email address is invalid.`;
                    this.setStatus(false, field.id);
                }
            }
            
        }
    };
    isRequired(field) {
        if(field.id === "fname" || field.id === "lname" || field.id === "psw" || field.id === "pswagain") {
            if(field.value === ""){
                this.setStatus(false, field.id);
            } else {
                this.setStatus(true, field.id);
            };
        };
    };
    isData(field) {
        if(field.id === "ageinput") {
            const dateElement = document.getElementById(`ageinput-error`);
            const d_reg = /^(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.]\d{4}$/;
            if (field.value === "") {
                // if the field is empty do not show the error message - the field is not required
                this.setStatus("", field.id);
            } else {
                //if the field is not emty test if the date format is valid
            if(d_reg.test(field.value)) {
                const year = Number(field.value.slice(6));
                const currentYear = new Date().getFullYear();
                // if the date format is valid check if the year is valid
                if(year < 1920 || year > currentYear) {
                    dateElement.innerHTML = "The year is not valid";
                    this.setStatus(false, field.id);
                } else {
                    this.setStatus(true, field.id);
                }
            } else {
                // if the date format is not valid show error
                dateElement.innerHTML = "The date format is invalid.(Use\"dd/mm/yyyy\" / \"dd.mm.yyyy\" / \"dd-mm-yyyy\".";
                this.setStatus(false, field.id);
            }
            }
        }
    };
    isSamePassword(field) {
        if(field.id === "pswagain") {
            const pswAgainElement = document.getElementById(`pswagain-error`);
            const pswInput = document.getElementById(`psw`);
            //if the password confirmation input value is NOT the same as password value show special error
            if(field.value !== pswInput.value){
                pswAgainElement.innerHTML = `The password confirmation does not match.`;
                this.setStatus(false, field.id)
            } else if (field.value === pswInput.value && field.value !== "") {
                // if the field is matching the password value show no error messages - success
                this.setStatus(true, field.id)
            } else {
                // if the field is empty show error the field is required
                pswAgainElement.innerHTML = `This field is required.`;
                this.setStatus(false, field.id);
            }
        }
    }
    setStatus(status, fid) {
        const element = document.getElementById(fid);
        const errorMessage = document.getElementById(`${fid}-error`);
        if(status === true) {
            // do this when methods send true (success)
            element.style.outlineColor = "green";
            element.style.border = "solid 1px green";
            errorMessage.style.visibility = "hidden";
        } else if(status === false) {
            // do this when methods send false (error)
            element.style.outlineColor = "red";
            element.style.border = "solid 1px red";
            errorMessage.style.visibility = "visible";
        } else {
            // hide all error messages, do not show success 
            errorMessage.style.visibility = "hidden";
            element.style.outlineColor = "";
            element.style.border = "solid 1px grey";
        };
    };
};

const form = document.querySelector('.form_main');
const fields = ["fname", "lname", "email", "psw", "pswagain", "ageinput"];
const accountForm = new Validator(form, fields);
const validationResult = document.querySelector
accountForm.initialize();
