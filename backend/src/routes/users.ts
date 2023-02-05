import { prisma } from '../app'
import { Request, Response, Router } from 'express'
const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const { id } = req.user

    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    })

    if (!user) {
        return res.status(404).send({ message: 'User not found' })
    }

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

export default router
