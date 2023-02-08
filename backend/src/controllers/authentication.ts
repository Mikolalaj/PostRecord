import { Request, Response } from 'express'
import { User } from '@prisma/client'
import { prisma } from '../app'
import bcrypt from 'bcrypt'

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

export async function confirmEmail(req: Request, res: Response): Promise<Response> {
    const { token } = req.body

    if (!token) {
        return res.status(400).send({ message: 'Token is required' })
    }

    const user = await prisma.user.findUnique({
        where: {
            registrationToken: token,
        },
    })
    if (!user) {
        return res.status(400).send({ message: 'Invalid token' })
    }
    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            registrationToken: null,
        },
    })
    return res.status(200).send({ message: 'Email confirmed. You can now sign in.' })
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
