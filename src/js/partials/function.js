function createTask(name, priority, info) {
	return {
		id: Math.max(0, ...Object.keys(objTasks)) + 1,
		name: name,
		priority: priority,
		info: info,
		state: 'TODO'
	};
}

function addNewTask(task) {
	objTasks[task.id] = task;
	localStorage.setItem('objTask', JSON.stringify(objTasks));
}

function resetCreateTaskForm() {
	$('#name').val('');
	$('#priority').val('');
	$('#info').val('');
}

function renderTasksList(tasks) {
	$('.tasks').text('');
	
	(tasks || Object.values(objTasks)).forEach(item => {
		const block = $('<div class="task"></div>'),
			header = $('<h3></h3>').text(`Name task: ${item.name}`),
			info = $(`<p>${item.info}</p>`),
			row = $('<div class="row"></div>').attr('data-task', item.id),
			priority = createPriority(item.priority),
			state = createState(item.state),
			btn = $(`<input type="button" class="btn btn-sm btn-danger" value="Remove task">`);
		
		btn.click(clickRemove);
		row.append(state, btn, priority);
		block.append(header, info, row);
		$('.tasks').append(block);
	});
}

function createPriority(priority) {
	const item = $('<label>Priority: </label>'),
		select = $('<select><option value="ASAP">ASAP</option><option value="Important">Important</option><option value="Minor">Minor</option><option value="Blocker">Blocker</option></select>');
	
	select.val(priority);
	select.change(changePriority);
	item.append(select);
	return item;
}

function createState(state) {
	const item = $('<label>State: </label>'),
		select = $('<select><option value="TODO">TODO</option><option value="Done">Done</option><option value="In progress">In progress</option><option value="Removed">Removed</option></select>');
	
	select.val(state);
	select.change(changeState);
	item.append(select);
	return item;
}

function getUserStorage() {
	let userStory = JSON.parse(localStorage.getItem('objTask'));
	
	if(userStory){
		objTasks = userStory;
		renderTasksList();
	}
	
}

function renderLocalHosts() {
	localStorage.removeItem('objTask');
	localStorage.setItem('objTask', JSON.stringify(objTasks));
}

function clickRemove(e) {
	const taskId = parseInt($(e.target).parent().attr('data-task'));
	
	if(confirm(`Remove item ${objTasks[taskId].name}`)) {
		delete objTasks[taskId];
		renderLocalHosts();
		renderTasksList();
		renderFilters();
	}
}

function changeState(e) {
	const select = $(e.target),
		taskId = select.parent().parent().attr('data-task');
	
	if(objTasks[taskId]){
		objTasks[taskId].state = select.val();
	}
	
	renderLocalHosts();
	renderFilters();
}

function changePriority(e) {
	const select = $(e.target),
		taskId = select.parent().parent().attr('data-task');
	
	if(objTasks[taskId]){
		objTasks[taskId].priority = select.val();
	}
	
	renderLocalHosts();
	renderFilters();
}

function renderFilters() {
	const tasks = Object.values(objTasks);
	
	$('.btn-length-all').text(tasks.length);
	$('.all-task').click(function () { renderTasksList(tasks); });
	$('.btn-length-todo').text(filterByState(tasks, 'TODO').length);
	$('.todo-task').click(function () { renderTasksList(filterByState(tasks, 'TODO')); });
	$('.btn-length-done').text(filterByState(tasks, 'Done').length);
	$('.done-task').click(function () { renderTasksList(filterByState(tasks, 'Done')); });
	$('.btn-length-progress').text(filterByState(tasks, 'In progress').length);
	$('.progress-task').click(function () { renderTasksList(filterByState(tasks, 'In progress')); });
	$('.btn-length-removed').text(filterByState(tasks, 'Removed').length);
	$('.removed-task').click(function () { renderTasksList(filterByState(tasks, 'Removed')); });
}

function filterByState(list, state) { return list.filter(tasks => tasks.state === state) }

function vallidateValue(val, rexExp) {
	return val.match(rexExp)
}
