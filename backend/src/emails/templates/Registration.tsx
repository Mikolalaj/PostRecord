import * as React from 'react'
import { Button } from '@react-email/button'
import { Hr } from '@react-email/hr'
import { Html } from '@react-email/html'
import { Text } from '@react-email/text'

interface RegistrationProps {
    firstName: string
    registrationToken: string
}

export function Registration({ firstName, registrationToken }: RegistrationProps) {
    return (
        <Html lang='en'>
            <Text>Hello {firstName}</Text>
            <Text>Thank you for registering!</Text>
            <Text>Click the button below to confirm your email address.</Text>
            <Hr />
            <Button href={`${process.env.APP_URL}/login?token=${registrationToken}`}>Click me</Button>
        </Html>
    )
}

export default Registration
