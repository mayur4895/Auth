import { userRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type ExtendUser = DefaultSession['user'] & {
role:userRole
}

declare module "next-auth" {
    interface Session  {
        role:ExtendUser
    }
}