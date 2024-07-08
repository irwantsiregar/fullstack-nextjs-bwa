import Response from "@/lib/api.response";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
   try {
    const session = await getServerSession(authOptions);
    const payload = await request.json();
    
    const product = await prisma.product.findFirst({
        where: {
            id: payload.product_id
        }
    });
    
    if (!product) {
        return Response({
            message: 'Product not found',
            status: 404,
        });
    }

    const checkout = await prisma.checkout.create({
        data: {
            productId: product.id,
            userId: session?.user?.id,
            qty: payload.qty,
            pricePerItem: payload.price
        }
    })

    return Response({
        message: 'Checkout success',
        data: checkout
    });
   } catch (error) {
    return Response({
        message: 'Failed to checkout product',
        data: error,
        status: 500
    });
   }
}

export async function GET(request: NextRequest) {
    try {
     const session = await getServerSession(authOptions);
     
    //  if (!session?.user) {
    //      return Response({
    //          message: 'Unauthorized',
    //          status: 401,
    //      });
    //  }
 
     const checkout = await prisma.checkout.findMany({
        where: {
            userId: session?.user?.id,
            transactionId: null
        },
        include: {
            product: true
        }
     });
 
     return Response({
         message: 'Get list of checkouts',
         data: checkout
     });
    } catch (error) {
     return Response({
         message: 'Checkout failed',
         data: error,
         status: 500
     });
    }
 }