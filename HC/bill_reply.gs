function emailConfirmation(){
  var submissionsArray = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var submissions=submissionsArray[0];
  var hcDetail = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("EmailComponents");
  var submittedRow = submissions.getLastRow();
  var currBack=submissions.getRange(submittedRow, 1,1,1).getBackground();
  var nullBack=submissions.getRange(submittedRow, 2,1,1).getBackground();
  //check if it's already done to MAKE SURE NO ONE GETS DUPLICATE EMAILS.
  //if (nullBack==currBack)
  if (true)
  {
    //Data Fetch
    var BillType = submissions.getRange(submittedRow, 3).getValue();
    var toEmail = submissions.getRange(submittedRow, 7).getValue();
    var submitterName = submissions.getRange(submittedRow, 5).getValue();
    var billTitle = submissions.getRange(submittedRow, 2).getValue();
    var AmtRequested1 = submissions.getRange(submittedRow, 15).getValue();
    var AmtRequested2 = submissions.getRange(submittedRow, 13).getValue();
    var EventFinance =submissions.getRange(submittedRow, 14).getValue();
    var ItemFinance =submissions.getRange(submittedRow, 16).getValue();
    var summary =submissions.getRange(submittedRow, 4).getValue();
    var EventDate=submissions.getRange(submittedRow, 9).getValue();
    var position=submissions.getRange(submittedRow, 6).getValue();
  
    //Variables
    var subject = "Hall Council Bill Received"; 
    var hcoEmail = hcDetail.getRange(2, 2).getValue();
    var hcoName = hcDetail.getRange(1, 2).getValue();
    var itCoord = "it@rha.gatech.edu"
  
    //Message start is different to author than it is to HCO
    var messageHead=hcDetail.getRange(3,2).getValue();
    var messageTail=hcDetail.getRange(5,2).getValue();
    var prefix=hcDetail.getRange(7,2).getValue(); // bill prefix
    var HCOhead="Hello. <br/>"+ submitterName + " has submitted a bill. Details are as follows:<br/>";
    //Message to HCO
    var hcoEventMessage = "<TABLE border='1' cellpadding='5' cellspacing='0' width='700'><tbody align='center' style='font-family:Tahoma; background-color:#C8C8C8'><tr><td width='15%'><b>Bill Number</b></td><td width='45%'><b>Title and Summary</b></td><td width='10%'><b>Author</b></td><td width='10%'><b>Position</b></td><td width='10%'><b>Cost</b></td></tr></tbody><tbody align='left' style='font-family:Tahoma'><tr><td width='15%'>" + prefix + " ***</td><td width='45%'><u>Event</u>: <b>" + billTitle + "</b> <br/>" + summary + "<br/>" + EventDate + "<br/>" + EventFinance + " <br/><br/>STATUS: Submitted, 0-0-0</td><td width='10%'>" + submitterName + "</td><td width='10%'>" + position + "</td><td width='10%'>" + AmtRequested1 + AmtRequested2 +"</td></tr></tbody></table>";
    var hcoItemMessage= "<TABLE border='1' cellpadding='5' cellspacing='0' width='700'><tbody align='center' style='font-family:Tahoma; background-color:#C8C8C8'><tr><td width='15%'><b>Bill Number</b></td><td width='45%'><b>Title and Summary</b></td><td width='10%'><b>Author</b></td><td width='10%'><b>Position</b></td><td width='10%'><b>Cost</b></td></tr></tbody><tbody align='left' style='font-family:Tahoma'><tr><td width='15%'>" + prefix + " ***</td><td width='45%'><u>Item</u>: <b>" + billTitle + "</b> <br/>" + summary + "<br/>" + ItemFinance + " <br/><br/>STATUS: Submitted, 0-0-0</td><td width='10%'>" + submitterName + "</td><td width='10%'>" + position + "</td><td width='10%'>" + AmtRequested1 + AmtRequested2 +"</td></tr></tbody></table>";
    var hcoResMessage= "<TABLE border='1' cellpadding='5' cellspacing='0' width='700'><tbody align='center' style='font-family:Tahoma; background-color:#C8C8C8'><tr><td width='15%'><b>Bill Number</b></td><td width='45%'><b>Title and Summary</b></td><td width='10%'><b>Author</b></td><td width='10%'><b>Position</b></td><td width='10%'><b>Cost</b></td></tr></tbody><tbody align='left' style='font-family:Tahoma'><tr><td width='15%'>" + prefix + " ***</td><td width='45%'><u>Resolution</u>: <b>" + billTitle + "</b> <br/>" + summary  + " <br/><br/>STATUS: Submitted, 0-0-0</td><td width='10%'>" + submitterName + "</td><td width='10%'>" + position + "</td><td width='10%'> N/A</td></tr></tbody></table>";
    if(BillType=="Event"){
      var coreMessage=hcoEventMessage;
    }else if(BillType=="Resolution"){
      var coreMessage=hcoResMessage;
    }else{
      var coreMessage=hcoItemMessage;
    }
    
    // Now put the message together
    var message=messageHead+coreMessage+messageTail;
    var hcoMessage=HCOhead+coreMessage;
    
    try
    {
      MailApp.sendEmail(toEmail, subject, "", {htmlBody: message, name: "GT RHA", replyTo: hcoEmail, });
      MailApp.sendEmail(hcoEmail, subject, "", {htmlBody: hcoMessage, name: "GT RHA", replyTo: itCoord, });
      submissions.getRange(submittedRow, 1,1,1).setBackgroundRGB(217,234,211);
    } 
    catch(error)
    {
      submissions.getRange(submittedRow, 1).setBackgroundRGB(236,212,216);
      //submissions.getRange(submittedRow, 23).setValue("ERROR");
      MailApp.sendEmail({to:hcoEmail, cc:itCoord, subject:"HC submission Error", htmlBody:error});
    }
  }
}
