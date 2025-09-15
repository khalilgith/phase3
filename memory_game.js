// Game state variables
let flippedCards = [];
let matchedCards = [];
let canFlip = true;
let moves = 0;
let score = 0;

// Card symbols array
const cardSymbols = [
    '🎯', '🎨', '🎭', '🎪', '🚀', '⭐', '🌟', '🎈',
    '🎯', '🎨', '🎭', '🎪', '🚀', '⭐', '🌟', '🎈'
];

// Shuffle function to randomly assign symbols
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Create the game board with cards
function createGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    if (!gameBoard) return;

    const shuffledSymbols = shuffleArray(cardSymbols);
    
    // Reset game state
    resetGame();
    // Clear existing cards
    gameBoard.innerHTML = '';

    // Create 16 cards (4x4 grid)
    shuffledSymbols.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;

        // 2. CARD WITH FRONT AND BACK FACE
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-face card-front"></div>
                <div class="card-face card-back">${symbol}</div>
            </div>
        `;

        // Add click event to flip card
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });

    updateUI();
}

// Flip a card
function flipCard(card) {
    if (!canFlip || card.classList.contains('matched') || card.classList.contains('flipped')) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);
    moves++;
    updateUI();

    if (flippedCards.length === 2) {
        canFlip = false;
        checkForMatch();
    }
}

// Check for a match
function checkForMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.symbol === card2.dataset.symbol;

    if (match) {
        handleMatch(card1, card2);
    } else {
        handleMismatch(card1, card2);
    }

    setTimeout(() => {
        flippedCards = [];
        canFlip = true;
        updateUI();
    }, 1000);
}

function handleMatch(card1, card2) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
    score += 10;
    
    if (matchedCards.length === cardSymbols.length) {
        gameComplete();
    }
}

function handleMismatch(card1, card2) {
    setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        score = Math.max(0, score - 1);
        updateUI();
    }, 1000);
}

function gameComplete() {
    const finalScore = calculateFinalScore();
    setTimeout(() => {
        alert(`Congratulations!\nMoves: ${moves}\nFinal Score: ${finalScore}`);
    }, 500);
}

function calculateFinalScore() {
    return Math.max(0, score + (1000 - (moves * 10)));
}

function updateUI() {
    document.getElementById('movesCount').textContent = moves;
    document.getElementById('totalScore').textContent = score;
    document.getElementById('matchesCount').textContent = `${matchedCards.length/2}/8`;
}

// Demo functions (updated for Phase 2)
function flipRandomCard() {
    const unflippedCards = document.querySelectorAll('.card:not(.flipped):not(.matched)');
    if (unflippedCards.length > 0 && canFlip) {
        const randomCard = unflippedCards[Math.floor(Math.random() * unflippedCards.length)];
        flipCard(randomCard);
    }
}

function flipAllCards() {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.add('flipped');
    });
}

function resetGame() {
    flippedCards = [];
    matchedCards = [];
    canFlip = true;
    moves = 0;
    score = 0;
    updateUI();
}

function resetCards() {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flipped', 'matched');
    });
    resetGame();
}

// New function to restart the entire game
function restartGame() {
    createGameBoard();
}

// Initialize the game board when page loads
document.addEventListener('DOMContentLoaded', createGameBoard);