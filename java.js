let player={
    name:"per",
    chips: 145
}
let cards=[] // Array
let sum=0
let hasBlack=false
let isAlive=false
let message=""
let messageEl=document.getElementById("message-el")
let sumEl=document.getElementById("sum-el")
let cardsEl=document.getElementById("cards-el")

let playerEl=document.getElementById("player-el")
playerEl.textContent=player.name+": $"+player.chips
//Random number

function getRandomCard(){
    let randomNumber=Math.floor(Math.random() * 13) + 1
    if (randomNumber>10){
        return 10
    }else if(randomNumber===1){
        return 11
    }else{
        return randomNumber
    }
}

function startGame(){
    isAlive=true
    let card1=getRandomCard()
    let card2=getRandomCard()
    cards=[card1,card2]
    sum=card1+card2
    renderGame()
}

function renderGame(){

    cardsEl.textContent="Cards: " 
    // for loop
    for(let i=0 ; i<cards.length; i++){
        cardsEl.textContent+=cards[i]+" "
    }   

    sumEl.textContent="Sum: "+sum
    if (sum <= 20){
        message = "Do you Want Add New Card?"
    }else if (sum === 21){
        message = "(Black Jack) YOU Win !!!"
        hasBlack=true
    }else{
        message = "Game Over, Sorry"
        isAlive=false
    }
    messageEl.textContent=message
}
function newCard(){
   if(isAlive===true && hasBlack===false){
    let card=getRandomCard()
    sum+= card
    cards.push(card)
    console.log(cards)
    renderGame()
   }
}