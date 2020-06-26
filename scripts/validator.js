let targetClick;
let spaceNameCounter = 0;
let threeWordsOfName;
let validingName = false;
let resultValidingName = false;
let validingEmail = false;
let resultValidingEmail = false;
let validingPhone = false; //при вводе
let resultValidingPhone = false; //при уходе
let resultName = false;
let resultEmail = false;
let resultPhone = false;
let warningName = document.getElementById('warningName');
let warningEmail = document.getElementById('warningEmail');
let warningPhone = document.getElementById('warningPhone');
let name = '';
let email = '';
let phone = '';
let inputName = document.getElementById('name');
let inputEmail = document.getElementById('email');
let inputPhone = document.getElementById('phone');
let arraySimbolsEmail = [];

const btn = document.getElementById('submit');
btn.disabled = true;

document.addEventListener('click', function (e) {
    targetClick = e.target; // запоминаем куда кликнули
    if (targetClick.id === 'name') {
        targetClick.oninput = function () {
            validatorName();
        };
        targetClick.onchange = function () {
            validatorNameEnd();
        }
    } else if (targetClick.id === 'email') {
        targetClick.oninput = function () {
            validatorEmail();
        };
        targetClick.onchange = function () {
            validatorEmailEnd();
        };
    } else if (targetClick.id === 'phone') {
        targetClick.oninput = function () {
            validatorPhone();
        };
        targetClick.onchange = function () {
            validatorPhoneEnd();
        };
    }
});

function validatorName() {
    console.log('click');
    name = inputName.value;
    // console.log(inputName);
    const str = name.split('');
    const arrCodeChar = [];
    let spaceArray = name.match(/ +/g);


    str.forEach(function (sign) {
        arrCodeChar.push(sign.charCodeAt(0)); //32 - пробел,  && (el !== 45) - дефис
    });
    console.log('arrCodeChar: ', arrCodeChar);
    resultName = arrCodeChar.some(function (el) {
        return ((el < 1040) || (el > 1103)) && ((el < 65) || (el > 90)) && ((el < 97) || (el > 122)) && (el !== 32);
    });
    resultName = !resultName;
    console.log(arrCodeChar);
    if (!resultName) {
        validingName = false;
        warningName.classList.add('show');
    }
    if ((resultName) || (!name)) {
        validingName = true;
        warningName.classList.remove('show');
    }

    if (spaceArray !== null) {
        spaceNameCounter = spaceArray.length;
        if (name.match(/^ +\S/g)) {
            spaceNameCounter--;
        }
        if (name.match(/ +$/g)) {
            spaceNameCounter--;
        }
    }
    if ((name !== threeWordsOfName) && (spaceNameCounter > 2)) {
        validingName = false;
        warningName.classList.add('show');
        return;
    } else {
        validingName = true;
        // warning.classList.remove('show');
    }

    console.log('число пробелов', spaceNameCounter);

    if (spaceNameCounter > 2) {
        threeWordsOfName = name.slice(0, -1);
        console.log('threeWordsOfName', threeWordsOfName);
    }

    if (resultValidingName && resultValidingEmail && resultValidingPhone && validingName && validingEmail && validingPhone) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }

}

function validatorNameEnd() {
    console.log('Name после ухода', name.length);
    name = name.trim();
    console.log('Name после обрезки пробела в конце', name.length);
    let arrayName = name.split(' ');
    // console.log('массив из букв', arrayName[0][0]);

    arrayName.forEach(function (word) {
        if (word.length === 1) {
            validingName = false;
            warningName.classList.add('show');
        }
    });
    // console.log('массив из букв', arrayName);
    //
    if ((name.match(/ +/g)) && (name.match(/ +/g).length === 2) && (validingName) && (resultName)) {

        name = '';
        // D Dsgsd Sgdg
        //gkhFDGJdfgFgsd SDFrfgSDdDFdf DDfrfFgfGff
        for (let i = 0; i < arrayName.length; i++) {
            if (arrayName[i].length > 0) {
                for (let j = 0; j < arrayName[i].length; j++) {
                    // console.log('житая буква', arrayName[i][j]);

                    // console.log('arrayName[i].length > 0', arrayName[i].length);
                    if (j === 0) {
                        name = name + arrayName[i][j].toUpperCase();
                        // console.log('житая буква toUpperCase', name);
                    } else {
                        name = name + arrayName[i][j].toLowerCase();
                        // console.log('житая буква toLowerCase', name);
                    }


                }
                name = name + ' ';
            }
            // console.log('итое слово', arrayName[i]);

        }
        // console.log('обработанная строка', name);
        name = name.trim();
        console.log('NAME IS VALIDING');
        resultValidingName = true;
    } else {
        console.log('NAME IS GOVNO');
        warningName.classList.add('show');
        resultValidingName = false;
    }
    inputName.value = name;
    if (resultValidingName && resultValidingEmail && resultValidingPhone && validingName && validingEmail && validingPhone) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

function validatorEmail() {
    email = inputEmail.value;
    console.log(email);
    let arrCodeCharEmail = [];
    arraySimbolsEmail = email.split('');
    console.log('arraySimbolsEmail: ', arraySimbolsEmail);

    arraySimbolsEmail.forEach(function (sign) {
        arrCodeCharEmail.push(sign.charCodeAt(0));
    });
    console.log('arrCodeChar: ', arrCodeCharEmail);
    resultEmail = arrCodeCharEmail.some(function (el) { // 64 = @, 45 -, 46 . 95 _  пробел && (el !== 32)
        return ((el < 65) || (el > 90)) && ((el < 97) || (el > 122)) && (el !== 45) && (el !== 46) && ((el < 48) || (el > 57)) && (el !== 95) && (el !== 64) && (el !== 32);
    });
    resultEmail = !resultEmail;
    console.log('при вводе', resultEmail);

    if (!resultEmail) {
        validingEmail = false;
        warningEmail.classList.add('show');
        console.log('нажали дичь', validingEmail)
    }
    if (resultEmail) {
        validingEmail = true;
        warningEmail.classList.remove('show');
        console.log('дичь не нажата', validingEmail)
    }

    if (resultValidingName && resultValidingEmail && resultValidingPhone && validingName && validingEmail && validingPhone) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

function validatorEmailEnd() {

    let reg = /^([A-Za-z0-9_\-\.])+(@gmail.com)$/; // только gmail.com, содержит -_., латинские буквы и цифры
    let address = document.getElementById('email').value;
    inputEmail.value = '';
    // console.log('address is a', typeof address);
    address = address.trim();
    inputEmail.value = address;
    console.log('Email', address);
    if (reg.test(address) === false) {
        validingEmail = false;
        console.log('EMAIL IS GOVNO', validingEmail);
        warningEmail.classList.add('show');
        // return false;
    } else {
        // console.log(address[address.length-11]);
        if ((address[0] === '-' || address[0] === '_' || address[0] === '.') || (address[address.length - 11] === '-' || address[address.length - 11] === '_' || address[address.length - 11] === '.') || !(address.match(/(@gmail.com)$/))) {
            console.log(!(address.match(/(@gmail.com)$/)));
            validingEmail = false;
            warningEmail.classList.add('show');
            console.log('первый или последний символ плохие', validingEmail);
        } else {
            let addressArrayOfCaution = [];
            address.split('').forEach(function (currentValue, index) {
                if (currentValue === '-' || currentValue === '_' || currentValue === '.') {
                    addressArrayOfCaution.push(index);
                }
            });
            // console.log(addressArrayOfCaution);
            addressArrayOfCaution.forEach(function (currentValue, index, addressArrayOfCaution) {
                // console.log('hjff', addressArrayOfCaution[index+1], currentValue);
                if (addressArrayOfCaution[index + 1] === currentValue + 1) {
                    validingEmail = false;
                    console.log('есть повторения', validingEmail);
                    warningEmail.classList.add('show');
                }
            })

        }
    }
    if (validingEmail) {
        resultValidingEmail = true;
        console.log('повторений нет, все ок', resultValidingEmail, 'email:', address);
        warningEmail.classList.remove('show');

    }
    if (resultValidingName && resultValidingEmail && resultValidingPhone && validingName && validingEmail && validingPhone) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

function validatorPhone() {
    // console.log('Phone', targetClick.value);
    phone = inputPhone.value;
    console.log('Phone', phone);
    let arrCodeCharPhone = [];
    let arraySimbols = phone.split('');
    console.log('arraySimbolsPhone: ', arraySimbols);

    arraySimbols.forEach(function (sign) {
        arrCodeCharPhone.push(sign.charCodeAt(0));
    });
    console.log('arrCodeChar: ', arrCodeCharPhone);
    resultPhone = arrCodeCharPhone.some(function (el) { // пробел (el !== 32) 43 +, 45 -, 40 (, 41 )
        return ( ((el < 48) || (el > 57))  && (el !== 32) && (el !== 43) && (el !== 45) && (el !== 40) && (el !== 41));
    });
    resultPhone = !resultPhone;
    console.log('при вводе', resultPhone);

    if (!resultPhone) {
        validingPhone = false;
        warningPhone.classList.add('show');
        console.log('нажали дичь', validingPhone)
    }
    if (resultPhone) {
        validingPhone = true;
        warningPhone.classList.remove('show');
        console.log('дичь не нажата', validingPhone)
    }


    if (resultValidingName && resultValidingEmail && resultValidingPhone && validingName && validingEmail && validingPhone) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

function validatorPhoneEnd() {
    console.log('phone', phone);
    console.log('resultValidingPhone', resultValidingPhone);
    phone = phone.replace(/ +/g, '');
    phone = phone.replace(/\-+/g, '');
    phone = phone.replace(/\)+/g, '');
    phone = phone.replace(/\(+/g, '');
    if (phone[0] === '+') {
        if (phone[1] === '7') {
            phone = phone.replace(/\++/g, '');
            phone = '+' + phone;
            console.log(phone.length);
            if (phone.length === 12) {
                resultValidingPhone = true;
            } else {
                resultValidingPhone = false;
                warningPhone.classList.add('show');
            }
        } else {
            resultValidingPhone = false;
            warningPhone.classList.add('show');
        }
    } else if (phone[0] === '8') {
        phone = phone.replace(/\++/g, '');
        if (phone.length === 11) {
            resultValidingPhone = true;
        } else {
            resultValidingPhone = false;
            warningPhone.classList.add('show');
        }
    } else if (phone[0] === '0') {
        if (phone[1] === '7') {
            phone = phone.replace(/\++/g, '');
            if (phone.length === 12) {
                resultValidingPhone = true;
            } else {
                resultValidingPhone = false;
                warningPhone.classList.add('show');
            }
        } else {
            resultValidingPhone = false;
            warningPhone.classList.add('show');
        }
    } else {
        resultValidingPhone = false;
        warningPhone.classList.add('show');
    }
    inputPhone.value = '';
    inputPhone.value = phone;
    console.log('resultValidingPhone', resultValidingPhone);
    console.log('Phone ',  phone);

    if (resultValidingName && resultValidingEmail && resultValidingPhone && validingName && validingEmail && validingPhone) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

function Data(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
}



function btnSubmit(event) {
    event.preventDefault();
    let data = new Data(name, email, phone);
    console.log(data);
    inputName.value = '';
    inputEmail.value = '';
    inputPhone.value = '';
    btn.disabled = true;
    console.log( data.name == "Иванов Иван Иванович" );
    console.log( data.email == "mail@gmail.com" );
    console.log( data.phone == "+79994445566" );
    // return false;
}

// btn.addEventListener('submit', btnSubmit);
