import Response from "@/lib/api.response";
import { NextResponse } from "next/server";

export async function GET() {
    return Response(
        {
            message: 'Get All Users',
            data: [
               {
                   id: 1,
                   name: 'Irwan'
               },
               {
                   id: 2,
                   name: 'Siregar'
               }
            ],
            status: 200
        }
    )
}

export async function POST() {
    return NextResponse.json({
     success: true,
     message: 'Post User',
     data: [
        {
            id: 3,
            name: 'Irpan'
        },
     ]
    }, {
        status: 201
    })
}