$(document).ready(function() {
	var list = $('ul');
	list.on('click', 'li', function() {
		$(this).toggleClass('completed');
	});

	list.on('click', 'span', function(e) {
		$(this).parent().fadeOut(350, function() {
			$(this).remove();
		});
		e.stopPropagation();
	});

	$('input[type="text"]').on('keypress', function(e) {
		if(event.which === 13){
			var todoText = $(this).val();
			$('ul').append('<li><span>X</span> ' + todoText + '</li>');
			$(this).val('');
		}
	});
});

