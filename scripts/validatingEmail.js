import {elementsHTML} from "./validator.js";
import {validatingName} from "./validatingName.js";
import {validatingPhone} from "./validatingPhone.js";

export const validatingEmail = {
    email: '',
    validingEmailOninput: false,
    validingEmailOnchange: false,
    onlyAllowedCharacters: false,

    validatorEmail: function () {
        this.email = elementsHTML.inputEmail.value;
        //проверка что не вводятся запретные символы
        const arrCodeCharEmail = [];
        const arraySimbolsEmail = this.email.split('');
        arraySimbolsEmail.forEach(function (sign) {
            arrCodeCharEmail.push(sign.charCodeAt(0));
        });
        this.onlyAllowedCharacters = !arrCodeCharEmail.some(function (el) { // 64 = @, 45 -, 46 . 95 _  пробел  32)
            return ((el < 65) || (el > 90)) && ((el < 97) || (el > 122)) && (el !== 45) && (el !== 46) && ((el < 48) || (el > 57)) && (el !== 95) && (el !== 64) && (el !== 32);
        });
        if (!this.onlyAllowedCharacters) {
            this.validingEmailOninput = false;
            elementsHTML.warningEmail.classList.add('show');
        }
        if (this.onlyAllowedCharacters) {
            this.validingEmailOninput = true;
            elementsHTML.warningEmail.classList.remove('show');
        }

        if (validatingName.validingNameOnchange && this.validingEmailOnchange && validatingEmail.validingEmailOnchange && validatingName.validingNameOninput && this.validingEmailOninput && validatingPhone.validingPhoneOninput) {
            elementsHTML.btn.disabled = false;
        } else {
            elementsHTML.btn.disabled = true;
        }
    },

    validatorEmailEnd: function () {
        let reg = /^([A-Za-z0-9_\-\.])+(@gmail.com)$/; // только gmail.com, содержит -_. , латинские буквы и цифры

        let address = document.getElementById('email').value;
        elementsHTML.inputEmail.value = '';
        address = address.trim();
        elementsHTML.inputEmail.value = address;
        if (reg.test(address) === false) {
            this.validingEmailOninput = false;
            elementsHTML.warningEmail.classList.add('show');
        } else { // если прошед первую проверку, то проверяем что в начале или конце только буква или цифра
            if ((address[0] === '-' || address[0] === '_' || address[0] === '.') || (address[address.length - 11] === '-' || address[address.length - 11] === '_' || address[address.length - 11] === '.') || !(address.match(/(@gmail.com)$/))) {
                this.validingEmailOninput = false;
                elementsHTML.warningEmail.classList.add('show');
            } else { //если с началом и концом все ок, то проверяем на повторения -_.
                let addressArrayOfCaution = [];
                address.split('').forEach(function (currentValue, index) {
                    if (currentValue === '-' || currentValue === '_' || currentValue === '.') {
                        addressArrayOfCaution.push(index);
                    }
                });
                addressArrayOfCaution.forEach(function (currentValue, index, addressArrayOfCaution) {
                    if (addressArrayOfCaution[index + 1] === currentValue + 1) {
                        validatingEmail.validingEmailOninput = false;
                        elementsHTML.warningEmail.classList.add('show');
                    }
                })

            }
        }
        if (this.validingEmailOninput) {
            this.validingEmailOnchange = true;
            elementsHTML.warningEmail.classList.remove('show');
        }
        if (validatingName.validingNameOnchange && this.validingEmailOnchange && validatingEmail.validingEmailOnchange && validatingName.validingNameOninput && this.validingEmailOninput && validatingPhone.validingPhoneOninput) {
            elementsHTML.btn.disabled = false;
        } else {
            elementsHTML.btn.disabled = true;
        }
    }
};