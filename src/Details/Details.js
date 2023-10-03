import React, { useEffect, useState } from 'react';
import { Label, Textarea, Spinner } from 'flowbite-react';
import { useParams } from 'react-router-dom';
import { getAllCards } from '../serivces/cardService'; 
import { Link } from 'react-router-dom';



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
      <div className='mb-16'>
      <h1 className="font-bold text-xl mb-4">{card.title}</h1>
      <p className='text-sm mb-8'>{card.language}</p>

      <p className='text-md italic mb-12'>"{card.comment}"</p>
      {card.tags && card.tags.map((tag, index) => (
    <Link key={index} to={`/tag/${tag}`}>

    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-300 mr-2 mb-2">
      {tag}
    </span>
    </Link>
  ))}   
      </div>
      <div className="w-1/3" id="textarea" >
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
    
  

