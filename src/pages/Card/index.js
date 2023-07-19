import React, { useEffect, useState } from 'react';
import api from '../../api';
import history from '../../history';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Card() {
    const [cardsFilter, setCardsFilter] = useState([]);
    const [cards, setCards] = useState([]);
    async function getData(){
      const id = JSON.parse(localStorage.getItem('id')) 
      const {data} = await api.get(`/card`)
      setCards(data)
      setCardsFilter(data)
    }
    useEffect(() => {
      getData()
  }, []);
  async function deleteCard(id){
    await api.delete(`/card/${id}`)
    window.location.reload()
  }
    return (
        <div>
          <Link to='/card-add'>
            <button type="button" style={{
                width: '200px',
                height: '40px',
                border: 'none',
                background: '#90ee90',
                borderRadius: '25px',
                cursor: 'pointer',
                color: '#fff',
                marginTop: '2vh'
                }}>Adicionar cartão</button>
            </Link>
            <div style={{overflowY: 'scroll', width: '100%', maxHeight: '40vh'}}>
            <div style={{width: '500px'}}>
            <input placeholder='Número, bandeira...' onChange={(e) => {
              setCardsFilter(cards.filter(card => card.number.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()) || card.flag.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())))
            }}/>
            <select onChange={async (e) =>   {
                setCardsFilter(e.target.value ? cards.filter(card => card.type.id == e.target.value) : cards)
              
            }}>
              <option value=''>Tipo de cartão</option>
              <option value='1'>Crédito</option>
              <option value='2'>Débito</option>
            </select>
            </div>
            <h2>Cartões</h2>
            <table style={{borderSpacing: '0'}}>
              <tr style={{border: '1px solid black'}}>
                <th style={{border: '1px solid black'}}>Número</th>
                <th style={{border: '1px solid black'}}>Bandeira</th>
                <th style={{border: '1px solid black'}}>Limite</th>
                <th style={{border: '1px solid black'}}>Usado</th>
                <th style={{border: '1px solid black'}}>Tipo</th>
                <th style={{border: '1px solid black'}}>Ações</th>
              </tr>
            {cardsFilter.map(card => {

                  return (
                  < >
                  {/* eslint-disable-next-line react/jsx-no-target-blank */}
                  <tr style={{border: '1px solid black'}}>
                        <td style={{border: '1px solid black'}}>{card.number}</td>
                        <td style={{border: '1px solid black'}}>{card.flag}</td>
                        <td style={{border: '1px solid black'}}>{card.limit}</td>
                        <td style={{border: '1px solid black'}}>{card.current}</td>
                        <td style={{border: '1px solid black'}}>{card.type.id === 1 ? 'Crédito' : 'Débito'}</td>
                        <td style={{border: '1px solid black'}}>
                          <Link to = {'/card-update/' + card.id} style={{cursor: 'pointer', textDecoration: 'none', color: '#fff'}}>
                            <button style={{width: '70px', height: '5vhrem', background: '#00ff00', border: 'none', color: '#fff', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', padding: '5px', margin: '2px'}}>Editar</button>
                          </Link>
                          <button style={{width: '70px', height: '5vhrem', background: 'red', border: 'none', color: '#fff', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', padding: '5px', margin: '2px'}} onClick={async () => await deleteCard(card.id)}>Deletar</button>
                          <Link to = {'/card-invoice/' + card.id}>
                          <button style={{width: '120px', height: '2rem', background: '#00ff00', border: 'none', color: '#fff', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', padding: '5px', margin: '2px'}}>Ver Fatura</button>
                          </Link>
                        </td>
                    </tr>
                    </>
                  );
                
                })}
              </table>
            </div>
        </div>
      )
}