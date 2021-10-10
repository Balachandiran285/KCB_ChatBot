var chatConfig =angular.module('chatBotApp.config',[]);

chatConfig.controller('chatConfig',function($rootScope, $scope, $compile, Constants, Value) {

	$rootScope.changeUrl=function()
	{
		consoleWrite(Constants.DISPLAY_CONSOLE,"value.clickCount: "+Value.clickCount);
		Value.clickCount++;
		if(Value.clickCount==6)
		{	
			consoleWrite(Constants.DISPLAY_CONSOLE,"now modal should open");
			document.getElementById('easterEggModal').style.display="block";
			emptyValuebyID('ipText');
			emptyValuebyID('chatIpText');
		}
	}

	$rootScope.setUrl=function(configUrl,chatUrl,isModal)
	{
		consoleWrite(Constants.DISPLAY_CONSOLE,configUrl+" : "+chatUrl);
		var prefixIp='http://';
		if(validateEmpty(chatUrl) && validateEmpty(configUrl))
		{
			
		}
		else
		{
			if(validateEmpty(chatUrl))
			{
				consoleWrite(Constants.DISPLAY_CONSOLE,"chatUrl empty entered");
				$rootScope.configurationURL = prefixIp+configUrl;
				consoleWrite(Constants.DISPLAY_CONSOLE,"$rootScope.configurationURL: "+$rootScope.configurationURL);
				Value.clickCount=1;
				$rootScope.getResponsePromise();
			}
			else if(validateEmpty(configUrl))
			{
				consoleWrite(Constants.DISPLAY_CONSOLE,"configUrl empty entered");
				$rootScope.ipURL=prefixIp+chatUrl;
				consoleWrite(Constants.DISPLAY_CONSOLE,"$rootScope.ipURL: "+$rootScope.ipURL);
				Value.clickCount=1;
			}
			else
			{
				$rootScope.configurationURL = prefixIp+configUrl;
				$rootScope.ipURL=prefixIp+chatUrl;
				Value.clickCount=1;
				$rootScope.getResponsePromise();
			}
		}
		if(isModal)
			document.getElementById('easterEggModal').style.display="none";
		
	}

	$rootScope.resetToPublic=function(isModal)
	{
		$rootScope.configurationURL = Constants.CONFIGIP_UATDEMO;
		$rootScope.ipURL = Constants.CONFIGIP_UATDEMO;		//default public url
		Value.clickCount=1;
		$rootScope.getResponsePromise();
		if(isModal)
		document.getElementById('easterEggModal').style.display="none";
	}

	$rootScope.resetCount=function(isModal)
	{
		Value.clickCount=1;
		if(isModal)
		document.getElementById('easterEggModal').style.display="none";
	}


});