import { User } from '@prisma/client'
import { Request, Response } from 'express'
import { prisma } from '../app'
import { sendResetPasswordEmail } from '../emails'

export async function isEmailAvailable(email: string): Promise<boolean> {
    return prisma.user
        .count({
            where: {
                email: email,
            },
        })
        .then(count => count === 0)
}

// Check if the user exists and if the password is correct. If so, return the user data.
export async function signIn(email: string, password: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })
    if (user && (await Bun.password.verify(password, user.password))) {
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                lastLogin: new Date(),
            },
        })
        return user
    }
    return null
}

export async function singUp(email: string, password: string, firstName: string, lastName: string): Promise<User> {
    const hashedPassword = await Bun.password.hash(password)
    const registrationToken = await Bun.password.hash(email)
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

async function createResetToken(user: User): Promise<string> {
    console.log(user.id + user.lastLogin)
    return await Bun.password.hash(user.id + user.lastLogin)
}

export async function forgotPassword(req: Request, res: Response): Promise<Response> {
    const { email } = req.body

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })
    if (user) {
        const resetToken = await createResetToken(user)
        sendResetPasswordEmail(user.firstName, resetToken, user.email)
    }

    return res.json({
        message: "Request received successfully! If the email exists, you'll receive an email with a reset link soon.",
    })
}

export async function resetPassword(req: Request, res: Response): Promise<Response> {
    const { token, email, password } = req.body

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    })

    if (!user) {
        return res.status(400).send({ message: 'Unable to find your account 😢' })
    }

    if ((await Bun.password.verify(user.id + user.lastLogin, token)) === false) {
        return res.status(400).send({ message: 'Invalid token' })
    }

    const hashedPassword = await Bun.password.hash(password)
    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            password: hashedPassword,
        },
    })

    return res.status(200).send({ message: 'Password reset successfully' })
}
