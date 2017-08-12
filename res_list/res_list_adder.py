#!/usr/bin/python
#

from optparse import OptionParser
import os

import xlrd
import pprint
import sys
from apiclient.discovery import build
import httplib2
from oauth2client.client import flow_from_clientsecrets
from oauth2client.file import Storage
from oauth2client.tools import run
import urllib


# get after authorizing at http://code.google.com/apis/console
CLIENT_SECRETS = 'client_secrets must be included in same path'

def addNext(fn,http):
## build this next
  service = build('admin', 'directory_v1', http=http)
  keepgoing=True
  book = xlrd.open_workbook(fn)
  first_sheet = book.sheet_by_index(0)
  for rowno in xrange(first_sheet.nrows):
    ppgid=first_sheet.cell(rowno,7).value
    # need to create each of these first
    gid=ppgid[:3]
    gid=gid+".building.residents@rha.gatech.edu"
    mid=first_sheet.cell(rowno,9).value
    addMember(service=service, gid=gid, mid=mid)
  return keepgoing

def addMember(service, gid, mid):
  igbody =  {"email": mid}
  pigbody = urllib.urlencode(igbody)
  r = service.members()
  r.insert(groupKey=gid,body=igbody).execute()


def main(argv):
  housingGave="okay.xlsx" # set file here

  #auth copied from google...
  # Set up a Flow object to be used if we need to authenticate.
  FLOW = flow_from_clientsecrets(CLIENT_SECRETS,
      scope='https://www.googleapis.com/auth/admin.directory.group',
      message=MISSING_CLIENT_SECRETS_MESSAGE)

  storage = Storage('groupsettings.dat')
  credentials = storage.get()

  if credentials is None or credentials.invalid:
    print 'invalid credentials'
    # Save the credentials in storage to be used in subsequent runs.
    credentials = run(FLOW, storage)

  # Create an httplib2.Http object to handle our HTTP requests and authorize it
  # with our good Credentials.
  http = httplib2.Http()
  http = credentials.authorize(http)

  #service = build('groupssettings', 'v1', http=http)

  #okay, now ready to add stuff!
  

  addNext(housingGave,http)
	
if __name__ == '__main__':
  main(sys.argv)
