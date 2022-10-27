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
            if(field.value === "") {
                emailElement.innerHTML = `This field is required.`;
                this.setStatus(false, field.id);
            } else {
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
                this.setStatus("", field.id);
            } else {
            if(d_reg.test(field.value)) {
                const year = Number(field.value.slice(6));
                if(year < 1920 || year > 2030) {
                    this.setStatus(false, field.id);
                } else {
                    this.setStatus(true, field.id);
                }
            } else {
                this.setStatus(false, field.id);
            }
            }
        }
    };
    isSamePassword(field) {
        if(field.id === "pswagain") {
            const pswAgainElement = document.getElementById(`pswagain-error`);
            const pswInput = document.getElementById(`psw`);
            if(field.value !== pswInput.value){
                pswAgainElement.innerHTML = `The password confirmation does not match.`;
                this.setStatus(false, field.id)
            } else if (field.value === pswInput.value && field.value !== "") {
                this.setStatus(true, field.id)
            } else {
                pswAgainElement.innerHTML = `This field is required.`;
                this.setStatus(false, field.id);
            }
        }
    }
    setStatus(status, fid) {
        const element = document.getElementById(fid);
        const errorMessage = document.getElementById(`${fid}-error`);
        if(status === true) {
            element.style.outlineColor = "green";
            element.style.border = "solid 1px green";
            errorMessage.style.visibility = "hidden";
        } else if(status === false) {
            console.log("ERROR");
            element.style.outlineColor = "red";
            element.style.border = "solid 1px red";
            errorMessage.style.visibility = "visible";
        } else {
            console.log("");
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