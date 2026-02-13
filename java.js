let player = {
    name: "Per",
    chips: 145
}

let cards = []
let sum = 0
let dealerCards = []
let dealerSum = 0
let isAlive = false
let hasBlack = false
let roundOver = true
let currentBet = 0

const messageEl = document.getElementById("message-el")
const sumEl = document.getElementById("sum-el")
const cardsEl = document.getElementById("cards-el")
const dealerCardsEl = document.getElementById("dealer-cards-el")
const dealerSumEl = document.getElementById("dealer-sum-el")
const playerEl = document.getElementById("player-el")
const betInput = document.getElementById("bet-input")

updatePlayerStatus()

function getRandomCard() {
    const randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    }
    return randomNumber
}

function updatePlayerStatus() {
    playerEl.textContent = `${player.name}: $${player.chips}`
    playerEl.classList.toggle("lost", player.chips <= 0)
}

function drawInitialHands() {
    cards = [getRandomCard(), getRandomCard()]
    sum = cards[0] + cards[1]

    dealerCards = [getRandomCard(), getRandomCard()]
    dealerSum = dealerCards[0] + dealerCards[1]
}

function readBet() {
    const bet = Number(betInput.value)
    const minBet = 5

    if (!Number.isFinite(bet) || bet < minBet || bet % 5 !== 0) {
        messageEl.textContent = "Bet must be a valid multiple of 5 (min $5)."
        return 0
    }

    if (bet > player.chips) {
        messageEl.textContent = "You do not have enough chips for that bet."
        return 0
    }

    return bet
}

function startGame() {
    if (player.chips <= 0) {
        messageEl.textContent = "No chips left. Reset the game to play again."
        return
    }

    currentBet = readBet()
    if (currentBet === 0) {
        return
    }

    roundOver = false
    isAlive = true
    hasBlack = false

    drawInitialHands()
    renderGame(false)
}

function handToText(hand) {
    return hand.join(" ")
}

function renderGame(showDealer) {
    cardsEl.textContent = `Cards: ${handToText(cards)}`
    sumEl.textContent = `Sum: ${sum}`

    const visibleDealerCards = showDealer ? handToText(dealerCards) : `${dealerCards[0]} ?`
    const visibleDealerSum = showDealer ? dealerSum : dealerCards[0]

    dealerCardsEl.textContent = `Cards: ${visibleDealerCards}`
    dealerSumEl.textContent = `Sum: ${visibleDealerSum}`

    if (!showDealer) {
        if (sum < 21) {
            messageEl.textContent = "Hit for a new card or stand against the dealer."
        } else if (sum === 21) {
            hasBlack = true
            stand()
        } else {
            messageEl.textContent = "Bust! You went over 21."
            finishRound("lose")
        }
    }
}

function newCard() {
    if (!isAlive || roundOver) {
        return
    }

    cards.push(getRandomCard())
    sum += cards[cards.length - 1]
    renderGame(false)
}

function dealerTurn() {
    while (dealerSum < 17) {
        const card = getRandomCard()
        dealerCards.push(card)
        dealerSum += card
    }
}

function stand() {
    if (roundOver || !isAlive) {
        return
    }

    dealerTurn()
    renderGame(true)

    if (dealerSum > 21 || sum > dealerSum) {
        finishRound("win")
    } else if (sum === dealerSum) {
        finishRound("push")
    } else {
        finishRound("lose")
    }
}

function finishRound(result) {
    roundOver = true
    isAlive = false

    if (result === "win") {
        const winnings = hasBlack ? Math.floor(currentBet * 1.5) : currentBet
        player.chips += winnings
        messageEl.textContent = hasBlack
            ? `Blackjack! You win $${winnings}.`
            : `You win $${winnings}!`
    } else if (result === "push") {
        messageEl.textContent = "Push! It's a tie."
    } else {
        player.chips -= currentBet
        messageEl.textContent = `Dealer wins. You lose $${currentBet}.`
    }

    updatePlayerStatus()

    if (player.chips <= 0) {
        messageEl.textContent += " You are out of chips. Press Reset Game."
    }
}

function resetGame() {
    player.chips = 145
    cards = []
    dealerCards = []
    sum = 0
    dealerSum = 0
    isAlive = false
    hasBlack = false
    roundOver = true
    currentBet = 0

    cardsEl.textContent = "Cards: -"
    sumEl.textContent = "Sum: -"
    dealerCardsEl.textContent = "Cards: -"
    dealerSumEl.textContent = "Sum: -"
    messageEl.textContent = "Game reset. Place your bet and start a round."

    updatePlayerStatus()
}
