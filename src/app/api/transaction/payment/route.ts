import Response from "@/lib/api.response";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
   try {
    const session = await getServerSession(authOptions);
    const payload = await request.json();
    
    const checkouts = await prisma.checkout.findMany({
        where: {
            userId: session?.user.id,
            transactionId: {
                equals: null
            }
        }
    });

    const totalPrice = checkouts.reduce((total, item) => total + item.pricePerItem * item.qty, 0);

    const grandTotalPrice = totalPrice + payload?.application_fee + payload?.asurance_fee + payload?.delivery_fee;

    const transaction = await prisma.transaction.create({
        data: {
            userId: session?.user.id,
            applicationFee: payload.application_fee,
            asuranceFee: payload.delivery_fee,
            deliveryType: payload.delivery_type,
            grandTotalPrice: grandTotalPrice,
        }
    });

     await prisma.checkout.updateMany({
        where: {
            userId: session?.user.id,
            transactionId: {
                equals: null
            }
        },
        data: {
            transactionId: transaction.id
        }
    });

    await prisma.product.updateMany({
        where: {
            id: {
                in: checkouts.map((checkout) => checkout.productId)
            }
        },
        data: {
            itemSold: {
                increment: 1,
            }
        }
    });

    return Response({
        message: 'Payment success',
        data: transaction
    });
   } catch (error) {
    return Response({
        message: 'Failed to payment',
        data: error,
        status: 500
    });
   }
}