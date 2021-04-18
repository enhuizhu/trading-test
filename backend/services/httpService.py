import requests

headers = {
  'Authorization': 'Token e13e627c49705f83cbe7b60389ac411b6f86fee7'
}

def getPath(path):
  return 'https://api.uat.b2c2.net/' + path

def get(url):
  print('url is:')
  print(getPath(url))
  return requests.get(getPath(url), headers)

def post(url, data):
  return requests.post(getPath(url), data = data, headers = headers)
