function getAjax() {
	$.ajax({
		type: 'GET',
		url: 'ajax.json',
	}).done((item) => { console.log('Data Saved:', item)
	}).fail( (item) => { console.log('Error:', item) } );
}

function startWebSockets() { testWebS() }

function testWebS() {
	webS = new WebSocket(wsUri);
	webS.onopen = (e) => { openWebSocket(e) };
	webS.onclose = (e) => { console.log('Close webSocket') };
	webS.onmessage = (e) => { messWebSocket(e) };
	webS.onerror = (e) => { errWebSocket(e) }
}

function closeWebSocket() { webS.close() }

function messWebSocket(e) { console.log('Responsive', e.data) }

function errWebSocket() { console.error('Errors webSocket') }

function openWebSocket() {
	console.log("Connected:", webS.url);
	doSend("WebSocket rocks");
}

function doSend(mes) {
	console.log(`Sent: ${mes}`);
	webS.send(mes);
}




