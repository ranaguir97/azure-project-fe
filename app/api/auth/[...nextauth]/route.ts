import axios, { AxiosError } from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const UserFound = await loginUser(
            credentials?.username,
            credentials?.password
          );
          const user = UserFound.data;
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            throw new Error (error.response?.data.message);
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

const loginUser = async (username: any, password: any) => {
  return await axios.post(`${process.env.BE_API}/users/login`, {
    username,
    password,
  });
};

export { handler as GET, handler as POST };
