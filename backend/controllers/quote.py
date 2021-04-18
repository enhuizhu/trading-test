from services.fileService import getContentFromFile
import os
from services.httpService import post
import uuid

def getQuote(data):
  uuid = str(uuid.uuid4())
  
  return post('request_for_quote', {
    'instrument': data['instrument'],
    'side': data['side'],
    'quantity': data['quantity'],
    'client_rfq_id': uuid
  })
  # filePath = os.path.dirname(__file__) + '/../mockData/quotes.json'
  # return getContentFromFile(filePath)
