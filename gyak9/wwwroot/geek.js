var viccek;

function letöltés() {
    fetch('/jokes.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data)
        );
}

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    viccek = d;
    const jokesContainer = document.getElementById('jokes-container');
    jokesContainer.innerHTML = '';
    viccek.forEach(jokeObj => {
        const jokeElement = document.createElement('div');
        jokeElement.textContent = jokeObj.text;
        jokesContainer.appendChild(jokeElement);
    });
}

window.onload = function () {
    letöltés();
}