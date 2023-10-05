import React, { useEffect, useState } from 'react'
import { useAuthValue } from '../../../context/AuthContext';
import { getAllCards } from '../../../serivces/cardService';
import { Spinner } from 'flowbite-react' 
import Card from '../../../Card/Card';



export default function MyPosts() {

  const [loading, setLoading]  = useState(true);
  const [profileDocuments, setProfileDocuments ] = useState([]);

  const { currentUser } = useAuthValue()
  
  useEffect(() => {
     const fetchData = async () => {
       try {
         const documents = await getAllCards();
         const filteredDocuments = documents.filter((doc) =>
          doc.userName && doc.userName === currentUser.displayName
         );
         setProfileDocuments(filteredDocuments);
         setLoading(false);

       } catch (error) {
         console.error('Errore nel recupero dei dati da Firestore:', error);
     }
     };

     fetchData();

  }, []);

  if (loading === true ){
    return (
      <div className='flex justify-center items-center h-screen w-full flex-1'>
      <Spinner 
      size="xl"
      ></Spinner>
      </div>
    )
  }

  return (
    < div className='page m-10 mb-12 flex-1'>
      <h1 className='text-left text-3xl ml-2'>My Posts</h1>
      <div className='cards flex mt-8 space-y-4 gap-2 flex-wrap justify-center'>
      {profileDocuments.map((item) => (
            <Card className="max-w-xs" key={item.id} id={item.id} title={item.title} comment={item.comment} language={item.language}
        photo={item.photo} username={item.userName} tags={item.tags} />          ))}
        </div>
      </div>
  )
}
