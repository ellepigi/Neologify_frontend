import React, { useState } from 'react'
import { addDoc, collection, serverTimestamp  } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig.js';
import { Button, Modal, Badge } from 'flowbite-react';



export default function Create() {

  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [language, setLanguage] =useState('English');

  const [openModal, setOpenModal] = useState('');
  const props = { openModal, setOpenModal };



  const user = auth.currentUser;


  const wordsCollectionRef = collection(db, "words");


  const [tags, setTags] = useState([]);


  const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};
	const addTags = event => {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			// selectedTags([...tags, event.target.value]);
			event.target.value = "";
      console.log(tags)
		}
  }




  const CreateWord = async (e) => {
    e.preventDefault();
    try {
      if(!user){
      await addDoc(wordsCollectionRef, { title, comment, language,});
      setOpenModal('success'); 
      setTitle('');
      setComment('');} else {
        const { uid, displayName, email, photoURL } = user;
        await addDoc(wordsCollectionRef, { title, comment, language, userId: uid, userName: displayName, 
          userEmail: email, photo: photoURL, tags: tags, createdAt: serverTimestamp() });
        setOpenModal('success'); 
        setTitle('');
        setComment('');
        setTags([]);
      }
    } catch (error) {
      setOpenModal('error'); 
    }
  }

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    console.log(selectedLanguage)
  }
  

  return (
    <>
    <section className="bg-white dark:bg-gray-900 mt-8">
  <div className="max-w-2xl mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Sumbit</h2>
    </div>
    <form onSubmit={CreateWord} className="mb-6">
    <div class="mb-6">

    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Language</label>
    <select  id="countries" value={language} onChange={handleLanguageChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
     <option value="English">English</option>
     <option value="Italian">Italian</option>
 
    </select>
    </div>
    <div class="mb-6">
    <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Neologism</label>
    <input minLength={4} maxLength={15}  value={title} onChange={(event) => setTitle(event.target.value)} type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
    </div>
        <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Definition</label>
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <textarea minLength={10} maxLength={256} id="comment" rows="6"  value={comment} onChange={(event) => setComment(event.target.value)}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..." required></textarea>
        </div>
  <label for="base-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags</label>
  <div className='flex flex-wrap justify-start bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
     {tags.map((tag, index) =>{
        return      <span key={index} class="flex items-center gap-2 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {tag}
          <button onClick={() => removeTags(index)}   className="ml-1 bg-red-500 text-white rounded-full p-1 w-4 h-4 text-center leading-none hover:bg-red-700 focus:bg-red-700" style={{fontSize:"8px"}} type='button'>X</button>
          </span>
     })} 
    <input type='text' onKeyUp={event => event.key === " " ? addTags(event) : null} className='border-none focus:ring-transparent  bg-transparent w-full' />
  </div>
    {/* <input type="text" id="tags" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}
      
        <button type="submit"
            className="inline-flex mt-4 items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 
            hover:bg-blue-900 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Post comment
        </button>
    </form>
    
  </div>
</section>


 {/* success modal */}

<Modal show={props.openModal === 'success'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>Word submitted</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The neologism was successfully submitted.
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
              There was an error, the word could not be submitted.
            </p>
            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.setOpenModal(undefined)}>Ok</Button>
          
        </Modal.Footer>
      </Modal>
      </>
  )
}
