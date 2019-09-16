// "use strict";
(function ($) {
	var defaults = {
		//******************************* Общие настройки  *******************************

		//** Включить форму обратного звонка? true|false
		callForm: true,

		//** Включить форму c отправкой сообщения? true|false
		requestForm: true,

		//** Включить форму c контактами? true|false !!! - пока недоступно
		//** contactForm: false,

		//** Расположение кнопок: smartlid_left | smartlid_right
		position: ' smartlid_right',

		//** Отключить пульсирующие кнопки и оставить вызов модального окна только своими ссылками smartlid_visible | smartlid_hidden
		isSmartlidVisible: 'smartlid_visible',

		//** Отслеживание заполнение формы в целях Яндекс Метрики.
		// XXXXXX - код счеткичка в Метрике
		// SMARTLID - ID цели

		counter: function () {
			yaCounter40976409.reachGoal('SMARTLID');
		},

		//** Стиливое оформление формы 'dark-space', вскоре появятся и другие цвета
		styleForm: ' dark-space',

		//** Иконка главной кнопки, которая вызывает другие кнопки
		navBtnIcon: '<img src="/smartlid/img/line-menu.svg" height="18" width="18" alt="">',

		//** Иконка кнопки, которая вызывает модальное окно с формой обратного звонка
		callFormBtnIcon: '<img src="/smartlid/img/phone.svg" height="18" width="18" alt="">',

		//** Иконка кнопки, которая вызывает модальное окно с формой отправки сообщения
		requestFormBtnIcon: '<img src="/smartlid/img/envelope.svg" height="18" width="18" alt="">',

		//** Placeholder для полей
		placeholderName: 'Введите ваше имя',
		placeholderPhone: 'Введите ваш телефон',
		placeholderMail: 'Введите ваш email',
		placeholderText: 'Введите ваше сообщение',

		//** Checkbox согласия с разрешением на обработку персональных данных true|false
		agreement: true,

		//** Должен ли быть отмечен checkbox с разрешением на обработку персональных данных по умолчанию? true|false
		agreementIsActive: true,

		//** ССылка на лицензионное соглашение
		agreementLink: '#',

		//******************************* Настройка автооткрытие формы *******************************

		//** autoOpenForm - выбор формы для автооткрытия:

		//--- 'callForm' - автооткрытие формы обратного звонка
		//--- 'requestForm' - автооткрытие формы c отправкой сообщения
		//--- false - выключить автооткрытие | без ковычек

		autoOpenForm: false,

		//** Время, через которое откроется модальое окно с формой, после загрузки страницы (в милличекундах). Минимум 3 секунды.
		autoOpenTime: '9000',


		//** Время (в часах), сколько окно не будет показываться, после первого показа или самостоятельного открытия окна пользователем.
		autoOpenPeriodicity: '1',

		//******************************* Настройка формы обратного звонка *******************************

		//** Заголовок формы
		callFormTitle: 'Оставьте ваш номер телефона, и наш консультант свяжется с вами',

		//** Текст кнопки отправляющей форму
		buttonTextCallForm: 'Отправить',

		//** Картинка в модальном окне
		callFormIcon: '/smartlid/img/call.svg',

		//** Включить поле с отправкой файла? true | false
		callFormAddFile: true,


		//******************************* Настройка формы с возможностью отправить сообщение *******************************

		//** Заголовок формы
		requestFormTitle: 'Оставьте сообщение, и наш консультант свяжется с вами',

		//** Текст кнопки отправляющей форму
		buttonTextRequestForm: 'Отправить',

		//** Картинка в модальном окне с формой отправки заявки
		requestFormIcon: '/smartlid/img/mail.svg',

		//** Включить поле с отправкой файла? true | false
		requestFormAddFile: true,

		//** Включить поле с вводом телефона? true | false
		requestFormTelInput: true,

		//******************************* Недоступные для визуального редактора настройки *******************************

		//** Сообщение при заполнении не всех обязательных полей
		attantion: '<p class="smartlid__respond-fail">Внимание! Вы заполнили не все обязательные поля</p>',

		//** Сообщение при ошибке отправки файла
		failfile: '<p class="smartlid__respond-fail">Ошибка отправки файла, попробуйте еще раз</p>',

		//** Сообщение при успешной отправке сообщения
		successmsgs: '<p class="smartlid__respond-success">Спасибо за обращение. Сообщение успешно отправлено</p>',

		//** Сообщение при неудачной отправке письма
		failmsgs: '<p class="smartlid__respond-fail">Сообщение не отправлено, попробуйте еще раз</p>',

		//** Текст ссылки лицензионного соглашения
		agreementText: 'Я <span class="toggle--on">принимаю</span><span class="toggle--off">не принимаю</span> условия пользовательского соглашения',

		//** Время указывающее за сколько до появления модального окна проверяется наличе метки в LS
		checkLocalStorageTime: '1000',

		//** Определение источника перехода
		referrer: document.referrer,
	};
	var methods = {

		init: function (options) {
			var settings = $.extend(defaults, options);
			methods.setRef();
			return this.each(function () {
				$(this).append(methods.showButtons());
			});
		},

		setRef: function () {
			if ((defaults.referrer).length) {
				var ref = new URL(defaults.referrer);
				if (location.host !== ref.host) {
					localStorage.setItem('userRef', ref.host);
				}
			} else {
				localStorage.setItem('userRef', 'Не удалось определить источник перехода на сайт');
			}
		},

		createButtons: function () {

			let smartLid = $('<div>').attr({
				class: 'smartlid' + defaults.position + ' ' + defaults.isSmartlidVisible,
			});

			let smartLidRounds = $('<span>').attr({
				class: 'smartlid__rings'
			});

			if (defaults.callForm && !defaults.requestForm && !defaults.contactForm) {

				let smartLidNavButton = $('<button>').attr({
					class: 'smartlid__call-button',
				}).html(defaults.callFormBtnIcon);

				smartLidNavButton.click(function () {
					methods.showModal(methods.createCallForm().attr('class'));
					$(this).attr("disabled", "disabled");
					setTimeout(() => {
						$(this).attr("disabled", false);
					}, 3000);
				});

				smartLid.append(smartLidNavButton.append(smartLidRounds).append(smartLidRounds.clone()).append(smartLidRounds.clone()));

			} else if (!defaults.callForm && defaults.requestForm && !defaults.contactForm) {
				console.log('defaults.requestForm');

				var smartLidNavButton = $('<button>').attr({
					class: 'smartlid__request-button',
				}).html(defaults.requestFormBtnIcon);

				smartLidNavButton.click(function () {
					methods.showModal(methods.createRequestForm().attr('class'));
					$(this).attr("disabled", "disabled");
					setTimeout(() => {
						$(this).attr("disabled", false);
					}, 3000);
				});

				smartLid.append(smartLidNavButton.append(smartLidRounds).append(smartLidRounds.clone()).append(smartLidRounds.clone()));

			} else if (!defaults.callForm && !defaults.requestForm && defaults.contactForm) {
				console.log('defaults.contactForm');
			} else {

				let smartLidNavButton = $('<button>').attr({
					class: 'smartlid__nav-button',
				}).html(defaults.navBtnIcon);

				let smartLidModalButtons = $('<div>').attr({
					class: 'smartlid__modal-buttons smartlid__modal-buttons_hidden'
				});

				if (defaults.callForm) {
					let smartLidCallButton = $('<button>');
					smartLidCallButton.attr({
						class: 'smartlid__call-button',
					}).html(defaults.callFormBtnIcon);
					smartLidModalButtons.append(smartLidCallButton);

					smartLidCallButton.click(function () {
						methods.showModal(methods.createCallForm().attr('class'));
						$(this).attr("disabled", "disabled");
						setTimeout(() => {
							$(this).attr("disabled", false);
						}, 3000);
					});
				}

				if (defaults.requestForm) {
					let smartLidRequestButton = $('<button>');
					smartLidModalButtons.append(smartLidRequestButton);
					smartLidRequestButton.attr({
						class: 'smartlid__request-button',
					}).html(defaults.requestFormBtnIcon);

					smartLidRequestButton.click(function () {
						methods.showModal(methods.createRequestForm().attr('class'));
						$(this).attr("disabled", "disabled");
						setTimeout(() => {
							$(this).attr("disabled", false);
						}, 3000);
					});
				}

				smartLidNavButton.click(function () {
					smartLidModalButtons.toggleClass("smartlid__modal-buttons_open");
					smartLidModalButtons.toggleClass("smartlid__modal-buttons_hidden");
				});

				smartLidRounds.appendTo(smartLidNavButton);
				smartLidRounds.clone().appendTo(smartLidNavButton);
				smartLidRounds.clone().appendTo(smartLidNavButton);


				setTimeout(() => {
					smartLid.append(smartLidNavButton).append(smartLidModalButtons);
				}, 500);
			}

			if (defaults.callForm) {
				$('.smartlid__call-button_custom').click(function () {
					methods.showModal(methods.createCallForm().attr('class'));
					$(this).attr("disabled", "disabled");
					setTimeout(() => {
						$(this).attr("disabled", false);
					}, 3000);
				});
			}

			if (defaults.requestForm) {
				$('.smartlid__request-button_custom').click(function () {
					methods.showModal(methods.createRequestForm().attr('class'));
					$(this).attr("disabled", "disabled");
					setTimeout(() => {
						$(this).attr("disabled", false);
					}, 3000);
				});
			}

			function isNumber(n) {
				return !isNaN(parseFloat(n)) && isFinite(n);
			}
			if(isNumber(defaults.autoOpenPeriodicity) && defaults.autoOpenForm) {
				let  limit, localStorageInitTime, getStateTime;
				if(defaults.autoOpenTime > 3000){
					getStateTime = defaults.autoOpenTime - defaults.checkLocalStorageTime;
				} else {
					getStateTime = 2000;
				}

				setTimeout(() => {
					limit = defaults.autoOpenPeriodicity * 3600 * 1000;
					localStorageInitTime = localStorage.getItem('sLlocalStorageInitTime');

					if (localStorageInitTime === null) {
						localStorage.setItem('sLlocalStorageInitTime', +new Date());
						methods.autoOpenModal(defaults.checkLocalStorageTime);
					} else if(+new Date() - localStorageInitTime > limit){
						localStorage.clear();
						localStorage.setItem('localStorageInitTime', +new Date());
						methods.autoOpenModal(defaults.checkLocalStorageTime);
					}
				}, getStateTime);
			}

			return smartLid;
		},

		createModal: function (params) {

			let smartLidModal = $('<div>').attr({
				class: 'smartlid__modal' + defaults.styleForm,
			});

			if (params == methods.createCallForm().attr('class')) {
				setTimeout(function () {
					smartLidModal.fadeIn(function () {
						$(this).append(methods.createCallForm().addClass('smartlid__form_open').append(methods.closeModal(smartLidModal)));
					});
				}, 500);
			}

			setTimeout(() => {
				smartLidModal.addClass('smartlid__modal_open');
			}, 1000);

			if (params == methods.createRequestForm().attr('class')) {
				setTimeout(function () {
					smartLidModal.fadeIn(function () {
						$(this).append(methods.createRequestForm().addClass('smartlid__form_open').append(methods.closeModal(smartLidModal)));
					});
				}, 500);
			}

			return smartLidModal;
		},

		closeModal: function (smartLidModal) {

			let smartLidCloseButton = $('<button>').attr({
				class: 'smartlid__close-button',
			}).html('×');

			smartLidCloseButton.click(function (event) {
				event.preventDefault();
				smartLidModal.fadeOut(function () {
					$(this).remove();
				});
				// $('.smartlid__call-button').attr("disabled", false);
			});

			$(smartLidModal).mouseup(function (e) {
				var div = $(".smartlid__form");
				if (!div.is(e.target) &&
					div.has(e.target).length === 0) {
					smartLidModal.fadeOut(function () {
						$(this).remove();
					});
				}
			});

			return smartLidCloseButton;
		},

		initLocalStorage: function() {
			if(defaults.autoOpenForm) {
				let  limit = defaults.autoOpenPeriodicity * 3600 * 1000;
				let localStorageInitTime = localStorage.getItem('sLlocalStorageInitTime');
					if (localStorageInitTime === null) {
						localStorage.setItem('sLlocalStorageInitTime', +new Date());
					} else if(+new Date() - localStorageInitTime > limit){
				localStorage.clear();
				localStorage.setItem('localStorageInitTime', +new Date());
			}
			}
			
		},

		autoOpenModal: function (openTime) {
			if(defaults.callForm && defaults.autoOpenForm === 'callForm') {
				setTimeout(() => {
					methods.showModal(methods.createCallForm().attr('class'));
				}, openTime);
			}
			if(defaults.requestForm && defaults.autoOpenForm === 'requestForm') {
				setTimeout(() => {
					methods.showModal(methods.createRequestForm().attr('class'));
				},  openTime);
			}
		},

		createCallForm: function () {
			let callForm = $('<form>').attr({
				class: 'smartlid__form smartlid__form_call',
				method: 'POST',
				id: 'callForm',
				autocomplete: 'off',
				enctype: 'multipart/form-data',
			});

			let formImages = $('<img>').attr({
				class: 'smartlid__form-icon',
				alt: 'Обратный звонок',
				src: defaults.callFormIcon,
				width: 100,
			});

			let formTitle = $('<div>').attr({
				class: 'smartlid__form-title'
			})
				.append($('<p>').attr({
					class: 'smartlid__default-msgs'
				}).html(defaults.callFormTitle))
				.append($('<div>').attr({
					class: 'smartlid__respond-msgs'
				}))
				.append($('<div>').attr({
					class: 'smartlid__preloader'
				}));

			let inpName = $('<input>').attr({
				class: 'smartlid__input smartlid__input_name',
				type: 'text',
				name: 'name',
				placeholder: defaults.placeholderName,
			});

			let inpTel = $('<input>').attr({
				class: 'smartlid__input smartlid__input_tel',
				type: 'tel',
				name: 'tel',
				placeholder: defaults.placeholderPhone,
			});

			let inpRef = $('<input>').attr({
				class: 'smartlid__input smartlid__input_ref',
				type: 'hidden',
				name: 'ref',
				value: localStorage.getItem('userRef'),
			});


			if (defaults.agreement) {
				var checkboxWrapper = $('<div>').attr({
					class: 'smartlid__checkbox-wrapper'
				});

				var inpCheckbox = $('<input>').attr({
					class: 'smartlid__checkbox smartlid__checkbox_agreement',
					type: 'checkbox',
					name: 'agreement',
					id: 'smartlid__checkbox_agreement',
					value: 'Принимаю',
					checked: defaults.agreementIsActive,
				});

				let inputCheckboxLabel = $('<label>').attr({
					for: 'smartlid__checkbox_agreement',
					class: 'smartlid__label smartlid__label_agreement'
				});

				let checkboxLink = $('<a>').attr({
					class: 'agreement-link',
					href: defaults.agreementLink,
					target: '_blank'

				}).html(defaults.agreementText);

				checkboxWrapper.append(inpCheckbox).append(inputCheckboxLabel.append(checkboxLink));
			}

			if (defaults.callFormAddFile) {
				var fileWrapper = $('<div>').attr({
					class: 'smartlid__file-wrapper'
				});
				var fileName = $('<input>').attr({
					class: 'smartlid__input smartlid__file-name',
					placeholder: 'Прикрепить файл',
					disabled: 'disabled',
				});
				let inputFileLabel = $('<label>').attr({
					for: 'smartlid__input_file',
					class: 'smartlid__label smartlid__label_file'
				}).html('Выбрать');

				let inpFile = $('<input>').attr({
					class: 'smartlid__input smartlid__input_file',
					type: 'file',
					name: 'files[]',
					id: 'smartlid__input_file'
				}).change(function () {
					fileName.val($(this).val().replace(/.*\\/, ""));
				});
				fileWrapper.append(fileName).append(inputFileLabel).append(inpFile);
			}

			let formButton = $('<button>').attr({
				class: 'smartlid__form-button',
				type: 'submit',
				name: 'sendingForm'
			}).html(defaults.buttonTextCallForm);

			formButton.click(function (event) {
				event.preventDefault();
				if (defaults.agreement) {
					if (inpCheckbox.is(":checked")) {
						methods.sendMail($(callForm).attr('id'));
					} else {
						formTitle.find('.smartlid__default-msgs').css('display', 'none');
						formTitle.find('.smartlid__respond-msgs').html('<p class="smartlid__respond-fail">Вы не приняли условия пользовательского соглашения</p>');
						setTimeout(() => {
							formTitle.find('.smartlid__default-msgs').css('display', 'block');
							formTitle.find('.smartlid__respond-msgs').html('');
						}, 4000);
					}
				} else {
					methods.sendMail($(callForm).attr('id'));
				}

			});

			callForm.append(formImages).append(formTitle).append(inpName).append(inpTel).append(inpRef).append(fileWrapper).append(checkboxWrapper).append(formButton);

			return callForm;
		},

		createRequestForm: function () {
			let requestForm = $('<form>').attr({
				class: 'smartlid__form smartlid__form_request',
				method: 'POST',
				id: 'requestForm',
				autocomplete: 'off',
				enctype: 'multipart/form-data'
			});

			let formImages = $('<img>').attr({
				class: 'smartlid__form-icon',
				alt: 'Форма обратной связи',
				src: defaults.requestFormIcon,
				width: 100,
			});

			let formTitle = $('<div>').attr({
				class: 'smartlid__form-title'
			})
				.append($('<p>').attr({
					class: 'smartlid__default-msgs'
				}).html(defaults.requestFormTitle))
				.append($('<div>').attr({
					class: 'smartlid__respond-msgs'
				}))
				.append($('<div>').attr({
					class: 'smartlid__preloader'
				}));

			let inpName = $('<input>').attr({
				class: 'smartlid__input smartlid__input_name',
				type: 'text',
				name: 'name',
				placeholder: defaults.placeholderName,
			});
			if (defaults.requestFormTelInput) {
				var inpTel = $('<input>').attr({
					class: 'smartlid__input smartlid__input_tel',
					type: 'tel',
					name: 'tel',
					placeholder: defaults.placeholderPhone,
				});
			}


			let inpMail = $('<input>').attr({
				class: 'smartlid__input smartlid__input_mail',
				type: 'email',
				name: 'email',
				placeholder: defaults.placeholderMail,
			});

			let inpText = $('<textarea>').attr({
				class: 'smartlid__input smartlid__input_text',
				placeholder: defaults.placeholderText,
				name: 'text'
			});

			let inpRef = $('<input>').attr({
				class: 'smartlid__input smartlid__input_ref',
				type: 'hidden',
				name: 'ref',
				value: localStorage.getItem('userRef'),
			});

			if (defaults.agreement) {
				var checkboxWrapper = $('<div>').attr({
					class: 'smartlid__checkbox-wrapper'
				});

				var inpCheckbox = $('<input>').attr({
					class: 'smartlid__checkbox smartlid__checkbox_agreement',
					type: 'checkbox',
					name: 'agreement',
					value: 'Принимаю',
					id: 'smartlid__checkbox_agreement',
					checked: defaults.agreementIsActive,
				});

				let inputCheckboxLabel = $('<label>').attr({
					for: 'smartlid__checkbox_agreement',
					class: 'smartlid__label smartlid__label_agreement'
				});

				let checkboxLink = $('<a>').attr({
					class: 'agreement-link',
					href: defaults.agreementLink,
					target: '_blank'

				}).html(defaults.agreementText);

				checkboxWrapper.append(inpCheckbox).append(inputCheckboxLabel.append(checkboxLink));
			}

			if (defaults.requestFormAddFile) {
				var fileWrapper = $('<div>').attr({
					class: 'smartlid__file-wrapper'
				});
				var fileName = $('<input>').attr({
					class: 'smartlid__input smartlid__file-name',
					placeholder: 'Прикрепить файл',
					disabled: 'disabled',
				});
				let inputFileLabel = $('<label>').attr({
					for: 'smartlid__input_file',
					class: 'smartlid__label smartlid__label_file'
				}).html('Выбрать');

				let inpFile = $('<input>').attr({
					class: 'smartlid__input smartlid__input_file',
					type: 'file',
					name: 'files[]',
					id: 'smartlid__input_file'
				}).change(function () {
					fileName.val($(this).val().replace(/.*\\/, ""));
				});
				fileWrapper.append(fileName).append(inputFileLabel).append(inpFile);
			}


			let formButton = $('<button>').attr({
				class: 'smartlid__form-button',
				type: 'submit',
				name: 'sendingForm'
			}).html(defaults.buttonTextRequestForm);

			formButton.click(function (event) {
				event.preventDefault();
				if (defaults.agreement) {
					if (inpCheckbox.is(":checked")) {
						methods.sendMail($(requestForm).attr('id'));
					} else {
						formTitle.find('.smartlid__default-msgs').css('display', 'none');
						formTitle.find('.smartlid__respond-msgs').html('<p class="smartlid__respond-fail">Вы не приняли условия пользовательского соглашения</p>');
						setTimeout(() => {
							formTitle.find('.smartlid__default-msgs').css('display', 'block');
							formTitle.find('.smartlid__respond-msgs').html('');
						}, 4000);
					}
				} else {
					methods.sendMail($(requestForm).attr('id'));
				}

			});

			requestForm.append(formImages).append(formTitle).append(inpName).append(inpTel).append(inpMail).append(inpRef).append(fileWrapper).append(inpText).append(checkboxWrapper).append(formButton);

			return requestForm;
		},

		sendMail: function (formid) {
			var formId = "#" + formid;
			var fd = new FormData(document.querySelector(formId));
			$.ajax({
				url: "/smartlid/php/smartlid.php",
				type: "POST",
				data: fd,
				processData: false,
				contentType: false,
				beforeSend: function () {

					$(formId).find('.smartlid__preloader').css('display', 'block');
					$(formId).find('.smartlid__default-msgs').css('display', 'none');
					$(formId).find('.smartlid__form-button').prop('disabled', true);
					$(formId).find('.smartlid__respond-msgs').html('Отправка письма');
				},
				success: function (data) {
					$(formId).find('.smartlid__preloader').css('display', 'none');
					switch (data) {
						case 'attantion':
							$(formId).find('.smartlid__respond-msgs').html('').append(defaults.attantion);
							break;
						case 'successmsgs':
							$(formId).find('.smartlid__respond-msgs').html('').append(defaults.successmsgs);
							break;
						case 'failmsgs':
							$(formId).find('.smartlid__respond-msgs').html('').append(defaults.failmsgs);
							break;
						case 'failfile':
							$(formId).find('.smartlid__respond-msgs').html('').append(defaults.failfile);
							break;
					}

					setTimeout(() => {
						$(formId).find('.smartlid__default-msgs').css('display', 'block');
						$(formId).find('.smartlid__respond-msgs').html('');
						$(formId).find('.smartlid__form-button').prop("disabled", false);

					}, 4000);

				},
				complete: function (data) {
					if (data.responseText == 'successmsgs') {
						$(formId).find($('input').not(':input[type=hidden]')).val('');
						$(formId).find($('textarea').val(''));
					}
					defaults.counter();
				},

			});
		},

		showModal: function (formClass) {
			methods.initLocalStorage();
			return $('body').append(methods.createModal(formClass));
		},

		showButtons: function () {

			return methods.createButtons();
		},
	};
	$.fn.smartLid = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Метод ' + method + ' не найден');
		}
	};
}(jQuery));