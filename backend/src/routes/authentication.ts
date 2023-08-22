import { Request, Response, Router } from 'express'
import { confirmEmail, forgotPassword, isEmailAvailable, resetPassword, signIn, singUp } from '../controllers/authentication'
import { sendRegistrationEmail } from '../emails'
const router = Router()

type SignInRequest = Request & {
    body: {
        email: string
        password: string
    }
}

router.post('/signIn', async (req: SignInRequest, res: Response) => {
    const { email, password } = req.body
    const user = await signIn(email, password)
    if (!user) {
        return res.status(401).send({ message: 'Invalid email or password' })
    }

    if (user.registrationToken) {
        return res.status(401).send({ message: 'Email is not confirmed. Check you inbox and try again.' })
    }

    req.session.user = user

    return res.json({
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin,
            albumId: user.albumId,
        },
    })
})

type SignUpRequest = Request & {
    body: {
        email: string
        password: string
        firstName: string
        lastName: string
    }
}

router.post('/signUp', async (req: SignUpRequest, res: Response) => {
    const { email, password, firstName, lastName } = req.body
    if ((await isEmailAvailable(email)) === false) {
        return res.status(400).send({ message: 'Email is already in use' })
    }
    const user = await singUp(email, password, firstName, lastName)

    if (user.registrationToken) {
        sendRegistrationEmail(user.firstName, user.registrationToken, user.email)
    } else {
        return res.status(500).send({ message: 'Failed to create a registration token. Please try again later.' })
    }
    return res.status(201).json({ message: 'Check your inbox to confirm your account 😁' })
})

router.post('/signOut', async (req: Request, res: Response) => {
    req.session.destroy(() => {
        return res.status(204).end()
    })
})

router.post('/confirmEmail', async (req: Request, res: Response) => {
    return confirmEmail(req, res)
})

router.post('/forgotPassword', async (req: Request, res: Response) => {
    return forgotPassword(req, res)
})

router.post('/resetPassword', async (req: Request, res: Response) => {
    return resetPassword(req, res)
})

export default router
