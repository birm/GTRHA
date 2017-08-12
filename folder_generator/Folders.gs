function TurnoverFolders() {
  var sheetFolder = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Folder Maker");
  var sheetTemplate = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Template IDs");
  var sheetIds = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet IDs");
  var years = sheetFolder.getRange("D2").getValue();
  var Fyr = sheetFolder.getRange("D3").getValue();
  var lastNo = sheetFolder.getLastRow();
  var BigFolder = DriveApp.createFolder("Hall Councils " + years ); // put them all somewhere
  var HcName = sheetFolder.getRange("F1").setValue(BigFolder.getId());
  
  // Get Template Files
  var OGmins = DriveApp.getFileById(sheetTemplate.getRange("B5").getValue());
  var Wmins = DriveApp.getFileById(sheetTemplate.getRange("B4").getValue());
  var FinSheet = DriveApp.getFileById(sheetTemplate.getRange("B3").getValue());
  var BillSub = DriveApp.getFileById(sheetTemplate.getRange("B6").getValue());
  var BillSubRes = DriveApp.getFileById(sheetTemplate.getRange("B7").getValue());
  // for each HC, do...
  for (var i=4; i<=lastNo; i++){
    Logger.log(lastNo);
    Logger.log(i);
    // read HC info
    var HcNo = sheetFolder.getRange(i,1).getValue();
    if (HcNo){
      var HcName = sheetFolder.getRange(i,2).getValue();
      var HcStruct = sheetFolder.getRange(i,3).getValue();
      
      var Eboard = HcName+".exec@rha.gatech.edu";
      
      // make things work for different structures
      if (HcStruct == "White"){
        var mins=Wmins;
        var respEmail=HcName+".meetings@rha.gatech.edu"
      }else{
        var mins=OGmins;
        var respEmail=HcName+".secretary@rha.gatech.edu"
      }
      
      // create base folder, keep id
      var RootName = years + " | " + HcName;
      var RootFolder = DriveApp.createFolder(RootName);
      BigFolder.addFolder(RootFolder); // add to big hc folder
      
      //make sub folders
      var FinFolName=HcName +" - Finances";
      var MinFolName=HcName +" - Minutes";
      var FinFol = DriveApp.createFolder(FinFolName);
      var MinFol = DriveApp.createFolder(MinFolName);
      RootFolder.addFolder(FinFol);
      RootFolder.addFolder(MinFol);
      
      // copy bill submission files to base folder
      var BillSubName=RootName + " Hall Council Bill Submission Form";
      var BillSubRespName=RootName + " Bill Responses";
      var tFormF = BillSub.makeCopy(BillSubName,RootFolder);
      var tResF = BillSubRes.makeCopy(BillSubRespName,RootFolder);
      var tForm = FormApp.openById(tFormF.getId());
      var tRes = SpreadsheetApp.openById(tResF.getId());
      tForm.setTitle(BillSubName);
      tForm.setDestination(FormApp.DestinationType.SPREADSHEET, tRes.getId());
      tRes.getSheetByName("EmailComponents").getRange("B2").setValue(respEmail);
      tRes.getSheetByName("EmailComponents").getRange("B7").setValue(HcName);
      //TODO Change Destination of form OR add email conf?
      
      
      //TODO
      // edit submissions -> email components so that it has the appropriate email (use template)
      
      // copy appropriate template to base folder
      mins.makeCopy(HcName + " Meeting Minutes Template",RootFolder);
      
      // copy autoFinance to finance folder
      var FSname=HcNo +" - " + HcName + " - " + Fyr;
      var newFS = FinSheet.makeCopy(FSname,FinFol);
      //TODO
      // help customize autoFinance?
      
      // copy the autofinance id to sheet.
      var FSID = newFS.getId();
      sheetIds.getRange(i-3,1).setValue(HcNo)
      sheetIds.getRange(i-3,2).setValue(FSID)
      
      // stop duplicate tags
      DriveApp.getRootFolder().removeFolder(FinFol);
      DriveApp.getRootFolder().removeFolder(MinFol);
      DriveApp.getRootFolder().removeFolder(RootFolder);
      
    }
    // add new sheet IDs to auditor tool
    // if it seems to work fine, add permission maker to this script?
  }
}

function AddFolders() {
  var sheetFolder = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Folder Maker");
  var sheetTemplate = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Template IDs");
  var sheetIds = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet IDs");
  var years = sheetFolder.getRange("D2").getValue();
  var Fyr = sheetFolder.getRange("D3").getValue();
  var lastNo = sheetFolder.getLastRow();
  
  var check = sheetFolder.getRange("F1").getValue();
  if (check){
    // Get Template Files
    var BigFolder=DriveApp.getFolderById(check);
    var OGmins = DriveApp.getFileById(sheetTemplate.getRange("B5").getValue());
    var Wmins = DriveApp.getFileById(sheetTemplate.getRange("B4").getValue());
    var FinSheet = DriveApp.getFileById(sheetTemplate.getRange("B3").getValue());
    var BillSub = DriveApp.getFileById(sheetTemplate.getRange("B6").getValue());
    var BillSubRes = DriveApp.getFileById(sheetTemplate.getRange("B7").getValue());
    // for each HC, do...
    for (var i=4; i<=lastNo; i++){
      Logger.log(lastNo);
      Logger.log(i);
      // read HC info
      var HcNo = sheetFolder.getRange(i,1).getValue();
      if (HcNo){
        var HcName = sheetFolder.getRange(i,2).getValue();
        var HcStruct = sheetFolder.getRange(i,3).getValue();
        
        var Eboard = HcName+".exec@rha.gatech.edu";
        
        // make things work for different structures
        if (HcStruct == "White"){
          var mins=Wmins;
          var respEmail=HcName+".meetings@rha.gatech.edu"
        }else{
          var mins=OGmins;
          var respEmail=HcName+".secretary@rha.gatech.edu"
        }
        
        // create base folder, keep id
        var RootName = years + " | " + HcName;
        var RootFolder = DriveApp.createFolder(RootName);
        BigFolder.addFolder(RootFolder); // add to big hc folder
        
        //make sub folders
        var FinFolName=HcName +" - Finances";
        var MinFolName=HcName +" - Minutes";
        var FinFol = DriveApp.createFolder(FinFolName);
        var MinFol = DriveApp.createFolder(MinFolName);
        RootFolder.addFolder(FinFol);
        RootFolder.addFolder(MinFol);
        
        // copy bill submission files to base folder
        var BillSubName=RootName + " Hall Council Bill Submission Form";
        var BillSubRespName=RootName + " Bill Responses";
        var tFormF = BillSub.makeCopy(BillSubName,RootFolder);
        var tResF = BillSubRes.makeCopy(BillSubRespName,RootFolder);
        var tForm = FormApp.openById(tFormF.getId());
        var tRes = SpreadsheetApp.openById(tResF.getId());
        tForm.setTitle(BillSubName);
        tForm.setDestination(FormApp.DestinationType.SPREADSHEET, tRes.getId());
        tRes.getSheetByName("EmailComponents").getRange("B2").setValue(respEmail);
        tRes.getSheetByName("EmailComponents").getRange("B7").setValue(HcName);
        //TODO Change Destination of form OR add email conf?
        
        
        //TODO
        // edit submissions -> email components so that it has the appropriate email (use template)
        
        // copy appropriate template to base folder
        mins.makeCopy(HcName + " Meeting Minutes Template",RootFolder);
        
        // copy autoFinance to finance folder
        var FSname=HcNo +" - " + HcName + " - " + Fyr;
        var newFS = FinSheet.makeCopy(FSname,FinFol);
        //TODO
        // help customize autoFinance?
        
        // copy the autofinance id to sheet.
        var FSID = newFS.getId();
        sheetIds.getRange(i-3,1).setValue(HcNo)
        sheetIds.getRange(i-3,2).setValue(FSID)
        
        // stop duplicate tags
        DriveApp.getRootFolder().removeFolder(FinFol);
        DriveApp.getRootFolder().removeFolder(MinFol);
        DriveApp.getRootFolder().removeFolder(RootFolder);
        
      }
      // add new sheet IDs to auditor tool
      // if it seems to work fine, add permission maker to this script?
    }
  }else{
    TurnoverFolders()
  }
    
}

function TurnoverFinance() {
  var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Finance Sheet Maker");
  var lastNo = ws.getRange("H1").getValue();
  for (var i=2; i<=lastNo; i++){
    var IDte = ws.getRange(i,7).getValue()
    Logger.log(lastNo);
    var FormA=SpreadsheetApp.openById(IDte);
    var EditSheet = FormA.getSheetByName("HC Info");
    // set values per specification
    EditSheet.getRange("B1").setValue(ws.getRange(i,6).getValue());
    EditSheet.getRange("B2").setValue(ws.getRange(i,1).getValue());
    EditSheet.getRange("B3").setValue(ws.getRange(i,3).getValue());
    EditSheet.getRange("B4").setValue(ws.getRange(i,4).getValue());
    EditSheet.getRange("B5").setValue(ws.getRange(i,5).getValue());
    EditSheet.getRange("B6").setValue(ws.getRange(i,2).getValue());
  }
}

function UpdateStarting() {
  var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Finance Sheet Maker");
  var lastNo = ws.getRange("H1").getValue();
  for (var i=2; i<=lastNo; i++){
    var IDte = ws.getRange(i,7).getValue()
    Logger.log(lastNo);
    var FormA=SpreadsheetApp.openById(IDte);
    var EditSheet = FormA.getSheetByName("HC Info");
    // set values per specification
    EditSheet.getRange("B6").setValue(ws.getRange(i,2).getValue());
  }
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Folder Tools')
  .addItem('Make ALL HC folders', 'TurnoverFolders')
  .addItem('Add additional HC folders', 'AddFolders')
  .addItem('Update HC Sheets', 'TurnoverFinance')
  .addItem('Update Starting Only', 'UpdateStarting')
  .addToUi();
}
