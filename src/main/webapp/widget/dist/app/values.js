angular.module('chatBotApp.Value', []).value('Value', {
	clickCount : 1,
	isRecordingOn : false,
	config : {
		configChatBotName : 'hrskfinance', // define chat bot name here
		welcomeMessage : '', // starting welcome message from from first call
								// on button click
		loading : false, // loading status
		error : false, // error status
		errorMsg : "", // error message
		errorWarning : "Request call fail. Please call Support Team.", // default
																		// failture
																		// message
		chartNum : 1, // Unique Chart id inside canvas,
		channelid : 0, // unique channel id 17 digit, generator only one time
						// when open
		botIconImage : "images/icons/maruhan.png",
		botBGImage : "images/background/background.jpg",
		userIcon : "images/icons/user-icon.png",
		persistentmenu : [],
		botTitleName : "bot",
		disbaleMsg : "I am sleepy!",
		userMsgId : 0,
		botMsgId : 0,
		profainityValue : '',
		loginMsg : 'You are now logged in.',
		loginErrMsg : 'Error occured while authenticating you. Kindly try after some time.'
	},
	configIsStatic : false,
	recordingPopup : true,
	recordingState : false,
	recordingMsg : '',
	lat : '',
	lang : ''

});