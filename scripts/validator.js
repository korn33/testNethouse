import {validatingName} from "./validatingName.js";
import {validatingEmail} from "./validatingEmail.js";
import {validatingPhone} from "./validatingPhone.js";

export const elementsHTML = {
    warningName: document.getElementById('warningName'),
    warningEmail: document.getElementById('warningEmail'),
    warningPhone: document.getElementById('warningPhone'),

    inputName: document.getElementById('name'),
    inputEmail: document.getElementById('email'),
    inputPhone: document.getElementById('phone'),

    btn: document.getElementById('submit'),
};

elementsHTML.btn.disabled = true;

document.addEventListener('click', function (e) {
    const targetClick = e.target; // запоминаем куда кликнули
    if (targetClick.id === 'name') {
        targetClick.oninput = function () {
            validatingName.validatorName();
        };
        targetClick.onchange = function () {
            validatingName.validatorNameEnd();
        }
    } else if (targetClick.id === 'email') {
        targetClick.oninput = function () {
            validatingEmail.validatorEmail();
        };
        targetClick.onchange = function () {
            validatingEmail.validatorEmailEnd();
        };
    } else if (targetClick.id === 'phone') {
        targetClick.oninput = function () {
            validatingPhone.validatorPhone();
        };
        targetClick.onchange = function () {
            validatingPhone.validatorPhoneEnd();
        };
    }
});

function Data(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
}

elementsHTML.btn.addEventListener('click', btnSubmit);

async function btnSubmit(event) {
    event.preventDefault();
    elementsHTML.btn.disabled = true;
    const form = document.getElementById('myForm');
    form.disabled = true;

    const data = new Data(validatingName.name, validatingEmail.email, validatingPhone.phone);
    console.log('data.name === "Иванов Иван Иванович":', data.name === "Иванов Иван Иванович");
    console.log('data.email === "mail@gmail.com":', data.email === "mail@gmail.com");
    console.log('data.phone === "+79994445566":', data.phone === "+79994445566");

    try {

        let formData = new FormData(form);
        formData.append('name', validatingName.name);
        formData.append('email', validatingEmail.email);
        formData.append('phone', validatingPhone.phone);
        new Response(formData).text().then(console.log);

        console.log('начата отправка данных формы');

        await fetch('http://ptsv2.com/t/8o6lb-1593340314/post', {
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        console.log(response);
                        resolve(response);
                    }, 0)
                })
            } else {
                console.log(response);
                throw new Error(response.statusText);
            }
        })

    } catch (e) {
        console.log('error:', e);
    }
    elementsHTML.inputName.value = '';
    elementsHTML.inputEmail.value = '';
    elementsHTML.inputPhone.value = '';
}