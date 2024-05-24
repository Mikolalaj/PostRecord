import { render } from '@react-email/render'
import * as dotenv from 'dotenv'
import { EmailClient } from '@azure/communication-email'
import Registration from './templates/Registration'
import ResetPassword from './templates/ResetPassword'

dotenv.config()

const emailConnectionString = process.env.EMAIL_CONNECTION_STRING
const emailUser = process.env.EMAIL_USER

if (!emailConnectionString) {
    throw new Error('Email connection string must be set')
}

if (!emailUser) {
    throw new Error('Email user must be set')
}

const emailClient = new EmailClient(emailConnectionString)

export async function sendRegistrationEmail(firstName: string, registrationToken: string, recipentEmail: string) {
    if (!emailConnectionString) {
        throw new Error('Email connection string must be set')
    }

    if (!emailUser) {
        throw new Error('Email user must be set')
    }

    const emailHtml = render(
        Registration({
            firstName,
            registrationToken,
        })
    )

    sendEmail(emailHtml, recipentEmail, 'Welcome to PostRecord')
}

export function sendResetPasswordEmail(firstName: string, resetToken: string, recipentEmail: string) {
    if (!emailConnectionString) {
        throw new Error('Email user and password must be set')
    }
    const emailHtml = render(
        ResetPassword({
            firstName,
            resetToken,
            email: recipentEmail,
        })
    )

    sendEmail(emailHtml, recipentEmail, 'Reset your password | PostRecord')
}

async function sendEmail(emailHtml: string, recipentEmail: string, subject: string) {
    if (!emailConnectionString) {
        throw new Error('Email connection string must be set')
    }

    if (!emailUser) {
        throw new Error('Email user must be set')
    }

    const message = {
        senderAddress: emailUser,
        content: {
            subject: subject,
            html: emailHtml,
        },
        recipients: {
            to: [
                {
                    address: recipentEmail,
                },
            ],
        },
    }

    emailClient.beginSend(message)
}
