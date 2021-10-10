angular.module('chatBotApp.Constants',[])
.constant('Constants',{
	RESPONSE_DATA : {
	  botname : "PNSBot",
	  boticon: "images/icons/bot-icon-dark-blue.png",
	  usericon: "https://www.icon.com/logo.png",
	  backgroundimage: "images/background/background-1.jpg",
	  persistentmenu: [
	    {
	      type: "text",
	      text: "Help"
	    },
	    {
	      type: "url",
	      text : "Infrasofttech",
	      url: "http://www.infrasofttech.com/"
	    },
	    {
	      type: "url",
	      text : "Other URL",
	      url: "http://www.infrasofttech.com/"
	    }
	  ]
	},
	
	 QuicksuggestionURL:'https://bots.infrasofttech.com:82',
//	 RatingURL:'https://infra',
	  
	  CONFIGIP_PUBLICIP:'https://infrabotsdev.infrasofttech.com',
	  CHATIP_PUBLICIP:'https://infrabotsdev.infrasofttech.com',
    
	
	DISPLAY_CONSOLE:true,
	
	CHANNELID_LENGTH:17,

	RECORD_OPTIONS : {
	  language: "en-US",
	  matches: 1,
	  prompt: '',      // Android only
	  showPopup: true,  // Android only
	  showPartial: false // iOS only
	},

	CHANNEL_TYPE:'Web',
	CONTEXT_TYPE: 'p2p',
	REFERRAL_PARAM:'',
	DISPLAY:'Infra',
	SUBDISPLAY:'',
	STARTCHATTINGEVENT:'startchattingevent',
	CLEARCHATTINGEVENT:'clearchattingevent',
	textLengthDisplay:'320',
	textLengthListViewDisplay:'9',
	ENV:'uat',
	BOTNAME:'Manappuramfaq'
	
})