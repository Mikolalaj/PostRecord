import * as React from 'react'
import ActionButton from '../components/Button'
import Paragraph from '../components/Paragraph'
import Template from './Template'

interface RegistrationProps {
    registrationToken: string
    firstName: string
}

export function Registration({ firstName, registrationToken }: RegistrationProps) {
    return (
        <Template preview='Confirm your email address at PostRecord 😊'>
            <Paragraph>Hi {firstName},</Paragraph>
            <Paragraph>
                Welcome to PostRecord! We're excited to have you on board. Click the button below to confirm your email address.
            </Paragraph>
            <ActionButton link={`/login?token=${registrationToken}`} actionText='Complete registration' />
        </Template>
    )
}

export default Registration
