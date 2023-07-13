import React, { useEffect, useState } from 'react';
import api from '../../api';
import history from '../../history';

export default function CardAdd() {
  const [typeCard, setTypeCard] = useState("credit");

    const [number, setNumber] = useState("");
    const [flag, setFlag] = useState("");
    const [close, setClose] = useState(1);
    const [deadline, setDeadline] = useState(7);
    const [limit, setLimit] = useState(0);
    const [current, setCurrent] = useState(0);
    const paymentTypeObj = {
      credit: 1,
      debit: 2,
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataCredit = {
          number,
          flag,
          close: String(close),
          deadline: String(deadline),
          limit: Number(limit),
          current: Number(current),
          type: paymentTypeObj[typeCard],
          user: JSON.parse(localStorage.getItem('id'))
        };
        const dataDebit = {
          number,
          flag,
          type: paymentTypeObj[typeCard],
          user: JSON.parse(localStorage.getItem('id'))
        };
          await api.post('/card', typeCard === 'credit' ? dataCredit : dataDebit);
          history.goBack()
      };
    return (
        <div>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4vh'
}}>
            <div >
                <input type='radio' onClick={() => setTypeCard('credit')} checked={typeCard === 'credit' ? true : false} name='type'/>
                <label>Crédito</label>
            </div>
            <div>
                <input type='radio' onClick={() => setTypeCard('debit')} checked={typeCard === 'debit' ? true : false}  name='type'/>
                <label>Débito</label>
            </div>
        </div>
            <form style={
              {
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start', 
                justifyContent: 'center', 
                width: '30%',
                margin: '0 auto',
                fontFamily: 'Roboto, sans-serif'
              }
            }
            >
              <label 
              style={
                {
                  fontWeight: 'bolder',
                  marginBottom: '10px'
              }
              }>Número</label>
    
              <input 
              type='text' value={number}
              onChange={(e) => setNumber(e.target.value)}
              style= {
                {
                  width: '100%',
                  height: '40px',
                  border: '1px solid black',
                  borderRadius: '12px',
                  outline: 'none',
                  fontSize: '20px',
                  textAlign: 'center'
              }
              }
              />
              <label 
              style={
                {
                  fontWeight: 'bolder',
                  marginBottom: '10px'
              }
              }>Bandeira</label>
    
              <input 
              type='text' value={flag}
              onChange={(e) => setFlag(e.target.value)}
              style= {
                {
                  width: '100%',
                  height: '40px',
                  border: '1px solid black',
                  borderRadius: '12px',
                  outline: 'none',
                  fontSize: '20px',
                  textAlign: 'center'
              }
              }
              />
              {typeCard === 'credit' &&
                <>
                <label 
                style={
                  {
                    fontWeight: 'bolder',
                    marginBottom: '10px'
                }
                }>Limite</label>
      
                <input 
                type='number' value={limit}
                onChange={(e) => setLimit(e.target.value)}
                style= {
                  {
                    width: '100%',
                    height: '40px',
                    border: '1px solid black',
                    borderRadius: '12px',
                    outline: 'none',
                    fontSize: '20px',
                    textAlign: 'center'
                }
                }
                />
                <label 
                style={
                  {
                    fontWeight: 'bolder',
                    marginBottom: '10px'
                }
                }>Valor atual usado</label>
      
                <input 
                type='number' value={current}
                onChange={(e) => setCurrent(e.target.value)}
                style= {
                  {
                    width: '100%',
                    height: '40px',
                    border: '1px solid black',
                    borderRadius: '12px',
                    outline: 'none',
                    fontSize: '20px',
                    textAlign: 'center'
                }
                }
                />
                <label 
                style={
                  {
                    fontWeight: 'bolder',
                    marginBottom: '10px'
                }
                }>Dia de Fechamento</label>
      
                <input 
                type='text' value={close}
                onChange={(e) => setClose(e.target.value)}
                style= {
                  {
                    width: '100%',
                    height: '40px',
                    border: '1px solid black',
                    borderRadius: '12px',
                    outline: 'none',
                    fontSize: '20px',
                    textAlign: 'center'
                }
                }
                />
                <label 
                style={
                  {
                    fontWeight: 'bolder',
                    marginBottom: '10px'
                }
                }>Ultimo Dia de Pagamento</label>
      
                <input 
                type='text' value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                style= {
                  {
                    width: '100%',
                    height: '40px',
                    border: '1px solid black',
                    borderRadius: '12px',
                    outline: 'none',
                    fontSize: '20px',
                    textAlign: 'center'
                }
                }
                />
                </>
              }
              
    
              <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <button type="button" onClick={handleSubmit} 
                style={
                  {
                    width: '70%',
                    height: '40px',
                    border: 'none',
                    borderRadius: '12px',
                    background: '#F0D514',
                    marginTop: '30px',
                    color: '#FFF',
                    fontWeight: 'bold'
                }
                }>Salvar</button>
              </div>
            </form>
        </div>
      )
}