$(document).ready(function() {
	var list = $('ul');

	list.on('click', 'li', function() {
		$(this).toggleClass('completed');
	});

	list.on('click', 'span', function(e) {
		$(this).parent().slideUp(350, function() {
			$(this).remove();
		});
		e.stopPropagation();
	});

	$('input[type="text"]').on('keypress', function(e) {
		if(event.which === 13){
			var inputObj = $(this);
			var todoText = inputObj.val();
			$('ul').append('<li><span><i class="fa fa-trash"></i></span> ' + todoText + '</li>');
			inputObj.val('');
		}
	});

	$('.fa-plus').on('click', function() {
		$('input[type="text"]').slideToggle();
	});
});