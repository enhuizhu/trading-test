import React, { FC } from 'react';
import styled from 'styled-components';

interface BalanceInterface  {
  // transaction_id: string,
  // created: string,
  // reference: string,
  // currency: string,
  // amount: string,
  // type: string,
  // group: string
  [key: string]: string,
}

interface BalanceProps {
  balances: BalanceInterface,
}

export const Balance:FC<BalanceProps> = ({
  balances
}) => {
  return (<BalanceContainer>
    {Object.keys(balances).map(currency => 
      <div key={currency}>
        <div>{currency}</div>
        <div>{balances[currency]}</div>
      </div>
    )}
  </BalanceContainer>)
}

const BalanceContainer = styled.div`
  display: flex;
   &  > div {
     padding: 10px;
   }
`;
