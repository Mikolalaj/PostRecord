type MantineColor =
    | 'dark'
    | 'gray'
    | 'red'
    | 'pink'
    | 'grape'
    | 'violet'
    | 'indigo'
    | 'blue'
    | 'cyan'
    | 'green'
    | 'lime'
    | 'yellow'
    | 'orange'
    | 'teal'

export interface Pressing {
    id: string
    name: string
    image: string
    color: MantineColor
    isInCollection: boolean
}

export type Error = {
    message: string
}
