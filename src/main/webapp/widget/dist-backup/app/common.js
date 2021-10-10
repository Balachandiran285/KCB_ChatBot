/**
 * @function validateEmpty
 * @param {string} validateText - The string to be tested for blank value.
 * description - This function returns true if the string is not having a value.
 */

function validateEmpty(validateText) {
  return(validateText == undefined || validateText == '' || validateText == null || validateText == ' ')
}

/**
 * @function validateNonEmpty
 * @param {string} validateText - The string to be tested for non blank value.
 * description - This function returns true if the string is having a value.
 */

function validateNonEmpty(validateText) {
  return(validateText != undefined || validateText != '' || validateText != null || validateText != ' ')
}

/**
 * @function validateEmptyArray
 * @param {string} arr - The array to be tested for null value.
 * description - This function returns true if the array is null.
 */

function validateEmptyArray(arr) {
  return(arr.length == 0 || arr == [])
}

/**
 * @function emptyFieldbyID
 * @param {string} arr - The ID of the html element to be nullified.
 * description - This function clears the value of the HTML element.
 */
function emptyFieldbyID(id) {
  document.getElementById(id).innerHTML="";
}

/**
 * @function emptyValuebyID
 * @param {string} arr - The ID of the html element to be nullified.
 * description - This function clears the value of the HTML element.
 */
function emptyValuebyID(id) {
  document.getElementById(id).value="";
}

/**
 * @function validateEmptywithZero
 * @param {string} validateText - The string to be tested for blank value.
 * description - This function returns true if the string is not having a value or has a zero value.
 */

function validateEmptywithZero(validateText) {
  return(validateText == undefined || validateText == '' || validateText == null || validateText == 0 || validateText == ' ')
}

/**
 * @function validateMultipleEmpty
 * @param {strings} - Any number of params can be passed to validate for empty value.
 * description - This function returns true if any of the string is not having a value or has a zero value.
 */
function validateMultipleEmpty()
{
  if(arguments.length > 0){  
    for(var i=0; i<arguments.length; i++){
      var validateText = arguments[i];
      if(validateEmpty(validateText))
      { 
        return true;
        break;
      }
      else{
        continue;
      }
           
    }
  }
}

/**
 * @function assignInnerHTMLByID
 * @param {string} - id of the element which is to be assigned with the value.
 * @param {string} - value which is to be assigned.
 * description - This function assigns value to the HTML element.
 */ 
function assignInnerHTMLByID(id,value)
{
  document.getElementById(id).innerHTML = value;
}

/**
 * @function assignValueByID
 * @param {string} - id of the element which is to be assigned with the value.
 * @param {string} - value which is to be assigned.
 * description - This function assigns value to the HTML element.
 */ 
function assignValueByID(id,value)
{
  document.getElementById(id).value = value;
}

/**
 * @function EmptyMultipleVariables
 * @param {strings} - Any number of params can be passed to initialized with empty value.
 * description - This function initializes all variables with blank value
  */
function EmptyMultipleVariables()
{
  if(arguments.length > 0){  
    for(var i=0; i<arguments.length; i++){
      var validateText = arguments[i];
      validateText = '';       
    }
  }
}

/**
 * @function validate2EmptyFieldswithAND
 * @param {string} validateText1 - The first string to be tested for blank value.
 * @param {string} validateText2 - The second string to be tested for blank value.
 * description - This function returns true if the string is not having a value.
 */

function validate2EmptyFieldswithAND(validateText1,validateText2) {
  if(validateEmpty(validateText1))
  {
    if(validateEmpty(validateText2))
    {
      return true;
    }
    else{
      return false;
    }
  }
}

/**
 * @function validate3EmptyFieldswithAND
 * @param {string} validateText1 - The first string to be tested for blank value.
 * @param {string} validateText2 - The second string to be tested for blank value.
 * @param {string} validateText3 - The second string to be tested for blank value.
 * description - This function returns true if all the strings are not having a value.
 */

function validate3EmptyFieldswithAND(validateText1,validateText2,validateText3) {
  if(validateEmpty(validateText1))
  {
    if(validateEmpty(validateText2))
    { 
      if(validateEmpty(validateText3))
      {
        return true;
      }
      else{
        return false;
      }
    }
  }
}


/**
 * @function validate2EmptyFieldswithNAND
 * @param {string} validateText1 - The first string to be tested for blank value.
 * @param {string} validateText2 - The second string to be tested for non blank value.
 * description - This function returns true if one string is empty and other has a value.
 */

function validate2EmptyFieldswithNAND(validateText1,validateText2) {
  if(validateEmpty(validateText1))
  {
    if(validateEmpty(validateText2))
    { 
        return false;
    }
      else{
        return true;
      }
  }
}


/**
 * @function EmptyMultipleHTMLElementsByID
 * @param {strings} - Any number of params can be passed to initialized with empty value.
 * description - This function initializes all variables with blank value
*/
function EmptyMultipleHTMLElementsByID()
{
  if(arguments.length > 0){  
    for(var i=0; i<arguments.length; i++){
      document.getElementById(arguments[i]).innerHTML = '';
    }
  }
}

/**
 * @function EmptyMultipleHTMLElementValuesByID
 * @param {strings} - Any number of params can be passed to initialized with empty value.
 * description - This function initializes all variables with blank value
*/
function EmptyMultipleHTMLElementValuesByID()
{
  if(arguments.length > 0){  
    for(var i=0; i<arguments.length; i++){
      document.getElementById(arguments[i]).value = '';
    }
  }
}

/**
 * @function EmptyMultipleHTMLElementValuesByID
 * @param {strings} - Any number of params can be passed to initialized with empty value.
 * description - This function initializes all variables with blank value
*/
function getElementValueByID(id)
{
  return(document.getElementById(id).value);
}


/**Month Name array*/
var monthNameArray=[];
monthNameArray.push({
  monthId:01,
  monthName:'January'
},
{
  monthId:02,
  monthName:'February'
},
{
  monthId:03,
  monthName:'March'
},
{
  monthId:04,
  monthName:'April'
},
{
  monthId:05,
  monthName:'May'
},
{
  monthId:06,
  monthName:'June'
},
{
  monthId:07,
  monthName:'July'
},
{
  monthId:08,
  monthName:'August'
},
{
  monthId:09,
  monthName:'September'
},
{
  monthId:10,
  monthName:'October'
},
{
  monthId:11,
  monthName:'November'
},
{
  monthId:12,
  monthName:'December'
});

/**
 * @function getMonthName
 * @param {int} - month id to be passed 
 * description - it will return the name of month corresponding to the month id passed in function as param.
*/
function getMonthName(id)
{
  for(i=0;i<=11;i++)
  {
    if(id==monthNameArray[i].monthId)
    {
      return monthNameArray[i].monthName;
    }
  }
}

/**
 * @function clickOnNextPress
 * @param {int,int} - id1 of Element,id2 of Element 
 * description - it will click the element having the id2.
*/
    function clickOnNextPress(idBeforeKeyPress,idAfterKeyPress)
    {
      $(document).ready(function () {
      $(idBeforeKeyPress).keypress(function(e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if ( (code==13) || (code==10))
                {
                  //Your code goes here
                   $(idAfterKeyPress).trigger( 'click' );
                }
                return true;
           });

      
      }); 
    }         
 
/**
 * @function focusOnNextPress
 * @param {int,int} - id of Element,id of Element 
 * description - it will pass the focus from first param element to another.
*/
    function focusOnNextPress(idBeforeKeyPress,idAfterKeyPress)
    {
      $(document).ready(function () {
      
        $(idBeforeKeyPress).keypress(function(e) {
              var code = (e.keyCode ? e.keyCode : e.which);
              if ( (code==13) || (code==10))
                  {
                     $(idAfterKeyPress).trigger( 'focus' );
                  }
                  return true;
             });
      }); 
    } 
  
/**
 * @function clickOnCard
 * @param {int,int,int} - id of Element,id of Element,id of element
 * description - it will pass the focus from first param element to another.
*/
function clickOnCard(idToClick,idClick1,idClick2)
{  
  $(document).ready(function () {
      
        $(idToClick).keydown(function(e) {
        
              var code = (e.keyCode ? e.keyCode : e.which);
              if (code==9)
                  {
                     $(idClick1).trigger( 'click' );
                     $(idClick2).trigger( 'click' );
                  }
                  return true;
             });
      }); 

}

  /**
   * @function isFloat
   * @param {value} - parameter to be checked for Float
   * description - This function checks if the paramter is a float value.
  */
function isFloat(n){
    return Number(n) == n && n % 1 != 0;
}

  /**
   * @function isInt
   * @param {value} - parameter to be checked for Integer
   * description - This function checks if the paramter is an Integer value.
  */
function isInt(n){
    return Number(n) == n && n % 1 == 0;
}

  /**
   * @function validateEmail
   * @param {value} - parameter to be checked for Email Format
   * description - This function checks if the paramter is a validated Email Format.
  */
function validateEmail(validateString)
{ 
  var reg =/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return(reg.test(validateString));
}

  /**
   * @function validateNumber
   * @param {value} - parameter to be checked for Number Format
   * description - This function checks if the parameter is a validated Number Format.
  */
function validateNumber(validateString)
{ 
  var checkNumber = /^[1-9]{1}[0-9]+/;
  return(checkNumber.test(validateString));
}

/**
   * @function checkForAndroid
   * @param {value} - parameter to be checked for Android Platform
   * description - This function checks if the parameter is Android
*/
function checkForAndroid(platform)
{ 
  return(platform == "android" ||platform == "Android"||platform == "ANDROID")
}

/**
   * @function checkForioS
   * @param {value} - parameter to be checked for ioS Platform
   * description - This function checks if the parameter is ioS
*/
function checkForioS(platform)
{ 
  return(platform == 'iOS' || platform == 'ios'|| platform == 'IOS')
}

/**
 * @function assignClassByID
 * @param {string} - id of the element which is to be assigned with the class.
 * @param {string} - value which is to be assigned.
 * description - This function assigns Class to the HTML element.
 */ 
function assignClassByID(id,value)
{
  document.getElementById(id).className = value;
}

/**
 * @function numberWithCommas
 * @param {int} -  Parameter to be converted into comma separated number
 * description - This function will return the comma separated number at interval of 3
 */ 

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /**
 * @function consoleWrite
 * @param {boolean} -  to display the console messages or not
 * @param {string} -  Message to be display on console
 * description - This function will write the messaeg on console depending upon the todisplay parameter
 */ 

  function consoleWrite(toDisplay,msg)
  {
    if(toDisplay)
    {
//      console.log(msg);
    }
  }

   /**
 * @function sleep
 * @param {int} -  milliseconds of time
 * description - This function will send the process to sleep for the specific miliseconds
 */ 

  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

 /**
 * @function genRandomDigit
 * @param {int} - length of random number to be generated.
 * description - This function returns the random number of specified length.
 */ 

 function genRandomDigit(length)
 {
    minValue = 1;
    maxValue = 9;
    for(i=0;i<length-1;i++)
    {
      minValue = minValue+"0";
      maxValue = maxValue+"9";
    }
   return Math.floor((Math.random() * parseInt(maxValue)) + parseInt(minValue));
 }


 /**
 * @function addZero
 * @param {int} - parameter to check for adding the zero.
 * description - This function will return the value prefixed with zero if the provided number is less than 10.
 */ 
function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
}
  
 /**
 * @function startTime
 * description - This function will return the current time in 24-hrs format.
 */ 

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var pmam = ""; 

    m = addZero(m);
    s = addZero(s);
    
    var t = h+":"+m;
    return t;
}

/**
 * @function getTimeIn12
 * description - This function will return the current time in 12-hrs format.
 */ 

function getTimeIn12()
{
   var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var pmam = ""; 

    m = addZero(m);
    s = addZero(s);
    nh=h;
  if (h >= 12) {
  if(h==12)
  {
    nh=h;
  }
  else{
    nh=(h-12);
  }
  pmam = " PM";
}else{
  pmam = " AM" ;
}

nh = addZero(nh);
   
    var t = nh + ":" + m + pmam;
    return t;
}

/**
 * @function htmlToPlaintext
 * @param {string} - html data.
 * description - This function will convert html tags into plain text. This will replace html symbols to html entities.
 */ 


function htmlToPlaintext(text) {
  
	var map = {
		    '&': '&amp;',
		    '<': '&lt;',
		    '>': '&gt;',
		    '"': '&quot;',
		    "'": '&#039;'
		  };

		  return text.replace(/[&<>"']/g, function(m) { return map[m]; });

}

function getDate(){
	var monthNames = [ "Jan", "Feb", "March", "Apr", "May", "Jun",
	                   "July", "Aug", "Sep", "Oct", "Nov", "Dec" ];
	               var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

	               var newDate = new Date();
	               newDate.setDate(newDate.getDate());    
	               //$('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());
	               var maundate = newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear();
	               return maundate;
}
