var game = {
	start: function() {
		var newDeck = new Deck();
		newDeck.generateCards();
		this.setUpBoard(shuffleCards(newDeck.cards));
	},
	setUpBoard: function(deck) {
		this.setColumns(deck.splice(0,28));
		this.setGameDeck(deck);
		this.setHolderCards();
		this.setPlayableCards();
		this.render();
	},
	board: {
		deck: [],
		gutter: [],
		spades: [],
		diamonds: [],
		clubs: [],
		hearts: [],
		col_1: [],
		col_2: [],
		col_3: [],
		col_4: [],
		col_5: [],
		col_6: [],
		col_7: []
	},
	setColumns: function(columnCards) {
		for (var i = 7; i > 0; i--) {
			this.board['col_'+ i] = columnCards.splice(0, i);
		}
		return true;
	},
	setGameDeck: function(deck) {
		this.board.deck = deck;
		this.board.gutter = deck.splice(0,1);
	},
	setHolderCards: function() {
		var spadeHolder = new Card("spade", "black", 0, null);
		var heartHolder = new Card("heart", "red", 0, null);
		var clubHolder = new Card("club", "black", 0, null);
		var diamondHolder = new Card("diamond", "red", 0, null);
		this.board.spades.push(spadeHolder);
		this.board.hearts.push(heartHolder);
		this.board.clubs.push(clubHolder);
		this.board.diamonds.push(diamondHolder);
	},
	render: function() {
		var topCards = this.getTopCards();
		var deck = $('#deck');
		var gutter = $('#gutter');
		var sections = $("#gameboard section");
		var spade = $(".spade");
		var diamond = $(".diamond");
		var heart = $(".heart");
		var club = $(".club");

		topCards[0].flipped = false;

		var gutterCard = $(this.cardTemplate(topCards[1]))
										.data('playOn', topCards[1].canPlayOn)
										.data('card', topCards[1].currentCard);
		deck.find('.card').replaceWith(this.cardTemplate(topCards[0]));
		gutter.find('.card').replaceWith(gutterCard);
		addProperties(gutterCard);
							
		sections.each(function(index) {
			var cardIdx = index + 6;
			var cardToRender = $(game.cardTemplate(topCards[cardIdx]))
												.data('playOn', topCards[cardIdx].canPlayOn)
												.data('card', topCards[cardIdx].currentCard);
			$(this).find('.card').replaceWith(cardToRender);
			addProperties($(this).find('.card'));
		});

		var spadeCard = $(this.cardTemplate(topCards[2]))
											.data('playOn', topCards[2].canPlayOn)
											.data('card', topCards[2].currentCard);
		spade.find('.card').replaceWith(spadeCard);
		
		var diamondCard = $(this.cardTemplate(topCards[3]))
											.data('playOn', topCards[3].canPlayOn)
											.data('card', topCards[3].currentCard);
		diamond.find('.card').replaceWith(diamondCard);
		
		var clubCard = $(this.cardTemplate(topCards[4]))
										.data('playOn', topCards[4].canPlayOn)
										.data('card', topCards[4].currentCard);
		club.find('.card').replaceWith(clubCard);
		
		var heartCard = $(this.cardTemplate(topCards[5]))
										.data('playOn', topCards[5].canPlayOn)
										.data('card', topCards[5].currentCard);
		heart.find('.card').replaceWith(heartCard);

	},
	checkWin: function() {
		spades = this.board.spades.count;
		diamonds = this.board.diamonds.count;
		clubs = this.board.clubs.count;
		hearts = this.board.hearts.count;
		if (spades + diamonds + clubs + hearts - 4 == 52) { 
			alert("Congratulations! You've Won");
			return true; 
		} else {
			return false;
		}
	},
	checkLoss: function() {

	},
	setPlayableCards: function() {
		var topCards = this.getTopCards();
		var isPlayable = [];
		topCards.forEach(function(card_1, index, array) {
			if (card_1) {
				card_1.flipped = true;
				topCards.forEach(function(card_2, index, array) {
					if (card_2) {
						if (card_1.canPlayOn == (card_2.currentCard)) {
							card_2.playable = true;
							isPlayable.push(card_1.currentCard);
						}
					}
				});
			}
		});
	},
	getTopCards: function() {
		var topCards = [];
		for (var pile in this.board) {
			topCards.push(this.board[pile][0]);
		}
		return topCards;
	},
	makeMove: function(colFrom, colTo) {
		var cardToMove;
		var fromCol = this.board[colFrom];
		var toCol = this.board[colTo];
		var dragCard = fromCol[0];
		var dropCard = toCol[0];
		console.log(dropCard)
		if (/spade|diamond|club|heart/.test(colTo)){
			if (dragCard.suit + dragCard.value == (dropCard.suit + (dropCard.value + 1))) {
				cardToMove = fromCol.shift();
				cardToMove.playable = false;
				cardToMove.found = true;
				toCol.unshift(cardToMove);
			}
		} else if (dropCard.currentCard == 'blank' && dragCard.value == 13) {
			toCol.unshift(fromCol.shift());
		} else if (dragCard.canPlayOn == dropCard.currentCard) {
			if (dropCard.playable) {
				cardToMove = fromCol.shift();
				cardToMove.playable = false;
				toCol.unshift(cardToMove);
			}
		}
		this.checkForBlanks();
		if (this.checkLoss()){
			console.log('Game Over');
		} else if (this.checkWin()) {
			console.log('Winner');
		} else {
			this.setPlayableCards();
		}
	},
	nextCardFromDeck: function() {
		var deck = this.board.deck;
		var gutter = this.board.gutter;
		deck[0].flipped = true;
		deck.push(gutter.shift());
		gutter.push(deck.shift());
	},
	checkForBlanks: function() {
		for(var pile in this.board) {
			if (!this.board[pile][0]) {
				this.board[pile].push(new Card(null, "blank", "", ""));
			}
		}
	},
	cardTemplate: Handlebars.compile($('#card-template').html())
};

$(function(){
	game.start();
});
