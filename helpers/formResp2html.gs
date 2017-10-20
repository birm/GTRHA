// call on an event; returns a table version
// use only on the form (not the sheet if you make one), uses that on submit trigger event object
function formResp2html(event){
  var namedValues = event.response.getItemResponses();
  var head = "<tr><thead>";
  var body = "<tr><tbody>";
  // loop through the keys (each field)
  for (var j = 0; j < namedValues.length; j++){
    var itemResponse = namedValues[j];
    // add a cell to the end for each field in the response
    head += "<td>" + itemResponse.getItem().getTitle() + "</td>";
    body += "<td>" + itemResponse.getResponse() + "</td>";
  }
  // return after finishing up the html table (close the rows, open and close the table)
  return "<table>" + head + "</tr></thead>" + body + "</tr></tbody>" + "</table>";
}
