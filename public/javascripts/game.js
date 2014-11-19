var game = {
	start: function() {
		var newDeck = new Deck();
		newDeck.generateCards();
		this.setUpBoard(shuffleCards(newDeck.cards));
	},
	setUpBoard: function(deck){
		this.setColumns(deck.splice(0,28));
		this.setGameDeck(deck);
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
	},
	render: function() {

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
		var topCards = this.board.map(function(card))
	}
};

$('body').on('click', '.card', function(){
	if ($(this).parent().hasClass('col_1')){
		var card = game.board.col_1[game.board.col_1.length - 1];
		console.log(card, "hi")
	}
})