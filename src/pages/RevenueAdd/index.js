import React, { useContext, useState } from 'react';
import { Context } from '../../Context/AuthContext';
import history from '../../history';
import api from '../../api';

export default function RevenueAdd() {

    const [name, setName] = useState("");
    const [value, setValue] = useState(0);
    const [receivedAt, setReceivedAt] = useState(new Date().toLocaleDateString());

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
          name,
          value: Number(value),
          receivedAt: new Date(receivedAt),
          user: JSON.parse(localStorage.getItem('id'))
        };
          await api.post('/revenue', data);
          history.goBack()
      };
  return(
    <div>
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
          }>Nome</label>

          <input 
          type='text' value={name}
          onChange={(e) => setName(e.target.value)}
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
          }>Valor</label>

          <input 
          type='number' value={value}
          onChange={(e) => setValue(e.target.value)}
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
          }>Recebido em</label>

          <input 
          type='date' value={receivedAt.toLocaleString()}
          onChange={(e) => setReceivedAt(e.target.value)}
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