import { http, HttpResponse } from "msw";
import { db } from "./db";
import type { Client, ClientCreate } from "../features/clients/models/client.model";


export const handlers = [
    http.post('/login', async ({ request }) => {
        const body = await request.json() as {
            username: string
            password: string
        }

        const userExist = db.users.find((user) => user.username === body.username);

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

        const userExist = db.users.find(user => user.id === userId);
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

        const { name, lastName, birthDate, phoneNumber } = body;

        if (!name || !lastName || !birthDate || !phoneNumber) {
            return HttpResponse.json(
                { message: 'Invalid data' },
                { status: 400 }
            )
        }

        const newClient: Client = {
            id: crypto.randomUUID(),
            name: name,
            lastName: lastName,
            birthDate: birthDate,
            phoneNumber: phoneNumber
        }

        db.clients.push(newClient)

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

        const filtered = db.clients.filter(
            (client) =>
                client.name.toLowerCase().includes(query) ||
                client.lastName.toLowerCase().includes(query)
        );

        return HttpResponse.json(filtered, { status: 200 });
    }),

    http.get("/clients", () => {
        return HttpResponse.json(db.clients, { status: 200 });
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