import NextAuth, { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/utils/dbconnection";
import User from "../../../../models/user.model";
import argon2 from "argon2";

(() => {
  connectDB();
})();

export const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET as string,
      version: "2.0",
    }),
    // FacebookProvider({
    //   clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID as string,
    //   clientSecret: process.env.NEXT_FACEBOOK_CLIENT_SECRET as string,
    // }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
  },
  secret: "atr5-gt65-9jet",
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      if (profile && profile !== "undefined") {
        const { name, email, sub, picture } = profile;

        const savedUser = await User.findOne({
          $or: [{ email }, { subId: sub }],
        });
        console.log(user);
        if (savedUser) {
          console.log("user already saved");
          return token;
        } else {
          const hashPassword = await argon2.hash("atr5-gt65-9jet");

          const newUser = new User({
            email,
            photo: picture,
            name,
            password: hashPassword,
            subId: sub,
          });
          await newUser.save();
        }
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
