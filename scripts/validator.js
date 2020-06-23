let targetClick;
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
    console.log('Name', targetClick.value);
}
function validatorNameEnd() {
    console.log('Name после ухода', targetClick.value);
    if (targetClick.value == 1) {
        let warning = document.getElementById('warningName');
        warning.classList.toggle('show');
    }
}
function validatorEmail() {
    console.log('Email', targetClick.value);
}
function validatorPhone() {
    console.log('Phone', targetClick.value);
}