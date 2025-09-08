"use client"

import { postFetcher } from "@/utils/dataFetcher";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react"
import { requestBodyType, tipType } from "@/app/api/types";

export default function Topic() {
  const path = usePathname()
  const splittedPath = path.split('/');
  const [tips, setTips] = useState <tipType[] | null > (null)

  const body: requestBodyType = {
    knowledge: splittedPath[1],
    topic: splittedPath[2]
  }

  useEffect(() => {
    postFetcher('http://localhost:8080/api', body)
      .then(
        response => {
          setTips(response)
        }
      )
      .catch(error => console.error('Error with POST request:', error));
    }, [])

    function showRelated(related: string[] | undefined) {
      if (related) {
        return (
          related.map((related, index) =>
            <span key= { `related-${index}` }> { related } </span>
          )
        )
      } else {
        return <div></div>
      }
    }

    function resolvetips() {
      if (!tips) return <div>Loading...</div>
      else {
        return (
          tips.map((tip: tipType, index: number) => {
              return (
                <li key={ `tip-${index}` }>
                  <div>
                    {tip.text}
                  </div>
                  { showRelated(tip.related) }
                </li>
              )
            }
          ) 
        )
      }
    }

  return (
    <>
      <div>Topic Page</div>
      {
        resolvetips()
      }
    </>
  )
}