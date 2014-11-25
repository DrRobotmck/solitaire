var Card = function(suit, color, value, canPlayOn) {
	this.suit = suit;
	this.value = value;
	this.color = color;
	this.canPlayOn = canPlayOn;
	this.currentCard = color + value;
	this.found = false
	this.flipped = false;
	this.playable = false;
}

var Deck = function() {
	this.generateCards = function() {
		var suits = [
			["spade", "black"], 
			["club", "black"], 
			["diamond", "red"], 
			["heart", "red"] 
		];
		var reverseColor = {"black": "red", "red": "black"};
		this.cards = [];

		suits.forEach(function(suit, index, array) {
			for (var i = 13; i > 0; i--) {
				var reversedColor = reverseColor[suit[1]];
				this.cards.push(new Card(suit[0], suit[1], i, ( reversedColor + (i + 1)) ));
			}
		}.bind(this));
	}
}
