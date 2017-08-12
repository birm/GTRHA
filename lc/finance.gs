function finGen(){
 
  var submissions = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1");
  var submittedRow = submissions.getLastRow();
  
  //Data Fetch
  // I is short for items, because I need to type it a lot.
  var I = submissions.getRange(submittedRow,1,1,23).getValues();

  //Static Variables
  var subject = "RHA Reimbursement Request Received"; 
  var docEmail = "doc@rha.gatech.edu";
  var docName = "Ryan Birmingham";
  var itCoord = "doc@rha.gatech.edu";
  var dofEmail = "doc@rha.gatech.edu"; // change
  
  // Dynamic Variables
  var officerEmail = "";
  var Type = I[0][1];
  
  var intro = "Hello "+I[0][3] +",<br>Your reimbursement request has been recieved for "+I[0][7]+".<br> <b>Don't forget to hand in your original reciept!</b><br>Some Details:";
  var summary = I;
  var detailed = "";
  
  //Construct "Detailed" for FOs and DOF
  if(Type=="Hall Council"){
    detailed=detailed+"<b>TO EAFS</b><table border='1'><tbody><tr><td>"+I[0][0]+"</td><td>"+I[0][13]+"</td><td>"+"Expenditure"+"</td><td>"+"1"+"</td><td>"+I[0][7]+"</td><td>"+I[0][4]+"<td>"+"<b>DRAG ALLOCATED DOWN FROM ABOVE</b>"+"<td>"+I[0][13]+"<td>"+I[0][12]+"</td></tr></tbody></table>";
    detailed=detailed+"<br><b>TO PEOPLE</b><table border='1'><tbody><tr><td>"+I[0][4]+"</td></tr><tr><td>"+I[0][5]+"</td></tr><tr><td>"+I[0][6]+"</td></tr></tbody></table>";
    detailed=detailed+"<br><b>Amount in Words</b>: " + I[0][15];
    detailed=detailed+"<br><b>Bill Title or Description</b>: " + I[0][14];
    subject=subject+": " + I[0][8] + " ID: " + submittedRow;
    officerEmail=I[0][8]+"@rha.gatech.edu";
  }else if(Type=="Legislative Council"){
    detailed=detailed+"Still under construction, - RB";
    detailed=detailed+"<h1>ACCOUNT " + I[0][10] + "</h1>";
    detailed=detailed+"<small>Reportedly Passed " + I[0][9] + "</small>";
    detailed=detailed+"<table border='1'><tbody><tr><td>"+I[0][0]+"</td><td>"+I[0][13]+"</td><td>"+"Expenditure"+"</td><td>"+"1"+"</td><td>"+I[0][7]+"</td><td>"+I[0][4]+"<td>"+"<b>DRAG ALLOCATED DOWN FROM ABOVE</b>"+"<td>"+I[0][13]+"<td>"+I[0][12]+"</td></tr></tbody</table>";
    detailed=detailed+"<br><b>PERSONAL INFO</b><table border='1'><tbody><tr><td>"+I[0][4]+"</td><td>"+"<tr><td>"+I[0][5]+"<tr><td>"+I[0][6];
    detailed=detailed+"<br><b>Amount in Words</b>: " + I[0][15];
    detailed=detailed+"<br><b>Bill Title or Description</b>: " + I[0][14];
    subject=subject+"LC ID: " + submittedRow;
    officerEmail="dof@rha.gatech.edu"
  }else{ //RHA EXEC
    var subact = I[0][3]; // Sub accounts change formatting
    var sube = "";
    if (subact==""){
      sube="";
    }else{
      sube="</td><td>"+subact; // put this before the td tags of the next one
    }
    detailed=detailed+"<h1>ACCOUNT " + I[0][10] + "</h1>";
    detailed=detailed+"<small>Reportedly Passed " + I[0][9] + "</small>";
    detailed=detailed+"<table border='1'><tbody><tr><td>"+I[0][0]+"</td><td>"+"<b>ENTER PPR</b>"+"</td><td>"+I[0][7]+"</td><td>"+I[0][4]+"<td>"+"<b>DRAG ALLOCATED DOWN FROM ABOVE</b>"+"<td>"+I[0][13]+"<td>"+I[0][12]+"</td></tr></tbody</table>";
    detailed=detailed+"<br><b>PERSONAL INFO</b><table border='1'><tbody><tr><td>"+I[0][4]+"</td><td>"+"<tr><td>"+I[0][5]+"<tr><td>"+I[0][6];
    detailed=detailed+"<br><b>Amount in Words</b>: " + I[0][15];
    detailed=detailed+"<br><b>Bill Title or Description</b>: " + I[0][14];
    subject=subject+"LC ID: " + submittedRow;
    officerEmail="dof@rha.gatech.edu"
  }

  // Now put the message together
  try{
    MailApp.sendEmail(I[0][5], subject, "", {htmlBody: intro+summary, name: "GT RHA", replyTo: docEmail, });
    MailApp.sendEmail(dofEmail, subject, "", {htmlBody: intro+detailed, name: "GT RHA", replyTo: itCoord, });
    submissions.getRange(submittedRow, 1,1,1).setBackgroundRGB(217,234,211);
  } 
  catch(error)
  {
    submissions.getRange(submittedRow, 1,1,1).setBackgroundRGB(236,212,216);
    //submissions.getRange(submittedRow, 23).setValue("ERROR");
    MailApp.sendEmail({to:itCoord, subject:"LC submission Error", htmlBody:error});
  } 
}
