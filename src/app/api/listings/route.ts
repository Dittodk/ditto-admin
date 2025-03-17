import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodn';

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('accomodator');

    const listings = await db.collection('Listing').find({}).toArray();

    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const client = await clientPromise;
    const db = client.db('accomodator');

    const result = await db.collection('Listing').deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
