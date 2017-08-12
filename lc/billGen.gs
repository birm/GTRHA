function billMaker(){
 
  var submissions = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
  //var currBack=submissions.getRange(submittedRow, 1,1,1).getBackground();
  //var nullBack=submissions.getRange(submittedRow, 2,1,1).getBackground();
  //check if it's already done to MAKE SURE NO ONE GETS DUPLICATE EMAILS.
  var submittedRow = submissions.getLastRow();
  
  //Data Fetch
  // I is short for items, because I need to type it a lot.
  var I = submissions.getrange(submittedRow,1,1,23);
  
  // minor formatting
  var CObudgetSum=I[0][14];
  var PbudgetSum=I[0][15];
  
  var CObudgetStr=CObudgetSum.replace(/,/g,"</td><td width='20%'>");
  CObudgetStr=CObudgetStr.replace(/;/g,"</td></tr><tr><td width='20%'>");
  var CObudgetTable="<TABLE border='1' cellpadding='3' cellspacing='0' width='500'><tbody align='center' style='font-family:verdana; background-color:#C4C4C4'><tr><td width='100%'><b>Cost Breakdown</b></td></tr></tbody></table><TABLE border='1' cellpadding='3' cellspacing='0' width='500'><tbody align='center' style='font-family:verdana; background-color:#D8D8D8'><tr><td width='20%'><b>Line Item</b></td><td width='20%'><b>Unit Cost</b></td><td width='20%'><b>Unit Quantity</b></td><td width='20%'><b>Total Cost</b></td><td width='20%'><b>Account</b></td></tr></tbody><tbody align='center' style='font-family:verdana'><tr><td width='20%'>" + CObudgetStr + "</tbody></table>";
  
  
  var PbudgetStr=PbudgetSum.replace(/,/g,"</td><td width='20%'>");
  PbudgetStr=PbudgetStr.replace(/;/g,"</td></tr><tr><td width='20%'>");
  var PbudgetTable="<TABLE border='1' cellpadding='3' cellspacing='0' width='500'><tbody align='center' style='font-family:verdana; background-color:#C4C4C4'><tr><td width='100%'><b>Cost Breakdown</b></td></tr></tbody></table><TABLE border='1' cellpadding='3' cellspacing='0' width='500'><tbody align='center' style='font-family:verdana; background-color:#D8D8D8'><tr><td width='20%'><b>Line Item</b></td><td width='20%'><b>Unit Cost</b></td><td width='20%'><b>Unit Quantity</b></td><td width='20%'><b>Total Cost</b></td><td width='20%'><b>Account</b></td></tr></tbody><tbody align='center' style='font-family:verdana'><tr><td width='20%'>" + PbudgetStr + "</tbody></table>";
  
  //Variables
  var subject = "Legislative Council Bill Received"; 
  var docEmail = "doc@rha.gatech.edu";
  var docName = "Ryan Birmingham";
  var itCoord = "doc@rha.gatech.edu"
  
  //Message start is different to author than it is to DOC
  var messageHead = "Thank you for your Submission! Please come to our next hall council meeting, the next Active Monday at 8:00 PM, in Crecine 137. If there are any changes to or concerns about this bill, please contact " + docName + " at " + docEmail + ".<br/><br/> Some vital bill information is provided for your information: <br/>";
  var messageTail="<br/><br/> Best, <br/> " + docName + ""; 
  var HCOhead="Hello. <br/>"+ I[0][1] + " has submitted a bill. Details are as follows:<br/>";
  //Message to HCO
  var ItemMessage = "<center><img src='https://drive.google.com/file/d/0B7mOAlPX4gegdDZaX1Q4T2ZzaU0'><p><font face='verdana' size=5><b>Legislative Council Bill 16 - ***</font><br/>" + I[0][21] + "</font><br/></b>Submitted " + I[0][0] + "</p><TABLE border='1' cellpadding='3' cellspacing='0' width='500'><tbody align='center' style='font-family:verdana; background-color:#C8C8C8'><tr><td width='100%'><b>Contact Information</b></td></tr></tbody><tbody align='left' style='font-family:verdana'><tr><td width=50%><b>Author: </b>" + I[0][1] + "</td></tr><tr><td width=50%><b> Hall Council / Orginization: </b> " + I[0][3] + "</td></tr><tr><td width=50%><b>Email Address: </b>" + I[0][2] + "</td></tr><tr><tr><td width=50%><b>Co-Author: </b>" + I[0][16] + "</td></tr><tr></tbody></table><br/> <br/><TABLE border='1' cellpadding='3' cellspacing='0' width='500'><tbody align='center' style='font-family:verdana; background-color:#C4C4C4'><tr><td width='100%'><b>Capital Purchase Details</b></td></tr></tbody><tbody align='left' style='font-family:verdana'><tr><td width=50%><b>Capital Purchase: </b>" +  I[0][5]  + "</td></tr><tr><td width=50%><b> Amount Requested: </b> " + I[0][13] + "</td></tr><tr><td width=50%><b>Total Budget: </b>" + I[0][12]  + "</td></tr></tbody></table><br/><TABLE border='1' cellpadding='3' cellspacing='0' width='500'><tbody align='center' style='font-family:verdana; background-color:#C4C4C4'><tr><td width='100%'><b>Capital Purchase Summary</b></td></tr></tbody><tbody align='left' style='font-family:verdana'><tr><td width=50%>" + I[0][5] + "</td></tr></tbody></table><br/> Capital Outlay Budget" + CObudgetTable + "<br/> + CPrograms Budget</br>" + PbudgetTable+"</center>";
  var EventMessage = "<center><img src='https://drive.google.com/file/d/0B7mOAlPX4gegdDZaX1Q4T2ZzaU0'><p><font face='verdana' size=5><b>Legislative Council Bill 16 - ***</font><br/>" + I[0][21] + "</font><br/></b>Submitted " + I[0][0] + "</p><TABLE border='1' cellpadding='3' cellspacing='0' width='500'><tbody align='center' style='font-family:verdana; background-color:#C8C8C8'><tr><td width='100%'><b>Contact Information</b></td></tr></tbody><tbody align='left' style='font-family:verdana'><tr><td width=50%><b>Author: </b>" + I[0][1] + "</td></tr><tr><td width=50%><b> Hall Council / Orginization: </b> " + I[0][3] + "</td></tr><tr><td width=50%><b>Email Address: </b>" + I[0][2] + "</td></tr><tr><tr><td width=50%><b>Co-Author: </b>" + I[0][16] + "</td></tr><tr></tbody></table><br/> <br/><TABLE border='1' cellpadding='3' cellspacing='0' width='500'><tbody align='center' style='font-family:verdana; background-color:#C4C4C4'><tr><td width='100%'><b>Event Details</b></td></tr></tbody><tbody align='left' style='font-family:verdana'><tr><td width=50%><b>Date and Time: </b>" + I[0][9] + "</td></tr><tr><td width=50%><b>Location: </b>" + I[0][10] + "</td></tr><tr><td width=50%><b>Expected Attendance : </b>" + I[0][22] + "</td></tr><tr><td width=50%><b>Percentage of Residents : </b>" + I[0][20] + "%</td></tr><tr><td width=50%><b>Total Amount Requested : </b>" + I[0][13] + "</td></tr><tr><td width=50%><b>Total Budget : </b>" + I[0][12] + "</td></tr><tr><td width=50%><b>Has RHA Funded in the past : </b>" + I[0][17] + "</td></tr></tbody></table><br/><TABLE border='1' cellpadding='3' cellspacing='0' width='500'><tbody align='center' style='font-family:verdana; background-color:#C8C8C8'><tr><td width='100%'><b>Event Summary</b></td></tr></tbody><tbody align='left' style='font-family:verdana'><tr><td width=50%><b>Event Summary: </b>" +  I[0][5] + "</td></tr><tr><td width=50%><b> Benefit to Residents: </b> " + I[0][7] + "</td></tr></tbody></table><br/> Capital Outlay Budget" + CObudgetTable + "<br/> CPrograms Budget</br>" + PbudgetTable+"</center>";
  
  var docTitle= "Bill 16 XXX | " + title +".pdf";
  var gdocTitle= "Bill 16 XXX | " + title;
  var BillType = I[0][9];
  if(BillType=="Event"){
    var coreMessage=ItemMessage;
  }else{
    var coreMessage=EventMessage;
  }
  
  var GDBudget1d= budgetSum.split(";");  // split on line breaks
  var GDBudget = [];
  for (var i=0; i<GDBudget1d.length; i++){
    var GDBrow=GDBudget1d[i];
    var GDIarray = GDBrow.split(",");
    GDBudget [i]= GDIarray;
  }
  // Now put the message together
  var message=messageHead+coreMessage+messageTail;
  var hcoMessage=HCOhead+coreMessage;
  try{
    // Relic from Sending Email and making PDF
    
    //var htmlBody=HtmlService.createHtmlOutput(coreMessage).getContent();
    //var blob = Utilities.newBlob(htmlBody, 'text/html').getAs('application/pdf').setName(docTitle);
    //DriveApp.createFile(blob);
    
    
    // in case they're KIND enough to add support for THEIR OWN FILE PROTOCOL
    //var tf = DriveApp.createFile(blob);
    //var blob2 = Utilities.newBlob(tf, 'application/pdf').getAs('application/vnd.google-apps.document').setName(docTitle);
    //var tf = DriveApp.createFile(blob2);
    //MailApp.sendEmail(toEmail, subject, "", {htmlBody: message, name: "GT RHA", replyTo: docEmail, });
    //MailApp.sendEmail(docEmail, subject, "", {htmlBody: hcoMessage, name: "GT RHA", replyTo: itCoord, });
    //submissions.getRange(submittedRow, 1,1,1).setBackgroundRGB(217,234,211);
  } 
  catch(error)
  {
    //submissions.getRange(submittedRow, 1,1,1).setBackgroundRGB(236,212,216);
    //submissions.getRange(submittedRow, 23).setValue("ERROR");
    MailApp.sendEmail({to:itCoord, subject:"LC submission Error", htmlBody:error});
  } 
}
