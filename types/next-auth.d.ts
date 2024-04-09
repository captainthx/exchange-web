import NextAuth from "next-auth";
import { Interface } from "readline";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
  interface Session {
    user?: User;
  }
  interface User {
    id?: string;
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    image?: string;
    token?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    image?: string;
    token?: string;
  }
}
