import NextAuth from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export { authOptions };
export default NextAuth(authOptions);
