(function() {
	var form = document.querySelector('[data-contact-form]');

	if (!form)
		return;

	form.addEventListener('submit', function(event) {
		var data = new FormData(form);
		var decode = function(values) {
			return values.map(function(value) {
				return String.fromCharCode(value);
			}).join('');
		};
		var recipient = decode([105, 116, 109, 115, 112]) + String.fromCharCode(64) + decode([106, 117, 105, 99, 121, 115, 101, 114, 118, 101, 114]) + '.' + decode([99, 111, 109]);
		var protocol = decode([109, 97, 105, 108, 116, 111, 58]);
		var subject = data.get('Subject') || 'IT Services Inquiry';
		var body = [
			'Name: ' + (data.get('Name') || ''),
			'Email: ' + (data.get('Email') || ''),
			'Company: ' + (data.get('Company') || ''),
			'',
			'Message:',
			data.get('Message') || ''
		].join('\n');

		event.preventDefault();
		window.location.href = protocol + recipient + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
	});
})();
