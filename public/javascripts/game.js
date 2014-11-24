var game = {
	start: function() {
		var newDeck = new Deck();
		newDeck.generateCards();
		this.setUpBoard(shuffleCards(newDeck.cards));
	},
	setUpBoard: function(deck) {
		this.setColumns(deck.splice(0,28));
		this.setGameDeck(deck);
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
		return 'true';
	},
	setGameDeck: function(deck) {
		this.board.deck = deck;
		this.board.gutter = deck.splice(0,1);
	},
	render: function() {
		var topCards = this.getTopCards();
		var deck = $('#deck');
		var gutter = $('#gutter');
		var sections = $("#gameboard section");
		cardTemplate = Handlebars.compile($('#card-template').html());

		topCards[0].flipped = false;

		var gutterCard = $(cardTemplate(topCards[1]))
										.data('playOn', topCards[1].canPlayOn)
										.data('card', topCards[1].currentCard);
		deck.find('.card').replaceWith(cardTemplate(topCards[0]));
		gutter.find('.card').replaceWith(gutterCard);
		addProperties(gutterCard);
							
		sections.each(function(index) {
			var cardIdx = index + 6;
			var cardToRender = $(cardTemplate(topCards[cardIdx]))
												.data('playOn', topCards[cardIdx].canPlayOn)
												.data('card', topCards[cardIdx].currentCard);
			$(this).find('.card').replaceWith(cardToRender);
			addProperties($(this).find('.card'));
		})
	},
	checkWin: function() {
		spades = this.board.spades.count;
		diamonds = this.board.diamonds.count;
		clubs = this.board.clubs.count;
		hearts = this.board.hearts.count;
		if (spades + diamonds + clubs + hearts == 52) { 
			alert("Congratulations! You've Won");
			return true; 
		} else {
			return false;
		};
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
							card_1.playable = true;
							isPlayable.push(card_1.currentCard);
						}
					}
				})
			}
		})
	},
	getTopCards: function() {
		var topCards = [];
		for (pile in this.board) {
			topCards.push(this.board[pile][0]);
		}
		return topCards;
	},
	makeMove: function(colFrom, colTo) {
		var fromCol = this.board[colFrom];
		var toCol = this.board[colTo];
		var dragCard = fromCol[0];
		var dropCard = toCol[0];
		if (/spade|diamond|club|heart/.test(toCol)){
			if (dragCard.suit + dragCard.value == (dropCard.suit + (dropCard.value + 1))) {
				var cardToMove = fromCol.shift();
				cardToMove.playable = false;
				cardToMove.found = true;
				toCol.unshift(fromCol.shift());
			}
		} else if (dragCard.canPlayOn == dropCard.currentCard) {
			if (dropCard.playable) {
				var cardToMove = fromCol.shift();
				cardToMove.playable = false;
				toCol.unshift(cardToMove);
			}
		} else if (dropCard.length == 0 && dragCard.value == 13) {
			toCol.push(fromCol.shift());
		}
		if (this.checkLoss()){
			console.log('Game Over');
		} else if (this.checkWin()) {
			console.log('Winner');
		} else {
			this.setPlayableCards();
		}
	},
	cardTemplate: Handlebars.compile($('#card-template').html())
};

$(function(){
	game.start();
})
