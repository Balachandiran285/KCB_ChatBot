angular
	.module('chatBotApp.services', [])
	.factory(
		'botURL',
		[
			'$rootScope',
			'$http',
			'Constants',
			'Value',
			function ($rootScope, $http, Constants, Value) { // $compile,


				var _botURLCall = function (userText, messageType,
					msgid) {

					// var botInterface = "/BotInterface/handler";
					// var botInterface ="/BotProxy/basebot"
					var botInterface = "/BaseBot/requesthandler";

					if (validateEmpty(msgid)) {
						msgid = "";
					}

					var context = {
						"botname": Value.config.configChatBotName,
						"channeltype": Constants.CHANNEL_TYPE,
						"contextid": (Value.config.channelid)
							.toString(),
						"contexttype": Constants.CONTEXT_TYPE
					}

					var message = {
						"referralParam": "",
						"text": (userText).toString(),
						"type": messageType,
						"refmsgid": msgid
					}

					var sender = {
						"channelid": (Value.config.channelid)
							.toString(),
						"channeltype": Constants.CHANNEL_TYPE,
						"display": Constants.DISPLAY,
						"subdisplay": Constants.SUBDISPLAY
					}

					var configData = {
						"lat": (Value.lat).toString(),
						"lon": (Value.lang).toString(),
						"ipaddress": $rootScope.getclientIp(),
						"profanity": Value.config.profainityValue
					}

					var contextobj = JSON.stringify(context);
					var messageobj = JSON.stringify(message);
					var senderobj = JSON.stringify(sender);
					var configObj = JSON.stringify(configData);


					var encryptUrl = encryptText("botname="
						+ Value.config.configChatBotName
						+ "&contextobj="
						+ encodeURIComponent(contextobj)
						+ "&messageobj="
						+ encodeURIComponent(messageobj)
						+ "&senderobj="
						+ encodeURIComponent(senderobj)
						+ "&configobj="
						+ encodeURIComponent(configObj),
						"rmga@2018");

					var url = $rootScope.ipURL + botInterface + "?"
						+ encryptUrl;

					consoleWrite(Constants.DISPLAY_CONSOLE,
						"HTTP Request Call: " + url);
					return url;
				}



				var _renderHTMLPara = function (msgTypeHTML,
					featureHTML, id, type) {
					var element = document.getElementById("myRange");
					//				            	element.classList.add("mystyle");
					// set default id for bot
					var msgIdAuth = localStorage.getItem("MSGID");

					console.log("msgIdAuth :" + msgIdAuth)
					console.log("id :" + id)
					if (typeof id == 'undefined') {
						id = "bot" + Value.config.botMsgId;
					}
					// add stop voice function if audio is on
					/*if (Value.isRecordingOn) {
						var divMsg = '<div   ng-click="stopTTS()" id="bot" >';
					} else {
						var divMsg = '<div   id="bot" >';
					}*/
					if (validateEmpty(featureHTML)) {
						featureHTML = "";
					}
					if (id == "greeting") {

						var html = divMsg + '<div class="chat-help help-text">' +
							'<h5>Hi, I am Canara Help!</h5>' +
							'<p>' + msgTypeHTML + '</p>' +
							'</div></div>'

					} else {

						/*	var html ='<div class="chatting lefty chatfade" id="'+ id+ '">'+
							'<div class="chat-container chatfade">'+
								'<span class="emo"><img src="assets/images/icons/hii.gif"><p>'+msgTypeHTML+'</p></span>'+	
							'</div>'
							 +'<span class="time-right fadein">'+ getTimeIn12() +'</span>'+
							'</div>';*/
						$('.slidecontainer').addClass('active')

						var html = '<div class="chatting lefty 2 chatfade" id="' + id + '">'
						if (type == "slider") {
							html += '<div class="chat-container slider-container">'

						} else {
							html += '<div class="chat-container">'
						}


						html += '<p>' + msgTypeHTML + '</p>' +
							'</div>' +
							'<span class="time-right fadein">' + getTimeIn12() + '</span>' +
							'</div>';

					}



					return html;
				}

				var _renderHTMLParaloding = function (msgTypeHTML,
					featureHTML, id) {

					// set default id for bot
					var msgIdAuth = localStorage.getItem("MSGID");


					if (typeof id == 'undefined') {
						id = "bot" + Value.config.botMsgId;
					}
					// add stop voice function if audio is on
					/*if (Value.isRecordingOn) {
						var divMsg = '<div   ng-click="stopTTS()" id="bot" >';
					} else {
						var divMsg = '<div   id="bot" >';
					}*/
					if (validateEmpty(featureHTML)) {
						featureHTML = "";
					}
					if (id == "greeting") {

						var html = divMsg + '<div class="chat-help help-text">' +
							'<h5>Hi, I am Canara Help!</h5>' +
							'<p>' + msgTypeHTML + '</p>' +
							'</div></div>'

					} else {

						/*	var html ='<div class="chatting righty colored" id="'+ id+ '">'+
							'<div class="chat-container">'+
								'<p>'+msgTypeHTML+'</p>'+	
							'</div>'
							 +'<span class="time-right fadein">'+ getTimeIn12() +'</span>'+
							'</div>';*/

						var html = '<div class="chatting lefty chatfade" id="' + id + '">' +
							'<div class="chat-container">' +
							'<p>' + msgTypeHTML + '</p>' +
							'</div>' +
							'<span class="time-right fadein">' + getTimeIn12() + '</span>' +
							'</div>';

					}



					return html;
				}

				var _renderHTMLParalodingtypeing = function (msgTypeHTML,
					featureHTML, id) {

					// set default id for bot
					var msgIdAuth = localStorage.getItem("MSGID");


					if (typeof id == 'undefined') {
						id = "bot" + Value.config.botMsgId;
					}
					// add stop voice function if audio is on
					/*if (Value.isRecordingOn) {
						var divMsg = '<div   ng-click="stopTTS()" id="bot" >';
					} else {
						var divMsg = '<div   id="bot" >';
					}*/
					if (validateEmpty(featureHTML)) {
						featureHTML = "";
					}
					if (id == "greeting") {

						var html = divMsg + '<div class="chat-help help-text">' +
							'<h5>Hi, I am Canara Help!</h5>' +
							'<p>' + msgTypeHTML + '</p>' +
							'</div></div>'

					} else {

						var html = '<div class="chatting lefty sazz chatfade" id="' + id + '">' +
							'<div class="chat-container">' +
							'<p>' + msgTypeHTML + '</p>' +
							'</div>' +
							'<span class="time-right fadein">' + getTimeIn12() + '</span>' +
							'</div>';

					}



					return html;
				}


				var _errorMgsShown = function (msgTypeHTML, flage, featureHTML, id) {

					if (typeof id == 'undefined') {
						id = "bot" + Value.config.botMsgId;
					}
					// add stop voice function if audio is on
					if (Value.isRecordingOn) {

						var divMsg = '<div class="message-text-wraper"  ng-click="stopTTS()" id="bot" >';
					} else {

						var divMsg = '<div  class="message-text-wraper"  id="bot" >';
					}
					if (validateEmpty(featureHTML)) {
						featureHTML = "";
					}

					if (validateEmpty(msgTypeHTML)) {
						var html = '<div class="chatbot-message" id="'
							+ id
							+ '">'
							+ '<img src="'
							+ Value.config.botIconImage
							+ '" alt="" class="bot-icon"/>'
							+

							featureHTML
							+ '<div class="message-time time">'
							+
							startTime() + getTimeIn12()
							+ "&nbsp;&nbsp;&nbsp;"
							+ getDate()
							+ '</div>' + '</div>';
					} else {
						/*if (msgTypeHTML.length >= Constants.textLengthDisplay) {
							
							msgTypeHTML = '<div class="small">'
									+ msgTypeHTML
									+ "</div>"
									+ '<a href="javascript:void(0)" class="test menuTextToggle menuTextActive">more...</a>'
									+ '<a href="javascript:void(0)" class="test menuTextToggle ">less...</a>';

						} else {
							msgTypeHTML = '<div>' + msgTypeHTML
									+ '</div>';
						}*/
						msgTypeHTML = '<div>' + msgTypeHTML + '</div>';
						var html = '<div class="chatbot-message" id="'
							+ id
							+ '">'
							+ '<img src="'
							+ Value.config.botIconImage
							+ '" alt="" class="bot-icon"/>'
							+ divMsg
							+ msgTypeHTML
							+ '</div>'
							+ '<div class="message-time time">'
							+
							startTime() + getTimeIn12()
							+ "&nbsp;&nbsp;&nbsp;"
							+ getDate()
							+ '</div>' +

							featureHTML +

							'</div>';
					}

					return html;

				}

				var _renderErrorMessage = function (responseTxt,
					flage) {
					// var myElements =
					// angular.element(document.querySelector('.messages-wrap'));
					var html = _errorMgsShown(responseTxt, flage);

					// myElements.append(html);

					return html;
				}




				var _renderHTMLParaListView = function (msgTypeHTML,
					content, msgid, featureHTML, id) {
					// set default id for bot

					var titleText, titleType, msgType, mainListvieDiv, mainListview;

					var questTxt = '';
					var optionsHtml = "";
					var titleText = "";
					var titleSubject = "";

					if (typeof id == 'undefined') {
						id = "bot" + Value.config.botMsgId;
					}
					// add stop voice function if audio is on
					if (Value.isRecordingOn) {
						var divMsg = '<div class="message-text-wraper" ng-click="stopTTS()"><div>'
							+ content + '</div>';
					} else {
						var divMsg = '<div  class="message-text-wraper" id="bot" ><div>'
							+ content + '</div>';
					}
					if (validateEmpty(featureHTML)) {
						featureHTML = "";
					}



					titleSubject += '<ol class="lst-listview ">';


					if (msgTypeHTML.length != 0) {
						for (var i = 0; i < msgTypeHTML.length; i++) {

							console.log('msgTypeHTML[i].title' + msgTypeHTML[i].title)
							if (msgTypeHTML[i].type == "text") {
								var postback = msgTypeHTML[i].postback;
								var title = msgTypeHTML[i].title;

								titleSubject += '<li ng-click="'
									+ "userMessage('"
									+ msgTypeHTML[i].postback
									+ "\', \'"
									+ msgid
									+ "\', \'"
									+ msgTypeHTML[i].title
									+ '\')\"><a href="javascript:;">' + msgTypeHTML[i].title
									+ '</a></li>';

							}

							else {

								titleSubject += '<li ng-click="'
									+ "openUrl('"
									+ msgTypeHTML[i].url
									+ "\', \'"
									+ "_blank"
									+ '\')\"><a href="javascript:;">'
									+ msgTypeHTML[i].title
									+ '</a></li>';

							}

						}
					}
					if (msgTypeHTML.length > 5) {
						titleSubject += '</ol><button class="morelistbtn"><img src="assets/images/icons/right-arrow-b.png"></button>';
					} else {
						titleSubject += '</ol>';
					}




					/*	var html = '<div class="chatting lefty chatfade"  id="'+ id + '">'+
					'<div class="chat-container chatfade">'+
						'<p>'+content+'</p>'+
						titleSubject
						+
					'</div>'+'<span class="time-right fadein">'+getTimeIn12()+'</span>'
				'</div>';*/


					var html = '<div class="chatting lefty  chatfade" id="' + id + '">' +
						'<div class="chat-container">' +
						'<p>' + content + '</p>' + titleSubject + '</div>' +
						'<span class="time-right fadein">' + getTimeIn12() + '</span>' +
						'</div>';

					return html;
				}



				var _renderhamburger = function (data) {
					var optionsHtml = "";
					var optionsData = ""
					optionsData = data;
					optionsHtml += '<ul class="lst-menu">';
					if (optionsData.length != 0) {

						for (count = 0; count < optionsData.length; count++) {


							if ((optionsData[count].type).toUpperCase() === ("Hyperlink").toUpperCase()) {
								optionsHtml += '<li><a ng-click="hamburgerMenuClick()" href="' + optionsData[count].url + '" target="blank"><img alt="help" src="images/icons/right-arrow.png">' + optionsData[count].text + '</a></li>';
							} else if ((optionsData[count].type)
								.toUpperCase() === ("Command")
									.toUpperCase()) {
								optionsHtml += '<li><a ng-click="hamburgerMenuClick(\''
									+ optionsData[count].text
									+ '\')" href="javascript:;">'
								if (optionsData[count].text == "Change language") {
									optionsHtml += '<img alt="help" src="assets/images/icons/translate.png">'
								} else {
									optionsHtml += '<img alt="help" src="assets/images/icons/help.png">'
								}
								optionsHtml += optionsData[count].text
									+ '</a></li>';
							}
						}
					}


					optionsHtml += '<li>'
						+ '<a  ng-click="ClearScreen()" href="javascript:;" id="clear-screen" >'
						+ '<img  src="assets/images/icons/sweep.png" class="right-link-icon" alt="" />'
						+ '<span  class="hamburger-menu-text">Clear screen</span>'
						+ '</a></li>'
						+ '<li>'
						+ '<a  ng-click="restartSession()" href="javascript:;" id="clear-screen" >'
						+ '<img  src="assets/images/icons/sweep.png" class="right-link-icon" alt="" />'
						+ '<span  class="hamburger-menu-text">Restart Session</span>'
						+ '</a></li>';


					optionsHtml += '</ul>';
					return optionsHtml;

				}

				var _renderMessage = function (responseTxt, id) {
					// var myElements =
					// angular.element(document.querySelector('.messages-wrap'));
					var html = _renderHTMLPara(responseTxt, "", id);

					// myElements.append(html);

					return html;
				}

				var _renderChartMessage = function (chartTitle) {
					var myElements = angular.element(document
						.querySelector('.messages-wrap'));
					var chartTitleV = chartTitle;

					if (validateEmpty(chartTitle)) {
						chartTitleV = '<div class="centertext">Please provide Chart Title</div>';
					} else {
						chartTitleV = '<div class="centertext">'
							+ chartTitle + '</div>';
					}
					var htmlCanvas = '<canvas id="chart'
						+ Value.config.chartNum + '\"'
						+ 'width="250" height="250"></canvas>';
					var html = _renderHTMLPara(chartTitleV
						+ htmlCanvas);
					myElements.append(html);

					return myElements;

				}

				var _bottyping = function () {
					var myElements = angular.element(document
						.querySelector('.messages-wrap'));

					var loadingImg = ''
						+ '<span class="emo"><img src="assets/images/icons/chat-typing-indicator.gif" alt=""/></span>';

					var html = _renderHTMLParalodingtypeing(loadingImg, "",
						"bot-typing-container");

					myElements.append(html);

					return myElements;
				}

				var _botShowSlider = function (items, msgid) {

					var questTxt = '';
					var optionsHtml = "";

					for (count = 0; count < items.length; count++) {
						// render images only if available
						if (items[count].imgurl != "") {
							optionsHtml += '<div class="">'
								+ '<img src="'
								+ items[count].imgurl
								+ '" alt="" class="carousel-img" />';

							if (items[count].title != "") {
								console.log('msgTypeHTML[i].title2' + items[count].title)
								optionsHtml += '<div class="swiper-slider-title-sub" ng-click="'
									+ "userMessage('"
									+ items[count].title
									+ "\', \'"
									+ msgid
									+ // escape()
									'\')\"><b>'
									+ items[count].title
									+ '</b>' + ' </div>';
							}

							// render subtitle
							if (items[count].subtitle != "") {
								console.log('msgTypeHTML[i].title3' + items[count].subtitle)
								optionsHtml += '<div class="swiper-slider-title-sub" ng-click="'
									+ "userMessage('"
									+ items[count].subtitle
									+ "\', \'"
									+ msgid
									+ // escape()
									'\')\">'
									+ items[count].subtitle
									+ ' </div>';
							}

							// render option only if available
							if (items[count].options.length != 0) {
								for (var i = 0; i < items[count].options.length; i++) {
									// render title

									// render option title
									if (items[count].options[i].type == "text") {
										console.log('msgTypeHTML[i].title4' + items[count].options[i].title)
										optionsHtml += '<div class="carousal-option-txt swiper-slider-action-text" ng-click="'
											+ "userMessage('"
											+ items[count].options[i].title
											+ "\', \'"
											+ msgid
											+ // escape()
											'\')\">'
											+ items[count].options[i].title
											+ ' </div>';
									}

									// render option url
									if (items[count].options[i].type == "url") {
										optionsHtml += '<div class="carousal-option-txt swiper-slider-action-text" ng-click="'
											+ "openUrl('"
											+ items[count].options[i].url
											+ "\', \'"
											+ "_blank"
											+ // escape()
											'\')\">'
											+
											// '<a
											// class="carousal-option-hyperlink"
											// ng-href="' +
											items[count].options[i].title
											+
											// ' </a>' +

											' </div>';
									}

								}
							}

							optionsHtml += '</div>';
						}

					}

					caroContainerHtml = '<div class="iframe-slick">'

						+ optionsHtml + '</div>';

					var html = _renderHTMLPara(
						caroContainerHtml, "", "bot"
					+ Value.config.botMsgId, 'slider');

					return html;
				}



				var _botRenderQuickReply = function (optionsData, userText, msgid) {

					var optionsHtml = "";



					for (count = 0; count < optionsData.length; count++) {
						//									var animationcount = count - 0.5;

						if (optionsData[count] === '&#128077;' || optionsData[count] === '&#128078;') {




							optionsHtml += '<li ng-click="' + "likeDislikeReq('" + optionsData[count] + '\')\">' +
								'<a  href="javascript:;">' + optionsData[count] + '</a>' +
								'</li>';
						} else {
							if (typeof optionsData[0] == 'object') {
								if (optionsData[count].title.length > 15) {
									optionsHtml += '<li class="full" ng-click="'
								} else {
									optionsHtml += '<li ng-click="'
								}
							} else {
								if (optionsData[count].length > 15) {
									optionsHtml += '<li class="full" ng-click="'
								} else {
									optionsHtml += '<li ng-click="'
								}
							}

							optionsHtml += "userMessage('"

							if (typeof optionsData[0] == 'object') {
								optionsHtml += optionsData[count].postback
							} else {
								optionsHtml += optionsData[count]
							}

							optionsHtml += "\', \'"
								+ msgid
							if (typeof optionsData[0] == 'object') {
								optionsHtml += "\', \'"
									+ optionsData[count].title
							}

							optionsHtml += '\')\" >'
							if (typeof optionsData[0] == 'object') {
								optionsHtml += '<a href="javascript:;">' + optionsData[count].title + '</a>'
							} else {
								optionsHtml += '<a href="javascript:;">' + optionsData[count] + '</a>'
							}



							optionsHtml += '</li>';

						}

					}

					if (optionsData.length > 5) {
						optionsHtml += '<li class="morebuttons" style="display:inline-block" ><a href="javascript:;"><img src="assets/images/icons/right-arrow-b.png"></a></li>';
					}



					/*var carouselHTML = '<div class="chatting lefty chatfade">'+
					'<div class="chat-container chatfade">'+
						'<p>'+userText+'</p>'+
						'<ul id="bot'+ Value.config.botMsgId+'"  class="lst-quickreply">'+optionsHtml+'</ul>'+
						
					'</div>'+'<span class="time-right">'+getTimeIn12()+'</span>'+
				'</div>';*/


					var carouselHTML = '<div class="chatting lefty chatfade" id="bot' + Value.config.botMsgId + '">' +
						'<div class="chat-container">' +
						'<p>' + userText + '</p>' +
						'</div>' +
						'<span class="time-right fadein">' + getTimeIn12() + '</span>' +
						'</div><div class="quickreply-container"><ul id="bot' + Value.config.botMsgId + '"  class="lst-quickreply">' + optionsHtml + '</ul></div>';




					return carouselHTML;
				}

				var _botRenderQuickView = function (optionsData,
					userText, msgid) {
					var optionsHtml = "";

					for (count = 0; count < optionsData.length; count++) {
						console.log('msgTypeHTML[i].title6' + optionsData[count])
						optionsHtml += '<div class="swiper-slide swiper-slider-width" ng-click="'
							+ "userMessage('"
							+ optionsData[count]
							+ "\', \'"
							+ msgid
							+ // escape()
							'\')\">'
							+ optionsData[count]
							+ '</div>';
					}



					var carouselHTML = '<div class="carousel-container car-custom" id="quick-carousel-container">'
						+ '<div class="swiper-container">'
						+ '<div class="swiper-wrapper">'
						+ optionsHtml + '</div>' +
						/* '<div class="swiper-pagination"></div>' + */
						'</div>' + '</div>';

					var html = _renderHTMLPara(userText,
						carouselHTML);
					return html;
				}

				var _renderIMAGE = function (msgTypeHTML, featureHTML, id) {

					// set default id for bot
					if (typeof id == 'undefined') {
						id = "bot" + Value.config.botMsgId;
					}
					// add stop voice function if audio is on
					if (Value.isRecordingOn) {
						var divMsg = '<div  class="message-text-wraper" id="bot" ng-click="stopTTS()" >';
					} else {
						var divMsg = '<div class="message-text-wraper" id="bot">';
					}



					if (validateEmpty(featureHTML)) {
						featureHTML = "";
					}
					var id = "img" + Value.config.botMsgId
					// msgTypeHTML = '<div>' + msgTypeHTML + "</div>" ;	
					// msgTypeHTML ='<a  href="'+msgTypeHTML+'" onclick="$window.open(this.href, popup, width=1000,height=700,left=300,top=200)" > <img  src="' + msgTypeHTML + '" alt="" width="230" align="center" height="200" /></a>';
					//msgTypeHTML ='<a  href="'+msgTypeHTML+'" onclick="window.open(this.href, _blank, location=no); return false;" > <img  data-toggle="modal" data-target="#myModal" src="' + msgTypeHTML + '" alt="" width="230" align="center" height="200" /></a>';
					msgTypeHTML = '<img ng-click="' + "largeImage('" + msgTypeHTML + "\', \'" + id + '\')\" id="myImg"  src="' + msgTypeHTML + '" alt="" width="230" align="center" height="200" /><div class="prompt"></div>';
					//msgTypeHTML =' <img  id='"img"+Value.config.botMsgId' src="' + msgTypeHTML + '"  ng-click="clickImg($event)" alt="" width="230" align="center" height="200" /></a>';

					var html = '<div class="chatbot-message" id="' + id + '">' +
						'<img src="' + Value.config.botIconImage + '" alt="" class="bot-icon"/>' +
						divMsg +
						msgTypeHTML +
						'</div>' +
						'<div class="message-time time">' +
													/*startTime()*/ getTimeIn12() +
						'</div>' +

						featureHTML +

						'</div>';
					//}   	



					return html;
				}

				var _renderVIDEO = function (msgTypeHTML, featureHTML, id) {
					// set default id for bot
					if (typeof id == 'undefined') {
						id = "bot" + Value.config.botMsgId;
					}
					// add stop voice function if audio is on
					if (Value.isRecordingOn) {
						var divMsg = '<div class="message-text-wraper" id="bot" ng-click="stopTTS()" >';
					} else {
						var divMsg = '<div class="message-text-wraper" id="bot">';
					}

					if (validateEmpty(featureHTML)) {
						featureHTML = "";
					}
					// msgTypeHTML = '<div>' + msgTypeHTML + "</div>" ;

					if (msgTypeHTML.indexOf('youtube') == -1) {

						msgTypeHTML = '<video width="230" height="200"  autobuffer controls  controlsList="nodownload" autofocus><source src="' + msgTypeHTML + '" ></video>';

					} else {


						msgTypeHTML = '<iframe width="230" height="200" allowfullscreen="allowfullscreen" src="' + msgTypeHTML + '"></iframe>';

					}

					//msgTypeHTML='<video width="230" height="200"  autobuffer controls  controlsList="nodownload" autofocus><source src="' + msgTypeHTML  + '" ></video>';

					var html = '<div class="chatbot-message" id="' + id + '">' +
						'<img src="' + Value.config.botIconImage + '" alt="" class="bot-icon"/>' +
						divMsg + msgTypeHTML +
						'</div>' +
						'<div class="message-time time">' +
													/*startTime()*/ getTimeIn12() +
						'</div>' +

						featureHTML +

						'</div>';
					//}   	

					return html;
				}


				var _imageRender = function (responseTxt) {
					// var myElements =
					// angular.element(document.querySelector('.messages-wrap'));
					var html = _renderIMAGE(responseTxt);

					// myElements.append(html);

					return html;
				}

				var _videoRender = function (responseTxt) {
					// var myElements =
					// angular.element(document.querySelector('.messages-wrap'));
					var html = _renderVIDEO(responseTxt);

					// myElements.append(html);

					return html;
				}

				var method = {
					botURLCall: _botURLCall,
					renderMessage: _renderMessage,
					renderChartMessage: _renderChartMessage,
					bottyping: _bottyping,
					botShowSlider: _botShowSlider,
					botRenderQuickReply: _botRenderQuickReply,
					renderHTMLParaListView: _renderHTMLParaListView,
					imageRender: _imageRender,
					videoRender: _videoRender,
					errorMgsShown: _errorMgsShown,
					renderErrorMessage: _renderErrorMessage,
					renderhamburger: _renderhamburger
				};

				return method;
				console.log("inside service")
			}])

	.factory(
		'botJS',
		[
			'$rootScope',
			'Constants',
			'Value',
			function ($rootScope, Constants, Value) {

				var _doughnutPie = function (chartData, pieType) {
					var ctx = document.getElementById("chart"
						+ Value.config.chartNum);

					if (validateEmpty(chartData)) {
						var chartData = {
							labels: ["Red", "Blue", "Yellow"],
							datasets: [{
								data: [300, 50, 100],
								backgroundColor: ["#FF6384",
									"#36A2EB", "#FFCE56"],
								hoverBackgroundColor: ["#FF6384",
									"#36A2EB", "#FFCE56"]
							}]
						};
					}

					// For a pie chart
					var myPieChart = new Chart(ctx, {
						type: pieType, /* doughnut pie */
						data: chartData,
						options: {
							animation: {
								animateScale: true
							}
						}
					});

					Value.config.chartNum += 1;
				}

				var _bar = function (chartData, optionData) {
					var ctx = document.getElementById("chart"
						+ Value.config.chartNum);

					if (validateEmpty(chartData)) {
						var chartData = {
							labels: ["January", "February",
								"March", "April", "May",
								"June", "July"],
							datasets: [
								{
									label: "My First dataset",
									backgroundColor: [
										'rgba(255, 99, 132, 0.2)',
										'rgba(54, 162, 235, 0.2)',
										'rgba(255, 206, 86, 0.2)',
										'rgba(75, 192, 192, 0.2)',
										'rgba(153, 102, 255, 0.2)',
										'rgba(255, 159, 64, 0.2)'],
									borderColor: [
										'rgba(255,99,132,1)',
										'rgba(54, 162, 235, 1)',
										'rgba(255, 206, 86, 1)',
										'rgba(75, 192, 192, 1)',
										'rgba(153, 102, 255, 1)',
										'rgba(255, 159, 64, 1)'],
									borderWidth: 1,
									data: [65, 59, 80, 81,
										56, 55, 40],
								},
								{
									label: "My First dataset",
									backgroundColor: [
										'rgba(255, 99, 132, 0.2)',
										'rgba(54, 162, 235, 0.2)',
										'rgba(255, 206, 86, 0.2)',
										'rgba(75, 192, 192, 0.2)',
										'rgba(153, 102, 255, 0.2)',
										'rgba(255, 159, 64, 0.2)'],
									borderColor: [
										'rgba(255,99,132,1)',
										'rgba(54, 162, 235, 1)',
										'rgba(255, 206, 86, 1)',
										'rgba(75, 192, 192, 1)',
										'rgba(153, 102, 255, 1)',
										'rgba(255, 159, 64, 1)'],
									borderWidth: 1,
									data: [65, 59, 80, 81,
										56, 55, 40],
								}]
						};
					}

					if (validateEmpty(optionData)) {
						var optionData = {
							animation: {
								animateScale: true
							},
							scales: {
								yAxes: [{
									scaleLabel: {
										display: true,
										labelString: 'yAxes No title available'
									}
								}],
								xAxes: [{
									scaleLabel: {
										display: true,
										labelString: 'xAxes  No title available'
									}
								}]
							}
							/*
							 * , scales: { xAxes: [{ stacked: true }],
							 * yAxes: [{ stacked: true }] }
							 */
						};

					}

					// for bar chart
					var myBarChart = new Chart(ctx, {
						type: 'bar',
						data: chartData,
						options: optionData
					});

					Value.config.chartNum += 1;
				}

				var _line = function (chartData, optionData) {
					var ctx = document.getElementById("chart"
						+ Value.config.chartNum);

					if (validateEmpty(chartData)) {
						var chartData = {
							labels: ["January", "February",
								"March", "April", "May",
								"June", "July"],
							datasets: [
								{
									label: "My First dataset",
									fill: false,
									lineTension: 0.1,
									backgroundColor: "rgba(75,192,192,0.4)",
									borderColor: "rgba(75,192,192,1)",
									borderCapStyle: 'butt',
									borderDash: [],
									borderDashOffset: 0.0,
									borderJoinStyle: 'miter',
									pointBorderColor: "rgba(75,192,192,1)",
									pointBackgroundColor: "#fff",
									pointBorderWidth: 1,
									pointHoverRadius: 5,
									pointHoverBackgroundColor: "rgba(75,192,192,1)",
									pointHoverBorderColor: "rgba(220,220,220,1)",
									pointHoverBorderWidth: 2,
									pointRadius: 1,
									pointHitRadius: 10,
									data: [65, 59, 80, 81,
										56, 55, 40],
									spanGaps: false,
								},
								{
									label: "My Second dataset",
									fill: false,
									lineTension: 0.1,
									backgroundColor: "rgba(75,192,192,0.4)",
									borderColor: "rgba(75,192,192,1)",
									borderCapStyle: 'butt',
									borderDash: [],
									borderDashOffset: 0.0,
									borderJoinStyle: 'miter',
									pointBorderColor: "rgba(75,192,192,1)",
									pointBackgroundColor: "#fff",
									pointBorderWidth: 1,
									pointHoverRadius: 5,
									pointHoverBackgroundColor: "rgba(75,192,192,1)",
									pointHoverBorderColor: "rgba(220,220,220,1)",
									pointHoverBorderWidth: 2,
									pointRadius: 1,
									pointHitRadius: 10,
									data: [24, 38, 41, 61,
										47, 24, 21],
									spanGaps: false,
								}]
						};
					}

					if (validateEmpty(optionData)) {
						var optionData = {
							animation: {
								animateScale: true
							},
							scales: {
								yAxes: [{
									scaleLabel: {
										display: true,
										labelString: 'yAxes No title available'
									}
								}],
								xAxes: [{
									scaleLabel: {
										display: true,
										labelString: 'xAxes  No title available'
									}
								}]
							}

						};

					}

					// for bar chart
					var myLineChart = new Chart(ctx, {
						type: 'line',
						data: chartData,
						options: optionData
					});

					Value.config.chartNum += 1;
				}


				var _initSlider = function (chartData) {
					var swiper = new Swiper('.swiper-container', {
						pagination: '.swiper-pagination',
						slidesPerView: 'auto',
						/*centeredSlides: true,*/
						paginationClickable: true,
						spaceBetween: 10,
						freeMode: true  // add this incase of quick reply msgType
					});
				}
				var _initCarousal = function (chartData) {
					var swiper = new Swiper('.swiper-container', {
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',

						},
						slidesPerView: 1,
						spaceBetween: 20,
					});
				}
				var method = {
					doughnutPie: _doughnutPie,
					bar: _bar,
					line: _line,
					initSlider: _initSlider,
					initCarousal: _initCarousal

				};

				return method;

			}])

	.factory(
		'hamburgerMenu',
		[
			'$rootScope',
			'$http',
			'Constants',
			'Value',
			function ($rootScope, $http, Constants, Value) { // $compile,
				// $rootScope

				// render the hamburger Menu
				var _renderHTML = function (optionsData) {
					var optionsHtml = "";
					consoleWrite(Constants.DISPLAY_CONSOLE,
						"hamburgerMenu: "
						+ Value.config.persistentmenu);
					optionsData = Value.config.persistentmenu;
					if (optionsData.length != 0) {
						for (count = 0; count < optionsData.length; count++) {

							optionsHtml += '<ul class="lst-menu">';
							if ((optionsData[count].type)
								.toUpperCase() === ("Hyperlink")
									.toUpperCase()) {
								optionsHtml += '<li><a ng-click="hamburgerMenuClick()" href="' + optionsData[count].url + '" target="blank"><img alt="help" src="images/icons/right-arrow.png">' + optionsData[count].text + '</a></li>';
							} else if ((optionsData[count].type)
								.toUpperCase() === ("Command")
									.toUpperCase()) {
								optionsHtml += '<li><a ng-click="hamburgerMenuClick(\''
									+ optionsData[count].text
									+ '\')" href="javascript:;"><img alt="help" src="images/icons/menu.svg">'
									+ optionsData[count].text
									+ '</a></li>';
							}
						}
					}

					/*			optionsHtml += '<li>'
										+ '<a id="clear-screen" ng-click="">'
										+ '<img src="images/icons/starratings.png" class="right-link-icon" alt="" />'
										+ '<span class="hamburger-menu-text">Rating</span><span style="margin-left:43%; cursor: pointer;">'
										+ '<span style="margin-left:10px;cursor: pointer;" id="1" name="1" class="fa fa-star"></span>'
										+ '<span style="margin-left:10px;cursor: pointer;" id="2" name="2" class="fa fa-star"></span>'
										+ '<span style="margin-left: 10px;cursor: pointer;" id="3" name="3" class="fa fa-star"></span>'
										+ '<span style="margin-left: 10px;cursor: pointer;" id="4" name="4" class="fa fa-star"></span>'
										+ '<span style="margin-left: 10px;cursor: pointer;" id="5" name="5" class="fa fa-star"></span></span>'
										+ '</a>'
										+ '</li>'
										+ '<li>'
										+ '<a id="clear-screen" ng-click="">'
										+ '<img src="images/icons/bell.png" class="right-link-icon" alt="" />'
										+ '<span class="hamburger-menu-text">Subscription</span> <div id="toggle" class="toggle-button" id="toggle"><span></span></div>'
										+ '</a>'
										+ '</li>'
										+ '<li>'
										+ '<a id="clear-screen" ng-click="ClearScreen()">'
										+ '<img src="images/icons/sweep.png" class="right-link-icon" alt="" />'
										+ '<span class="hamburger-menu-text">Clear Screen</span>'
										+ '</a>' + '</li>';*/


					optionsHtml += '<div class="other-menu-options"><ul class="lst-menu">' + optionsHtml + '</ul></div>';
					return optionsHtml;
				}

				var method = {
					renderHTML: _renderHTML,
				};

				return method;

			}])
	.factory(
		'geolocationSvc',
		[
			'$q',
			'$window',
			function ($q, $window) {

				'use strict';

				function getCurrentPosition() {
					var deferred = $q.defer();

					if (!$window.navigator.geolocation) {
						deferred
							.reject('Geolocation not supported.');
					} else {
						$window.navigator.geolocation
							.getCurrentPosition(function (
								position) {
								deferred.resolve(position);
							}, function (err) {
								deferred.reject(err);
							});
					}

					return deferred.promise;
				}

				return {
					getCurrentPosition: getCurrentPosition
				};

			}]).service('BlankService', [function () {

			}]);
