var app = angular.module('chatBotApp', ['ngRoute', 'chatBotApp.routes' , 'chatBotApp.controllers' , "chatBotApp.services" , "chatBotApp.directives","chatBotApp.config",'chatBotApp.Constants','chatBotApp.Value' ]); //'chatBotApp.services'

app.run (function($rootScope,$http , $location, $timeout, botURL, $routeParams, $q, Constants, Value,$route){	
	var url = window.location.href;
	var arr = url.split("/");
	var result = arr[0] + "//" + arr[2];
	console.log("inside app")
	$rootScope.configurationURL=Constants.CONFIGIP_PUBLICIP;
	//$rootScope.configurationURL=result;
	
  	$rootScope.chatConfig=[];
  	$rootScope.chatConfigStar=[];
  	$rootScope.ipURL=Constants.CHATIP_PUBLICIP;
  	//$rootScope.ipURL=result;
  	$rootScope.quickdisableButton= false;
  
  	var testing = true;
  	
  	
  	 $rootScope.mainbgImg;
     $rootScope.botbgImg;
     $rootScope.botIcons;
     $rootScope.botchatIcon;
     $rootScope.userchatIcon;
     $rootScope.mybotname = Constants.RESPONSE_DATA.botname;
  
// 
/**----------------------------------------------------
	getResponsePromise: make a GET call to service url and get the response
*/
    $rootScope.getResponsePromise = function () {
	var addressPath='/BOTS/message/getAllBotsConfiguration';
	consoleWrite(Constants.DISPLAY_CONSOLE,"url "+$rootScope.configurationURL+addressPath);
			
        try {
            var deferred = $q.defer();
            $.ajax({
                  type       : "GET",
                  dataType   : "json",
                  url        : $rootScope.configurationURL+addressPath,
                  success    : function(data) {
					consoleWrite(Constants.DISPLAY_CONSOLE,"success "+ JSON.stringify(data));
                        consoleWrite(Constants.DISPLAY_CONSOLE,data.length);
                        $rootScope.chatConfig.length=0;
                        for(i=0;i<data.length;i++)
                        {
                        	$rootScope.chatConfig.push({
								"id": data[i].id,
								"templatename": data[i].templatename,
								"mainbgimg": data[i].mainbgimg+"?q="+new Date().getTime(),
								"uuid": data[i].uuid,
								"name": data[i].name,
								"displayname": data[i].displayname,
								"description": data[i].description,
								"url": data[i].url,
								"welcomemessage": data[i].welcomemessage,
								"offlinemessage": data[i].offlinemessage,
								"botbgimg": data[i].botbgimg,
								"boticons": data[i].boticons,
								"botchaticon": data[i].botchaticon+"?q="+new Date().getTime(),
								"userchaticon": data[i].userchaticon+"?q="+new Date().getTime(),
								"persistentmenu": data[i].persistentmenu,
								"isactive": data[i].isactive,
								"profainityValue":data[i].profinityvalue
                        	})
                        }

                       $rootScope.backgroundImage=$rootScope.chatConfig[0].mainbgimg;
                        consoleWrite(Constants.DISPLAY_CONSOLE,"$rootScope.chatConfig[0].mainbgimg: "+$rootScope.chatConfig[0].mainbgimg);
                        consoleWrite(Constants.DISPLAY_CONSOLE,"botchaticon: "+$rootScope.chatConfig[0].botchaticon)
                       $rootScope.gotoBotHome('/homepage');

                    
				},
                  error      : function(data) {
                  						consoleWrite(Constants.DISPLAY_CONSOLE,"error "+ JSON.stringify(data));
                               }
                });
        } catch (e) {
        	consoleWrite(Constants.DISPLAY_CONSOLE,"exception: "+e);
        }
    }


 $rootScope.getResponseData = function () {
	
	var addressPath='/BOTS/message/getBotsConfigurationByName';
		consoleWrite(Constants.DISPLAY_CONSOLE,"url "+$rootScope.configurationURL+addressPath);
		var inputData = {"name":$rootScope.mybotname }
		
        try {
            var deferred = $q.defer();
            $.ajax({
                  type       : "POST",
                  dataType   : "json",
                  url        : $rootScope.configurationURL+addressPath,
                  contentType: 'application/json',
                  data 		 : JSON.stringify(inputData),
                  success    : function(data) {
                	  $rootScope.chatConfig.length=0;
//                      console.log(JSON.stringify(data));
                     
                     		
                         
                          $rootScope.mainbgImg=data.mainbgimg+"?q="+new Date().getTime();
                          $rootScope.botbgImg=data.botbgimg+"?q="+new Date().getTime();
                          $rootScope.botIcons=data.boticons+"?q="+new Date().getTime();
                          $rootScope.botchatIcon=data.botchaticon+"?q="+new Date().getTime();
                          $rootScope.userchatIcon=data.userchaticon+"?q="+new Date().getTime();
                         
                     	
                   
                  	$rootScope.chatConfig={
							"id": data.id,
							"templatename": data.templatename,
							"mainbgimg": $rootScope.mainbgimg,
							"uuid": data.uuid,
							"name": data.name,
							"displayname": data.displayname,
							"description": data.description,
							"url": data.url,
							"welcomemessage": data.welcomemessage,
							"offlinemessage": data.offlinemessage,
							"botbgimg": $rootScope.botbgImg,
							"boticons": $rootScope.botIcons,
							"botchaticon": $rootScope.botchatIcon,
							"userchaticon": $rootScope.userchatIcon,
							"persistentmenu": data.persistentmenu,
							"isactive": data.isactive,
							"profainityValue":data.profinityvalue,
							"greetingText":data.greetingText
                  	}
                  
                  	
                	var greetingElement = angular.element(document.querySelector('#greetingtext'));
                	greetingElement.append($rootScope.chatConfig.greetingText);
                 
                 $rootScope.backgroundImage=$rootScope.chatConfig.mainbgimg;
                 $rootScope.userIcon=$rootScope.chatConfig.userchaticon;
                  	$timeout(function(){ 
                  		$rootScope.gotoBot();
                  		 
                 	},10);
                 /*$rootScope.gotoBot();*/
                  },
                  error 	 : function(data) {
                  						consoleWrite(Constants.DISPLAY_CONSOLE,"error "+ JSON.stringify(data));
                  						$rootScope.gotoBotHome('/easterEgg');
                               }
                });
        } catch (e) {
        	consoleWrite(Constants.DISPLAY_CONSOLE,"exception: "+e);
        }

}
  

	//document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady(){
		//$rootScope.getResponsePromise();

		if(checkForAndroid(device.platform))
		{
			navigator.splashscreen.hide();
			$rootScope.enableLocation();
		}
		else if(checkForioS(device.platform))
		{
			setTimeout(function(){ navigator.splashscreen.hide(); },40);
			$rootScope.enableLocationIOS();
		}

	
	}

	
/*---------------------------resettimer--------------------------------------------*/
	
	/*if(Notification.permission!=="granted") {
		Notification.requestPermission();
     }*/
	
	
	

$(document).on('click', '.toggle-button', function(e) {
		
	    $(this).toggleClass('toggle-button-selected'); 
	    var a = $("#toggle").attr('class');
	    
	   if(a=='toggle-button toggle-button-selected'){
		   localStorage.setItem("SETNOTIFICATIONCLASS",'toggle-button toggle-button-selected');
		 
	    }else{
	    	 localStorage.setItem("SETNOTIFICATIONCLASS",'toggle-button');
	    	
	    }
	})

    
    $rootScope.clickImg=function(event){
    	var Imgid=event.target.id
    	
     
      var modal = document.getElementById('myModal');
        

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementById(Imgid);
 
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

img.onclick = function(){
    modal.style.display = "block";
    
    modalImg.src = event.target.src;
    captionText.innerHTML = $rootScope.imgText;
}

// Get the <span> element that closes the modal
var span = document.getElementById("modclose");

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
    modal.style.display = "none";
   }

   

 }
/*-----------------------------------------------------------------------------------------*/

/*---------Geolocation: first check whether th loaction is enabled or not. If not, ask user to enable it by opening the settings window--*/

	$rootScope.enableLocation=function()
	{
		cordova.plugins.diagnostic.isLocationEnabled(function(enabled)
		{
			if(enabled==true||enabled=="enabled")
			{
				navigator.geolocation.getCurrentPosition(onSuccess, onError);

					function onSuccess(position) 
					{
						$rootScope.currentLat=position.coords.latitude;
						$rootScope.currentLng=position.coords.longitude;
						Value.lat=position.coords.latitude;
						Value.lang=position.coords.longitude;
						//alert("location: "+$rootScope.currentLat+" : "+$rootScope.currentLng);
					}
					
					function onError(error)
					{
						alert("Unable to fetch location at the moment");	
						/*showMessages("error","Please Enable Location Settings",true);*/
					}
			}
			else
			{
				//showMessages(errorMessage,LanguageType.enableLocation,true);
				alert("Please enable location settings");
				var result = cordova.plugins.diagnostic.switchToLocationSettings();
				sleep(2000);
				//alert("result: "+result);
				if(typeof(result)=='undefined')
				{
					$rootScope.enableLocation();
				}
				
			}
    
		}, function(error){
    		consoleWrite(Constants.DISPLAY_CONSOLE,"The following error occurred: "+error);
			});
	}

	$rootScope.enableLocationIOS=function()
    {
      	cordova.plugins.diagnostic.isLocationEnabledSetting(function(enabled)
	    {
		    if(enabled==true||enabled=="enabled")
		    {
		    	navigator.geolocation.getCurrentPosition(onSuccess, onError);
		      
		   		function onSuccess(position)
		    	{
				    currLat=position.coords.latitude;
				    currLng=position.coords.longitude;
				    $rootScope.currentLat=position.coords.latitude;
				    $rootScope.currentLng=position.coords.longitude;
				    alert("loaction: "+$rootScope.currentLat+" : "+$rootScope.currentLng);
		    	}
		      
		      	function onError(error)
		      	{
		      		alert("Please enable location settings");
		      		//showMessages("error","Please Enable Location Settings",true);
		      	}
		    }
		    else
		    {
		      var result = cordova.plugins.diagnostic.switchToSettings();
		      sleep(2000);
		      if(typeof(result)=='undefined')
				{
					$rootScope.enableLocationIOS();

				}
		    }
	    }, function(error){
	      consoleWrite(Constants.DISPLAY_CONSOLE,"The following error occurred: "+error);
	      });
	}

/*--------------------------------------------------------------------------------------------------------------------------------*/
	 $( document ).ready(function() {
		$rootScope.getResponseAppretingByChnnelId();
	
		
		$('#toggle').addClass(localStorage.getItem("SETNOTIFICATIONCLASS"));
		
		
	 });
	 
	
	 
	 
	 
	 	$(document).on('click' , ".morebuttons" , function(){
	 		
		 $('.chat-box .quickreply-container .lst-quickreply li').css("display" , "inline-block")
		 	$(this).css("display" , "none")
		 	
		 
	 })

	
	 $(document).ready(function(){
		//$(".chat-bot-icon").click(function(){
	        if (!$(".chat-box").hasClass("chat-box-show")) {
	            $(".chat-box").addClass("chat-box-show");
	            $(this).hide();
	            $(".chat-footer").show();
	        }
	    //});

	    $(".chat-hide").click(function(){
	        $(".chat-box").removeClass("chat-box-show");
	        $(".chat-bot-icon").show();
	        $(".chat-box").removeClass("chat-minimizing");
	    	hideMenuoption();
	        var myElements = angular.element(document.querySelector('.messages-wrap'));	 
			myElements.empty();  
			
			$rootScope.BotMessage(Value.config.welcomeMessage,Constants.STARTCHATTINGEVENT);
		
	    });


	    // chat-minimize and maximize start
	    $(".chat-minimize").click(function(){
	        if (!$(this).hasClass("mini")) {
	        	$(this).addClass("mini");
	        	$(".chat-footer").hide();
	        	$(".chat-box").addClass("chat-minimizing");
	        	$('#listview').css("display", "none");
	        	//$('.showup').css("display", "none");
	        	hideMenuoption();
	        	
	        }
	        else {
	        	$(this).removeClass("mini")
	        	$(".chat-footer").show();
	        	$(".chat-box").removeClass("chat-minimizing");
	        	$('#listview').css("display", "block");
	        	$('.showup').css("display", "block");
	        }
	    });
		// chat-minimize and maximize end
	    $(document).on('change', '.languages' , function(){
	    	alert()
	    	
	    })
	    $(document).on('click', '.morelistbtn' , function(){
	   
	    	$(this).parent().find('ol li').css('display' , ' list-item')
	    	$(this).css('display','none')
	    	
	    })
	    
	    
	    $(".menu-option").click(function () {
	        $(".other-menu-options").toggleClass("showup");
	        $(this).toggleClass("active");
	        $('#listview').removeClass('sg-showing');
	        $('#listview').addClass('forcedClosed');
	    });
	    
	   

	    $(".closepop").click(function(event){
	    	event.stopPropagation();
	    	$(".skbot-pop").hide();
	    	// $(".chat-bot-icon").removeClass("skbot-pop-show");
	    });

		$(".chat-bot-icon").hover(function(){
	    	$(this).toggleClass("skbot-pop-show");
	    });

	  

	});
	 
	 function hideMenuoption() {
			$(".menu-option").removeClass("active");
		    $(".other-menu-options").removeClass("showup");
		}

		

	$(document).on('click', '.fa-star', function(e) {
		
		var rating="";
		/*
		*/
		if($(this).attr('class')=="fa fa-star"){
			
			rating = $(this).attr('id');
			//localStorage.setItem("RATING",rating)
			$rootScope.getResponseAppreting(rating);
			$(this).addClass('checked');
			$(this).addClass("checked")
			
        .prevAll().addClass("checked");
			
		}else{
			rating = $(this).attr('id');
			//localStorage.setItem("RATING",rating);
			$rootScope.getResponseAppreting(rating);
			$(this).removeClass('checked');
			$(this).nextAll()
	        .removeClass("checked");
		}
	});
	
	$rootScope.getclientIp=function(){

		  $.getJSON("https://api.ipify.org/?format=json", function (data) {
         
          $rootScope.clientIp=data.ip;
           consoleWrite(Constants.DISPLAY_CONSOLE,"IP====>>>"+  $rootScope.clientIp);
         });
		  return $rootScope.clientIp;
	}

  	$rootScope.configurationCall = function(textLocation,persistentMenu, botIcon, userIcon, botBackground){
		consoleWrite(Constants.DISPLAY_CONSOLE, persistentMenu);
		if(!Value.configIsStatic){
			consoleWrite(Constants.DISPLAY_CONSOLE,"check1: "+ persistentMenu);
			Value.config.persistentmenu.length=0;
			if(persistentMenu.length!=0)
			{
				var responseData =JSON.parse(persistentMenu);
		  		Value.config.persistentmenu = responseData;
		  		consoleWrite(Constants.DISPLAY_CONSOLE,"persistent: " +responseData);
	  		}
	  		
	  			Value.config.botIconImage = botIcon;
		  		Value.config.userIcon = userIcon;
		  		$rootScope.botBGImage=botBackground;
		  		Value.config.botBGImage = botBackground;
		}
		else
		{
			Value.config.botIconImage = Constants.RESPONSE_DATA.boticon;
		  	Value.config.userIcon = Constants.RESPONSE_DATA.usericon;
		  	Value.config.botBGImage = Constants.RESPONSE_DATA.backgroundimage;
		  	Value.config.persistentmenu = Constants.RESPONSE_DATA.persistentmenu;
		}
		$rootScope.gotoBotHome(textLocation);
  	} 	

  
  	$rootScope.gotoBot = function(textLocation, botTitleName,  botname,persistentMenu, welcomeMessage,botchaticon, userchaticon, botBgImg, profainityValue){  		
  		//Value.config.channelid = genRandomDigit(Constants.CHANNELID_LENGTH); 
  		consoleWrite(Constants.DISPLAY_CONSOLE,"cookieEnabled:"+navigator.cookieEnabled);
  	
  		
  		
  		if(navigator.cookieEnabled==false){
  			Value.config.channelid = genRandomDigit(Constants.CHANNELID_LENGTH);
  		}else{
  		   
  			if(localStorage.getItem("SETCHANNELID")==null || localStorage.getItem("SETCHANNELID")=="" || localStorage.getItem("SETCHANNELID")== undefined){
  	  			
  	            localStorage.setItem("SETCHANNELID",genRandomDigit(Constants.CHANNELID_LENGTH));
  	            Value.config.channelid = localStorage.getItem("SETCHANNELID");
  	 		}else{
  	 			
  	          Value.config.channelid = localStorage.getItem("SETCHANNELID");
  	 		}
  			
  		}
  		Value.config.error = false;  		
  		Value.config.loading = true;	
  		Value.config.disable = false;
		
  		/*-------------static bot-----------*/
  		textLocation = 'chatbot';
		botTitleName = $rootScope.chatConfig.displayname;
		botname = $rootScope.chatConfig.name; 
		persistentMenu = $rootScope.chatConfig.persistentmenu; 
		welcomeMessage = $rootScope.chatConfig.welcomemessage; 
		botchaticon = $rootScope.chatConfig.botchaticon; 
		userchaticon = $rootScope.chatConfig.userchaticon;
		botBgImg = $rootScope.chatConfig.botbgimg; 
		profainityValue = $rootScope.chatConfig.profinityvalue;
		/*-------------------------------------------*/

		// set the bot name
		Value.config.botTitleName =validateEmpty(botTitleName)?"Bot Name":botTitleName;
		$rootScope.botTitleName=Value.config.botTitleName;
		Value.config.configChatBotName = $rootScope.chatConfig.name;
		Value.config.welcomeMessage=welcomeMessage;
		Value.config.profainityValue=profainityValue;

		consoleWrite(Constants.DISPLAY_CONSOLE,textLocation+" "+botTitleName+" "+botname+" "+persistentMenu+" "+welcomeMessage+" "+botchaticon+" "+userchaticon+" "+botBgImg+" "+profainityValue);
		$rootScope.configurationCall(textLocation,persistentMenu,botchaticon, userchaticon, botBgImg); 
	}

	// got to home page
	$rootScope.gotoBotHome = function(textLocation){
  		// Goto to chatbot page
		$timeout(function(){ 
	         $location.path(textLocation);
      	},1);
		/*$timeout(function(){ 
	         $location.path("chatbot");
	         $location.path("chatbot"); 
     	},1);*/
		//$state.reload();
	    if (window.scrollY) 
	    {
	        window.scroll(0, 0);  // reset the scroll position to the top left of the document.
	    }
	    Value.config.loading = false; // stop loading
		Value.config.error = false;
		
		
		$rootScope.hamburgerRender();
		
		var ratingCount=localStorage.getItem("RATING");
		if(ratingCount=='1'){
		
			$('#1').addClass('checked');
			}else if(ratingCount=='2'){
			$('#1').addClass('checked');
			$('#2').addClass('checked');	
			}else if(ratingCount=='3'){
				$('#1').addClass('checked');
				$('#2').addClass('checked');
				$('#3').addClass('checked');
			}else if(ratingCount=='4'){
				$('#1').addClass('checked');
				$('#2').addClass('checked');
				$('#3').addClass('checked');
				$('#4').addClass('checked');
			}else if(ratingCount=='5'){
				$('#1').addClass('checked');
				$('#2').addClass('checked');
				$('#3').addClass('checked');
				$('#4').addClass('checked');
				$('#5').addClass('checked');
			}else{
				$(this).removeClass('checked');
				$(this).nextAll()
		        .removeClass("checked");
			}
		$('#toggle').addClass(localStorage.getItem("SETNOTIFICATIONCLASS"));
		$rootScope.botFirstCall();
		  
	}

	// show the disable message
	$rootScope.showDisableMsg = function(msg){
  		Value.config.disable = true;
  		Value.config.disbaleMsg = msg;	  		
  		$rootScope.config=Value.config;
	}

	// hide any message curently pop up
	$rootScope.hideMsg = function(){
		Value.config.error = false;
		Value.config.disable = false;	
	} 
	
	
	/*--testing---*/
if(testing)
{
	$rootScope.getResponseData();
	//$rootScope.gotoBot();
	
}




$rootScope.speakText = function(speechText) {	 

	speechSynthesis.cancel();
    var su = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    su.lang = "hi-IN";
    su.text = speechText;
    speechSynthesis.speak(su);
};	

// Stop text to Speach
$rootScope.stopTTS = function(){
	// web speech  
    var su = new SpeechSynthesisUtterance();
    su.lang = "hi-IN";
    su.text = '';
    speechSynthesis.speak(su);
};


setInterval(function () {
	if (localStorage.getItem("SETNOTIFICATIONCLASS")=='toggle-button toggle-button-selected'){
	$rootScope.getResponseWebnotification();	
	}
},2000000);


   
 $rootScope.getResponseWebnotification = function () {
	 console.log('$rootScope.mybotname' + $rootScope.mybotname)
	 var channel=localStorage.getItem("SETCHANNELID");
	var addressPath= $rootScope.configurationURL + '/BOTS/notification/getallwebnotificationByBotname/' + $rootScope.mybotname;
		consoleWrite(Constants.DISPLAY_CONSOLE,"url "+addressPath);
		console.log("addressPath :" + addressPath);
		
        try {
            var deferred = $q.defer();
            $.ajax({
                  type       : "GET",
                  dataType   : "json",
                  url        : addressPath,
                  contentType: 'application/json',
                  data 		 : "",
                  success    : function(data) {
                	  
                    
                    if(data.length!=0){
                    	 
                    	if (localStorage.getItem("SETNOTIFICATIONCLASS")=='toggle-button toggle-button-selected'){
                    		
                    		  if (Notification.permission !== "granted")
                    			    Notification.requestPermission();
                    			  else {
                    			    var notification = new Notification(data[0].title, {
                    			      icon: data[0].icon,
                    			      body: data[0].body,
                    			    });

                    			    notification.onclick = function () {
                    			      window.open(data[0].url);      
                    			    };

                    			  }	
                    	}
                    	 
                    	
                    }
                    	 
                    	 
                     
                  
                  },
                  error 	 : function(data) {
                  						consoleWrite(Constants.DISPLAY_CONSOLE,"error "+ JSON.stringify(data));
                  						                               }
                });
        } catch (e) {
        	consoleWrite(Constants.DISPLAY_CONSOLE,"exception: "+e);
        }

}
 
 


 $rootScope.getResponseAppreting = function (rating) {
	 var channel=localStorage.getItem("SETCHANNELID")
	 var addressPath= $rootScope.configurationURL + '/BOTS/notification/saveapprating';
		consoleWrite(Constants.DISPLAY_CONSOLE,"url "+$rootScope.configurationURL+addressPath);
		console.log("addressPath " + addressPath)
		var inputData = {"channelid":parseInt(channel),"rating":parseInt(rating),"botname":$rootScope.mybotname}
		console.log('inputData ' + inputData)
        try {
            var deferred = $q.defer();
            $.ajax({
                  type       : "POST",
                  dataType   : "json",
                  url        : addressPath,
                  contentType: 'application/json',
                  data 		 : JSON.stringify(inputData),
                  success    : function(data) {
                	  
                	
                     
                  
                  },
                  error 	 : function(data) {
                  						consoleWrite(Constants.DISPLAY_CONSOLE,"getResponseAppretingerror "+ JSON.stringify(data));
                  						                               }
                });
        } catch (e) {
        	consoleWrite(Constants.DISPLAY_CONSOLE,"exception: "+e);
        }

}
 

					 $rootScope.getResponseAppretingByChnnelId = function () {
						 var channel=localStorage.getItem("SETCHANNELID")
						var addressPath=	$rootScope.configurationURL + '/BOTS/notification/getAppratingByChannelID/'+channel+'';
				
							
						
					        try {
					            var deferred = $q.defer();
					            $.ajax({
					                  type       : "GET",
					                  dataType   : "json",
					                  url        : addressPath,
					                  contentType: 'application/json',
					                  data 		 : "",
					                  success    : function(data) {
					                	  
					                
					                
					                 
					                  	var lastErray = data[data.length-1];
//					                    localStorage.setItem("RATING",lastErray.rating);
					                  
					                    
					            		
					            	
					                  
					                  },
					                  error 	 : function(data) {
					                  						consoleWrite(Constants.DISPLAY_CONSOLE,"error "+ JSON.stringify(data));
					                  						                               }
					                });
					        } catch (e) {
					        	consoleWrite(Constants.DISPLAY_CONSOLE,"exception: "+e);
					        }
					
					}
 

  	
});