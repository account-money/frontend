import React, { useContext, useState } from 'react';
import { Context } from '../../Context/AuthContext';
import history from '../../history';
import { Div, Logo } from './styled';

export default function SignUp() {
  const { handleSignUp } = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
      passwordConfirmation
    };
    await handleSignUp(data);
  };

  const pushSignUp = (e) => {
    e.preventDefault();
    history.push('/login');
  }
  return (
    <div>
      <Div>
        <form style={
          {
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start', 
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
              marginBottom: '10px',
              marginTop: '30px',
          }
          }>Email</label>

          <input 
          type='text' value={email}
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

          <label style={
            {
              fontWeight: 'bolder',
              marginBottom: '10px',
              marginTop: '30px'
          }
          }>Senha</label>
          <input 
          type='password' 
          value={password}
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
            }>Cadastrar</button>
          </div>
          <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <button type="button" onClick={pushSignUp} 
            style={
              {
                width: '70%',
                height: '40px',
                borderRadius: '12px',
                border: 'none',
                background: '#F0D514',
                marginTop: '30px',
                color: '#fff',
                fontWeight: 'bold'
            }
            }>Já tem conta?</button>
          </div>
        </form>
      </Div>
    </div>
  )
}