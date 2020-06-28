import {elementsHTML} from "./validator.js";
import {validatingName} from "./validatingName.js";
import {validatingEmail} from "./validatingEmail.js";

export const validatingPhone = {
    validingPhoneOninput: false, //при вводе
    validingPhoneOnchange: false, //при уходе
    onlyAllowedCharacters: false,
    phone: '',

    validatorPhone: function () {
        this.phone = elementsHTML.inputPhone.value;
        //проверки на недопустимые символы в процессе ввода
        let arrCodeCharPhone = [];
        let arraySimbols = this.phone.split('');

        arraySimbols.forEach(function (sign) {
            arrCodeCharPhone.push(sign.charCodeAt(0));
        });
        this.onlyAllowedCharacters = !arrCodeCharPhone.some(function (el) { // пробел (el !== 32) 43 +, 45 -, 40 (, 41 )
            return (((el < 48) || (el > 57)) && (el !== 32) && (el !== 43) && (el !== 45) && (el !== 40) && (el !== 41));
        });

        if (!this.onlyAllowedCharacters) {
            this.validingPhoneOninput = false;
            elementsHTML.warningPhone.classList.add('show');
        }
        if (this.onlyAllowedCharacters) {
            this.validingPhoneOninput = true;
            elementsHTML.warningPhone.classList.remove('show');
        }

        if (validatingName.validingNameOnchange && validatingEmail.validingEmailOnchange && this.validingPhoneOnchange && validatingName.validingNameOninput && validatingEmail.validingEmailOninput && this.validingPhoneOninput) {
            elementsHTML.btn.disabled = false;
        } else {
            elementsHTML.btn.disabled = true;
        }
    },

    validatorPhoneEnd: function () {
        //обрезаем лишние символы кроме +
        this.phone = this.phone.replace(/ +/g, '');
        this.phone = this.phone.replace(/\-+/g, '');
        this.phone = this.phone.replace(/\)+/g, '');
        this.phone = this.phone.replace(/\(+/g, '');

        // проверки на то что начинается только с +7*, 8* или 07*
        if (this.phone[0] === '+') {
            if (this.phone[1] === '7') {
                this.phone = this.phone.replace(/\++/g, ''); //вырезаем все +
                this.phone = '+' + this.phone; // кроме первого
                if (this.phone.length === 12) {
                    this.validingPhoneOnchange = true;
                } else {
                    this.validingPhoneOnchange = false;
                    elementsHTML.warningPhone.classList.add('show');
                }
            } else {
                this.validingPhoneOnchange = false;
                elementsHTML.warningPhone.classList.add('show');
            }
        } else if (this.phone[0] === '8') {
            this.phone = this.phone.replace(/\++/g, '');
            if (this.phone.length === 11) {
                this.validingPhoneOnchange = true;
            } else {
                this.validingPhoneOnchange = false;
                elementsHTML.warningPhone.classList.add('show');
            }
        } else if (this.phone[0] === '0') {
            if (this.phone[1] === '7') {
                this.phone = this.phone.replace(/\++/g, '');
                if (this.phone.length === 12) {
                    this.validingPhoneOnchange = true;
                } else {
                    this.validingPhoneOnchange = false;
                    elementsHTML.warningPhone.classList.add('show');
                }
            } else {
                this.validingPhoneOnchange = false;
                elementsHTML.warningPhone.classList.add('show');
            }
        } else {
            this.validingPhoneOnchange = false;
            elementsHTML.warningPhone.classList.add('show');
        }
        elementsHTML.inputPhone.value = '';
        elementsHTML.inputPhone.value = this.phone;

        if (validatingName.validingNameOnchange && validatingEmail.validingEmailOnchange && this.validingPhoneOnchange && validatingName.validingNameOninput && validatingEmail.validingEmailOninput && this.validingPhoneOninput) {
            elementsHTML.btn.disabled = false;
        } else {
            elementsHTML.btn.disabled = true;
        }
    }
};