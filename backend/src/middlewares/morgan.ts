import chalk from 'chalk'
import morgan from 'morgan'

export const morganMiddleware = morgan(function (tokens, req, res) {
    const status = Number(tokens.status(req, res))
    const statusColor = status >= 500 ? '#ff5252' : status >= 400 ? '#f29650' : status >= 300 ? '#1e90ff' : '#2ed573'
    let date = tokens.date(req, res)
    if (date) {
        date = date!.replace(' GMT', '')
        date = date!.substring(date!.indexOf(' ') + 1)
    }
    return [
        chalk.hex('#34ace0').bold(tokens.method(req, res)),
        chalk.hex(statusColor).bold(status),
        chalk.hex('#b8d7e3').bold(tokens.url(req, res)),
        chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
        chalk.hex('#f78fb3').bold('@ ' + date),
    ].join(' ')
})
