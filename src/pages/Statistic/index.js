import React, { useEffect, useState } from 'react';
import api from '../../api';
import history from '../../history';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Statistic() {
    const [statistics, setStatistics] = useState([]);
    async function getData(){
      const id = JSON.parse(localStorage.getItem('id')) 
      try{
        const {data} = await api.get(`/statistic?user=${id}`)
        setStatistics(data.result)
        console.log(data)
      }catch(error){
        if (error.response.status === 404 || error.response.status === 401) history.goBack()
      }
    }
    useEffect(() => {
      getData()
  }, []);
    return (
      <>
        <div style={{margin: '1rem'}}>
        <h1>Estatísticas</h1>
          {statistics && statistics.map(statistic => (
            <>
              <div style={{margin: '1rem'}}>
                <h2>{statistic.title}</h2>
                <p>Média: {statistic.media}</p>
                <p>Mediana: {statistic.mediana}</p>
                <p>Variancia: {statistic.variancia}</p>
                <p>Desvio Padrão: {statistic.desvioPadrao}</p>
                <p>Intervalo de Confiança: ({statistic.intervaloConfianca[0]}, {statistic.intervaloConfianca[1]})</p>
              </div>
            </>
          ))}

        </div>
      </>
      )
}