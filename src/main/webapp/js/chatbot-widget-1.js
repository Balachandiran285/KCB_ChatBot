$(document)
		.ready(
				function() {
					var ip = ""
					var clicked;
					$(".kiyabot-pop").hide(0);
					setTimeout(function(){ $(".kiyabot-pop").fadeIn(); }, 2000);
					$(".chat-bot-icon") 
							.click(
									function() {

										if ($(".chatbot-wiget").length == '0') {

											$(".chat-bot-icon").css("display",
													"none");
											$("<div class='chatbot-wiget'/>")
													.html(
															'<div class="chat-header"><div class="row">'
																	+ '<div class="col-md-9 col-sm-9 col-xs-9 col-9"><span><img src="img/ug-kcb-logo.webp" alt="KCB icon"></span><b>Ask Kaycee</b>'
																	+ '</div>'
																	+ '<div class="col-md-3 col-sm-3 col-xs-3 col-3">'
																	+ '<div class="chat-head-action">'
																	+ '<a href="javascript:;" class="chat-minimize mini"><img src="'+ ip +'widget/assets/images/icons/down.svg"></a>'
																	+ '<a href="javascript:;" class="chat-hide"><img src="'+ ip +'widget/assets/images/icons/cross.svg"></a>'
																	+ '</div>'
																	+ '</div>'
																	+ '</div>'
																	+ '</div>'
																	
																	+ '<iframe id="maniframe" class="chatbot-iframe" src="'+ ip +'widget/home.html" frameborder="0"></iframe>'
																	+ '<div class="poweredby"><p>Powered by</p><a target="blank" href="http://www.infrasofttech.com/"><img src="'+ ip + 'img/Infrasoft-logo.png">  </a></div>'
																	
															)
													.appendTo("body");
											$('.chatbot-iframe').slideToggle();
											$('.chat-btn-open').toggle();
											$('.chat-btn-close').toggle();
											$('.chatbot-wiget').addClass('active')	
												} else {
											$('.chatbot-iframe').slideToggle();
											$('.chat-btn-open').toggle();
											$('.chat-btn-close').toggle();
											$('.chatbot-wiget').slideToggle();
											// $(".btn-chat").toggle();
											$('.chatbot-wiget').remove();
										}

									});

					$('body').on('click', ".chat-hide", function() {

						$('.chatbot-wiget').remove();
						$(".chat-bot-icon").css("display", "block");
					});

					$('body').on('click', ".chat-minimize", function() {
						$(".chat-bot-icon").css("display", "none");

						if ($(".mini").length == '1') {

							$(this).removeClass("mini");
							$(this).addClass("minirotet");
							$('.minimizedbot').addClass('showBot')
//							$('.chatbot-wiget').css({
//								'max-height' : '72px'
//							});
							$('.chatbot-wiget').removeClass('opened')
							$('.chatbot-wiget').addClass('Minimized')
							$('.chatbot-wiget').removeClass('active')	
							$(".chat-header").css('border-top-left-radius', '0px');
							$(".chat-header").css('border-top-right-radius', '0px');
							
						} else {

							$(this).addClass("mini");
							$(this).removeClass("minirotet");

//							$('.chatbot-wiget').css({
//								'max-height' : '85vh'
//							});
							$('.chatbot-wiget').removeClass('Minimized')
							$(".chat-header").css('border-top-left-radius', '10px');
							$(".chat-header").css('border-top-right-radius', '10px');

						}

					});
					
					
					$('body').on('click', ".minimizedbot", function() {
						
						$(this).removeClass('showBot')
						$('.chatbot-wiget').removeClass('Minimized')
						$('.chatbot-wiget').removeClass('active')	
						$('.chatbot-wiget').addClass('opened')
						$(".chat-header").css('border-top-left-radius', '10px');
						$(".chat-header").css('border-top-right-radius', '10px');
						$('.chat-minimize').addClass("mini");
						$('.chat-minimize').removeClass("minirotet");
					});
						
					
					$(".closepop").click(function(event) {
						event.stopPropagation();
						$(".kiyabot-pop").hide();
						clicked = true;
						 $(".closepop").hide();
						

					});
					
					 /* $(".kiyabot-pop").click(function(event) {
						event.stopPropagation();
					
					});

					$(".chat-bot-icon-image").mouseover(function(){
						  $(".kiyabot-pop").show();
						 
						  
					  });
					  $(".chat-bot-icon-image").mouseout(function(){
						  if(clicked==true){
						  $(".kiyabot-pop").hide();
						
						  }
					  });*/
					
					

				});