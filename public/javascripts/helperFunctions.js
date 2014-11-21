function shuffleCards(array) {
  for(var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
  return array;
}

function accept(card) {
	var dropOn = $(this).data('card');
	var chosen = $(card).data('playOn');
	console.log(dropOn,chosen)
	return dropOn == chosen;
} 

function drop(event, ui) {
	var draggedCard = $(ui.helper);
	var draggedFromPile = draggedCard.closest('section').attr('class').match(/col_\d/)[0];
	var droppedOn = $(this);
	var droppedOnPile = droppedOn.closest('section').attr('class').match(/col_\d/)[0];
	game.board[draggedFromPile].shift();
	var nextCard = game.board[draggedFromPile][0];
	nextCard.flipped = true;
	var $nextCard = $(cardTemplate(nextCard)).data('playOn', nextCard.canPlayOn)
																					 .data('card', nextCard.color + nextCard.value);
	addProperties($nextCard)
	draggedCard.parent().append($nextCard);
	$(ui.helper).appendTo(this);
	$(ui.helper).css('position', 'static');
}

function addProperties(card) {
	card.draggable({
				revert: 'invalid',
				snap: '.value',
				snapMode: 'outer',
				stack: '.card',
				appendTo: 'body'
			})
		  .droppable({
		 		accept: accept,
				drop: drop
			});
}