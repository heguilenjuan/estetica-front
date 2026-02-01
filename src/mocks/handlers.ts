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
    }),
    http.get("/calendars/:id", ({ params }) => {
        const { id } = params;

        if( id !== "default" ) {
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