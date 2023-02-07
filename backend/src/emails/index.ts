import { render } from '@react-email/render'
import nodemailer from 'nodemailer'
import Registration from './templates/Registration'

const transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.porkbun.com',
    port: 465,
    secure: true,
    auth: {
        user: 'hey@mikolalaj.dev',
        pass: '8pJK97sYz5JgI9QmkN*^F9*oWovN7A2a',
    },
})

export function sendRegistrationEmail(firstName: string, registrationToken: string, recipentEmail: string) {
    const emailHtml = render(
        Registration({
            firstName,
            registrationToken,
        })
    )
    transporter.sendMail({
        from: 'hey@mikolalaj.dev',
        to: recipentEmail,
        subject: 'Welcome to PostRecord',
        html: emailHtml,
    })
}
