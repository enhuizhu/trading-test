from services.fileService import getContentFromFile
import os
from services.httpService import get

def getAllInstruments():
  response = get('instruments')
  print('response')
  print(response)
  return response
  # filePath = os.path.dirname(__file__) + '/../mockData/instruments.json'
  # return getContentFromFile(filePath)

