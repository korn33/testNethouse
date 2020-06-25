let targetClick;
let spaceNameCounter = 0;
let threeWordsOfName;
let validingName = true;
let result = false;
let warning = document.getElementById('warningName');
let name = '';
let inputName = document.getElementById('name');
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
    } else if (targetClick.id === 'phone') {
        targetClick.oninput = function () {
            validatorPhone();
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
    result = arrCodeChar.some(function (el) {
        return ((el < 1040) || (el > 1103)) && ((el < 65) || (el > 90)) && ((el < 97) || (el > 122)) && (el !== 32);
    });
    result = !result;
    console.log(result);
    if (!result) {
        validingName = false;
        warning.classList.add('show');
    }
    if ((result)) {
        validingName = true;
        warning.classList.remove('show');
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
        warning.classList.add('show');
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
            warning.classList.add('show');
        }
    });
    // console.log('массив из букв', arrayName);
    if ((name.match(/ +/g)) && (name.match(/ +/g).length === 2) && (validingName) && (result) && (name)) {

        name = '';
        // D Dsgsd Sgdg
        //gkhFDGJdfgFgsd SDFrfgSDdDFdf DDfrfFgfGff
        for (let i = 0; i < arrayName.length; i++)  {
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
    } else {
        console.log('NAME IS GOVNO');
        warning.classList.add('show');
    }
    inputName.value = name;
}

function validatorEmail() {
    console.log('Email', targetClick.value);
    // if (targetClick.value == 1) {
    //     let warning = document.getElementById('warningEmail');
    //     warning.classList.toggle('show');
    // } else {
    //     let warning = document.getElementById('warningEmail');
    //     warning.classList.toggle('show');
    // }
}

function validatorPhone() {
    console.log('Phone', targetClick.value);
}

