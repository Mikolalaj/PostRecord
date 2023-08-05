import { prisma } from '../src/app'

async function main() {
    await prisma.user.upsert({
        where: { email: 'olejnikmikolaj@gmail.com' },
        update: {},
        create: {
            email: 'olejnikmikolaj@gmail.com',
            firstName: 'Mikolaj',
            lastName: 'Olejnik',
            password: '$2b$10$YmVwbaZhyTVzIS3n3Mi4Ce83zog9KamTImN0qsrTWUs0GOud8Jyem',
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
