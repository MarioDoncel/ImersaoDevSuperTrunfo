let cards = [
    {
        name: "Seiya de Pegaso",
        image: "https://i.pinimg.com/originals/c2/1a/ac/c21aacd5d092bf17cfff269091f04606.jpg",
        atributtes: {
            attack: 80,
            defense: 60,
            magic: 90
        }
    },
    {
        name: "Bulbasauro",
        image: "http://4.bp.blogspot.com/-ZoCqleSAYNc/UQgfMdobjUI/AAAAAAAACP0/s_iiWjmw2Ys/s1600/001Bulbasaur_Dream.png",
        atributtes: {
            attack: 70,
            defense: 65,
            magic: 85
        }
    },
    {
        name: "Lorde Darth Vader",
        image: "https://images-na.ssl-images-amazon.com/images/I/51VJBqMZVAL._SX328_BO1,204,203,200_.jpg",
        atributtes: {
            attack: 88,
            defense: 62,
            magic: 90
        }
    },
    {
        name: "Caitlyn",
        image: "http://1.bp.blogspot.com/-K7CbqWc1-p0/VLc98v85s0I/AAAAAAAABqk/-ZB684VVHbg/s1600/Caitlyn_OriginalSkin.jpg",
        atributtes: {
            attack: 95,
            defense: 40,
            magic: 10
        }
    },
    {
        name: "Naruto",
        image: "https://conteudo.imguol.com.br/c/entretenimento/16/2017/06/27/naruto-1498593686428_v2_450x337.png",
        atributtes: {
            attack: 80,
            defense: 60,
            magic: 100
        }
    },
    {
        name: "Harry Potter",
        image: "https://sm.ign.com/ign_br/screenshot/default/89ff10dd-aa41-4d17-ae8f-835281ebd3fd_49hp.jpg",
        atributtes: {
            attack: 70,
            defense: 50,
            magic: 95
        }
    },
    {
        name: "Batman",
        image: "https://assets.b9.com.br/wp-content/uploads/2020/09/Batman-issue86-heder-1280x677.jpg",
        atributtes: {
            attack: 95,
            defense: 70,
            magic: 0
        }
    },
    {
        name: "Capitã Marvel",
        image: "https://cinepop.com.br/wp-content/uploads/2018/09/capitamarvel21.jpg",
        atributtes: {
            attack: 90,
            defense: 80,
            magic: 0
        }
    }
]
let card = `<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;">`
const sortButton = document.getElementById('btnSort')
const playButton = document.getElementById('btnPlay')
const nextRoundButton = document.getElementById('btnNextRound')
const divCardComp = document.getElementById('card-comp')
const divCardPlayer = document.getElementById('card-player')
const divResults = document.getElementById('results')
const divScore = document.querySelector('#score')

let playerPoints = 0
let compPoints = 0
updateScore()
updateCardsQuantity()

function updateCardsQuantity() {
    let divCardsQuantity = document.querySelector('#cardsQuantity')
    let html = `Quantitdade de cartas no jogo: ${cards.length}`
    divCardsQuantity.innerHTML = html
}

function updateScore() {
    let html = `Player - ${playerPoints} x ${compPoints} - Máquina`
    divScore.innerHTML = html
}

let randomIndex = () => parseInt(Math.random() * (cards.length))
let card_Player 
let card_Comp 

function sortCard() {
    card_Player = cards[randomIndex()]
    card_Comp = cards[randomIndex()]

    while (card_Player == card_Comp) {
        card_Player = cards[randomIndex()]
        card_Comp = cards[randomIndex()]
    }
    sortButton.disabled = true
    playButton.disabled = false
    showCardPlayer()
}
function showCardPlayer() {
    divCardPlayer.style.backgroundImage=`url(${card_Player.image})`
    let name = `<p class="card-subtitle">${card_Player.name}</p>`
    let optionsHtml = ''
    for (const atributte in card_Player.atributtes) {
        optionsHtml += `<input type='radio' name='atributte' value='${atributte}'> ${atributte} ${card_Player.atributtes[atributte]} <br>`
        }
    let html = `<div id='options' class='card-status'>`
    
    divCardPlayer.innerHTML = card +name + html + optionsHtml + '</div>'
}
function showCardComp() {
    divCardComp.style.backgroundImage=`url(${card_Comp.image})`
    let name = `<p class="card-subtitle">${card_Comp.name}</p>`
    let optionsHtml = ''
    for (const atributte in card_Comp.atributtes) {
        optionsHtml += `<p> ${atributte} ${card_Comp.atributtes[atributte]} </p>`
        }
    let html = `<div id='options' class='card-status'>`
    
    divCardComp.innerHTML = card + name + html + optionsHtml + '</div>'
}

function getAtributteSelected() {
    let radiosAtributte = document.getElementsByName('atributte')
    let atributte 
    radiosAtributte.forEach(element => {
        if(element.checked) {
            atributte = element.value
        }
    });
    return atributte
}    
function play() {
    let atributte = getAtributteSelected()
    let htmlResults = ''

    showCardComp()
    
    if (card_Player.atributtes[atributte] > card_Comp.atributtes[atributte]) {
        playerPoints++
        htmlResults = `<p class="final-result">Venceu!</p>`
        divResults.innerHTML = htmlResults
    } else if(card_Player.atributtes[atributte] < card_Comp.atributtes[atributte]){
        compPoints++
        htmlResults = `<p class="final-result">Perdeu!</p>`
        divResults.innerHTML = htmlResults
    } else {
        htmlResults = `<p class="final-result">Empate!</p>`
        divResults.innerHTML = htmlResults
    }
    
    playButton.disabled = true
    nextRoundButton.disabled = false
    updateScore()
}

function nextRound() {
    divResults.innerHTML = ''
    divCardPlayer.innerHTML =''
    divCardPlayer.style.backgroundImage=`none`
    divCardComp.innerHTML = ''
    divCardComp.style.backgroundImage=`none`
    sortButton.disabled = false
    cards = cards.filter((card) => card != card_Player)
    cards = cards.filter((card) => card != card_Comp)
    updateCardsQuantity()
    if(cards.length == 0){
        alert(`Acabou o jogo! ${divScore.innerText} `)
    }
}


 


    
