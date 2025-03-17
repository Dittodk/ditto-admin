import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodn';

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('accomodator');

    const reservations = await db
      .collection('Reservation')
      .aggregate([
        {
          $lookup: {
            from: 'User',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $lookup: {
            from: 'Listing',
            localField: 'listingId',
            foreignField: '_id',
            as: 'listing',
          },
        },
        {
          $unwind: '$user',
        },
        {
          $unwind: '$listing',
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            listingId: 1,
            startDate: 1,
            endDate: 1,
            totalPrice: 1,
            createdAt: 1,
            'user.name': 1,
            'user.email': 1,
            'listing.title': 1,
          },
        },
      ])
      .toArray();

    return NextResponse.json(reservations);
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

    const result = await db.collection('Reservation').deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Reservation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
