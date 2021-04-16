/*
	note to self:
	instead of doing $('.chat-item').on('click', function() { ... })
	or whatever, i need to add a listener when i add the chat-item,
	ie. addListener(...) inside newMsg(...), for example

	edit: active example in handleOption
*/

$(window).on('load', function() {
	// Variables
	const DEFAULT_LOAD_TIME = 400;
	// var logTemplate = '<div class="chat-item  log">';
	var msgTemplate = '<div class="chat-item  msg">';
	var msgLoadTemplate = '<div class="dot  active--"></div> <div class="dot"></div> <div class="dot"></div>';
	var endTemplate = "</div>";
	var $chat = $('.chat');

	// $('.box').draggable();

	// Actions on load
	chat([
		{ type: 'log', value: 'smh someones here' },
		{ type: 'msg', value: 'sup', duration: 0.4 },
		{ type: 'msg', value: 'im ryan ! ', duration: 0.6 },
		{ type: 'msg', value: 'pick smth if ur curious', duration: 0.8},
		{ type: 'options', options: ['who r u', 'whats this'], optionSet: 'intro'}
	]);

	// newBox('links', 'links', ['im active on <a href="#">anilist</a>', 'more links <a href="#">here</a>'])

	// Chat

	function chat(items, currentIndex) {
		if (!currentIndex) {
			currentIndex = 0;
		}

		var chatUpdated = new Promise(function(resolve) {
			var item = items[currentIndex];
			var itemAdded;

			switch (item.type) {
				case 'log':
					itemAdded = newLog(item.value);
					break;
				case 'msg':
					itemAdded = newMsg(item.value, item.duration);
					break;
				case 'options':
					itemAdded = newOptions(item.options, item.optionSet);
					break;
				case 'box':
					itemAdded = newBox(item.heading, item.texts, item.boxName);
					break;
				default:
					console.log(`Chat item type "${item.type}" isn't recognised.`);
			}

			itemAdded.then(function() {
				currentIndex++;
				resolve();
			});

		}).then(function() {
			if (currentIndex < items.length) {
				chat(items, currentIndex);
			}
		});

		return chatUpdated;
	}

	// Append
	// box: append({type: 'box', boxName: 'links', heading: 'links', texts: ['link <a>here</a>', 'another link <a>here</a>']})

	function append(item) {
		switch (item.type) {
			case 'log':
				$chat.append(getLogTemplate(item.value));
				break;
			case 'msg':
				$chat.append(getMsgTemplate(item.value));
				break;
			case 'box':
				$chat.append(getBoxTemplate(item.boxName));
				$('.box').last().append(getHeadingTemplate(item.heading));

				item.texts.forEach(function(text) {
					$('.box').last().append(getTextTemplate(text));
					$('.box  a').last().addClass('link');
				});

				// $('.box').draggable(); // - current issue, draggable() is bugging out
				break;
			default:
				console.log(`Chat item type "${item.type} isn't recognised.`);
		}
	}

	function getLogTemplate(log) {
		return `<div class="chat-item  log">${log}</div>`;
	}

	function getMsgTemplate(msg) {
		return `<div class="chat-item  msg">${msg}</div>`;
	}

	function getBoxTemplate(boxName) {
		return `<div class="box" data-box="${boxName}"></div>`;
	}

	function getHeadingTemplate(heading) {
		return `<div class="heading">${heading}</div>`;
	}

	function getTextTemplate(text) {
		return `<div class="text">${text}</div>`;
	}

	// Box

	function newBox(boxName, heading, texts) {
		var boxAdded = new Promise(function(resolve) {
			append({
				type: 'box',
				boxName: boxName,
				heading: heading,
				texts: texts
			});

			setTimeout(() => resolve(), DEFAULT_LOAD_TIME);
		});

		return boxAdded;
	}

	// Log: newLog

	function newLog(log) {
		var logAdded = new Promise(function(resolve) {
			append({
				type: 'log',
				value: log
			});

			setTimeout(() => resolve(), DEFAULT_LOAD_TIME);
		});

		return logAdded;
	}

	// Msg: newMsg [loadMsg [handleDots -> removeDots]]

	function newMsg(msg, duration) {
		var msgLoadedAndAdded = new Promise(function(resolve) {
			var msgLoaded = loadMsg(duration);

			msgLoaded.then(function() {
				append({
					type: 'msg',
					value: msg
				});

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
							chat([
								{ type: 'msg', value: 'im lefrost online, maybe u recognise that name instead', duration: 1.2 },
								{ type: 'msg', value: 'i make accs all over the place >>', duration: 0.8 },
								{ type: 'log', value: '*ctrl-c ctrl-v*'},
								{ type: 'msg', value: 'wait im still working on this part', duration: 1}
							]);
							break;
						case 2:
							chat([
								{ type: 'msg', value: 'my website duh', duration: 0.6 },
								{ type: 'msg', value: 'theres more stuff btw', duration: 0.8 },
								{ type: 'log', value: '*drum roll*'},
								{ type: 'msg', value: 'wait im still working on this part', duration: 1}
							]);
							break;
					}
					break;
				default:
					console.log('That option set name is not recognised.');
			}
		});
	}
});