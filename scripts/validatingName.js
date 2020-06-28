import {elementsHTML} from "./validator.js";
import {validatingEmail} from "./validatingEmail.js";
import {validatingPhone} from "./validatingPhone.js";

export const validatingName = {
    spaceNameCounter: 0,
    name: '',
    validingNameOninput: false,  //флаг что при вводе пока все ок
    onlyAllowedCharacters: false, //использование только разрешенных символов
    validingNameOnchange: false, // флаг что после ухода из поля все проверки успешны

    validatorName: function () {
        // запоминаем вводимое значение
        this.name = elementsHTML.inputName.value;
        let spaceArray = this.name.match(/ +/g); //массив, содержащий элементы-пробелы из вводимой строки
        let arrCodeChar = [];
        let str = this.name.split('');
        str.forEach(function (sign) {
            arrCodeChar.push(sign.charCodeAt(0));
        });
        // если вводится запрещенный символ, то пишется false
        this.onlyAllowedCharacters = !arrCodeChar.some(function (el) {
            return ((el < 1040) || (el > 1103)) && ((el < 65) || (el > 90)) && ((el < 97) || (el > 122)) && (el !== 32);
        });
        // включение warningName если введен не разрешенный символ
        if (!this.onlyAllowedCharacters) {
            this.validingNameOninput = false;
            elementsHTML.warningName.classList.add('show');
        }
        // не показываем warningName если стерли плохой символ или все вводимое значение
        if ((this.onlyAllowedCharacters) || (!this.name)) {
            this.validingNameOninput = true;
            elementsHTML.warningName.classList.remove('show');
        }
        // счетчик сгруппированных пробелов, с исключением если они в начале или в конце
        if (spaceArray !== null) {
            this.spaceNameCounter = spaceArray.length;
            if (this.name.match(/^ +\S/g)) {
                this.spaceNameCounter--;
            }
            if (this.name.match(/ +$/g)) {
                this.spaceNameCounter--;
            }
        }
        //если ввели больше трех слов, то включаем warningName
        if (this.spaceNameCounter > 2) {
            this.validingNameOninput = false;
            elementsHTML.warningName.classList.add('show');
            return;
        } else {
            this.validingNameOninput = true;
        }
        // включение кнопки только если все поля валидны
        if (this.validingNameOnchange && validatingEmail.validingEmailOnchange && validatingPhone.validingPhoneOnchange && this.validingNameOninput && validatingEmail.validingEmailOninput && validatingPhone.validingPhoneOninput) {
            elementsHTML.btn.disabled = false;
        } else {
            elementsHTML.btn.disabled = true;
        }
    },

    validatorNameEnd: function () {
        this.name = this.name.trim();

        // приверка на то чтобы не ввели инициалы
        let arrayName = this.name.split(' ');
        arrayName.forEach(function (word) {
            if (word.length === 1) {
                validatingName.validingNameOninput = false;
                elementsHTML.warningName.classList.add('show');
            }
        });
        //если при вводе нет ошибок и введено три слова
        if ((this.name.match(/ +/g)) && (this.name.match(/ +/g).length === 2) && (this.validingNameOninput) && (this.onlyAllowedCharacters)) {
            // делаем их с заглавной буквы
            this.name = '';
            for (let i = 0; i < arrayName.length; i++) {
                if (arrayName[i].length > 0) {
                    for (let j = 0; j < arrayName[i].length; j++) {
                        if (j === 0) {
                            this.name = this.name + arrayName[i][j].toUpperCase();
                        } else {
                            this.name = this.name + arrayName[i][j].toLowerCase();
                        }
                    }
                    this.name = this.name + ' ';
                }
            }
            this.name = this.name.trim();
            this.validingNameOnchange = true;
        } else {
            elementsHTML.warningName.classList.add('show');
            this.validingNameOnchange = false;
        }
        elementsHTML.inputName.value = this.name;
        if (this.validingNameOnchange && validatingEmail.validingEmailOnchange && validatingPhone.validingPhoneOnchange && this.validingNameOninput && validatingEmail.validingEmailOninput && validatingPhone.validingPhoneOninput) {
            elementsHTML.btn.disabled = false;
        } else {
            elementsHTML.btn.disabled = true;
        }
    }
};