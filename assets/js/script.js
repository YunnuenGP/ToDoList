var todoModule = function() {
	var displayedList = $('.todoList');
	return { init : init };

	function init () {
		settingUpList();
		hookingUpEvents();
	}

	function settingUpList() {
		if (!supportsLocalStorage()) { return false; }
		var list =  window.localStorage.getItem('todoList');
		if (!list){ return false;}
		list.each(function() {
			addTodo($(this));
		});						
	}

	function hookingUpEvents() {
		displayedList.on('click', 'li', function() {
			$(this).toggleClass('completed');
		});

		displayedList.on('click', 'span', function(e) {
			$(this).parent().slideUp(350, function() {
				$(this).remove();
				refreshTodoCounter();
				saveList();
			});			
			e.stopPropagation();
		});

		$('input[type="text"]').on('keypress', function(e) {
			if(event.which === 13){
				var inputObj = $(this);
				var todoText = inputObj.val();
				addTodo(todoText);
				saveList();
				inputObj.val('');
			}
		});

		$('.fa-plus').on('click', function() {
			$('input[type="text"]').slideToggle();
		});
	}

	function addTodo(todoText) {
		var todoCounter = displayedList.children().size() + 1;
		displayedList.append(
			'<li><span class="todoCounter">'
			+ todoCounter++ 
			+'.- </span>' 
			+ todoText 
			+ '<span class="deleteButton"><i class="fa fa-trash"></i></span></li>'
			);
	}

	function refreshTodoCounter() {
		var todoCounter = 1;
		displayedList.children().each(function() {
			$(this).find('.todoCounter').text(todoCounter++ + '.- ')
		});
	}

	function saveList() {
		if (!supportsLocalStorage()) { return false; }
		var list = [];
		displayedList.children().each(function() {
			var current = $(this);
			current.find('span').remove()
			list.push(current.text());
		});
		window.localStorage.setItem('todoList', list);
	}

	function supportsLocalStorage() {
		try {
		  	return 'localStorage' in window && window['localStorage'] != null;
		} catch (e) {
		    return false;
		}
	}
}

$(document).ready(function() {
	var todo = new todoModule();
	todo.init();	
});