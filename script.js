// ------------------------------------------------------------1----------------------------------------------------
let form = document.querySelector("form");
let output = document.getElementById("output");
let inputs = document.querySelectorAll("form input");
let labels = document.querySelectorAll("form label");

let fullname;
let id;
let date;
let adress;
let mail;


// Валідація
form.addEventListener("input", function (event) {
    if (event.target === inputs[0]) {
        let regex = /^([а-яіА-ЯІ]+) ([А-ЯІ].){2}$/;
        fullname = ValidateInput(regex, event.target);
    } else if (event.target === inputs[1]) {
        let regex = /^([№#])[0-9]{6}$/;
        id = ValidateInput(regex, event.target);
    } else if (event.target === inputs[2]) {
        let regex = /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/;
        date = ValidateInput(regex, event.target);
    } else if (event.target === inputs[3]) {
        let regex = /^м\.([а-яіїА-ЯІЇ]+)$/;
        adress = ValidateInput(regex, event.target);
    } else if (event.target === inputs[4]) {
        let regex = /^[-\w.]+@([A-z0-9]+\.)+[A-z]{2,4}$/;
        mail = ValidateInput(regex, event.target);
    }

    function ValidateInput(regex, element) {
        if (!regex.test(element.value)) {
            element.classList.add("wrong");
            return false;
        } else {
            element.classList.remove("wrong");
            return true;
        }
    }
});

// Подія при натисканні на "Підтвердити"
form.lastElementChild.addEventListener("click", function () {
    let errors = form.querySelectorAll('#error');
    for (var i = 0; i < errors.length; i++) {
        errors[i].remove();
    }

    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
            inputs[i] = ShowError("Поле немає бути пустим!", inputs[i]);
        } else {
            inputs[i].classList.remove("wrong");
        }
    }

// Якщо поля форми заповнені правильно то дані відображаються у блоці "Введенні дані" 
    if (SubmitFunc()) {
        for (let i = 0; i < output.children.length; i++) {
            output.children[i + 1].innerHTML = `${inputs[i].getAttribute("placeholder")}: ${inputs[i].value}`;
        }
    }

// Відображення тексту в залежності від помилки
    function ShowError(text, element) {
        element.classList.add("wrong");
        let error = document.createElement('span');
        error.id = "error";
        error.style.color = 'red';
        error.innerHTML = text;
        element.after(error);
        return false;
    }
// Перевірка на правильність заповнених полів
    function SubmitFunc() {
        let errors = form.querySelectorAll('#error');
        if (fullname === false || id === false || date === false || adress === false || mail === false) {
            if (fullname === false) {
                ShowError("Неправильнй формат для цього поля!", inputs[0]);
            }
            if (id === false) {
                ShowError("Неправильнй формат для цього поля!", inputs[1]);
            }
            if (date === false) {
                ShowError("Неправильнй формат для цього поля!", inputs[2]);
            }
            if (adress === false) {
                ShowError("Неправильнй формат для цього поля!", inputs[3]);
            }
            if (mail === false) {
                ShowError("Неправильнй формат для цього поля!", inputs[4]);
            }
            return false;
        } else if (errors.length > 0) {
            for (let i = 0; i < inputs.length; i++) {
                if (inputs[i].classList.contains("wrong")) {
                    return false;
                }
            }
        }
        return true;
    }
})

// ------------------------------------------------------------2----------------------------------------------------
let table = document.querySelector("table");
let colorPicker = document.getElementById("color-picker");
let counter = 1;
let color;
let Mytd;

// Заповнює клітинки числами
for (let i = 0; i < table.lastElementChild.children.length; i++) {
    for (let j = 0; j < table.lastElementChild.children[i].children.length; j++) {
        table.lastElementChild.children[i].children[j].textContent = counter;
        if (counter === 35) {
            Mytd = table.lastElementChild.children[i].children[j];
        }
        counter++;
    }
}

// Переводить колір із HEX в RGB формат
function hex2rgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}

// Змінює колір тексту на білий або темний в залежності від кольору клітинки
function CheckTheColor(currentcolor, element) {
    newcolor = hex2rgb(currentcolor);
    if (newcolor[0] < 150 && newcolor[1] < 150 && newcolor[2] < 150) {
        element.style.color = "white";
    } else {
        element.style.color = "black";
    }
}
// Змінює колір клітинки при кліці
Mytd.addEventListener("click", function (event) {
    if (event.detail === 2) {
        ChangeRow(event.target);
    } else {
        event.target.style.backgroundColor = colorPicker.value;
        CheckTheColor(colorPicker.value, event.target);
    }
});
Mytd.addEventListener("dblclick ", ChangeRow);
Mytd.addEventListener("mouseenter", RandomColor);

// Змінює колір стрічки при двох натисканнях
function ChangeRow() {
    for (let i = 1; i < table.lastElementChild.children.length; i += 2) {
        table.lastElementChild.children[i].style.backgroundColor = colorPicker.value;
        CheckTheColor(colorPicker.value, table.lastElementChild.children[i]);
    }
}

// Змінює колір на рандомний при наведенні на клітинку
function RandomColor() {
    color = `#${(Math.floor(Math.random() * 16777215)).toString(16)}`
    this.style.backgroundColor = color;
    CheckTheColor(color, this);
}