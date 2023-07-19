import React, { useEffect, useState } from 'react';
import api from '../../api';
import history from '../../history';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Invoice(props) {
    const [value, setValue] = useState(0);
    const [expenses, setExpenses] = useState([]);
    async function getData(){
      const id = JSON.parse(localStorage.getItem('id')) 
      const {data} = await api.get(`/card/invoice/${props.match.params.id}`)
      setExpenses(data.expenses)
      setValue(data.value)
    }
    useEffect(() => {
      getData()
  }, []);

  async function paid(id){
    await api.post(`/card/paid/${id}`, {expenses, value})
    history.push('/card')
  }
    return (
        <div style={{margin: '1rem'}}>
            <button type="button" style={{
                width: '200px',
                height: '40px',
                border: 'none',
                background: '#90ee90',
                borderRadius: '25px',
                cursor: 'pointer',
                color: '#fff',
                marginTop: '2vh'
                }} onClick={async () => paid(props.match.params.id)}>Pagar</button>
            <div style={{overflowY: 'scroll', width: '100%', maxHeight: '40vh'}}>
            
            <h2>Despesas da fatura</h2>
            <table style={{borderSpacing: '0'}}>
              <tr style={{border: '1px solid black'}}>
                <th style={{border: '1px solid black'}}>Descrição</th>
                <th style={{border: '1px solid black'}}>Valor</th>
                <th style={{border: '1px solid black'}}>Categoria</th>
              </tr>
            {expenses.map(expense => {

                  return (
                  < >
                  {/* eslint-disable-next-line react/jsx-no-target-blank */}
                  <tr style={{border: '1px solid black'}}>
                        <td style={{border: '1px solid black'}}>{expense.description}<span style={{marginLeft: '10px', background: '#00BFFF'}}>{expense.parcelNumber} / {expense.parcels}</span></td>
                        <td style={{border: '1px solid black'}}>{expense.amount / expense.parcels}</td>
                        <td style={{border: '1px solid black'}}>{expense.category.name}</td>
                    </tr>
                        
                    </>
                  );
                
                })}
                <tr style={{border: '1px solid black'}}>
                  <td style={{border: '1px solid black'}}colSpan={2}>Total</td>
                  <td style={{border: '1px solid black', color: 'red'}}colSpan={1}>R$ {value}</td>
                </tr>
              </table>
            </div>
        </div>
      )
}