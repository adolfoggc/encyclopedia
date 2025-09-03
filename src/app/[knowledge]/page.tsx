"use client"

import { useEffect } from "react"
import { topicType, knowledgeType } from "../api/types";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { getFetcher } from "@/utils/dataFetcher";
import Link from "next/link";

export default function Knowledge() {
  const [topics, setTopics] = useState <topicType[] | null> (null) 
  const path = usePathname()
  
  useEffect(() => {
      getFetcher('http://localhost:8080/api')
      .then(
        data => {
          const knowledgeName = getKnowledgeNameFromPath()
          if (!knowledgeName) return null;

          const topicsData = findTopicsByKnowledge(knowledgeName, data)
          if (!topicsData) return null;

          setTopics(topicsData)
        }
    )
      .catch(error => console.error('Error fetching data:', error));
    }, []
  )

  function findTopicsByKnowledge(name: string, data: knowledgeType[] | null): topicType[] | null {
    if (!data) return null;
    const knowledge = data.find(knowledge => knowledge.name === name)
    if (!knowledge) return null;
    return knowledge.topics;
  }

  function getKnowledgeNameFromPath(): string {
    const segments = path.split('/');
    return segments[1];
  }

  function resolveTopics() {
    if (!topics) return <p>Loading...</p>;
    else 
      return(
        topics.map((topic: topicType, index: number) => (
          <Link key={index} href={`${path}/${topic.name}`}>
            <li>{topic.name}</li>
          </Link>
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