import React, { useEffect, useState } from 'react';
import api from '../../api';
import history from '../../history';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Card() {
    const [cards, setCards] = useState([]);
    async function getData(){
      const id = JSON.parse(localStorage.getItem('id')) 
      const {data} = await api.get(`/card`)
      setCards(data)
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
            {cards.map(card => {

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
                            <button style={{width: '70px', height: '5vhrem', background: '#00ff00', border: 'none', color: '#fff', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', padding: '5px'}}>Editar</button>
                          </Link>
                          <button style={{width: '70px', height: '5vhrem', background: 'red', border: 'none', color: '#fff', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', padding: '5px', marginLeft: '2px'}} onClick={async () => await deleteCard(card.id)}>Deletar</button>
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