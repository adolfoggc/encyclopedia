import { NextResponse } from 'next/server';
import { knowledges } from './knowledges';
import { knowledgeType, requestBodyType, topicType } from './types';

export async function GET() {
  return NextResponse.json( knowledges );
}

function filterKnowledge(requestedKnowledge: string) {
  const knowledge: knowledgeType[] | [] = knowledges.find(k => k.name === requestedKnowledge);

  if (!knowledge || knowledge.length === 0) {
    return NextResponse.json({ error: 'Knowledge not found' }, { status: 404 });
  }

  return knowledge;
}

function filterTopic(knowledge: knowledgeType, requestedTopic: string) {
  const topic: topicType[] | [] = knowledge.topics.find(t => t.name === requestedTopic);

  if (!topic || topic.length === 0) {
    return NextResponse.json({ error: 'Topic not found in the specified knowledge' }, { status: 404 });
  }

  return topic;
}

export async function POST(request: Request) {
  const requestBody: requestBodyType = await request.json();
  
  if (!requestBody.knowledge || !requestBody.topic) {
    return NextResponse.json({ error: 'Missing knowledge or topic in request body' }, { status: 400 });
  }

  const knowledge = filterKnowledge(requestBody.knowledge);
  const topic = filterTopic(knowledge, requestBody.topic);

  return NextResponse.json( topic.tips );
}