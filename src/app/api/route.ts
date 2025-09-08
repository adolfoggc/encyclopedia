import { NextResponse } from 'next/server';
import { knowledges } from './knowledges';
import { knowledgeType, requestBodyType, topicType } from './types';

export async function GET() {
  return NextResponse.json( knowledges );
}

function filterKnowledge(requestedKnowledge: string) {
  const knowledge: knowledgeType | undefined = knowledges.find(k => k.name === requestedKnowledge);

  return knowledge;
}

function filterTopic(knowledge: knowledgeType, requestedTopic: string) {
  const topic: topicType | undefined = knowledge.topics.find(t => t.name === requestedTopic);

  return topic;
}

export async function POST(request: Request) {
  const requestBody: requestBodyType = await request.json();
  
  if (!requestBody.knowledge || !requestBody.topic) {
    return NextResponse.json({ error: 'Missing knowledge or topic in request body' }, { status: 400 });
  }

  const knowledge = filterKnowledge(requestBody.knowledge);
  if (!knowledge) {
    return NextResponse.json({ error: 'Knowledge not found' }, { status: 404 });
  }

  const topic = filterTopic(knowledge, requestBody.topic);

  if (!topic) {
    return NextResponse.json({ error: 'Topic not found in the specified knowledge' }, { status: 404 });
  }

  return NextResponse.json( topic.tips );
}