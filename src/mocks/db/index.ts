import type { Client } from "../../features/clients/types/client.types";
import type { User } from "../../features/auth/types/user.types";
import clientsData from "./clients.json"
import usersData from "./users.json"

export const db = {
  clients: clientsData as Client[],
  users: usersData as (User & { password: string })[],
}