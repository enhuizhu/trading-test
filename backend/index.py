from flask import Flask, request
from controllers import instrument, quote, order, balance

app = Flask(__name__)

@app.route('/')
def index():
  return 'hello, world!'

@app.route('/api/instruments')
def getInstrument():
  return instrument.getAllInstruments()
  
@app.route('/api/request_for_quote', methods = ['POST'])
def requestForQuote():
  return quote.getQuote(request.json)

@app.route('/api/order', methods = ['POST'])
def makeOrder():
  return order.postOrder(request.json)

@app.route('/api/balance')
def getBalance():
  return balance.getBalance()