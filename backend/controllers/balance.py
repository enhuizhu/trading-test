from services.fileService import getContentFromFile
import os
from services.httpService import get

def getBalance():
  return get('balance')
  # filePath = os.path.dirname(__file__) + '/../mockData/balance.json'
  # /return getContentFromFile(filePath)
