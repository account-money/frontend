import React, { useEffect, useState } from 'react';
import api from '../../api';
import history from '../../history';
import { useContext } from 'react';
import { Context } from '../../Context/AuthContext';

export default function Profile(props) {
  const { handleLogout } = useContext(Context);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function getData(){
      const {data} = await api.get(`/users/${props.match.params.id}`)
      setId(data.id)
      setName(data.name)
      setEmail(data.email)
    }
    useEffect(() => {
      getData()
  }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
          name,
          email,
          user: JSON.parse(localStorage.getItem('id'))
        };
          await api.put(`/users/${props.match.params.id}`, password ? Object.assign({}, data, {password}) : data);
          handleLogout()
      };
      async function deleteUser(id){
        console.log(id)
        await api.delete(`/users/${id}`)
      }
    return (
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
              }>Email</label>
    
              <input 
              type='email' value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              }>Nova senha</label>
    
              <input 
              type='password' value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              
    
              <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
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
                <div style={{width: '70%', height: '5vh', background: 'red', border: 'none',marginTop: '30px', color: '#fff', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', padding: '5px', marginLeft: '2px', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={async () => await deleteUser(id)}>Deletar conta</div>
              </div>
            </form>
        </div>
      )
}