"use client"

import { postFetcher } from "@/utils/dataFetcher";
import { usePathname } from "next/navigation";
import { useEffect } from "react"
import { requestBodyType } from "@/app/api/types";

export default function Topic() {
  const path = usePathname()
  const splittedPath = path.split('/');

  const body: requestBodyType = {
    knowledge: splittedPath[1],
    topic: splittedPath[2]
  }

  useEffect(() => {
    postFetcher('http://localhost:8080/api', body)
      .then(response => console.log('POST response:', response))
      .catch(error => console.error('Error with POST request:', error));
    }, [])

  return (
    <>
      <div>Topic Page</div>
      <div>Loading...</div>
    </>
  )
}
