import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodn';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db('accomodator');

        const reports = await db
            .collection('Report')
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
                        description: 1,
                        status: 1,
                        createdAt: 1,
                        'user.name': 1,
                        'user.email': 1,
                        'listing.title': 1,
                    },
                },
            ])
            .toArray();

        return NextResponse.json(reports);
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

        const result = await db
            .collection('Report')
            .deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { error: 'Report not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Report deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { id, status } = await req.json();

        const client = await clientPromise;
        const db = client.db('accomodator');

        const result = await db.collection('Report').updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    status,
                    updatedAt: new Date(),
                },
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: 'Report not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Report status updated successfully',
        });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 }
        );
    }
}
