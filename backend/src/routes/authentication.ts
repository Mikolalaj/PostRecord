import { Request, Response, Router } from 'express'
import { signIn, singUp, signOut, createJWT, isEmailAvailable } from '../controllers/authentication'
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

    const token = createJWT(user)
    res.cookie('token', token, { httpOnly: true })

    return res.json({
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin,
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

    const token = createJWT(user)
    res.cookie('token', token, { httpOnly: true })

    return res.json({
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isAdmin: user.isAdmin,
        },
    })
})

router.post('/signOut', async (req: Request, res: Response) => {
    signOut()
    res.clearCookie('token', { httpOnly: true })
    return res.status(204).end()
})

export default router
