import React, { useEffect, useState } from 'react';
import { Label, Textarea, Spinner } from 'flowbite-react';
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
    return (
       
        <div className='flex justify-center items-center h-screen'>
        <Spinner 
        size="xl"
        ></Spinner>
        </div>
      
    )
  }

  return (


    <div className='min-h-screen flex flex-col items-center mt-12'>
      <div className='mb-8'>
      <h1 className='text-lg mb-4'>{card.title}</h1>
      <p className='text-md italic'>"{card.comment}"</p>
      </div>
      <div
      className="max-w-md"
      id="textarea"
    >
      <div className="mb-2 block">
        <Label
          htmlFor="comment"
          value="Your message"
        />
      </div>
      <Textarea
        id="comment"
        placeholder="Leave a comment..."
        required
        rows={4}
      />
    </div>
    </div>
    
  );
}
    
  

