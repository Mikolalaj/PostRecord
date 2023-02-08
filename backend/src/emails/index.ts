import { render } from '@react-email/render'
import nodemailer from 'nodemailer'
import Registration from './templates/Registration'
import * as dotenv from 'dotenv'

dotenv.config()

const emailUser = process.env.EMAIL_USER
const emailPassword = process.env.EMAIL_PASSWORD

if (!emailUser || !emailPassword) {
    throw new Error('Email user and password must be set')
}

const transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.porkbun.com',
    port: 465,
    secure: true,
    auth: {
        user: emailUser,
        pass: emailPassword,
    },
})

export function sendRegistrationEmail(firstName: string, registrationToken: string, recipentEmail: string) {
    if (!emailUser || !emailPassword) {
        throw new Error('Email user and password must be set')
    }
    const emailHtml = render(
        Registration({
            firstName,
            registrationToken,
        })
    )
    transporter.sendMail({
        from: {
            name: 'PostRecord',
            address: emailUser,
        },
        to: recipentEmail,
        subject: 'Welcome to PostRecord',
        html: emailHtml,
    })
}
