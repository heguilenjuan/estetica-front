import { http, HttpResponse } from "msw";
import type { User } from "../models/user.model";

type UserMock = User & {
    password: string;
}
const userMocks: UserMock[] = [
    {
        id: "1",
        name: "Juancito",
        lastname: "Heguilen",
        role: "admin",
        username: "admin",
        password: "123456"
    },
    {
        id: "2",
        name: "Cacho",
        lastname: "Cacheito",
        role: "basic",
        username: "basic",
        password: "1234567"
    },
    {
        id: "3",
        name: "Cacha",
        lastname: "Cachita",
        role: "manager",
        username: "manager",
        password: "12345678"
    }
]

export const handlers = [
    http.post('/login', async ({ request }) => {
        const body = await request.json() as {
            username: string
            password: string
        }

        const userExist = userMocks.find((user: UserMock) => user.username === body.username);

        if (!userExist) {
            return HttpResponse.json({ message: 'User not exists' }, { status: 404 })
        }

        if (userExist.password !== body.password) {
            return HttpResponse.json({ message: 'Credenciales invalidas' }, { status: 401 })
        }
        const { password, ...safeUser } = userExist;

        return HttpResponse.json(
            { user: safeUser },
            {
                headers: {
                    'Set-Cookie': `session=${safeUser.id}-fake-jwt; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600`
                },
                status: 200
            }
        )
    }),
    http.get('/me', ({ cookies }) => {
        const session = cookies.session;

        if (!session) {
            return HttpResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const userId = session.split('-')[0];

        const userExist = userMocks.find(user => user.id === userId);
        const { password, ...safeUser } = userExist;

        return HttpResponse.json(
            { user: safeUser },
            { status: 200 }
        );
    }),
    http.post('/logout', () => {
        return HttpResponse.json(
            { message: 'Logged out' },
            {
                status: 200,
                headers: {
                    'Set-Cookie': 'session=; Path=/; HttpOnly; Max-Age=0'
                }
            }
        );
    }),
    http.get("/calendars/:id", ({ params }) => {
        const { id } = params;

        if (id !== "default") {
            return HttpResponse.json(
                { message: "Calendar not found" },
                { status: 404 }
            );
        }
        return HttpResponse.json(
            {
                id,
                timezone: "America/Argentina/Buenos_Aires",
            },
            { status: 200 }
        );
    }),
    http.get("/calendar/:id/month", ({ request }) => {
        const url = new URL(request.url);

        const year = Number(url.searchParams.get("year"));
        const month = Number(url.searchParams.get("month"));

        const days = [
            {
                date: `${year}-${String(month + 1).padStart(2, "0")}-10`,
                availableSlots: 3,
            },
            {
                date: `${year}-${String(month + 1).padStart(2, "0")}-15`,
                availableSlots: 0,
            },
            {
                date: `${year}-${String(month + 1).padStart(2, "0")}-20`,
                availableSlots: 5,
            },
        ];

        return HttpResponse.json(
            {
                year,
                month,
                days,
            },
            { status: 200 }
        );
    })

]