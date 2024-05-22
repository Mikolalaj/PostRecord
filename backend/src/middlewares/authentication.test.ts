import authentication from './authentication'
import { expect, test, mock } from 'bun:test'
import { prisma } from '../prisma'
import { Request, Response, NextFunction } from 'express'

// Mocking prisma
mock.module('../prisma', () => ({
    prisma: {
        user: {
            findUnique: mock(),
        },
    },
}))

// Mocking environment variables
process.env.DEV_BEARER_TOKEN = 'dev-token'

// Mocked request, response, and next function
const mockRequest = (headers: any, session: any) => ({
    headers,
    session,
})

const mockResponse = () => {
    const res: any = {}
    res.status = mock().mockReturnValue(res)
    res.json = mock().mockReturnValue(res)
    return res
}

const mockNext = mock()

// Test cases
test('should authorize with valid dev bearer token', async () => {
    const req = mockRequest({ authorization: 'Bearer dev-token' }, {}) as Request
    const res = mockResponse()

    prisma.user.findUnique.mockResolvedValueOnce({ email: 'olejnikmikolaj@gmail.com' })

    await authentication(req, res, mockNext)

    expect(req.session.user).toEqual({ email: 'olejnikmikolaj@gmail.com' })
    expect(mockNext).toHaveBeenCalled()
})

test('should return 401 if no authorization header and no user in session', async () => {
    const req = mockRequest({}, {}) as Request
    const res = mockResponse()

    await authentication(req, res, mockNext)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'There was a problem authorizing the request' })
})

test('should call next if user is in session', async () => {
    const req = mockRequest({}, { user: user }) as Request
    const res = mockResponse()

    await authentication(req, res, mockNext)

    expect(mockNext).toHaveBeenCalled()
})

test('should throw error if dev bearer token is valid but user is not found', async () => {
    const req = mockRequest({ authorization: 'Bearer dev-token' }, {}) as Request
    const res = mockResponse()

    prisma.user.findUnique.mockResolvedValueOnce(null)

    await expect(authentication(req, res, mockNext)).rejects.toThrow('Dev admin user not found')
})
