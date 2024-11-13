import { NextResponse } from 'next/server';

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;

export async function GET() {
  try {
    const response = await fetch(
      `https://graph.instagram.com/v12.0/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_url,permalink,username&access_token=${INSTAGRAM_ACCESS_TOKEN}`
    );
    const data = await response.json();
    
    return NextResponse.json(data.data);
  } catch (error) {
    console.error('Error fetching from Instagram API:', error);
    return NextResponse.json({ error: 'Failed to fetch Instagram posts' }, { status: 500 });
  }
} 