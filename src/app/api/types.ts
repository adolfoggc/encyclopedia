export type knowledgeType = {
  name: string,
  topics: topicType[]
}

export type topicType = {
  name: string,
  tips: tipType[]
}

export type tipType = {
  text: string,
  related?: string[]
}

export type requestBodyType = {
  knowledge: string | null,
  topic?: string | null
}