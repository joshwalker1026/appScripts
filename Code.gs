function checkValue() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var listStart = 2;
  var listEnd = 20;
  
  var stockName = sheet.getRange("A"+listStart+":A"+listEnd).getValues();
  var currentEarnPercent = sheet.getRange("K"+listStart+":K"+listEnd).getValues();
  var currentPrice = sheet.getRange("I"+listStart+":I"+listEnd).getValues();
  var TargetLowerBound = sheet.getRange("L"+listStart+":L"+listEnd).getValues();
  var TargetUpperBound = sheet.getRange("M"+listStart+":M"+listEnd).getValues();
  var TargetLowerPrice = sheet.getRange("N"+listStart+":N"+listEnd).getValues();
  var TargetUpperPrice = sheet.getRange("O"+listStart+":O"+listEnd).getValues();
  
  
  
  for (var i = 0; i < currentEarnPercent.length; i++) {
    
    if ((currentEarnPercent[i] != '' && TargetLowerBound[i] != '') && (currentEarnPercent[i]*100 < TargetLowerBound[i])) {
    // Warn email lower bound
      sendMail(stockName[i], "lower", currentEarnPercent[i]*100, TargetLowerBound[i] );
    }
    
    if ((currentEarnPercent[i] != '' && TargetUpperBound[i] != '') && (currentEarnPercent[i]*100 > TargetUpperBound[i])) {
    // Warn email upper bound
        sendMail(stockName[i], "upper", currentEarnPercent[i]*100, TargetUpperBound[i] );
    }
    
     if ((TargetLowerPrice[i] != '') && (currentPrice[i] < TargetLowerPrice[i])) {
    // Warn email lower price
         sendMail(stockName[i], "lower", currentPrice[i]*100, TargetLowerPrice[i] );
    }
    
     if ((TargetUpperPrice[i] != '') && (currentPrice[i] > TargetUpperPrice[i])) {
    // Warn email upper price
       sendMail(stockName[i], "upper", currentPrice[i]*100, TargetUpperPrice[i] );
    }
                          
    Logger.log('Value: ' + stockName[i]);
    Logger.log('Value: ' + currentEarnPercent[i]);
    Logger.log('Lower: ' + TargetLowerBound[i]);
  }
}

function sendMail(stockName, upperLower, currentValue, targetValue) {
  
    var templ = HtmlService
      .createTemplateFromFile('emailTemplate');
  
  templ.stockName = stockName;
  templ.upperLower = upperLower;
  templ.currentValue = currentValue;
  templ.targetValue = targetValue;
 
  MailApp.sendEmail({
    to: "joshwalker.cheng@gmail.com",
    subject: "Stock " + stockName + " reachs " + upperLower + " price!",
    htmlBody: templ.evaluate().getContent()
  });
}