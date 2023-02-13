import { Heading } from '@react-email/heading'
import * as React from 'react'
import ActionButton from '../components/Button'
import Paragraph from '../components/Paragraph'
import Template from './Template'

interface ResetPasswordProps {
    resetToken: string
    firstName: string
    email: string
}

export function ResetPassword({ firstName, resetToken, email }: ResetPasswordProps) {
    const resetLink = `/resetPassword?token=${resetToken}&email=${email}`

    return (
        <Template preview='Reset your password at PostRecord'>
            <Heading as='h2'>Password reset request</Heading>
            <Paragraph>Hi {firstName},</Paragraph>
            <Paragraph>Someone (hopefully you) requested a password reset for your PostRecord account.</Paragraph>
            <Paragraph>Click on the button below to create a new password</Paragraph>
            <ActionButton link={resetLink} actionText='Reset your password' />

            <Paragraph>If the button above doesn't work, paste this link into your browser:</Paragraph>
            <Paragraph>{process.env.APP_URL + resetLink}</Paragraph>
        </Template>
    )
}

export default ResetPassword
