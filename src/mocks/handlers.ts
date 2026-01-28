import { http, HttpResponse } from "msw";

export const handlers = [
    http.post('/login', async ({ request }) => {
        const body = await request.json() as {
            username: string
            password: string
        }

        if (body.username !== 'admin' || body.password !== '12345') {
            return HttpResponse.json({ message: 'Credenciales invalidas' }, { status: 401 })
        }
        return HttpResponse.json(
            {
                token: 'fake-token-jwt',
                user: {
                    id: 1,
                    username: 'admin',
                    name: 'Administrador'
                }
            },
            { status: 200 }

        )
    })
]