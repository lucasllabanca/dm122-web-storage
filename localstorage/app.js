const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    //console.log({ event });
    const form = event.target; //who triggered the event

    const formData = {
        key: form.key.value,
        value: form.value.value
    }

    //console.log({ formData });

    window.localStorage.setItem(formData.key, formData.value);

    form.reset();
    form.key.focus();
    readFromStorage();

});

function readFromStorage() {
    //const key = window.localStorage.getItem('key');
    //const value = window.localStorage.getItem('value');
    document.querySelector('output').innerHTML += Object.keys(window.localStorage).map(htmlTemplate).join("");
}

function htmlTemplate(key) {
    const value = window.localStorage.getItem(key);
    return `
        <span>${key}</span>
        <span>${value}</span>
    `
}

console.log(localStorage);
readFromStorage();