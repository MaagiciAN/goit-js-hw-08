import throttle from "lodash.throttle";

const elements = {
    form: document.querySelector('.feedback-form')
}
const LOCAL_KEY = "feedback-form-state";
let localStorageValue = {};

elements.form.addEventListener('submit', onSubmit);
elements.form.addEventListener('input', throttle(onInput, 500));

refreshForm();
function refreshForm() {
    try {
        const saveData = localStorage.getItem(LOCAL_KEY);
        if (!saveData) return;
        localStorageValue = JSON.parse(saveData);
        Object.entries(localStorageValue).forEach(([key, val]) => {
            elements.form.elements[key].value = val;
        })
    }
    catch ({ message }) {
        console.log(message);
    }
}

function onInput(event) {
    const { name, value } = event.target;
    localStorageValue[name] = value.trim();
    localStorage.setItem(LOCAL_KEY, JSON.stringify(localStorageValue))
}
function onSubmit(event) {
    event.preventDefault();
    console.log(localStorageValue);
    localStorageValue = {};
    localStorage.removeItem(LOCAL_KEY);
    elements.form.reset();
}
