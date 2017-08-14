function onSubmit(e) {
  // Get the Sequence number, which is the row number
  var seq = e.range.getRow();
  // get a json object with the responses
  var vals = e.namedValues;
  // (if you wanted to format the values first, you could to that here)
  var hcoEmail = "hc@rbirm.us";
  var toEmail = vals['4'][0];
  var subject = 'Write ' + seq + 'on your receipt'; 
  // Sometimes mail errors happen, so be ready
  try{
    // Email the values and Sequence Number
    MailApp.sendEmail(toEmail, subject, "", {htmlBody: vals.toString(), name: "GT RHA", replyTo: hcoEmail, });
    MailApp.sendEmail(hcoEmail, subject, "", {htmlBody: vals.toString(), name: "GT RHA", replyTo: hcoEmail, });
  }
  catch (error){
    // send what you can to the hco and it
    MailApp.sendEmail({to:hcoEmail, cc:"it@rha.gatech.edu", subject:"HC Error", htmlBody:error + vals.toString()});
  }
}
