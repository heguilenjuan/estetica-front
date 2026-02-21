import type { Client } from "../../features/clients/types/client.types";
import type { User } from "../../features/auth/types/user.types";
import type { Profession, Category, Treatment } from "../../features/services/types/services.types";
import clientsData from "./clients.json";
import usersData from "./users.json";
import professionsData from "./professions.json";
import categoriesData from "./categories.json";
import treatmentsData from "./treatments.json";

export const db = {
    clients: clientsData as Client[],
    users: usersData as (User & { password: string })[],
    professions: professionsData as Profession[],
    categories: categoriesData as Category[],
    treatments: treatmentsData as Treatment[],
};
