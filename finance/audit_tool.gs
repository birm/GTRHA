function onEdit(e){
  var range = e.range.getA1Notation();
  var sheet=e.range.getSheet().getSheetName();
  if(range=="B1"&&sheet=="Lookup"){
    GetComments()
  }
  Logger.log(sheet);
}

function WriteComments() {
  var source = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Comment");
  var lookup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Lookup");
  var targetID = lookup.getRange(1, 5).getValue();
  Logger.log(targetID);
  var target = SpreadsheetApp.openById(targetID).getSheetByName("Comments"); //this is the Comment tab in Hall Council finance sheet
  var sheet_last_row = source.getLastRow() + 1;
  var actual_last=source.getRange(1,7).getValues(); //this pulls out comment from the Audit Tool
  var source_range = source.getRange("F4:H"+sheet_last_row); //this is the columns with Received in Office, Processed, and Comment in Audit Tool
  var srArray = source_range.getValues(); //this pulls out the values from the above columns in Audit Tool
  var target_range = target.getRange("F4:H"+sheet_last_row); //this is the columns with Received in Office, Processed, and Comment in Hall Council finance sheet
  var last_row=target.getLastRow(); //last row of hall council finance sheet
  //Logger.log(srArray);
  //source_range.copyTo(target_range);
  var x;
  var y;
  //Logger.log(actual_last);
  Logger.log(srArray[0]);
  Logger.log(srArray[actual_last-1]);
  Logger.log(srArray[actual_last]);
  
  for (x = 4; x <=  (actual_last); x++){
    for (y = 6; y <=  (8); y++){
      target.getRange(x,y).setValue(srArray[x-4][y-6]);
      //Logger.log("" + x + ", " + y + " " + srArray[x-4][y-6]);
    }
  }
}
  
  
function GetComments() {
  var target = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Comment");
  var lookup = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Lookup");
  var targetID = lookup.getRange(1, 5).getValue();
  Logger.log(targetID);
  var source = SpreadsheetApp.openById(targetID).getSheetByName("Comments"); 
  //var sheet_last_row = source.getLastRow() + 1;
  var sheet_last_row = 151;
  var actual_last=151;//source.getRange(1,9).getValues();
  var source_range = source.getRange("F4:H"+sheet_last_row);
  var srArray = source_range.getValues();
  var target_range = target.getRange("F4:H"+sheet_last_row);
  var last_row=target.getLastRow();
  Logger.log(srArray);
  //source_range.copyTo(target_range);
  var x;
  var y;
  for (x = 4; x <=  (actual_last); x++){
    for (y = 6; y <=  (8); y++){
      target.getRange(x,y).setValue(srArray[x-4][y-6]);
    }
  }
}



function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "Write comments",
    functionName : "WriteComments"
  },{
    name : "Get comments",
    functionName : "GetComments"
  }];
  sheet.addMenu("Audit Tools", entries);

  };
