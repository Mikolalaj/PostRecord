import { PrismaClient, User } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

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
    return prisma.user.create({
        data: {
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
        },
    })
}

function createJWT(user: User): string {
    const jtwSecret = process.env.JWT_SECRET
    if (!jtwSecret) {
        throw new Error('JWT secret is not set')
    }
    const payload = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
    }
    const token = jwt.sign(payload, jtwSecret, {
        expiresIn: '1d',
    })
    return token
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

export { signIn, singUp, createJWT, isEmailAvailable }
