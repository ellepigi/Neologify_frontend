import React, { useEffect, useState } from 'react';
import { Modal, Spinner, Button } from 'flowbite-react';
import { useParams } from 'react-router-dom';
import { getAllCards } from '../serivces/cardService'; 
import { Link } from 'react-router-dom';
import { useAuthValue } from '../context/AuthContext';
import { db } from '../firebaseConfig';
import { addDoc, collection, getDocs, where, query } from 'firebase/firestore';


export default function Details() {
   
  const { cardId } = useParams();
  const [card, setCard] = useState(null); 
  const [ comment, setComment ] = useState('');
  const [ error, setError ] = useState('');
  const {currentUser} = useAuthValue();
  const commentsCollectionRef = collection(db, "comments");
  const username = currentUser.displayName; 

  const [comments, setComments] = useState([]);


  const [openModal, setOpenModal] = useState('');
  const props = { openModal, setOpenModal };
  
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

  useEffect(() => {
    async function fetchComments() {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, 'comments'), where('cardId', '==', cardId))
        );
  
        const commentsData = [];
  
        querySnapshot.forEach((doc) => {
          const commentData = doc.data();
          commentsData.push(commentData);
        });
  
        setComments(commentsData);
        console.log(comments)
      } catch (error) {
        console.error('Errore nel recupero dei commenti:', error);
      }
    }

    fetchComments();
  }, [cardId]);


  const createComment = async (e) => {
    e.preventDefault();
    try{
    if(!currentUser){
      setError('You must be logged in to submit a comment')
    } else {
      await addDoc(commentsCollectionRef, {comment, username, cardId})
      setOpenModal('success'); 
      setComment('');
    } }
     catch (error) {
      setOpenModal('error'); 

    }
  }



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

     <>
    <div className='min-h-screen flex flex-col items-center mt-12'>
      <div className='mb-16'>
      <h1 className="font-bold text-xl mb-4">{card.title}</h1>
      <p className='text-sm mb-8'>{card.language}</p>

      <p className='text-md italic mb-8'>"{card.comment}"</p>
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
      </div>
      <form>
      <label htmlFor="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
      <textarea
        id="comment"
        className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
        placeholder="Leave a comment..."
        required
        value={comment} 
        onChange={(event) => setComment(event.target.value)}
      ></textarea>
      {error && <p className='text-red-500'>{error}</p>}
      <button type='submit' className='mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' onClick={createComment}>
        Submit
      </button>
      </form>
      {comments.length > 0 ? (
  comments.map((item, index) => (
    <div key={index}>{item.comment}</div>
  ))
) : (
  <p>No comments available.</p>
)}
      
    </div>
    </div>

    {/* success modal */}

<Modal show={props.openModal === 'success'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>Word submitted</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The comment was successfully submitted.
            </p>
            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.setOpenModal(undefined)}>Ok</Button>
          
        </Modal.Footer>
      </Modal>

      {/* error modal */}

<Modal show={props.openModal === 'error'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>Error</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              There was an error, the comment could not be submitted.
            </p>
            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.setOpenModal(undefined)}>Ok</Button>
          
        </Modal.Footer>
      </Modal>
      </>
    
  );
}
    
  

