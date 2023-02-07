import { User } from '@prisma/client'
import { prisma } from '../app'
import bcrypt from 'bcrypt'

export type jwtPayload = {
    id: string
    email: string
    firstName: string
    lastName: string
    isAdmin: boolean
}

// Check if the user exists and if the password is correct. If so, return the user data.
async function signIn(email: string, password: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })
    if (user && (await bcrypt.compare(password, user.password))) {
        return user
    }
    return null
}

async function singUp(email: string, password: string, firstName: string, lastName: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10)
    const registrationToken = await bcrypt.hash(email, 10)
    return prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            registrationToken,
        },
    })
}

async function isEmailAvailable(email: string): Promise<boolean> {
    return prisma.user
        .count({
            where: {
                email: email,
            },
        })
        .then(count => count === 0)
}

export { signIn, singUp, isEmailAvailable }
