import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, params: Params) {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: params.params.id,
            },
        });

        return Response({
            message: 'Get product by ID',
            data: product,
        })
    } catch (error: any) {
        return Response({
            message: 'Failed to get products',
            data: error,
            status: 500
        })
    }
}