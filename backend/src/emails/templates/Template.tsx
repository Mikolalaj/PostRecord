import { Container } from '@react-email/container'
import { Head } from '@react-email/head'
import { Hr } from '@react-email/hr'
import { Html } from '@react-email/html'
import { Img } from '@react-email/img'
import { Preview } from '@react-email/preview'
import { Section } from '@react-email/section'
import { Text } from '@react-email/text'
import * as React from 'react'

export interface TemplateProps {
    preview: string
    children: React.ReactNode
}

function Template({ preview, children }: TemplateProps) {
    return (
        <Html>
            <Head />
            <Preview>{preview}</Preview>
            <Section style={main}>
                <Container style={container}>
                    <Img
                        src='https://postrecordstorageaccount.blob.core.windows.net/branding/logo-mail.png'
                        height='50'
                        alt='PostRecord'
                        style={logo}
                    />
                    {children}
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

export default Template

export const fontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'

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

const hr = {
    borderColor: '#cccccc',
    margin: '20px 0',
}

const footer = {
    fontFamily,
    color: '#8898aa',
    fontSize: '12px',
}
