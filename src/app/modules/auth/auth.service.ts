import { prisma } from '../../shared/prisma';
import { UserStatus } from '@prisma/client';


const login = async (payload: { email: string, password: string }) => {
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE,
        }
    })
}

export const AuthService = {
    login,
};