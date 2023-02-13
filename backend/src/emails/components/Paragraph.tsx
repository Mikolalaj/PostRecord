import { Text } from '@react-email/text'
import React from 'react'
import { fontFamily } from '../templates/Template'

interface ParagraphProps {
    children: React.ReactNode
}

function Paragraph({ children }: ParagraphProps) {
    return <Text style={paragraph}>{children}</Text>
}

const paragraph = {
    fontFamily,
    fontSize: '16px',
    lineHeight: '26px',
}

export default Paragraph
