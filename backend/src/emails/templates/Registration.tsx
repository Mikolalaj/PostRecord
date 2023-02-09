import { Button } from '@react-email/button'
import { Container } from '@react-email/container'
import { Head } from '@react-email/head'
import { Hr } from '@react-email/hr'
import { Html } from '@react-email/html'
import { Img } from '@react-email/img'
import { Preview } from '@react-email/preview'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
import * as React from 'react'

interface RegistrationProps {
    firstName: string
    registrationToken: string
}

export function Registration({ firstName, registrationToken }: RegistrationProps) {
    return (
        <Html>
            <Head />
            <Preview>Confirm your email address at PostRecord 😊</Preview>
            <Section style={main}>
                <Container style={container}>
                    <Img src={`${process.env.APP_URL}/src/assets/postrecord-logo.png`} height='50' alt='PostRecord' style={logo} />
                    <Text style={paragraph}>Hi {firstName},</Text>
                    <Text style={paragraph}>
                        Welcome to PostRecord! We're excited to have you on board. Click the button below to confirm your email
                        address.
                    </Text>
                    <Section style={btnContainer}>
                        <Button pX={12} pY={12} style={button} href={`${process.env.APP_URL}/login?token=${registrationToken}`}>
                            Complete registration
                        </Button>
                    </Section>
                    <Text style={paragraph}>
                        Best,
                        <br />
                        The PostRecord team
                    </Text>
                    <Hr style={hr} />
                    <Text style={footer}>Warsaw, Poland</Text>
                </Container>
            </Section>
        </Html>
    )
}

export default Registration

const fontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'

const main = {
    backgroundColor: '#ffffff',
}

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
}

const logo = {
    margin: '0 auto',
}

const paragraph = {
    fontFamily,
    fontSize: '16px',
    lineHeight: '26px',
}

const btnContainer = {
    textAlign: 'center' as const,
}

const button = {
    fontFamily,
    backgroundColor: '#5F51E8',
    borderRadius: '3px',
    color: '#fff',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
}

const hr = {
    borderColor: '#cccccc',
    margin: '20px 0',
}

const footer = {
    fontFamily,
    color: '#8898aa',
    fontSize: '12px',
}
