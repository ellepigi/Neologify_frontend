import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card/Card'

export default function Section  () {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/words')
      .then(response => {
        // Gestisci la risposta dal backend
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        // Gestisci gli errori
        console.error(error);
      });
  }, []); // Il secondo argomento vuoto [] indica che l'effetto viene eseguito solo una volta durante il montaggio iniziale del componente

  return (
    <div className='page m-10 mb-12 h-screen'>
      <h1 className='text-left text-4xl ml-2'>Trending</h1>

    <div className='cards flex mt-8 gap-2 '>
    {data.map(item => (
        <Card key={item.id} title={item.title} />
      ))}
    </div>
    </div>
  )
}
