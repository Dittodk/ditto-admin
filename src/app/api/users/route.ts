import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodn';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

async function verifyToken(
  req: NextRequest
): Promise<{ userid: string; email: string }> {
  const token = req.cookies.get('token')?.value;
  if (!token) {
    throw new Error('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userid: string;
      email: string;
    };
    return decoded;
  } catch (error) {
    throw new Error('Unauthorized');
  }
}

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('accomodator'); // Replace with your actual database name

    const users = await db.collection('User').find({}).toArray();

    // Remove sensitive data before sending the response
    const sanitizedUsers = users.map((user: any) => {
      const { hashedPassword, ...userData } = user;
      return userData;
    });

    return NextResponse.json(sanitizedUsers);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { email } = await req.json();

    const client = await clientPromise;
    const db = client.db('accomodator'); // Replace with your actual database name

    const result = await db.collection('User').deleteOne({ email });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
