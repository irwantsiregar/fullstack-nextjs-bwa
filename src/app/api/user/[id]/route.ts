import Response from "@/lib/api.response";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: Params) {
    console.log("🚀 ~ GET ~ params:", params);
    
    const id = params?.id;
    
    return Response(
        {
            message: `Get User ${id}`,
            data: [
               {
                   id,
                   name: 'Irfan'
               },
            ],
            status: 200
        }
    )
}