import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodn';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

async function verifyToken(
  req: NextRequest
): Promise<{ userid: string; username: string }> {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    throw new Error('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userid: string;
      username: string;
    };
    return decoded;
  } catch (error) {
    throw new Error('Unauthorized');
  }
}

export async function GET(req: NextRequest) {
  try {
    const decoded = await verifyToken(req);
    const username = decoded.username;

    const client = await clientPromise;
    const db = client.db('accomodator'); // Replace with your actual database name

    const user = await db.collection('User').findOne({ username });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove sensitive data before sending the response
    const { password, ...userData } = user;

    return NextResponse.json(userData);
  } catch (error) {
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
