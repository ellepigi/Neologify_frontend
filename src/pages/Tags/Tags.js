import React, { useState, useEffect } from "react";
import { getAllCards } from "../../serivces/cardService";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documents = await getAllCards();
        const allTags = [];

        documents.forEach((doc) => {
          if (doc.tags && Array.isArray(doc.tags)) {
            doc.tags.forEach((tag) => {
              if (!allTags.includes(tag)) {
                allTags.push(tag);
              }
            });
          }
        });
        allTags.sort();
        setTags(allTags);
        setLoading(false);
      } catch (error) {
        console.error("Errore nel recupero dei dati da Firestore:", error);
      }
    };

    fetchData();
  }, []);

  if (loading === true) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl"></Spinner>
      </div>
    );
  }

  return (
    <div className="page m-10 mb-12 h-full">
      <h1 className="text-left text-4xl ml-2">Tags</h1>
      <div className="min-h-screen flex justify-center items-start">
        {tags.map((tag, index) => (
          <Link key={index} to={`/tag/${tag}`}>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-300 mr-2 mb-2">
              {tag}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
