class Validator {
    constructor(form, fields) {
    this.form = form
    this.fields = fields
    }
    initialize() {
        this.validateOnEntry()
    }
    validateOnEntry() {
        let self = this
        this.fields.forEach(field => {
            const input = document.querySelector(`#${field}`);
            input.addEventListener ('input', () => {
                self.isEmail(input)
                self.isRequired(input)
            })
        })
    }
    isEmail(field) {
        if(field.type === "email") {
            const regex = /\S+@\S+\.\S+/;
            if(regex.test(field.value)){
                this.setStatus(true);
            } else {
                this.setStatus(false);
            }
        }
    }
    isRequired(field) {
        if(field.id === "fname" || "lname" || "psw" || "pswagain" || "email") {
            if(field.value === ""){
                this.setStatus(false);
            } else {
                this.setStatus(true);
            };
        };
    }
    setStatus(status) {
        if(status === true) {
            console.log("SUCCESS");
        } else if(status === false) {
            console.log("ERROR");
        } else {
            console.log("");
        };
    };
};

const form = document.querySelector('.form_main');
const fields = ["fname", "lname", "email", "psw", "pswagain", "ageinput"];
const accountForm = new Validator(form, fields);
accountForm.initialize();