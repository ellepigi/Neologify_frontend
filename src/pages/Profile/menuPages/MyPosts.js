import React, { useEffect, useState } from 'react'
import { useAuthValue } from '../../../context/AuthContext';
import { getAllCards } from '../../../serivces/cardService';
import { Spinner } from 'flowbite-react' 
import ReactPaginate from 'react-paginate';
import Card from '../../../components/Card';
import '../../../index.css'



export default function MyPosts() {

  const [loading, setLoading]  = useState(true);
  const [profileDocuments, setProfileDocuments ] = useState([]);

  const { currentUser } = useAuthValue()

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8; 
  const pageCount = Math.ceil(profileDocuments.length / itemsPerPage);
  
    const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = profileDocuments.slice(startIndex, endIndex);
  
  
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  
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
      {currentItems.map((item) => (
            <Card className="max-w-xs" key={item.id} id={item.id} title={item.title} comment={item.comment} language={item.language}
        photo={item.photo} username={item.userName} tags={item.tags} />          ))}
        </div>
        <ReactPaginate
  previousLabel={'Previous'}
  nextLabel={'Next'}
  breakLabel={'...'}
  pageCount={pageCount}
  marginPagesDisplayed={2}
  pageRangeDisplayed={5}
  onPageChange={handlePageChange}
  containerClassName={'pagination'}
  activeClassName={'active'}
/>
      </div>
  )
}
