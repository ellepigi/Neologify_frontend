import React, { useEffect, useState } from "react";
import { getAllCards } from "../serivces/cardService";
import { Spinner } from "flowbite-react";
import Card from "../components/Card";
import "../index.css";
import ReactPaginate from "react-paginate";

export default function Section() {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 8;
  const pageCount = Math.ceil(latest.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = latest.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  useEffect(() => {
    const getWords = async () => {
      const data = await getAllCards();
      data.sort((a, b) => b.createdAt - a.createdAt);
      setLatest(data);
      setLoading(false);
    };

    getWords();
  }, []);

  if (loading === true) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl"></Spinner>
      </div>
    );
  }

  return (
    <div className="page m-10 mb-12 h-screen">
      <h1 className="text-left text-4xl ml-2">Latest</h1>
      <div>
        <div className="cards flex mt-8 space-y-4 gap-2 flex-wrap w-full justify-center">
          {currentItems.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              comment={item.comment}
              language={item.language}
              photo={item.photo}
              username={item.userName}
              tags={item.tags}
            />
          ))}
        </div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}
