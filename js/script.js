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

// variables to STORE ID of selected cards to compare them
app.selected1 = '';
app.selected2 = '';

// Counter for matched pairs
app.pairCounter = 0;



// START GAME: when start screen is clicked, the screen fades out, and reveals the game board
app.startGame = function() {
    $('.startScreen').on('click', function() {
        $(this).fadeOut();
    });
}



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
        // I use button element for cards so that the user can tab through and interact with it using keyboard
        let cardTemplate = `
        <button class="card" data-pairId = '${shuffledDeck[i].id}'></button>`;
        $('.gameBoard').append(cardTemplate);
    }
}



// COMPARE SELECTED CARDS: compares the id of selected cards. If they match, .If they don't match . The variables that store card id's get cleared

app.compareSelectedCards = function() {
    
    // check if two cards were selected
    if (app.selected1 && app.selected2) {

        // check if card id's match
        if (app.selected1 === app.selected2) {

            // timeout to give user an opportunity to see their card
            setTimeout(function() {
               // set cards' visibility to none
                $('.faceUp').addClass('hidden'); 
            }, 400)

            // increase pair counter by 1
            app.pairCounter += 1;
            $('#pairCounterValue').val(app.pairCounter).text(app.pairCounter);
        } else {
            setTimeout(function() {
                // remove faceUp class from these cards and allows clicking on it
                $('.faceUp').removeClass('faceUp').css({'background-image': 'url(./assets/card-back.jpg)', 'pointer-events': 'auto'});
            }, 400);
        }
        app.selected1 = 0;
        app.selected2 = 0;
    }
}



// COMPLETE: fades in the complete screen when pair counter = 18 (the board is cleared)

app.youAreComplete = function () {
    // TEST
        // if(app.pairCounter === 1) {
        //     $('.completeScreen').fadeIn();
        //     $('.completeScreen .reset').focus();
        // } 

    if (app.pairCounter === 18) {
        $('.completeScreen').fadeIn();
        $('.completeScreen .reset').focus();
    }
}



// FLIP CARD: changes a card's CSS on click as if the card was flipped 
app.flipCard = function() {
    $('.gameBoard').on('click', '.card', function () {

        // stores card's data-pairId value
        let cardId = $(this).data('pairid');

        // adds .faceUp class, adds an svg background and prevents clicking on it again
        $(this).addClass('faceUp').css({'background-image': `url(./assets/card-faces/${cardId}.svg)`, 'pointer-events': 'none'});

        // store the pairId value for selected cards in one of the selectedCard's variables (whichever one is empty)
        if (!app.selected1) {
            app.selected1 = cardId;
        } else {
            app.selected2 = cardId;
        }

        // checks if selected cards are matching
        app.compareSelectedCards();

        // checks if the game is complete
        app.youAreComplete();

    });
}



// RESTART: clicking a restart button refreshes the whole page
app.restart = function() {
    $('.reset').on('click', () => {
        location.reload();
    })
}


// INFO: on click opens the information box
app.infoButton = function() {
    $('#infoButton').on('click', function() {
        $('#infoBox').fadeToggle();
    })
}

// OPEN FOOTER MENU: on mobile the footer is hidden. It slides up when user clicks on the hamburger button
app.openFooterMenu = function() {
    $('.openFooterButton').on('click', function() {
        $('.footer').slideToggle();
        console.log('click');
    })
}


// APP INIT: 
app.init = function() {
    app.startGame();
    app.createBoard();
    app.youAreComplete();
    app.flipCard();
    app.restart();
    app.infoButton();
    app.openFooterMenu();
}


$(function() {
  app.init();
});