import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../../api';

export default function Home() {
  const { handleLogout } = useContext(Context);
  const [expenses, setExpenses] = useState([]);
  const [revenues, setRevenues] = useState([]);
  const [user, setUser] = useState({});
  async function getData(){
    const id = JSON.parse(localStorage.getItem('id')) 
    const {data} = await api.get(`/users/${id}`)
    setUser(data)
    setExpenses(data.expenses)
    setRevenues(data.revenues)
  }
  async function deleteRevenue(id){
    await api.delete(`/revenue/${id}`)
    window.location.reload()
  }
  async function deleteExpense(id){
    await api.delete(`/expense/${id}`)
    window.location.reload()
  }
  useEffect(() => {
      getData()
  }, []);
  console.log(expenses)
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div>
      <Link to='/card'><button type="button" style={{
                width: '100px',
                height: '20px',
                border: 'none',
                background: '#fff',
                borderRadius: '25px',
                cursor: 'pointer',
                }}>Cartões</button></Link>
      <Link to='/expense-categories'><button type="button" style={{
                width: '150px',
                height: '20px',
                border: 'none',
                background: '#fff',
                borderRadius: '25px',
                cursor: 'pointer',
                }}>Categoria de despesas</button></Link>
      </div>
        
        <div style={{display: 'flex', justifyContent: 'flex-end', margin: '.5vw'}}>
        <Link to={'/profile/' + user.id}><button type="button" style={{
                width: '100px',
                height: '20px',
                border: 'none',
                background: '#fff',
                borderRadius: '25px',
                cursor: 'pointer',
                }}>{user.name}</button></Link>
          <button onClick={handleLogout}>Logout</button>
          </div>
      </div>
      <div>
        <div style={{width: '40%', textAlign: 'center'}}>
            <Link to='/expense-add'>
            <button type="button" style={{
                width: '200px',
                height: '40px',
                border: 'none',
                background: '#F0D514',
                borderRadius: '25px',
                cursor: 'pointer',
                color: '#fff',
                marginTop: '5vh'
                }}>Adicionar despesa</button>
            </Link>

            <Link to='/revenue-add'>
            <button type="button" style={{
                width: '200px',
                height: '40px',
                border: 'none',
                background: '#90ee90',
                borderRadius: '25px',
                cursor: 'pointer',
                color: '#fff',
                marginTop: '5vh'
                }}>Adicionar receita</button>
            </Link>
        </div>
        <div style={{display: 'flex'}}>
          
            <div style={{overflowY: 'scroll', width: '100%', maxHeight: '40vh'}}>
            <h2> Despesas</h2>
            {expenses.map(expense => {

                  return (
                    <div key={expense.id} >
                  {/* eslint-disable-next-line react/jsx-no-target-blank */}
                      <div style={{margin: '10px', fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between'}}>
                        <span>{expense.description}</span>
                        <span>{expense.amount}</span>
                        <div>
                        <Link to = {'/expense-update/' + expense.id} style={{cursor: 'pointer', textDecoration: 'none', color: '#fff'}}>
                          <button style={{width: '70px', height: '5vhrem', background: '#00ff00', border: 'none', color: '#fff', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', padding: '5px'}}>Editar</button>
                        </Link>
                        <button style={{width: '70px', height: '5vhrem', background: 'red', border: 'none', color: '#fff', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', padding: '5px', marginLeft: '2px'}} onClick={async () => await deleteExpense(expense.id)}>Deletar</button>
                        </div>
                      </div>
                      <hr/>
                    </div>
                  );
                
                })}
            </div>

            <div  style={{overflowY: 'scroll', width: '100%', maxHeight: '40vh'}}>
            <h2> Receita</h2>
            {revenues.map(revenue => {
                  return (
                    <div key={revenue.id}>
                  {/* eslint-disable-next-line react/jsx-no-target-blank */}
                        <div style={{margin: '10px', fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between'}}>
                          <span>{revenue.name}</span>
                          <span>{revenue.value}</span>
                          <div>
                            <Link to = {'/revenue-update/' + revenue.id} style={{cursor: 'pointer', textDecoration: 'none', color: '#fff'}}>
                            <button style={{width: '70px', height: '5vhrem', background: '#00ff00', border: 'none', color: '#fff', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', padding: '5px'}}>Editar</button>
                            </Link>
                            
                            <button style={{width: '70px', height: '5vhrem', background: 'red', border: 'none', color: '#fff', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', padding: '5px', marginLeft: '2px'}} onClick={async () => await deleteRevenue(revenue.id)}>Deletar</button>
                          </div>
                        </div> 
                      <hr/>
                    </div>
                  );
                
                })}
            </div>
        </div>
  
      </div>

    </>
  );
}