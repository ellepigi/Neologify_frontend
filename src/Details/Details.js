import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllCards } from '../serivces/cardService'; 



export default function Details() {
   
  const { cardId } = useParams();
  const [card, setCard] = useState(null); 
 
  
  useEffect(() => {
    async function fetchCard() {
      try {
        const cards = await getAllCards();
        const selectedCard = cards.find((c) => c.id === cardId);
        setCard(selectedCard);
      } catch (error) {
        console.error('Errore nel recupero dei dati della carta:', error);
      }
    }

    fetchCard();
  }, [cardId]);

  if (!card) {
    return <div>Caricamento in corso...</div>;
  }

  return (

  

 



    <div>
      <h1>{card.title}</h1>
    </div>
  );
}
    
  

