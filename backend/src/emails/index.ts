import { render } from '@react-email/render'
import nodemailer from 'nodemailer'
import Registration from './templates/Registration'

const transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.porkbun.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
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
        from: process.env.EMAIL_USER,
        to: recipentEmail,
        subject: 'Welcome to PostRecord',
        html: emailHtml,
    })
}
