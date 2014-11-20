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
			this.board['col_'+ i] = columnCards.splice(0, i)
		}
		return 'true'
	},
	setGameDeck: function(deck) {
		this.board.deck = deck;
		this.board.gutter = deck.splice(0,1);
	},
	render: function() {
		var topCards = this.getTopCards();
		console.log(topCards)
		var deck = $('#deck');
		var gutter = $('#gutter');
		var sections = $("#gameboard section");
		var cardTemplate = Handlebars.compile($('#card-template').html());
		topCards[0].flipped = false;

		deck.find('.card').replaceWith(cardTemplate(topCards[0]));
		gutter.find('.card').replaceWith(cardTemplate(topCards[1]))
		sections.each(function(index) {
			var cardIdx = index + 6;
			var cardToRender = $(cardTemplate(topCards[cardIdx]))
												.data('playOn', topCards[cardIdx].canPlayOn)
												.data('card', topCards[cardIdx].color + topCards[cardIdx].value);
			$(this).find('.card').replaceWith(cardToRender);
			$(this).find('.card').draggable({
								revert: 'invalid',
								snap: '.value',
								snapMode: 'outer'
							})
						 .droppable({
						 	accept: function(card){
							 		var dropOn = $(this).data('card');
							 		var chosen = $(card).data('playOn');
							 		console.log(dropOn,chosen)
							 		return dropOn == chosen;
								}
							});
		})
	},
	checkWin: function() {
		spades = this.board.spades.count
		diamonds = this.board.diamonds.count
		clubs = this.board.clubs.count
		hearts = this.board.hearts.count
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
						if (card_1.canPlayOn == (card_2.color + card_2.value)) {
							card_1.playable = true;
							isPlayable.push(card_1.color + card_1.value)
						}
					}
				})
			}
		})
	},
	getTopCards: function() {
		var topCards = [];
		for (pile in this.board) {
			topCards.push(this.board[pile][0])
		}
		return topCards;
	},
	cardTemplate: Handlebars.compile($('#card-template').html())
};

$(function(){
	game.start();
})

$('body').on('click', '.card', function() {
	if ($(this).parent().hasClass('col_1')) {
		var card = game.board.col_1[game.board.col_1.length - 1];
		console.log(card, "hi")
	}
})