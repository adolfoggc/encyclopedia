import { knowledgeType, requestBodyType, topicType } from "@/app/api/types"

export function getFetcher(url: string): Promise<knowledgeType[]> {
  return fetch(url).then(response => response.json())
}

export function postFetcher(url: string, body: requestBodyType): Promise<topicType[] | { error: string }> {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(response => response.json())
}
