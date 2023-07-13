import React, { useEffect, useState } from 'react';
import api from '../../api';
import history from '../../history';

export default function ExpenseAdd() {
  const [description, setDescription] = useState("");
  const [typeExpense, setTypeExpense] = useState("dinheiro");
  const [amount, setAmount] = useState(0);
  const [parcelsNumber, setParcelsNumber] = useState(1);
  const [category, setCategory] = useState("");
  const [card, setCard] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  async function getData(){
    const id = JSON.parse(localStorage.getItem('id')) 
    const {data} = await api.get(`/users/${id}`)
    setUser(data)
  }
  useEffect(() => {
    getData()
}, []);
  const paymentTypeObj = {
    credit: 1,
    debit: 2,
    dinheiro: 3 
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      description,
      amount: Number(amount),
      user: JSON.parse(localStorage.getItem('id')),
      paymentType: paymentTypeObj[typeExpense],
      parcels: Number(parcelsNumber),
      category,
      card
    };
    console.log(localStorage.getItem('token'))
    try {
      const responseQuestionCreated = await api.post('/expense', data)
      history.goBack()
    } catch (error) {
      if (error.response.data.error.messages === 'unlimited') setError('Sem limite no cartão')
      if (error.response.data.error.messages === 'without balance') setError('Sua receita não é suficiente')
    }

  };
  
  return (
    <div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '4vh'
}}>
            <div >
                <input type='radio' onClick={() => setTypeExpense('credit')} checked={typeExpense === 'credit' ? true : false} name='type'/>
                <label>Crédito</label>
            </div>
            <div>
                <input type='radio' onClick={() => setTypeExpense('debit')} checked={typeExpense === 'debit' ? true : false}  name='type'/>
                <label>Débito</label>
            </div>
            <div>
                <input type='radio' onClick={() => setTypeExpense('dinheiro')} checked={typeExpense === 'dinheiro' ? true : false} name='type'/>
                <label>Pix</label>
            </div>
        </div>
        <form style={
          {
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '100%',
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
          }>Descrição</label>

          <input 
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style= {
            {
              width: '30%',
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
          }>Total</label>

          <input 
          type='number'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style= {
            {
              width: '30%',
              height: '40px',
              border: '1px solid black',
              borderRadius: '12px',
              outline: 'none',
              fontSize: '20px',
              textAlign: 'center'
          }
          }
          />
        {
            typeExpense === 'credit' && 
            <>
                <label 
          style={
            {
              fontWeight: 'bolder',
              marginBottom: '10px'
          }
          }>Parcelas</label>

          <input 
          type='number'
          value={parcelsNumber}
          onChange={(e) => setParcelsNumber(e.target.value)}
          style= {
            {
              width: '30%',
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
          <label 
          style={
            {
              fontWeight: 'bolder',
              marginTop: '20px'
          }
          }>Categoria</label>

          <select onChange={e => setCategory(e.target.value)}>
          <option>selecione</option>

            {
                user.categories && user.categories.map(category => {
                    return (
                        <option value={category.id}>{category.name}</option>
                    )
                })
            }
          </select>

          {
            typeExpense !== 'dinheiro' && 
            <>
                <label 
                style={
                    {
                    fontWeight: 'bolder',
                    marginTop: '20px'
                }
                }>Cartão</label>

                <select onChange={e => setCard(e.target.value)}>
                <option>selecione</option>
                    {
                        
                        user.cards && user.cards.map(card => {
                                if (typeExpense === 'debit' && card.type.id === 2) return (<option value={card.id}>{card.number}</option>)
                                if (typeExpense === 'credit' && card.type.id === 1) return (<option value={card.id}>{card.number}</option>)
                        })
                    }
                </select>
            </>
          }
          {error && <span style={{color: 'red'}}>{error}</span>}
          <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <button type="button" onClick={handleSubmit} 
            style={
              {
                width: '20%',
                height: '40px',
                border: 'none',
                borderRadius: '12px',
                background: '#F0D514',
                marginTop: '30px',
                color: '#FFF',
                fontWeight: 'bold',
                fontSize: '1.2rem'
            }
            }>Salvar</button>
          </div>
        </form>
    </div>
  )
}