import { http, HttpResponse } from "msw";
import type { User } from "../features/auth/models/user.model";
import type { Client, ClientCreate } from "../features/clients/models/client.model";

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

const clients: Client[] = [
    {
        id: "dfe31165-a728-49eb-9a41-da67046959213b9",
        name: "Juan",
        lastname: "Paradigma",
        birthDate: "1997-02-21",
        phoneNumber: "2914253235"
    },
    {
        id: "dfe31165-a728-49eb-9a41-da670411116959b9",
        name: "claudio",
        lastname: "gonzales",
        birthDate: "1997-02-21",
        phoneNumber: "2914253235"
    },
    {
        id: "dfe31165-a728-49eb-9a41-da675555046959b9",
        name: "Julieta",
        lastname: "Venegas",
        birthDate: "1997-02-21",
        phoneNumber: "2914253235"
    },
    {
        id: "dfe31165-a728-49eb-9a41-666da67046959b9",
        name: "Miguel Angel",
        lastname: "Goku",
        birthDate: "1997-02-21",
        phoneNumber: "2914253235"
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
    http.post('/clients', async ({ request }) => {
        const body = await request.json() as ClientCreate;

        const { name, lastname, birthDate, phoneNumber } = body;

        if (!name || !lastname || !birthDate || !phoneNumber) {
            return HttpResponse.json(
                { message: 'Invalid data' },
                { status: 400 }
            )
        }

        const newClient: Client = {
            id: crypto.randomUUID(),
            name: name,
            lastname: lastname,
            birthDate: birthDate,
            phoneNumber: phoneNumber
        }

        clients.push(newClient)

        return HttpResponse.json(
            newClient,
            { status: 201 }
        )
    }),
    http.get("/clients/search", ({ request }) => {
        const url = new URL(request.url);
        const query = url.searchParams.get("q")?.toLowerCase() ?? "";

        if (!query) {
            return HttpResponse.json([], { status: 200 });
        }

        const filtered = clients.filter(
            (client) =>
                client.name.toLowerCase().includes(query) ||
                client.lastname.toLowerCase().includes(query)
        );

        return HttpResponse.json(filtered, { status: 200 });
    }),
    http.get("/clients", () => {
        return HttpResponse.json(clients, { status: 200 });
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