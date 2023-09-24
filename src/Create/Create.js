import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
// 'use client';

import { Button, Modal } from 'flowbite-react';



export default function Create() {

  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [language, setLanguage] =useState('English');

  const [openModal, setOpenModal] = useState('');
  const props = { openModal, setOpenModal };


  const wordsCollectionRef = collection(db, "words");
  const CreateWord = async (e) => {
    e.preventDefault();
    await addDoc(wordsCollectionRef, {title, comment, language});
    setOpenModal('default');
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
        <button type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 
            hover:bg-blue-900 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Post comment
        </button>
    </form>
    
  </div>
</section>

 {/* modal */}

<Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
              companies around the world are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to
              ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as
              possible of high-risk data breaches that could personally affect them.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.setOpenModal(undefined)}>I accept</Button>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  )
}
