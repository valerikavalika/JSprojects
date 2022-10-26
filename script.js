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
                self.isData(input)
            })
        })
    }
    isEmail(field) {
        if(field.type === "email") {
            if(field.value === "") {
                this.setStatus(false, field.id);
            } else {
                const regex = /\S+@\S+\.\S+/;
                if(regex.test(field.value)){
                    this.setStatus(true, field.id);
                } else {
                    this.setStatus(false, field.id);
                }
            }
            
        }
    }
    isRequired(field) {
        if(field.id === "fname" || field.id === "lname" || field.id === "psw" || field.id === "pswagain") {
            if(field.value === ""){
                this.setStatus(false, field.id);
            } else {
                this.setStatus(true, field.id);
            };
        };
    }
    isData(field) {
        if(field.id === "ageinput") {
            const d_reg = /^(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.]\d{4}$/;
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
    setStatus(status, fid) {
        const element = document.getElementById(fid);
        if(status === true) {
            console.log("SUCCESS");
            console.log(`${element.id}`);
            element.style.outlineColor = "green";
        } else if(status === false) {
            console.log("ERROR");
            element.style.outlineColor = "tomato";
        } else {
            console.log("");
        };
    };
    // setStatus(status) {
    //     if(status === true) {
    //         console.log("SUCCESS");
    //     } else if(status === false) {
    //         console.log("ERROR");
    //     } else {
    //         console.log("");
    //     };
    // };
    // setStatus(status) {
    //     if(status === true) {
    //         console.log("SUCCESS");
    //     } else if(status === false) {
    //         console.log("ERROR");
    //     } else {
    //         console.log("");
    //     };
    // };
};

const form = document.querySelector('.form_main');
const fields = ["fname", "lname", "email", "psw", "pswagain", "ageinput"];
const accountForm = new Validator(form, fields);
const validationResult = document.querySelector
accountForm.initialize();