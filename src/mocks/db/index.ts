import type { Client } from "../../features/clients/models/client.model";
import type { User } from "../../features/auth/models/user.model";
import clientsData from "./clients.json"
import usersData from "./users.json"

export const db = {
  clients: clientsData as Client[],
  users: usersData as (User & { password: string })[],
}