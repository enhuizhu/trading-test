import React, { FC, useCallback, useEffect, useReducer } from 'react';
import { Balance } from './components/balance/Balance';
import { Instruments } from './components/instruments/Instruments';
import './App.scss';
import styled from 'styled-components';

const UPDATE = 'UPDATE';


interface Action {
  type: string,
  payload: any,
}

const initialState = {
  balances: {},
  selectedInstrument: undefined,
  side: '',
  quantity: 0,
  quote: undefined,
  price: 0,
  orderResult: undefined,
}

const RenderObj:FC<any> = ({data}) => {
  return (<Info>
    { data && Object.keys(data).map(k => {
      const value = data[k];
      return typeof value === 'object' ? 
        <RenderObj data={value}/> : 
        (<Row key={k}>
          <label>{k}</label>
          {value}
        </Row>)
    })}
  </Info>
  )
}

function reducer(state: any, action: Action) {
  switch(action.type) {
    case UPDATE:
      return {...state, ...action.payload}
  }
  
  return state;
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);  
  
  const changeHandler = (changeKey: string) => {
    return (e: any) => {
      dispatch({
        type: UPDATE,
        payload: {
          [changeKey]: e.target.value,
        }
      })
    }
  }

  const getQuote = useCallback(() => {
    fetch('/api/request_for_quote', {
      method: 'post',
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify({
        instrument: state.selectedInstrument,
        side: state.side,
        quantity: state.quantity,
      })
    }).then(res => res.json())
    .then(response => {
      dispatch({
        type: UPDATE,
        payload: {
          quote: response,
        }
      })
    })
  }, [state]);
  
  const placeOrder = useCallback(() => {
    fetch('/api/order', {
      method: 'post',
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify({
        instrument: state.selectedInstrument,
        side: state.side,
        quantity: state.quantity,
        price: state.price,
      })
    }).then(res => res.json())
    .then(orderResult => {
      dispatch({
        type: UPDATE,
        payload: {
          orderResult
        }
      })
    }).then(getBalance)
  }, [state]);

  const getBalance = useCallback(() => {
    fetch('/api/balance').then(res => res.json()).then(balances => {
      dispatch({
        type: UPDATE,
        payload: {
          balances
        }
      })
    });
  }, []);

  useEffect(() => {
    getBalance();
  }, []);

  
  return (
    <div className="App">
      <Balance balances={state.balances}/>
      <Row>
        <label>Select Instrument:</label>
        <Instruments instrumentChange={(selectedInstrument: string) => {
          dispatch({
            type: UPDATE,
            payload: {
              selectedInstrument, 
            }
          })
        }}/>
      </Row>
      <Row>
        <label>side:</label>
        <select 
          name='side' 
          onChange={changeHandler('side')}
          value={state.side}
        >
          <option value=''></option>
          <option value='buy'>buy</option>
          <option value='sell'>sell</option>
        </select>
      </Row>
      <Row>
        <label>quantity:</label>
        <input 
          type='number' 
          onChange={changeHandler('quantity')}
          value={state.quantity}
        />
      </Row>
      <Row>
        <label>price:</label>
        <input 
          type='number' 
          onChange={changeHandler('price')}
          value={state.price}
        />
      </Row>
      {
        state.quote && <RenderObj data={state.quote}></RenderObj>
      }

      {
        state.orderResult && <RenderObj data={state.orderResult}/>
      }
      <Row>
        <button onClick={getQuote}>Get Quote</button>
        <button onClick={placeOrder}>Place Order</button>
      </Row>
    </div>
  );
}

const Row = styled.div`
  margin-top: 10px;

  label {
    width: 150px;
    margin-right: 10px;
    display: inline-block;
  }
`;

const Info = styled.div`
  margin-top: 10px;
  background-color: #66ccff;
  padding: 10px;
`;

export default App;
