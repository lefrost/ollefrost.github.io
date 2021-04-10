/*
	note to self:
	instead of doing $('.chat-item').on('click', function() { ... })
	or whatever, i need to add a listener when i add the chat-item,
	ie. addListener(...) inside newMsg(...), for example
*/

$(window).on('load', function() {
	// Variables
	const DEFAULT_LOAD_TIME = 400;
	var logTemplate = '<div class="chat-item  log">';
	var msgTemplate = '<div class="chat-item  msg">';
	var msgLoadTemplate = '<div class="dot  active--"></div> <div class="dot"></div> <div class="dot"></div>';
	// var optionsTemplate = '<div class="chat-item  options">';
	// var optionTemplate = '<div class="option">';
	var endTemplate = "</div>";
	var $chat = $('.chat');

	// Actions on load
	newLog('smh someones here').then(() =>
	newMsg('sup', 0.4)).then(() =>
	newMsg('im ryan !', 0.6)).then(() =>
	newMsg('pick smth if ur curious', 0.8)).then(() =>
	newOptions(['who r u', 'whats this'], 'intro'));

	// Bind

	// function addListener(type, events) {
	// 	$(`.${type}`).bind(`${events.join(' ')}`, test);
	// }

	function test() {
		console.log('test');
	}

	// Log: newLog

	function newLog(log) {
		var logAdded = new Promise(function(resolve) {
			$chat.append(logTemplate + log + endTemplate);

			setTimeout(() => resolve(), DEFAULT_LOAD_TIME);
		});

		return logAdded;
	}

	// Msg: newMsg [loadMsg [handleDots -> removeDots]]

	function newMsg(msg, duration) {
		var msgLoadedAndAdded = new Promise(function(resolve) {
			var msgLoaded = loadMsg(duration);

			msgLoaded.then(function() {
				$chat.append(msgTemplate + msg + endTemplate);

				setTimeout(() => resolve(), DEFAULT_LOAD_TIME);
			});
		});

		return msgLoadedAndAdded;
	}

	function loadMsg(duration) {
		var dotsRunAndRemoved = new Promise (function(resolve) {
			var dotsRun = new Promise(function(resolve) {

				$chat.append(msgTemplate + msgLoadTemplate + endTemplate);
				handleDots();
				setTimeout(() => resolve(), duration * 1000);
			});

			dotsRun.then(function() {
				removeDots();
				resolve();
			});
		});

		return dotsRunAndRemoved;
	}

	function handleDots() {
		var $dots = $('.dot');
		var activeIndex = 1;

		setInterval(function() {
			if (activeIndex >= $dots.length) {
				activeIndex = 0;
			}

			$dots.removeClass('active--');
			$dots.eq(activeIndex).addClass('active--');

			activeIndex++;
		}, 200);
	}

	function removeDots() {
		$('.msg:last').remove();
	}

	// Options: newOptions

	function newOptions(options, optionSetName) {
		var optionsAdded = new Promise(function(resolve) {
			var optionsContent = '';
			var optionIndex = 1;

			$chat.append(getOptionsTemplate(optionSetName));

			var optionsAdded = new Promise(function(resolve) {
				options.forEach(function(option) {
					$chat.find('.options').last().append(getOptionTemplate(optionSetName, optionIndex) + option + endTemplate);
					handleOption(optionSetName, optionIndex);
					optionIndex++;
					if (optionIndex == options.length) {
						resolve();
					}
				});
			});

			setTimeout(() => resolve(), DEFAULT_LOAD_TIME);
		});

		return optionsAdded;
	}

	function getOptionsTemplate(optionSetName) {
		return `<div class="chat-item  options" data-options="${optionSetName}"></div>`;
	}

	function getOptionTemplate(optionSetName, optionIndex) {
		return `<div class="option" data-option="${optionSetName}" data-option-index="${optionIndex}">`;
	}

	function handleOption(optionSetName, optionIndex) {
		var $option = $(`[data-option="${optionSetName}"][data-option-index="${optionIndex}"]`);

		$option.on('click', function() {
			$option.off('click'); // so that you can't click the same option more than once

			switch (optionSetName) {
				case 'intro':
					switch (optionIndex) {
						case 1:
							newMsg('im lefrost online, maybe u recognise that name instead', 1.2).then(() =>
							newMsg('i make accs all over the place >>', 0.8)).then(() =>
							newLog('*ctrl-c cltr-v*')).then(() =>
							newMsg('wait im still working on this part', 1));
							break;
						case 2:
							newMsg('my website duh', 0.6).then(() =>
							newMsg('theres more stuff btw', 0.8)).then(() =>
							newLog('*drum roll*')).then(() =>
							newMsg('wait im still working on this part', 1));
							break;
					}
					break;
				default:
					console.log('That option set name is not recognised.');
			}
		});
	}
});