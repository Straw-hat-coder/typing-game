const RANDOM_QUOTE_API_URL = 'https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

quoteInputElement.addEventListener('input', () => {
    let correct = true
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayvalue = quoteInputElement.value.split('')
    arrayQuote.forEach((CharacterSpan, index) => {
        const character = arrayvalue[index]
            if (character == null) {
                CharacterSpan.classList.remove('correct')
                CharacterSpan.classList.remove('incorrect')
                correct = false

            } else if (character !== CharacterSpan.innerText) {
                CharacterSpan.classList.remove('correct')
                CharacterSpan.classList.add('incorrect')
                correct = false

            } else if (character == CharacterSpan.innerText) {
                CharacterSpan.classList.add('correct')
                CharacterSpan.classList.remove('incorrect')
            }  
    })
    if (correct) renderNewQuote()
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())    
}

async function renderNewQuote() {
    const data = await getRandomQuote()
    const quote = data[0].q
    console.log(quote)
    quoteDisplayElement.innerHTML = ''
     quote.split('').forEach(character => {
        const CharacterSpan = document.createElement('span')
        CharacterSpan.innerText = character
        quoteDisplayElement.appendChild(CharacterSpan)
    });
    quoteInputElement.value = null
    startTimer()
}

let startTime
function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
       timer.innerText = getTimerTime()
    }, 1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()