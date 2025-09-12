// 4. RANDOMLY ASSIGN CARD SYMBOLS
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
    const shuffledSymbols = shuffleArray(cardSymbols);

    // Clear existing cards
    gameBoard.innerHTML = '';

    // Create 16 cards (4x4 grid)
    for (let i = 0; i < 16; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.symbol = shuffledSymbols[i];
        card.dataset.index = i;

        // 2. CARD WITH FRONT AND BACK FACE
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-face card-front"></div>
                <div class="card-face card-back">${shuffledSymbols[i]}</div>
            </div>
        `;

        // Add click event to flip card
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });

        gameBoard.appendChild(card);
    }
}

// Demo functions (updated for Phase 2)
function flipRandomCard() {
    const unflippedCards = document.querySelectorAll('.card:not(.flipped):not(.matched)');
    if (unflippedCards.length > 0 && canFlip) {
        const randomIndex = Math.floor(Math.random() * unflippedCards.length);
        flipCard(unflippedCards[randomIndex]);
    }
}

function flipAllCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (!matchedCards.includes(card)) {
            card.classList.add('flipped');
        }
    });
}

function resetCards() {
    // Reset all game state
    flippedCards = [];
    matchedCards = [];
    canFlip = true;
    
    // Remove all classes from cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('flipped', 'matched');
    });
}

// New function to restart the entire game
function restartGame() {
    createGameBoard();
}

// Initialize the game board when page loads
document.addEventListener('DOMContentLoaded', function() {
    createGameBoard();
});