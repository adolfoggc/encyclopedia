import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json( knowledges );
}

const knowledges = [
  {
    name: "React",
    topics: [
      {
        name: "Functions",
        tips:  [
          {
            text: "All Event Handling functions names starts with the word \"handle\" in React"
          }
        ]
      }
    ]
  }
];

export type knowledgesType = knowledgeType[];

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