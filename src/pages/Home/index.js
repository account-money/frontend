import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../../api';

export default function Home() {
  const { handleLogout } = useContext(Context);
  const [expensesFilter, setExpensesFilter] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [revenuesFilter, setRevenuesFilter] = useState([]);
  const [revenues, setRevenues] = useState([]);
  const [user, setUser] = useState({});
  async function getData(month){
    console.log(month)
    const id = JSON.parse(localStorage.getItem('id')) 
    const {data} = month ? await api.get(`/users/${id}?month=${month}`) : await api.get(`/users/${id}?month=${new Date().getMonth() + 1}`)
    setUser(data)
    setExpenses(data.expenses)
    setExpensesFilter(data.expenses)
    setRevenues(data.revenues)
    setRevenuesFilter(data.revenues)
  }
  async function deleteRevenue(id){
    await api.delete(`/revenue/${id}`)
    window.location.reload()
  }
  async function deleteExpense(id){
    await api.delete(`/expense/${id}`)
    window.location.reload()
  }
  async function paid(id){
    await api.post(`/expense/paid/${id}`)
    window.location.reload()
  }
  useEffect(() => {
      getData()
  }, []);
  console.log(expenses)
  return (
    <div style={{ margin: '10px 20px'}}>
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
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              
            <div style={{width: '500px'}}>
            <input placeholder='Descrição, valor...' onChange={(e) => {
              setExpensesFilter(expenses.filter(expense => expense.description.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()) || expense.amount.toString().includes(e.target.value.toLocaleLowerCase())))
            }}/>
            <select onChange={async (e) =>   {
                setExpensesFilter(expenses.filter(expense => expense.paymentType.id == e.target.value))
              
            }}>
              <option value=''>Tipo de pagamento</option>
              <option value='1'>Crédito</option>
              <option value='2'>Débito</option>
              <option value='3'>Dinheiro</option>
            </select>
            <select onChange={async (e) =>   {
                setExpensesFilter(e.target.value ? expenses.filter(expense => expense.category.id == e.target.value) : expenses)
              
            }}>
              <option value=''>Categoria de despesa</option>
            {
                user.categories && user.categories.map(category => {
                    return (
                        <option value={category.id}>{category.name}</option>
                    )
                })
            }
            </select>
            </div>
            <div>
              <select className='select_month' onChange={async (e) =>   {
                  await getData(e.target.value)
                
              }}>
                <option selected = {new Date().getMonth() === 0} value='1'>Janeiro</option>
                <option selected = {new Date().getMonth() === 1} value='2'>Fevereiro</option>
                <option selected = {new Date().getMonth() === 2} value='3'>Março</option>
                <option selected = {new Date().getMonth() === 3} value='4'>Abril</option>
                <option selected = {new Date().getMonth() === 4} value='5'>Maio</option>
                <option selected = {new Date().getMonth() === 5} value='6'>Junho</option>
                <option selected = {new Date().getMonth() === 6} value='7'>Julho</option>
                <option selected = {new Date().getMonth() === 7} value='8'>Agosto</option>
                <option selected = {new Date().getMonth() === 8} value='9'>Setembro</option>
                <option selected = {new Date().getMonth() === 9} value='10'>Outubro</option>
                <option selected = {new Date().getMonth() === 10} value='11'>Novembro</option>
                <option selected = {new Date().getMonth() === 11} value='12'>Dezembro</option>
              </select>
            </div>
            <div  style={{width: '520px'}}>
            <input placeholder='Nome, valor...' onChange={(e) => {
              setRevenuesFilter(revenues.filter(revenue => revenue.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()) || revenue.value.toString().includes(e.target.value.toLocaleLowerCase())))
            }}/>
            </div>
            </div>
            
        <div style={{display: 'flex'}}>
            
            <div style={{overflowY: 'scroll', width: '100%', maxHeight: '40vh'}}>
            <h2> Despesas</h2>
            <table style={{borderSpacing: '0', width: '100%'}}>
              <tr style={{border: '1px solid black', textAlign:'center'}}>
                <th style={{border: '1px solid black', textAlign:'center'}}>Descrição</th>
                <th style={{border: '1px solid black', textAlign:'center'}}>Valor</th>
                <th style={{border: '1px solid black', textAlign:'center'}}>Pago</th>
                <th style={{border: '1px solid black', textAlign:'center'}}>Categoria</th>
                <th style={{border: '1px solid black', textAlign:'center'}}>Tipo de pagamento</th>
                <th style={{border: '1px solid black', textAlign:'center'}}>Ações</th>
              </tr>
            {expensesFilter.map(expense => {

                  return (
                      <tr style={{border: '1px solid black', textAlign:'center'}}>

                        <td style={{border: '1px solid black', textAlign:'center'}}>{expense.description}{expense.paymentType.id === 1 && <span style={{marginLeft: '10px', background: '#00BFFF'}}>{expense.parcelNumber} / {expense.parcels}</span>}</td>
                        <td style={{border: '1px solid black', textAlign:'center'}}>{expense.paymentType.id === 1 ? Number(expense.amount)/Number(expense.parcels) : expense.amount}</td>
                        <td style={{border: '1px solid black', textAlign:'center'}}>{expense.paidAt ? 'Sim': 'Não'}</td>
                        <td style={{border: '1px solid black', textAlign:'center'}}>{expense.category.name}</td>
                        <td style={{border: '1px solid black', textAlign:'center'}}>{expense.paymentType.name}</td>
                        <td style={{border: '1px solid black' , textAlign:'center'}}>
                        <Link to = {'/expense-update/' + expense.id} style={{cursor: 'pointer', textDecoration: 'none', color: '#fff'}}>
                          <button style={{width: '70px', height: '2rem', background: '#00ff00', border: 'none', color: '#fff', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', padding: '5px'}}>Editar</button>
                        </Link>
                        <button style={{width: '70px', height: '2rem', background: 'red', border: 'none', color: '#fff', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', padding: '5px', marginLeft: '2px'}} onClick={async () => await deleteExpense(expense.id)}>Deletar</button>
                        {!expense.paidAt && !expense.paymentType.id == 1 &&
                        <button style={{width: '70px', height: '2rem', background: '#00ff00', border: 'none', color: '#fff', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', padding: '5px', marginLeft: '2px'}} onClick={async () => await paid(expense.id)}>Pagar</button>
                        }
                        </td>
                        </tr>

                  );
                
                })}
                </table>
            </div>

            <div  style={{overflowY: 'scroll', width: '100%', maxHeight: '40vh'}}>
            <h2 style={{display: 'flex', justifyContent: 'flex-end'}}> Receita</h2>
            {revenuesFilter.map(revenue => {
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

    </div>
  );
}