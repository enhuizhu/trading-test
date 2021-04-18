from services.fileService import getContentFromFile
import os
from services.httpService import post
import uuid

def postOrder(data):
  uuid = str(uuid.uuid4())
  valid_until = datetime.datetime.utcfromtimestamp(time.time() + 10).strftime("%Y-%m-%dT%H:%M:%S")
  executing_unit = 'risk-adding-strategy'

  return post('order', {
    'instrument': data['instrument'],
    'side': data['side'],
    'quantity': data['quantity'],
    'client_order_id': uuid,
    'price': data['price'],
    'order_type': 'FOK',
    'valid_until': valid_until,
    'executing_unit': executing_unit,
  })
  
  # filePath = os.path.dirname(__file__) + '/../mockData/order.json'
  # return getContentFromFile(filePath)
