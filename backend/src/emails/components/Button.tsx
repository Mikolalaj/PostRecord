import { Button } from '@react-email/button'
import { Section } from '@react-email/section'
import React from 'react'
import { fontFamily } from '../templates/Template'

interface ButtonProps {
    link: string
    actionText: string
}

function ActionButton({ link, actionText }: ButtonProps) {
    return (
        <Section style={btnContainer}>
            <Button pX={12} pY={12} style={button} href={`${process.env.APP_URL}${link}`}>
                {actionText}
            </Button>
        </Section>
    )
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

export default ActionButton
