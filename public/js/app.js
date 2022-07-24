const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');


weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`http://localhost:3000/weather?address=${encodeURIComponent(location)}`)
    .then(response => response.json())
    .then(data => {
        if(data.error) {
            return messageOne.textContent = data.error;
        }
        const {weather_descriptions: [desc, ...rest], feelslike, temperature } = data.forecast;


        messageOne.textContent = data.location;
        messageTwo.textContent = `${desc}. It is ${temperature} degrees out, but it feels like ${feelslike} degrees out.`
    });
});