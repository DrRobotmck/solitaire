var Card = function(suit, color, value) {
	this.suit = suit;
	this.value = value;
	this.color = color;
	this.found = false
	this.flipped = false;
	this.playable = false;
}

var Deck = function() {
	this.generateCards = function() {
		var suits = [["spade", "black", ["club", "black"], ["diamond", "red"], ["heart", "red"]]
		this.cards = [];

		suits.forEach(function(suit, index, array) {
			for (var i = 13; i > 0; i--) {
				this.cards.push(new Card(suit[0], suit[1], i))
			}
		}.bind(this));
	}
}
