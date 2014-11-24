function shuffleCards(array) {
  for(var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
  return array;
}

function accept(card) {
	var dropOn = $(this).data('card');
	var chosen = $(card).data('playOn');
	return dropOn == chosen;
} 

function drop(event, ui) {
	var draggedCard = $(ui.helper);
	var draggedFromPile = draggedCard.closest('section');
	var pileColumnName = draggedFromPile.attr('class');
	
	if (pileColumnName) {
		pileColumnName = pileColumnName.match(/col_\d/)[0];
		game.board[pileColumnName].shift();
		var nextCard = game.board[pileColumnName][0];
	}	else {
		game.board['gutter'].shift();
		var nextCard = game.board['deck'].shift();
	}

	nextCard.flipped = true;
	var $nextCard = $(cardTemplate(nextCard)).data('playOn', nextCard.canPlayOn)
																					 .data('card', nextCard.currentCard);
	addProperties($nextCard);
	draggedFromPile.append($nextCard);
	draggedCard.appendTo($(this).closest('section'));
	draggedCard.css('position', 'static');
}

function addProperties(card) {
	card.draggable({ revert: 'invalid' })
		  .droppable({
		 		accept: accept,
				drop: drop
			});
}