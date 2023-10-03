import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getAllCards } from '../serivces/cardService';
import { Spinner } from 'flowbite-react';
import Card from '../Card/Card';

export default function TagList() {

    const { tagName } = useParams();
    const [taggedDocuments, setTaggedDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const documents = await getAllCards();
          const filteredDocuments = documents.filter((doc) =>
           doc.tags && doc.tags.includes(tagName)
          );
          setTaggedDocuments(filteredDocuments);
          setLoading(false);

        } catch (error) {
          console.error('Errore nel recupero dei dati da Firestore:', error);
        }
      };
  
      fetchData();
    }, [tagName]);

    if(loading === true){
      return (
        <div className='flex justify-center items-center h-screen'>
        <Spinner 
        size="xl"
        ></Spinner>
        </div>
      )
    }
  
    return (
      <div className='page m-10 mb-12 h-full'>
      <h1 className='text-left text-4xl ml-2'>{tagName.charAt(0).toUpperCase() + tagName.slice(1)}</h1>
      <div className='cards flex mt-8 space-y-4 gap-2 flex-wrap w-full justify-center'>

          {taggedDocuments.map((item) => (
            <Card className="max-w-xs" key={item.id} id={item.id} title={item.title} comment={item.comment} language={item.language}
        photo={item.photo} username={item.userName} tags={item.tags} />          ))}
        </div>
      </div>
    );

 
}
