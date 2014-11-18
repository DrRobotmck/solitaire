var game = {
	start: function() {
		var newDeck = new Deck();
		newDeck.generateCards();
		this.setUpBoard(newDeck.cards);
	},
	setUpBoard: function(deck){
		var columns = deck.slice(28)
		
	}
	render: function() {

	},
	checkWin: function() {
		spades = this.board.spades.count
		diamonds = this.board.diamonds.count
		clubs = this.board.clubs.count
		hearts = this.board.hearts.count
		if (spades + diamonds + clubs + hearts == 52) { alert("Congratulations! You've Won") };
	},
	checkLoss: function() {

	},
	board: {
		deck: [],
		gutter: [],
		spades: [],
		diamonds: [],
		clubs: [],
		hearts: []
		col_1: [],
		col_2: [],
		col_3: [],
		col_4: [],
		col_5: [],
		col_6: [],
		col_7: []
	}

}