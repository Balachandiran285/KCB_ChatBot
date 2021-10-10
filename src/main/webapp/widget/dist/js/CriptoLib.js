function encryptText(txtToEncrypt, PASSPHRASE)
{
	var salt = CryptoJS.lib.WordArray.random(128/8);
  	var iv = CryptoJS.lib.WordArray.random(128/8); 
	var key128Bits = CryptoJS.PBKDF2(PASSPHRASE, salt, { keySize: 128/32 }); 
  	var key128Bits100Iterations = CryptoJS.PBKDF2(PASSPHRASE, salt, { keySize: 128/32, iterations: 100 });
  	var encrypted = CryptoJS.AES.encrypt(txtToEncrypt, key128Bits100Iterations, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7  });
	var CombineData = salt+"~~~"+iv+"~~~"+encrypted;	
	return CombineData;
}

function deviceDecryption(deviceType, listOfParam, encryptionKey)
{
	var decryptedListOfParam=[],i=0;
	if(deviceType == "android")
	{
		for (var iterable_element in listOfParam) {			
			//alert("@@listOfParam[iterable_element]="+ listOfParam[iterable_element]);
			decryptedListOfParam[i]= decryptWithFFI(listOfParam[iterable_element], encryptionKey);
			//alert("@@decryptedListOfParam[i]="+ decryptedListOfParam[i]);
			i++;
		}
	}
	else{
		//alert("else part= "+encryptionKey);
		/* for (var iterable_element in listOfParam) {			
			decryptedListOfParam[i]= decryptText(listOfParam[iterable_element], encryptionKey);
			i++;
		} */		
	}
	return decryptedListOfParam;
}













function decrypt(txtToDecrypt, PASSPHRASE){
	
 try{
	  var arrdata = txtToDecrypt.split("~~~");
	  var serverSalt = arrdata[0] , 
	  serveriv = arrdata[1] , 
	  encryptedData = arrdata[2] ;
	  var salt = CryptoJS.enc.Hex.parse(serverSalt);
	  var iv = CryptoJS.enc.Hex.parse(serveriv);
	  var key = CryptoJS.PBKDF2(PASSPHRASE, salt, { keySize: 128/32, iterations: 100 });
	 
	  var decrypt = CryptoJS.AES.decrypt(encryptedData, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
	
	  var decryptValue = decrypt.toString(CryptoJS.enc.Utf8); 
	  return decryptValue;

	}
	catch(e)
	{
	
	}
} 

function decryptdata(txtToDecrypt, PASSPHRASE){
	
	//console.log("inside decryptText" +txtToDecrypt);
	//console.log("inside passphrase" +PASSPHRASE);
	
 try{
	  var arrdata = txtToDecrypt.split("~~~");
	  var serverSalt = arrdata[0] , 
	  serveriv = arrdata[1] , 
	  encryptedData = arrdata[2] ;
	  var salt = CryptoJS.enc.Hex.parse(serverSalt);
	  console.log("salt "+salt);
	  var iv = CryptoJS.enc.Hex.parse(serveriv);
	   console.log("iv "+iv);
	  var key = CryptoJS.PBKDF2(PASSPHRASE, salt, { keySize: 128/32, iterations: 100 });
	 alert("key "+key);
	  var decrypt = CryptoJS.AES.decrypt(encryptedData, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
	  alert("decrypt "+decrypt);
	  var decryptValue = decrypt.toString(CryptoJS.enc.Utf8); 
	  console.log("decryptValue" +decryptValue);
	  return decryptValue;

	}
	catch(e)
	{
	
	}
} 