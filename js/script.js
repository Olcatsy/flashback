const app = {};

// DECK: cards are stored as objects in an array, each containing an id, which determines which pair they belong to, and also serves as a reference for corresponding image in the assets folder 
// ? this array contains card duplicated - look into a way to generate two copies when randomized?

app.deck = [
    // pair 1
    {
        id: '001',
    },
    {
        id: '001',
    },
    // pair 2
    {
        id: '002',
    },
    {
        id: '002',
    },
    // pair 3
    {
        id: '003',
    },
    {
        id: '003',
    },
    // pair 4
    {
        id: '004',
    },
    {
        id: '004',
    },
    // pair 5
    {
        id: '005',
    },
    {
        id: '005',

    },
    // pair 6
    {
        id: '006',
    },
    {
        id: '006',
    },
    // pair 7
    {
        id: '007',
    },
    {
        id: '007',
    },
    //pair 8
    {
        id: '008',
    },
    {
        id: '008',
    },
    // pair 9
    {
        id: '009',
    },
    {
        id: '009',
    },
    // pair 10
    {
        id: '010',
    },
    {
        id: '010',
    },
    // pair 11
    {
        id: '011',
    },
    {
        id: '011',
    },
    // pair 12
    {
        id: '012',
    },
    {
        id: '012',
    },
    // pair 13
    {
        id: '013',
    },
    {
        id: '013',
    },
    // pair 14
    {
        id: '014',
    },
    {
        id: '014',
    },
    // pair 15
    {
        id: '015',
    },
    {
        id: '015',
    },
    // pair 16
    {
        id: '016',
    },
    {
        id: '016',
    },
    // pair 17
    {
        id: '017',
    },
    {
        id: '017',
    },
    // pair 18
    {
        id: '018',
    },
    {
        id: '018',
    },
]


// SHUFFLE: helper RNG using Fisher-Yates shuffle algorithm, a cool thing I found on the internet. Shuffled the deck and returns the rearranged array

app.shuffle = function(deck) {
    // let deck = app.deck;
    for (let i = deck.length - 1; i > 0; i--) {
        const swapIndex = Math.floor(Math.random() * (i + 1));
        const currentCard = deck[i];
        const cardToSwap = deck[swapIndex];
        deck[i] = cardToSwap;
        deck[swapIndex] = currentCard;
    }
    return deck;
}


// CREATE BOARD: populates the game board with the shuffled cards

app.createBoard = function() {
    // shuffle the deck
    let shuffledDeck = app.shuffle(app.deck);
    
    // loop through the array, create html elements for each card and append it to .gameBoard. The id property of the object is store in data attribute
    for (let i = 0; i < shuffledDeck.length; i++){
        let cardTemplate = `<div class="card" data-pairId = '${shuffledDeck[i].id}'></div>`;
        $('.gameBoard').append(cardTemplate);
    }
}


//have to use data-id attr on cards, because we are selecting an html element
// changes a card's CSS was if the card was flipped based on it's index in the deck array 
app.flipCard = function() {
    $('.gameBoard').on('click', '.card', function () {

        let cardId = $(this).data('pairid');
        
        $(this).addClass('faceUp').css(`background-image`, `url(./assets/card-faces/${cardId}.svg)`);
    });
    
    // console.log(`url(./assets/card-faces/${app.deck[index].id}.svg)`);
    // console.log(app.deck[index], app.deck[index].id);
}




// APP INIT: 
app.init = function() {
    app.createBoard();
    app.flipCard()
}

/*
-when Start button is clicked, the start screen (which is an overlay) fades out into the game screen


-when a user clicks on two cards they will get slightly bigger (transform: scale() is perfect for this), and the cards id's will be compared against each other (compare their data-id attributes)

-if the id's match, they will be removed from the grid, and the pair counter will increase by one

-if they don�t match the cards go back face down, and the user has to select again

-after comparing the card id's increase the counter if they match, and check if that number is 18 (36 / 2)

-if the pair counter is equal to 18  display the winning screen.

-Reset Game button on the game screen, and Play Again button on the result screen both have an event listener, that will reload the page (location.reload()) on click

-The Rules button on the Start and Game screen will have an event listener that will open a box with the rules on click

-The social links at the bottom of the pages will lead to my social media

*/


$(function() {
  app.init();
});