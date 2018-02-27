$(document).ready(function ($) {
	
	
	
	$('.add-task').on('click', () => {
		addNewTask(createTask($('#name').val(), $('#priority').val(), $('#info').val()));
		renderFilters();
		renderTasksList();
		resetCreateTaskForm();
	});
	
	$('#ajax').click( () => { getAjax() });
	
	$('#web-sockets-start').click( () => { startWebSockets() } );
	$('#web-sockets-end').click( () => { closeWebSocket() } );
	
	getUserStorage();
	renderTasksList();
	renderFilters();
});


