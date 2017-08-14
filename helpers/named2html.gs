// This tile is meant to translate a form response event.namedValues into a simple table in html
// see https://developers.google.com/apps-script/guides/triggers/events#form-submit for the docs I'm working from
function named2html(namedValues){
  var head = "<tr><thead>";
  var body = "<tr><tbody>";
  // loop through the keys (each field)
  var keys = Object.keys(namedValues);
  for (key in keys){
    // add a cell to the end for each field in the response
    head += "<td>" + key + "</td>";
    body += "<td>" + key + "</td>";
  }
  // return after finishing up the html table (close the rows, open and close the table)
  return "<table>" + head + "</tr></thead>" + body + "</tr></tbody>" + "</table>";
}
