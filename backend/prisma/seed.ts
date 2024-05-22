import { prisma } from '../src/prisma'

async function main() {
    const hashedPassword = await Bun.password.hash("uet!WFR8hvg0wef!xnd")
    await prisma.user.upsert({
        where: { email: 'olejnikmikolaj@gmail.com' },
        update: {},
        create: {
            email: 'olejnikmikolaj@gmail.com',
            firstName: 'Mikolaj',
            lastName: 'Olejnik',
            password: hashedPassword,
            isAdmin: true,
            registrationToken: null,
        },
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async e => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
