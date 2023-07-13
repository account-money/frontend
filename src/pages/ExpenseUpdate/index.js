import React, { useEffect, useState } from 'react';
import api from '../../api';
import history from '../../history';

export default function ExpenseUpdate(props) {
  
  const [description, setDescription] = useState("");
  const [id, setId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [parcelsNumber, setParcelsNumber] = useState(1);
  const [category, setCategory] = useState({});
  const [card, setCard] = useState(null);
  const [user, setUser] = useState({});
  async function getData(){
    const id = JSON.parse(localStorage.getItem('id')) 
    const {data} = await api.get(`/expense/${props.match.params.id}`)
    const {data: dataUser} = await api.get(`/users/${id}`)
    setId(data.id)
    setDescription(data.description)
    setAmount(data.amount)
    if (data.card) setCard(data.card)
    setParcelsNumber(data.parcels)
    setCategory(data.category)
    setUser(dataUser)
  }
  useEffect(() => {
    getData()
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id,
      description,
      amount: Number(amount),
      parcels: Number(parcelsNumber),
      user: JSON.parse(localStorage.getItem('id')),
      category: category.id ?? category,
      card: card ? card.id : null
    };
    console.log(localStorage.getItem('token'))
    await api.put(`/expense/${props.match.params.id}`, data)
    history.goBack()

  };
  
  return (
    <div>
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

        {
          <>
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
          </>
        }
        { card && card.type.id === 1 &&
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
                user.categories && user.categories.map(categoryLoop => {
                    return (
                        <option selected={category.id === categoryLoop.id ? true : false} value={categoryLoop.id}>{categoryLoop.name}</option>
                    )
                })
            }
          </select>

          { card &&
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
                        
                        user.cards && user.cards.map(cardLoop => {
                                if (card.type.id === 2 && cardLoop.type.id === 2) return (<option selected={card.id === cardLoop.id ? true : false} value={cardLoop.id}>{cardLoop.number}</option>)
                                if (card.type.id === 1 && cardLoop.type.id === 1) return (<option selected={card.id === cardLoop.id ? true : false} value={cardLoop.id}>{cardLoop.number}</option>)
                        })
                    }
                </select>
            </>
          }
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