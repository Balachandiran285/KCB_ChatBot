angular.module('chatBotApp.controllers', ["ngAnimate" ])
 


.controller('chatbotConfigController', function($rootScope, $location, $timeout, $rootScope, $q, Constants, Value) {
	

})


// Main Controller
.controller('mainController', function($rootScope, $http, $rootScope, $compile, botURL , botJS, hamburgerMenu, $window, Constants, Value, geolocationSvc,$location, $q,$timeout) {
	$rootScope.showtextarea = "text"
	$rootScope.menuToggle = false;
	$rootScope.disableButton= false;
	$rootScope.configurationURL=Constants.CONFIGIP_PUBLICIP;
	$rootScope.quckSuggetsionURL=Constants.QuicksuggestionURL;
	 $rootScope.mybotname = Constants.RESPONSE_DATA.botname;
	// $rootScope.devicePlatform = device.platform;
	 $rootScope.arraymsgid = ''
	// Speech Recognizer fuction
	// Initial display for recording icons
    $rootScope.initialRecordingIconDisplay = function(){    	
    	$(function () {	
			$('#recordingIcon').show();
			$('#recordingAnimateIcon').hide();
        });
    }
    $rootScope.initialRecordingIconDisplay();
    // Toggle Display
    $rootScope.toggleRecordingIcon = function(){    	
    	$(function () {	
			$('#recordingIcon').toggle();
			$('#recordingAnimateIcon').toggle();
        });
    }


	Value.recordingPopup = true;    	
	Value.recordingState = false;

	// Stop Listening IOS ONLY
	$rootScope.stopRecording = function(){
		Value.recordingState = false;

		window.plugins.speechRecognition.stopListening(
			function(stopSuccess){
				// Add User Reply
	    		if(!validateEmpty(Value.recordingMsg)){
	    			$rootScope.userMessage(Value.recordingMsg);
	            	Value.isRecordingOn = true;
	    		} 
	    		else if(validateEmpty(Value.recordingMsg))
				{
					window.plugins.speechRecognition.startListening(
						function(recordResult){
							consoleWrite(Constants.DISPLAY_CONSOLE,"recordResult :" + recordResult);
							Value.recordingMsg = recordResult;
						},
						function(errorResult){
							consoleWrite(Constants.DISPLAY_CONSOLE,"errorResult :" + errorResult);
						},
						recordOptions
					);
					sleep(1000);
					$rootScope.stopRecording();
				}
			}
		);   

		$rootScope.userMessage("Test Recording");
	    Value.isRecordingOn = true;
		consoleWrite(Constants.DISPLAY_CONSOLE,'Recording Stop');
	}

	// Cancel Recording IOS ONLY
	$rootScope.cancelRecording = function(){
		Value.recordingState = false;

		consoleWrite(Constants.DISPLAY_CONSOLE,'Recording Cancelled');
	}
	  $rootScope.record = function(){
		  
		  

			var recognizer = new webkitSpeechRecognition();
			recognizer.lang = "en-US";
			recognizer.continuos = true;
			recognizer.onresult = function(event) {
			      if (event.results.length > 0) {
			          	var result = event.results[event.results.length-1];
			          
			          
			          
			            // Add User Reply
				        $rootScope.userMessage(result[0].transcript);
				        recognizer.continuos = false;
				        $rootScope.isRecordingOn = true;
			      }  
			};

			recognizer.start();

			recognizer.onstart = function() {
			    $rootScope.toggleRecordingIcon();
			};

			recognizer.onend = function() {
			    $rootScope.toggleRecordingIcon();
			};

	    }

  
	
	$rootScope.menuClick = function(){
    	$rootScope.menuToggle = !$rootScope.menuToggle;
    	
    	var ratingCount=localStorage.getItem("RATING");
    	
		
		if(ratingCount=='1'){
		$('#1').addClass('checked')
			
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
		
	
		
    };	

    $rootScope.scrollToPoint = function(senderType, idNum){
    	// Scroll to the point
    	//console.log(senderType);console.log(idNum);
    	/*  $(document).ready(function(){
    		    $('.chat-overflow').animate({
    		        scrollTop: $('.chat-overflow')[0].scrollHeight}, 5000);
    		 
    		  
    		    
    		    if(senderType == "user"){
    		    	Value.config.userMsgId += 1;
    		    }else{
    		    	Value.config.botMsgId += 1;
    		    }
    		});*/
    	  
    	$(function () {	
            
           	var path = idNum;
            
		    var anchor = $("#" + senderType + path);
		   
		    var position = anchor.position().top +  $(".forscoll").scrollTop();	
		   
		    $(".forscoll").animate({scrollTop: position}, 1000);

		    // increment message id
		    if(senderType == "user"){
		    	Value.config.userMsgId += 1;
		    }else{
		    	Value.config.botMsgId += 1;
		    }
		   
    		
        });
 
    }
    
  
    // event happen on menu click

    $rootScope.hamburgerMenuClick = function(msgText){
    	
    	if(!validateEmpty(msgText)){
    		$rootScope.userMessage(msgText);
    	}
    	
    	$(".menu-option").removeClass("active");
	    $(".other-menu-options").removeClass("showup");
	    $(".overlay").removeClass("active");
    	
    	
    	
    }

  
    $rootScope.hamburgerRender = function(){
    	//$rootScope.menuClick(); 
    	var hamburgerElement = angular.element(document.querySelector('.other-menu-options'));
		hamburgerElement.append($compile(botURL.renderhamburger(Value.config.persistentmenu))($rootScope));
    }  
    

    // open url
    $rootScope.openUrl = function(url, blank){
    	$window.open( url, blank);
    }

    function nearMe() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

function onSuccess(position) {
	   localStorage.setItem("LAT",position.coords.latitude);
       localStorage.setItem("LANG",position.coords.longitude);
    if(position.coords.latitude!=null && position.coords.longitude!=null){
 	   
 	   Value.lat = position.coords.latitude;
	   Value.lang = position.coords.longitude; 
    }else{
 	   
 	   Value.lat =localStorage.getItem("LAT");
 	   Value.lang =localStorage.getItem("LANG"); 
    }
    }

function onError(error) {
        console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
  nearMe();

    // When user focus on input close hambergur menu
	$rootScope.menuCheck = function(){
		// focus input
		$( document ).ready(function() {			
			$( "#input_text" ).focus(function() {
				
				if($(this).val().length > 0){
				
				$(".other-menu-options").removeClass('showup')
		    	$('.menu-option').removeClass('active')
		    	$(".overlay").removeClass("active");
		    	if($('.suggestions').hasClass('forcedClosed')){
		    		   $('#listview').addClass('sg-showing');
		    		   $('.suggestions').removeClass('forcedClosed');
		    	}
		    	
			  	if($rootScope.menuToggle){
					//$rootScope.menuClick();	
				}
			  	
				}else{
					 $('#listview').removeClass('sg-showing');
					
				}
			});
			

			$('.message-text-wraper').find('.menuTextToggle').on('click', function (e) {
			    e.preventDefault();

			    $(this).closest('.message-text-wraper').find('.small').toggleClass('small big');
			    
			});
		});
    };	
    $rootScope.menuCheck();
    
    // User Hit enter on keyboard
	$rootScope.enterHit = function(){
		// focus input
		
		$( document ).ready(function() {				
			
			
				
			
			$('#input_text').keypress(function (e) {
				$(".other-menu-options").removeClass('showup')
				$(".overlay").removeClass("active");
		    	$('.menu-option').removeClass('active')
			 var key = e.which;
			 if( (key == 13 && e.shiftKey != true) && (!validateEmpty($rootScope.userInput) ) )  // the
																							// code
			  {
				 if($rootScope.userInput.trim().length > 0 )
			 {  
					
					
				if($(".showup").length=="1"){
					$(".overlay").removeClass("active");
			     $(".other-menu-options").removeClass("showup");
				}
			     	
			    $('input[name = input_text]').click();
			    $('#listview').removeClass('sg-showing');
				
			    
			    if($rootScope.disableButton==false){
			    $rootScope.userMessage($rootScope.userInput);
			  
			    $rootScope.userInput = null;
			    }
			    
			    return false; 
			}
			  }
			});  
	    	
		});
		
    };	
    $rootScope.enterHit();
    
    
	$rootScope.popUpClick=function(){
		
  	}
  	
    $('#loginbtn').click(function() {
    	$('#userValidation').css('display', 'none');
    	$('#passValidation').css('display', 'none');
    	$('#passuserValidation').css('display', 'none');
    	// $rootScope.username = null;
    	// $rootScope.password = null;
        if($rootScope.username==null|| $rootScope.username=="" || $rootScope.username==undefined){
        
        	$('#userValidation').css('display', 'block');
        	
        }else if ($rootScope.password==null|| $rootScope.password=="" || $rootScope.password==undefined){
        	
        	 $('#passValidation').css('display', 'block');
        }else if($rootScope.username!="infraadmin" || $rootScope.password!="test@123"){
        	$rootScope.username = null; $rootScope.password = null;
        	
        	$('#passuserValidation').css('display', 'block');
        	$rootScope.username = null;
        	$rootScope.password = null;
        }else if(($rootScope.username==null|| $rootScope.username=="" || $rootScope.username==undefined)&&($rootScope.password==null|| $rootScope.password=="" || $rootScope.password==undefined) ){
        	$rootScope.username = null; $rootScope.password = null;
        	
        }else{
        	 $rootScope.username = null; $rootScope.password = null;
        	
    		$('#personalDialogsucces').modal('hide');
    		$('#permissionDialogsucces').modal('show');
    		
        }
    });
    


   
    $('#deny').click(function() {
    	$('#permissionDialogsucces').modal('hide');
    	$rootScope.BotMessage(Value.config.welcomeMessage,Constants.CLEARCHATTINGEVENT);
    
    });
    
    // more-less message box display
    $rootScope.moreLessDisplay = function()
    {
    	$(document).ready(function(){
	
			$('body').on('click','.menuTextToggle',function(e){
				var current_id = $(this).parent().parent().attr('id');
				var pos = $('#'+current_id).find('.message-text-wraper').position().top ;
				var position = $('#'+current_id).position().top +  $(".messages-wrap").scrollTop();		    			    
				$(".messages-wrap").animate({scrollTop: position }, 1000);
			});
		});
    }
 	$rootScope.moreLessDisplay();

    // Bot Replay to Message
 	$rootScope.Authmessage = function(userText, msgid){
 		 $rootScope.BotMessage(userText, msgid);
 	}

    // Add User Message
  	$rootScope.botFirstCall = function(){
  		$rootScope.loadDisabled = true;
		$rootScope.BotMessage($rootScope.chatConfig.welcomemessage,Constants.STARTCHATTINGEVENT);
		 return true;
  	}
  	$(document).on('click' , '.login-popup .loginbtn', function(){
  		
  	
  		$('.login-popup a').toggleClass('show')
  		
  	})
  	
  	$(document).on('click' , '.login-popup .doneLogin', function(){
  		
  		$('.login-popup a').toggleClass('show')
  		$('.login-overlay , .login-popup').removeClass('active')
  		
  	})
  	
  	$(document).on('click' , '.login-popup .close-popup', function(){
  		$('.login-overlay , .login-popup').removeClass('active')
  		if($('.login-popup .loginbtn').hasClass('show')){
  			
  		}else{
  			$('.login-popup a').toggleClass('show')
  		}
  	})

    $rootScope.BotMessage = function(userText, msgid){
    	$rootScope.disablNow    = true;
		$rootScope.disableButton= true;
		$rootScope.loginURL = null
		$rootScope.loginSwitch = false
    	
    	$(function () {	
 		
			var url = botURL.botURLCall(userText, "msg", msgid,  $rootScope.chatConfig.welcomeqr);	
    		
			var msgIDs = localStorage.getItem('MSGID'+ $rootScope.mybotname);
		
			
			// add bot typing animation
			botURL.bottyping(); 
    		$http({
				  method: 'GET',
				  url: url 	  
					}).then(function successCallback(response) {
						function IsJsonString(str) {
						    try {
						        JSON.parse(str);
						    } catch (e) {
						        return false;
						    }
						    return true;
						}
						console.log(response.data.data.msgid)
						
						if(IsJsonString(response.data.data.content)){
					
						
							if(JSON.parse(response.data.data.content).length > 0){
							var thisSession  = JSON.parse(response.data.data.content)[1]
								if(thisSession != undefined){
								console.log(thisSession)
									console.log(thisSession.hasOwnProperty('msgid'))
									console.log("JSON.parse(response.data.data.content)[1].msgid :" + JSON.parse(response.data.data.content)[1].msgid)
									
									if(response.data.data.msgType == "msgArray"){
										$rootScope.arraymsgid = JSON.parse(response.data.data.content)[1].msgid
									}else{
										$rootScope.arraymsgid = ''
									}
							
								}
							}
						} else if(response.data.data.msgid == 'language'){ 
							$rootScope.arraymsgid = response.data.data.msgid
						}else{
							$rootScope.arraymsgid = ''
						}
						
						
						
						
						
//						console.log(JSON.parse(response.data.data.content)[1].msgid)
						localStorage.removeItem("MSGID");
						
			    	    localStorage.setItem("MSGID"+ $rootScope.mybotname,response.data.data.msgid);
			    		if(response.data.data.msgid == 'otpsend' || $rootScope.arraymsgid == 'language' ){
			    			$rootScope.inputdisabld = true
				    		
				    	}
				    	else{
				    		$rootScope.inputdisabld =false
				    			
				    	}
			    		if(response.data.data.msgid == 'getotp' || $rootScope.arraymsgid == 'language'){
			    			$rootScope.showtextarea = "number"
				    		
				    	}
				    	else{
				    		$rootScope.showtextarea = "text"
				    			
				    	}
			    		if(response.data.data.msgid == 'loginRequired' ){
			    			console.log(response.data.data.botresp)
			    				$('.login-overlay , .login-popup').addClass('active')
			    					$rootScope.loginURL = response.data.data.botresp
			    			
			    				$rootScope.responseText = localStorage.getItem("MSGIDTEXT"+ $rootScope.mybotname);
				    	}
			    	
			    		
						var BotTypingElement = angular.element(document.querySelector('#bot-typing-container'));	 
					     BotTypingElement.remove(); 
						
				    	
						
						
			            if (response.data.success=="true") {
			              
			            	var msgType = response.data.data.msgType ;
			            	
			            	
			            	if("MSGARRAY" == (msgType).toUpperCase()){
			            		 var responseParse=JSON.parse(response.data.data.content);
			            		 for(var i=0; i< responseParse.length; i++) {
			            			 $rootScope.renderClient(responseParse[i],responseParse[i].msgType,"msgarrayType"); 
			            		 }
			            		 
			            	}else{
			            		 $rootScope.renderClient(response,msgType,"normalType");
			            	}
			            	
			           
							$('.messages-wrap').linkify({
	    						target: "_blank",
	    						location: "no"
							});
							
							if(response.data.data.msgid == "otpsend"){
								$('.chat-container').find('.linkified').text("Click here")
							}
			            }else{	
			            	
							var msgWrapperElements = angular.element(document.querySelector('.messages-wrap'));	
							msgWrapperElements.append($compile(botURL.renderMessage($rootScope.chatConfig.offlinemessage))($rootScope));
							if($rootScope.isRecordingOn == true){
								$rootScope.speakText(response.data.data.content);
				    			$rootScope.isRecordingOn = false;
				    		}
							
						}

				    	// Scroll to the point
			           
			            $rootScope.loadDisabled = false;
			        	$rootScope.disablNow    = false;
			    		$rootScope.disableButton=false;
			    		$rootScope.focused  = true
			    		
			            $rootScope.scrollToPoint("bot", Value.config.botMsgId); 
			            document.getElementById("input_text").focus();
			    		$(document).find('#input_text').click();
				  }, function errorCallback(response) {				  	
                     
					    var BotTypingElement = angular.element(document.querySelector('#bot-typing-container'));	 
	 					BotTypingElement.remove(); 

	 					//through error
	 					var msgWrapperElements = angular.element(document.querySelector('.messages-wrap'));	
	 					msgWrapperElements.append($compile(botURL.renderMessage($rootScope.chatConfig.offlinemessage))($rootScope));					

	 			    	// Scroll to the point
	 			    	consoleWrite(Constants.DISPLAY_CONSOLE,"1 " + Value.config.botMsgId);
	 			    	$rootScope.scrollToPoint("bot", Value.config.botMsgId); 
	 			    	 $rootScope.loadDisabled = false;
				    		$rootScope.disableButton=false;
				    		$rootScope.disablNow    = false;
				    		$rootScope.focused  = true
				    		
				  });
		});	
    };
    
    $rootScope.renderClient=function(response,msgType,tag){
        
  	  var messageWraperElement;
  	
      switch ((msgType).toUpperCase()) {
      
        case "CATALOGUE":
        	 // tested
      	    var responseData = response.data ;
      	  
				var messageWraperElementCATALOGUE = angular.element(document.querySelector('.messages-wrap'));
				
				messageWraperElementCATALOGUE.append($compile(botURL.botShowSlider(responseData.data.botresp.items, responseData.data.botresp.msgid ))($rootScope));

				$(function () {			
		           	botJS.initCarousal();
		        });
          break;
        case "DOUGHNUTCHART":
      	  botURL.renderChartMessage(response.data.data.botresp.chartTitle);

	    		var chartData = response.data.data.botresp.chartData;
				
				$(function () {			
		           	botJS.doughnutPie(chartData, "doughnut");
		        }); 
        	
          break;
        case "PIECHART":
      	  botURL.renderChartMessage(response.data.data.botresp.chartTitle);
	    		
	    		var chartData = response.data.data.botresp.chartData;
				
				$(function () {			
		           	botJS.doughnutPie(chartData, "pie");
		        }); 
        	
          break;
        case "BARCHART":
      	  botURL.renderChartMessage(response.data.data.botresp.chartTitle);

	    		var chartData = response.data.data.botresp.chartData;

	    		var optionData = response.data.data.botresp.option;
				
				$(function () {			
		           	botJS.bar(chartData, optionData );
		        }); 
        	
          break;
        case "LINECHART":
      		botURL.renderChartMessage(response.data.data.botresp.chartTitle);

	    		var chartData = response.data.data.botresp.chartData;

				var optionData = response.data.data.botresp.option;
				$(function () {			
		           	botJS.line(chartData, optionData);
		        }); 
        	 
          break;
        case "QUICKREPLY":
      	
      		var messageWraperElementQUICKREPLY = angular.element(document.querySelector('.messages-wrap'));
      		
      		 if("MSGARRAYTYPE"==(tag).toUpperCase()){
      			 var textMessageHTML = response.content;
      			 localStorage.setItem("LIKEDISLIKETEXT"+ $rootScope.mybotname,textMessageHTML.replace(new RegExp('\n', 'g') , "<br/>"));
      			 messageWraperElementQUICKREPLY.append($compile(botURL.botRenderQuickReply(response.options, textMessageHTML.replace(new RegExp('\n', 'g'), "<br/>"), response.msgid ))($rootScope));
      		 }else{
      			 var textMessageHTML = response.data.data.content;
      			localStorage.setItem("LIKEDISLIKETEXT"+ $rootScope.mybotname,textMessageHTML.replace(new RegExp('\n', 'g') , "<br/>"));
   				 messageWraperElementQUICKREPLY.append($compile(botURL.botRenderQuickReply(response.data.data.options , textMessageHTML.replace(new RegExp('\n', 'g'), "<br/>"), response.data.data.msgid ))($rootScope));	 
      		 }
	    		
				
				if($rootScope.isRecordingOn == true){
			    		$rootScope.speakText(response.data.data.content);
		    			$rootScope.isRecordingOn = false;
		    		}
        	
          break;
        case "LISTVIEW":
        	
      	  var msgWrapperElementslistview = angular.element(document.querySelector('.messages-wrap'));	 
      	  if("MSGARRAYTYPE"==(tag).toUpperCase()){
      		  msgWrapperElementslistview.append($compile(botURL.renderHTMLParaListView(response.options,response.content,response.msgid))($rootScope));
      	  }else{
      		  msgWrapperElementslistview.append($compile(botURL.renderHTMLParaListView(response.data.data.options,response.data.data.content,response.data.data.msgid))($rootScope));
      	  }
      	 
		    	
		    	if($rootScope.isRecordingOn == true){
		    		$rootScope.speakText(response.data.data.content);
	    			$rootScope.isRecordingOn = false;
	    		}
        	
              break;
          
        case "IMG":
      	 
      	  var messageWraperElementIMG = angular.element(document.querySelector('.messages-wrap'));
      	  if("MSGARRAYTYPE"==(tag).toUpperCase()){
      		  var textMessageHTML = response.content;
      		  messageWraperElementIMG.append($compile(botURL.imageRender(textMessageHTML , textMessageHTML.replace(new RegExp('\n', 'g'), "<br/>"), response.msgid ))($rootScope)); 
      	  }else{
      		  var textMessageHTML = response.data.data.content;
      		  messageWraperElementIMG.append($compile(botURL.imageRender(textMessageHTML , textMessageHTML.replace(new RegExp('\n', 'g'), "<br/>"), response.data.data.msgid ))($rootScope));  
      		 }
		     
        	
          break;
        case "VIDEO":
      	 
      	  var messageWraperElementVIDEO = angular.element(document.querySelector('.messages-wrap'));
      	  if("MSGARRAYTYPE"==(tag).toUpperCase()){
      		  var textMessageHTML = response.content;
      		  messageWraperElementVIDEO.append($compile(botURL.videoRender(response.content , textMessageHTML.replace(new RegExp('\n', 'g'), "<br/>"), response.msgid ))($rootScope));
      	  }else{
      		  var textMessageHTML = response.data.data.content;
      		  messageWraperElementVIDEO.append($compile(botURL.videoRender(response.data.data.content , textMessageHTML.replace(new RegExp('\n', 'g'), "<br/>"), response.data.data.msgid ))($rootScope)); 
      	  }
			     
        	 
          break;
        
        default:
      	  var messageWraperElementTEXT = angular.element(document.querySelector('.messages-wrap'));
        if("MSGARRAYTYPE"==(tag).toUpperCase()){
        	
      	  messageWraperElementTEXT.append($compile(botURL.renderMessage(response.content.replace(new RegExp('\n', 'g') , "<br/>")))($rootScope));
        }else{
        	
      	  messageWraperElementTEXT.append($compile(botURL.renderMessage(response.data.data.content.replace(new RegExp('\n', 'g') , "<br>")))($rootScope));
        }
              
	          if($rootScope.isRecordingOn == true){	
		    		$rootScope.speakText(response.data.data.content);
	  			    $rootScope.isRecordingOn = false;
	  		      }
          break;

      }
  }

  
    var timer = null;
    $('#input_text').keyup(function(e){
    if($(this).val != ''){
    	
       clearTimeout(timer); 
           timer = setTimeout(autoSuggestion, 1300);
        	var $listItems = $('.listviewclass');
    	}
           	
           
    });
	 $(document).on('change','.ratting-container span input', function(){
		 
		  	$(this).parent().addClass('active')
		  	var rattingQuestion = $(this).parent().parent().attr('quest')
		  	var rattingmsgid= 1;
		  	var custRatting = $(this).val()
		  	$(this).parent().nextAll().removeClass('active')
		  	$(this).parent().nextAll().addClass('removeStar')
		  	$(this).parent().css('marginRight','0px')
		  	$(this).parent().nextAll().css('marginRight','0px')
			$(this).parent().prevAll().addClass('active')
			$(this).parent().parent().find('input').remove()
			console.log(rattingQuestion + " " + custRatting )
			 var channel=localStorage.getItem("SETCHANNELID"+ $rootScope.mybotname);
			 var addresPath= $rootScope.configurationURL + "/BOTS/faqmaster/answerRating?channelId="+channel+"&starCount="+custRatting+"&userText="+ rattingQuestion +"&msgId="+ rattingmsgid +"&botName="+$rootScope.mybotname;
//			 
			 console.log("addresPath :" + addresPath)
			try {
            var deferred = $q.defer();
            $.ajax({
                  type       : "GET",
                  dataType   : "json",
                  url        : addresPath,
                  contentType: 'application/json',
                  data 		 : "",
                  success    : function(data) {
//                	  console.log("data:"+JSON.stringify(data));
                	  var myElements = angular.element(document.querySelector('.suggestions'));	 
          			  myElements.empty();  
                	  
                  },
                  error 	 : function(data) {
                	  console.log("error"+JSON.stringify(data)); 
                	  $('#listview').removeClass('sg-showing');
                  						consoleWrite(Constants.DISPLAY_CONSOLE,"error "+ JSON.stringify(data));
                  }
                });
        } catch (e) {
       
        	consoleWrite(Constants.DISPLAY_CONSOLE,"exception: "+e);
        }
			
			
		})
    function autoSuggestion() {
    	$('#listview').removeClass('sg-showing');  
     var listHtml="";
 
     var channel=localStorage.getItem("SETCHANNELID"+ $rootScope.mybotname);
	 var usetext=$('#input_text').val();
	
     var addresPath= $rootScope.configurationURL + "/BaseBot/quickSuggestions?channelId="+channel+"&userText="+usetext+"&msgId="+localStorage.getItem("MSGID"+ $rootScope.mybotname)+"&botName="+$rootScope.mybotname;

//      console.log("addresPath===>>"+addresPath);
	 	try {
            var deferred = $q.defer();
            $.ajax({
                  type       : "GET",
                  dataType   : "json",
                  url        : addresPath,
                  contentType: 'application/json',
                  data 		 : "",
                  success    : function(data) {
//                	  console.log("data:"+JSON.stringify(data));
                	  var myElements = angular.element(document.querySelector('.suggestions'));	 
          			  myElements.empty();  
                	  if(data.length!= 0){
                		           		 
                		
                		  var uldiv = $(".suggestions");
	                	  listHtml +='<ul id="listviewdata" class="lst-menu"">';
	                	  for (var i = 0; i < data.length; i++) {
	                		 
	                		  listHtml +='<li class="listviewclass"><a  href="javascript: void(0)" ><img src="images/icons/translate.svg">'+data[i]+'</a></li>';
	                		 
	                	  }
	                	  listHtml +='</ul>';
	                	  
	                	  uldiv.append(listHtml);
	                	if(!$(".other-menu-options").hasClass("showup")){
	                	  $('#listview').addClass('sg-showing');
	                	}
	                	  
	                	  $("#listviewdata li").click(function() {
	                			$('#listview').removeClass('sg-showing');
	                	  	    
	                	  	  $rootScope.userMessage($(this).text()) ;
	                	  
	                	  	});
	                		
	               
                		  
                	  }else{
                		
                		  $('#listview').removeClass('sg-showing');
                		  
                	  }
                  },
                  error 	 : function(data) {
                	  console.log("error"+JSON.stringify(data)); 
                	  $('#listview').removeClass('sg-showing');
                  						consoleWrite(Constants.DISPLAY_CONSOLE,"error "+ JSON.stringify(data));
                  						                               }
                });
        } catch (e) {
       
        	consoleWrite(Constants.DISPLAY_CONSOLE,"exception: "+e);
        }
    }
    document.getElementById('input_text').addEventListener('keydown', function(e) {
        if (e.which === 38 || e.which === 40) {
            e.preventDefault();
        }
    });

  	
		
   	// $rootScope.botFirstCall();
   // FIXME $rootScope.hamburgerRender();
  	$rootScope.likeDislikeReq = function (likedislikecount) { 
  		var selectedoption = ""
  			if(likedislikecount.split('~~~')[0] =='👍' ){
  				
  				selectedoption = "&#128077;~~~" + likedislikecount.split('~~~')[1]
  			}else{
  				selectedoption = "&#128078;~~~" + likedislikecount.split('~~~')[1]
  			}
  				
  		
  			console.log("selectedoption :" + selectedoption)
  		
  		var channel=localStorage.getItem("SETCHANNELID"+ $rootScope.mybotname)
		 var likeordislike;
  		var addressPath = "";  		
		 if(encodeURI(likedislikecount) === "%F0%9F%91%8D"){
			 addressPath= $rootScope.configurationURL + '/BOTS/faq/updatefaqlikedislike/1';
		 } else if(encodeURI(likedislikecount)=== "%F0%9F%91%8E"){
			 addressPath= $rootScope.configurationURL +'/BOTS/faq/updatefaqlikedislike/0';
		 }
		 
		
		
			if(localStorage.getItem("LIKEDISLIKETEXT"+ $rootScope.mybotname) !== ''){
				
				 var quickCarousalElement = angular.element(document.querySelector('.non-sticky'));
 		    	quickCarousalElement.remove();
 		    	
				try {
		            var deferred = $q.defer();
		            $.ajax({
		                  type       : "POST",
		                  dataType   : "json",
		                  url        : addressPath,
		                  contentType: 'application/json',
		                  data 		 : JSON.stringify({'answer': localStorage.getItem("LIKEDISLIKETEXT"+ $rootScope.mybotname)}),
		                  success    : function(data) {
		                	  
		                	
		                	  $rootScope.BotMessage(selectedoption, '');
		                	  
		                	   
		                  
		                  },
		                  error 	 : function(data) {
		                	
		                	  $rootScope.BotMessage(selectedoption, '');
		                  	consoleWrite(Constants.DISPLAY_CONSOLE,"error "+ JSON.stringify(data));
		                  						                               }
		                });
		        } catch (e) {
		        	 
		        	$rootScope.BotMessage(likedislikecount, '');
		        	  
		        	consoleWrite(Constants.DISPLAY_CONSOLE,"exception: "+e);
		        }
		        localStorage.setItem("LIKEDISLIKETEXT"+ $rootScope.mybotname,"");
			}
	}
  	
   	// Add User Message
  	$rootScope.userMessage = function(userText, msgid,title){
  		
  		
  		
  		
  			if(msgid == "language" ){
 				for(var i = 0; i < localStorage.getItem("languagearr"+ $rootScope.mybotname).split(',').length; i ++){
 					if(title == localStorage.getItem("languagearr"+ $rootScope.mybotname).split(',')[i]){
 						$(".chat-box").find('.chat-welcome span b').text(userText);
 					}
  			}
  		}
  			
  	  localStorage.setItem("MSGIDTEXT"+ $rootScope.mybotname,userText);
		if(userText != undefined){
			var myElements = angular.element(document.querySelector('.messages-wrap'));
	    	var userTextHtml = "";

	    	// if more text is there add Toggle
	    
	    	
			if(title==undefined){
	    		userTextHtml = userText  ;
	    	}else{
	    		userTextHtml =   title  ;
	    	}
			if(userText.replace ( /[^\d.]/g, '' ).length == 13) {
		  		 userTextHtml = userText.replace(/\b[\dX][-. \dX]+(\d{4})\b/g, function(match, capture) {
		  		    return Array(match.length-4).join("*") + capture; 
		  		});
	    	
			}else if(userText.replace ( /[^\d.]/g, '' ).length == 6 || userText.replace ( /[^\d.]/g, '' ).length == 5){
				userTextHtml = "******"
			}
	    	html='<div class="chatting righty colored" id="user'+Value.config.userMsgId+'"><div class="chat-container themebg"><p>'+userTextHtml+'</p></div><span class="time-left fadein">'+ getTimeIn12() + '</span></div>'
	  
	    
			myElements.append( html);

			// reset input value
			$rootScope.userInput = undefined;
			var inputFocus = angular.element(document.querySelector('#input_text'));
			
			$(".menu-option").removeClass("active");
		    $(".other-menu-options").removeClass("showup");
		   
		    	
		    
				if(document.querySelector('.lst-quickreply') != undefined){
			    	var quickCarousalElement = angular.element(document.querySelector('.non-sticky'));
			    	 quickCarousalElement.remove();
			    }
	
			
			$rootScope.BotMessage(userText, msgid)
			
		  
		  
			
			
			// Run User Message related Text
			$(function () {	
				
				consoleWrite(Constants.DISPLAY_CONSOLE,"3 " + Value.config.botMsgId);
	           	$rootScope.scrollToPoint("user", Value.config.userMsgId);
	           	$(document).find('#input_text').click();

			    // if more text add Toggle
		/*	   if(userText.length >= Constants.textLengthDisplay){ 
			    	 $('.message-text-wraper').find('.menuTextToggle').off('click');  
						$('.message-text-wraper').find('.menuTextToggle').on('click', function (e) {
						    // e.preventDefault();
						    $(this).closest('.message-text-wraper').find('div').toggleClass('small big');
						    $(this).closest('.message-text-wraper').find('.menuTextToggle').toggleClass('menuTextActive');			    
						});
				    }*/
	        }); 	        
	     }	
	};


	// Remove Conversation
	$rootScope.ClearScreen = function(){	
		var myElements = angular.element(document.querySelector('.messages-wrap'));	 
		myElements.empty();  
		//$rootScope.menuClick(); 	
		$rootScope.BotMessage(Value.config.welcomeMessage,Constants.CLEARCHATTINGEVENT);	
		//$(".other-menu-options").toggleClass("showup");
		$(".menu-option").removeClass("active");
	    $(".other-menu-options").removeClass("showup");
	    $(".overlay").removeClass("active");
	    
		/* $rootScope.BotMessage("help",""); */
	    $(".chat-box").find('.chat-welcome span b').text("English");
	};
	$rootScope.captureUserLocation=function() {
    	geolocationSvc.getCurrentPosition().then(function(location)
    		{
    			consoleWrite(Constants.DISPLAY_CONSOLE,location.coords);
    			consoleWrite(Constants.DISPLAY_CONSOLE,location.coords.latitude+" , "+location.coords.longitude);
    			Value.lat = location.coords.latitude;
    			Value.lang = location.coords.longitude;
    		});
	}
	


	if("uat"==Constants.ENV)
	{
		$rootScope.captureUserLocation();
	}
	
	
	setInterval(function () {
     	
	      

        if($location.path() == '/chatbot'){
       
      

       
        	var addressPath= $rootScope.configurationURL + '/BaseBot/getUserChannelResponse';
        	
        	var inputData = {"botName":$rootScope.mybotname,"userChannelId":localStorage.getItem("SETCHANNELID"+ $rootScope.mybotname),"botkey":$rootScope.mybotname }
        	
		
        try {
            var deferred = $q.defer();
            $.ajax({
                  type       : "POST",
                  dataType   : "json",
                  url        : addressPath,
                  contentType: 'application/json',
                  data 		 : JSON.stringify(inputData),
                  success    : function(data) {
                  	 
                	  consoleWrite(Constants.DISPLAY_CONSOLE,"Data:==>> "+JSON.stringify(data));
                    
                      for (var i=0;i< data.length; i++) {
                      	  
                      if(data[i].data != null  &&  data[i].data != ""  &&  data[i].data != undefined ){
                          
                      	
                      
                        	var msgWrapperElements = angular.element(document.querySelector('.messages-wrap'));	    
					    	msgWrapperElements.append($compile(botURL.renderMessage(data[i].data.content))($rootScope));
					    	$rootScope.scrollToPoint("bot", Value.config.botMsgId); 
					    	$(document).find('#input_text').click();
                      }
               
                 
                      }

                  
                
                  },
                  error 	 : function(data) {
                  						consoleWrite(Constants.DISPLAY_CONSOLE,"error "+ JSON.stringify(data));
                  						// $rootScope.gotoBotHome('/easterEgg');
                               }
                });
        } catch (e) {
        	consoleWrite(Constants.DISPLAY_CONSOLE,"exception: "+e);
        }
    }
       
 },30000);
       
	
});

