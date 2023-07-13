import React, { useEffect, useState } from 'react';
import api from '../../api';
import history from '../../history';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function CategoriesExpense() {
    const [categories, setCategories] = useState([]);
    async function getData(){
      const id = JSON.parse(localStorage.getItem('id')) 
      const {data} = await api.get(`/expense-category`)
      setCategories(data)
    }
    useEffect(() => {
      getData()
  }, []);
  async function deleteCategory(id){
    await api.delete(`/expense-category/${id}`)
    window.location.reload()
  }
    return (
        <div>
          <Link to='/expense-categories-add'>
            <button type="button" style={{
                width: '200px',
                height: '40px',
                border: 'none',
                background: '#90ee90',
                borderRadius: '25px',
                cursor: 'pointer',
                color: '#fff',
                marginTop: '2vh'
                }}>Adicionar categoria</button>
            </Link>
            <div style={{overflowY: 'scroll', width: '100%', maxHeight: '40vh'}}>
            <h2>Categorias de Despesas</h2>
            <table style={{borderSpacing: '0'}}>
              <tr style={{border: '1px solid black'}}>
                <th style={{border: '1px solid black'}}>Nome</th>
                <th style={{border: '1px solid black'}}>Ações</th>
              </tr>
            {categories.map(categorie => {

                  return (
                    < >
                  {/* eslint-disable-next-line react/jsx-no-target-blank */}
                      <tr style={{border: '1px solid black'}}>
                        <td style={{border: '1px solid black'}}>{categorie.name}</td>
                        <td style={{border: '1px solid black'}}>
                          <Link to = {'/expense-categories-update/' + categorie.id} style={{cursor: 'pointer', textDecoration: 'none', color: '#fff'}}>
                            <button style={{width: '70px', height: '5vhrem', background: '#00ff00', border: 'none', color: '#fff', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', padding: '5px'}}>Editar</button>
                          </Link>
                          <button style={{width: '70px', height: '5vhrem', background: 'red', border: 'none', color: '#fff', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', padding: '5px', marginLeft: '2px'}} onClick={async () => await deleteCategory(categorie.id)}>Deletar</button>
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