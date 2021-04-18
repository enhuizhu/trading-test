import React, {FC, useCallback, useEffect, useRef, useState} from 'react';

interface InstrumentsProps {
  instrumentChange: Function,
}

const defaultInstruments:any[] = []

export const Instruments:FC<InstrumentsProps> = ({instrumentChange}) => {
  const [instruments, setInstruments] = useState(defaultInstruments);
  const handleChange = useCallback((event) => { 
    instrumentChange(event.target.value);
  }, [])

  useEffect(() => {
    fetch('api/instruments').then(res => res.json()).then(response => {
      setInstruments([''].concat(response));
    });
  }, []);

  return <div style={{display: 'inline-block'}}>
    <select onChange={handleChange}>
      {instruments.map(instrument => <option value={instrument.name} key={instrument.name}>{instrument.name}</option>)}
    </select>
  </div>;
}
