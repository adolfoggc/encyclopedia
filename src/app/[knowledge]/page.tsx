"use client"

import { useEffect } from "react"
import { knowledgeDataType } from "../api/route";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Knowledge() {
  const [knowledgeData, setKnowledgeData] = useState(null) <knowledgeDataType | null>
  const path = usePathname()
  
  useEffect(() => {
      fetch('http://localhost:8080/api')
      .then(response => response.json())
      .then(
        data => {
          //setApiData(data)
          const knowledgeName = getKnowledgeNameFromPath()
          console.log('knowledgeName ->', knowledgeName)
          setKnowledgeData(findKnowledgeByName(knowledgeName, data))
        }
    )
      .catch(error => console.error('Error fetching data:', error));
    }, []
  )

  function findKnowledgeByName(name: string, data: knowledgesType) {
    if (!data) return null;
    console.log(data)
    console.log(name)

    const knowledge = data.find(knowledge => knowledge.name === name)
    return knowledge.topics || null;
  }

  function getKnowledgeNameFromPath() {
    const segments = path.split('/');
    return segments[1]; // Assuming the knowledge name is the first segment after the root
  }

  function resolveTopics() {
    if (!knowledgeData) return <p>Loading...</p>;
    else 
      return(
        knowledgeData.map((topic, index) => (
          <div key={index}>
            <li>{topic.name}</li>
          </div>
        )
      )
    )
  }

  return (
    <>
      <p>Topics:</p>
      {
        resolveTopics()
      }
    </>
  )
}