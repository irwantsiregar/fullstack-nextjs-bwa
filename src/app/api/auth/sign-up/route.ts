import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
    try {
        const payload = await req.json();

        const data: Prisma.UserCreateInput = {
            name: payload.name,
            email: payload.email,
            password: bcrypt.hashSync(payload.password, 8)
        };

        const user = await prisma.user.create({
            data,
        });

        return Response({
            message: 'User registered successfully',
            data: {...user, password: undefined}
        })
    } catch (error) {
        return Response({
            message: 'User registered failed',
            data: error,
            status: 500
        })
    }
}