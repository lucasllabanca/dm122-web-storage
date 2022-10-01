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
    
});