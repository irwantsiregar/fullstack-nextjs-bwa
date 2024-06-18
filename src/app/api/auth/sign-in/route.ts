import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    try {
        const payload = await req.json();
        
        const user: any = await prisma.user.findUnique({
            where: {
                email: payload.email,
            }
        });

        console.log(`USER: `, bcrypt);

        // if (!user || !bcrypt.compareSync(payload.password, user.password)) {
        if (!user) {
            return Response({
                message: "Incorect email or password",
                status: 404
            });
        }
        
        return Response({
            message: "Sign in successfully",
            data: {...user, password: undefined}
        });
    } catch (error) {
        return Response({
            message: "Sign in failed",
            data: error,
            status: 500
        });
    }
}