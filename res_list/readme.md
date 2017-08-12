residentList Adder; Ryan Birmingham

Instructions and conditions for use

Needs python enviornment, with google tools, xlrd, httplib2, oath2, etc. Be ready to have to install more stuff, esp for authentication
Needs web browser, at least preferrably.

Go into source and edit file path (exact) to the spreadsheet housing gives in xls/xlsx format.
Change column numbers if need be. Note that python indexes at zero, so a=0, b=1, etc.

You'll need to authenticate. As of now, only doc and it have permission to do so. This is easily changed, as both it and doc are owners of this project.

If you need to change key info, create auth for native app, then copy the new key info into client_secrets. I don't think the json they give works, but I didn't test that.

You have 100,000 requests per day, 5 requests per second.

Some notes:

This tool does not remove residents from the lists. You'll need to use another tool to do this, or do it by hand.

The email list groupid it expects is in the form of XXX.building.residents@rha.gatech.edu. This was chosen so that a dictionary didn't need to be hard coded, and so that FSA and fsa would not be confused.

This tool doesn't add owners.
