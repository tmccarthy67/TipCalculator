	var clickedIt = false;
	var sliderValue = 20;
	var convertedValue = 0;
	var calculatedTip = 0;

//initial state
$('#title').show();
$('#inputBox').show();
$('#slider').hide();
$('#sliderValuePosition').hide();
$('#start').hide();
$('#output').hide();

// JavaScript Unleashed, Third Edition
// by Richard Wagner and R. Allen Wyke

// ISBN: 067231763X
// Publisher Sams CopyRight 2000

function moneyFormat(textObj) {
	// the input format is string to account for the possibity of mistyping
   var newValue = textObj;
   var decAmount = "";
   var dolAmount = "";
   var decFlag = false;
   var aChar = "";

   // ignore all but digits and decimal points.
   for(i=0; i < newValue.length; i++) {
      aChar = newValue.substring(i,i+1);
      if(aChar >= "0" && aChar <= "9") {
         if(decFlag) {
            decAmount = "" + decAmount + aChar;
         }
         else {
            dolAmount = "" + dolAmount + aChar;
         }
      }
      if(aChar == ".") {
         if(decFlag) {
            dolAmount = "";
            break;
         }
         decFlag=true;
      }
   }

   // Ensure that at least a zero appears for the dollar amount.
   if(dolAmount == "") {
      dolAmount = "0";
   }
   // Strip leading zeros.
   if(dolAmount.length > 1) {
      while(dolAmount.length > 1 && dolAmount.substring(0,1) == "0") {
         dolAmount = dolAmount.substring(1,dolAmount.length);
      }
   }

   // Round the decimal amount.
   if(decAmount.length > 2) {
      if(decAmount.substring(2,3) > "4") {
         decAmount = parseInt(decAmount.substring(0,2)) + 1;
         if(decAmount < 10) {
            decAmount = "0" + decAmount;
         }
         else {
            decAmount = "" + decAmount;
         }
      }
      else {
         decAmount = decAmount.substring(0,2);
      }
      if (decAmount == 100) {
         decAmount = "00";
         dolAmount = parseInt(dolAmount) + 1;
      }
   }

   // Pad right side of decAmount
   if(decAmount.length == 1) {
      decAmount = decAmount + "0";
   }
   if(decAmount.length == 0) {
      decAmount = decAmount + "00";
   }

   // Check for negative values and reset textObj
   if(newValue.substring(0,1) != '-' ||
         (dolAmount == "0" && decAmount == "00")) {
      textObj = dolAmount + "." + decAmount;
   }
   return (textObj);
}

function clearTextArea(id){
	//on selecting input box - remove default value
	if (clickedIt == false){
		id.value="";
		clickedIt=true;
	}
}

var outputResults = function () {
	$('#slider').hide();
	$('#sliderValuePosition').hide();
	$('#output').show();
	// convert string to number for addition
	numberConvertedValue = Number(convertedValue);
	numberCalculatedTip = Number(calculatedTip);
	// total tip + bill
	billTotal = numberConvertedValue + numberCalculatedTip;
	// convert total to string to check money format
	billTotalString = billTotal.toString();
	totalBill = moneyFormat(billTotalString);
	//output results
	$('#output').append('<p id="totalBillOutput">');
	$('#totalBillOutput').text('Total Bill $' + convertedValue);
	$('#output').append('<p id="totalTipOutput">');
	$('#totalTipOutput').text('Tip $' + calculatedTip);
	$('#output').append('<p id="totalTabOutput">');
	$('#totalTabOutput').text('Total $' + totalBill);
}

var getSliderValue = function () {
	$('#inputBox').hide();
	$('#slider').show();
	$('#sliderValuePosition').show();

    // get slider value
 	$('#myRange').click(function() {
	sliderValue = $("#myRange").val();
    $('#sliderValuePosition').text(sliderValue);
  calculateTip();
	});
}

var calculateTip = function () {
	preCalculatedTip = (convertedValue * sliderValue)/100;
	preCalculatedTipString = preCalculatedTip.toString();
	calculatedTip = moneyFormat(preCalculatedTipString);
	outputResults();
}

var checkInputFormat = function (inputAmount) {
	convertedValue = moneyFormat(inputAmount);
	getSliderValue();
}

var getInputString = function () {
 	$('#input_value').click(function() {
	var inputarea_value = $("textarea").val();
	checkInputFormat(inputarea_value);
	});
	$('#inputarea_reset').click(function() {
	$("#inputarea").val('');
	});

}

var getInput = function () {
	$('#input_value').click(getInputString);
}

$('#title').text('Tip Calculator');
document.getElementById("input").defaultValue = "Input bill total";
$('textarea').attr('onfocus', "clearTextArea(this)");
$('#inputBox').append('<input type="button" id="input_value" value="Enter Bill Total"/>');
$('#slider').text('Select tip percentage (%)');
$('#slider').append('<input type="range" id="myRange" min="0" max="50" value="20">');
$('#sliderValuePosition').append(sliderValue);
$('#start').append('<input type="button" id="inputarea_value" value="Calculate Tip"/>');

// call main function when document is loaded
document.addEventListener('DOMContentLoaded', function () {
	if (convertedValue == "") {
		getInput();
	};
});