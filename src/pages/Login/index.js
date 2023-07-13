import React, { useContext, useState } from 'react';
import { Context } from '../../Context/AuthContext';
import { Div, Logo } from './styled';
import history from '../../history';

export default function Login() {
  const { handleLogin } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      await handleLogin(data);
    } catch (error) {
      setValid(false)
    }
  };

  const pushSignUp = (e) => {
    e.preventDefault();
    history.push('/sign-up');
  }
  function write(){
    setValid(true)
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
          onKeyUp={write}
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
          onKeyUp={write}
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
  
          {!valid && 
          <div style={{width: '100%', display: 'flex', justifyContent: 'center', color: 'red', marginTop: '1vh'}}>
          Usuário ou senha inválidos.
          </div>}
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
            }>Entrar</button>
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
            }>Cadastrar-se</button>
          </div>
        </form>
      </Div>
    </div>
  )
}