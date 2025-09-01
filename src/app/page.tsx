"use client"

import { useEffect, useState } from "react";
import { knowledgesType } from "./api/route";
import Link from "next/link";
import { dataFetcher } from "@/utils/dataFetcher";

export default function Home() {
  const [apiData, setApiData] = useState <knowledgesType | null>(null)

  useEffect(() =>  {
    dataFetcher('http://localhost:8080/api')
      .then(data => setApiData(data)
      )
      .catch(error => console.error('Error fetching data:', error));
  }, [])
  
  return(
    <>
      <div>Home</div>
      {
        apiData 
        ? 
        apiData.map((knowledge, index) => (
          <Link href={`/${knowledge.name}`} key={index}>
            <li key={index}>
              {knowledge.name}
            </li>
          </Link>
        ))
        : <div>Loading...</div>
      }
    </>
    
  )
}