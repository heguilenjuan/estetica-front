import { http, HttpResponse } from "msw";
import { db } from "./db";
import type { Client, ClientCreate } from "../features/clients/types/client.types";
import type { CategoryCreate, ProfessionCreate, TreatmentCreate } from "../features/services/types/services.types";


export const handlers = [
    /* AUTH */
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
    /* CLIENTS  */
    http.post('/clients', async ({ request }) => {
        const body = await request.json() as ClientCreate;

        const { name, lastName, birthDate, phoneNumber, dni } = body;

        if (!name || !lastName || !birthDate || !phoneNumber || !dni) {
            return HttpResponse.json(
                { message: 'Invalid data' },
                { status: 400 }
            )
        }

        const newClient: Client = {
            id: crypto.randomUUID(),
            name: name,
            lastName: lastName,
            dni: dni,
            birthDate: birthDate,
            phoneNumber: phoneNumber,
            created: new Date
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
                client.lastName.toLowerCase().includes(query) ||
                client.dni.toLocaleUpperCase().includes(query)
        );

        return HttpResponse.json(filtered, { status: 200 });
    }),

    http.get("/clients", () => {
        return HttpResponse.json(db.clients, { status: 200 });
    }),

    /* CALENDAR */
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
    }),
    /* STATS  */
    http.get("/stats/daily", () => {
        return HttpResponse.json({
            dailyRevenue: 1240.50,
            newClientsToday: 14,
            appointmentsOccupied: 85
        })
    }),

    /* PROFESSIONS */
    http.get("/professions", () => {
        return HttpResponse.json(db.professions, { status: 200 });
    }),

    http.post("/professions", async ({ request }) => {
        const body = await request.json() as ProfessionCreate;
        const newProfession = { id: crypto.randomUUID(), ...body };
        db.professions.push(newProfession);
        return HttpResponse.json(newProfession, { status: 201 });
    }),

    http.patch("/professions/:id", async ({ request, params }) => {
        const { id } = params as { id: string };
        const body = await request.json() as Partial<ProfessionCreate>;
        const idx = db.professions.findIndex(p => p.id === id);
        if (idx === -1) return HttpResponse.json({ message: "Not found" }, { status: 404 });
        db.professions[idx] = { ...db.professions[idx], ...body };
        return HttpResponse.json(db.professions[idx], { status: 200 });
    }),

    http.delete("/professions/:id", ({ params }) => {
        const { id } = params as { id: string };
        const idx = db.professions.findIndex(p => p.id === id);
        if (idx === -1) return HttpResponse.json({ message: "Not found" }, { status: 404 });
        db.professions.splice(idx, 1);
        return new HttpResponse(null, { status: 204 });
    }),

    /* CATEGORIES */
    http.get("/categories", () => {
        const view = db.categories.map(cat => ({
            ...cat,
            professionName: db.professions.find(p => p.id === cat.professionId)?.name ?? "—",
        }));
        return HttpResponse.json(view, { status: 200 });
    }),

    http.post("/categories", async ({ request }) => {
        const body = await request.json() as CategoryCreate;
        const newCategory = { id: crypto.randomUUID(), ...body };
        db.categories.push(newCategory);
        return HttpResponse.json(newCategory, { status: 201 });
    }),

    http.patch("/categories/:id", async ({ request, params }) => {
        const { id } = params as { id: string };
        const body = await request.json() as Partial<CategoryCreate>;
        const idx = db.categories.findIndex(c => c.id === id);
        if (idx === -1) return HttpResponse.json({ message: "Not found" }, { status: 404 });
        db.categories[idx] = { ...db.categories[idx], ...body };
        return HttpResponse.json(db.categories[idx], { status: 200 });
    }),

    http.delete("/categories/:id", ({ params }) => {
        const { id } = params as { id: string };
        const idx = db.categories.findIndex(c => c.id === id);
        if (idx === -1) return HttpResponse.json({ message: "Not found" }, { status: 404 });
        db.categories.splice(idx, 1);
        return new HttpResponse(null, { status: 204 });
    }),

    /* TREATMENTS */
    http.get("/treatments", () => {
        const view = db.treatments.map(tr => {
            const cat = db.categories.find(c => c.id === tr.categoryId);
            const prof = cat ? db.professions.find(p => p.id === cat.professionId) : undefined;
            return {
                ...tr,
                categoryName: cat?.name ?? "—",
                professionName: prof?.name ?? "—",
            };
        });
        return HttpResponse.json(view, { status: 200 });
    }),

    http.post("/treatments", async ({ request }) => {
        const body = await request.json() as TreatmentCreate;
        const newTreatment = { id: crypto.randomUUID(), isActive: true, ...body };
        db.treatments.push(newTreatment);
        return HttpResponse.json(newTreatment, { status: 201 });
    }),

    http.patch("/treatments/:id", async ({ request, params }) => {
        const { id } = params as { id: string };
        const body = await request.json() as Partial<TreatmentCreate>;
        const idx = db.treatments.findIndex(t => t.id === id);
        if (idx === -1) return HttpResponse.json({ message: "Not found" }, { status: 404 });
        db.treatments[idx] = { ...db.treatments[idx], ...body };
        return HttpResponse.json(db.treatments[idx], { status: 200 });
    }),

    http.delete("/treatments/:id", ({ params }) => {
        const { id } = params as { id: string };
        const idx = db.treatments.findIndex(t => t.id === id);
        if (idx === -1) return HttpResponse.json({ message: "Not found" }, { status: 404 });
        db.treatments.splice(idx, 1);
        return new HttpResponse(null, { status: 204 });
    }),
]