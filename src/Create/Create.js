import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';





export default function Create() {

  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [language, setLanguage] =useState('English');

  const wordsCollectionRef = collection(db, "words");
  const CreateWord = async (e) => {
    e.preventDefault();
    await addDoc(wordsCollectionRef, {title, comment, language});
  }

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    console.log(selectedLanguage)
  }
  

  return (
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
    <input value={title} onChange={(event) => setTitle(event.target.value)} type="text" id="base-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
    </div>
        <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Definition</label>
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <textarea id="comment" rows="6"  value={comment} onChange={(event) => setComment(event.target.value)}
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
  )
}
