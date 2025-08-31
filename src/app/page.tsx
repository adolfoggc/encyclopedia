"use client"

import { useEffect, useState } from "react";
import { knowledgesType } from "./api/route";

export default function Home() {
  const [apiData, setApiData] = useState <knowledgesType | null>(null)

  useEffect(() =>  {
    console.log('Fetching...');
    fetch('http://localhost:8080/api')
      .then(response => response.json())
      .then(data => {
        setApiData(data)
        console.log(data)}
      )
      .catch(error => console.error('Error fetching data:', error));
  }, [])
  
  return(
    <>
      <div>Home</div>
      {
        apiData 
        ? 
        apiData.map(knowledge => (
          <div key={knowledge.name}>{knowledge.name}</div>
        ))
        : <div>Loading...</div>
      }
    </>
    
  )
}