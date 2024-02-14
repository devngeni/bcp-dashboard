import { authOptionsWrapper } from "@/pages/api/auth/[...nextauth]";
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import { getServerSession as _getServerSession } from "next-auth";
export default async function getServerSession(req: GetServerSidePropsContext["req"], res: GetServerSidePropsContext["res"]) {
return _getServerSession(
    ...authOptionsWrapper(req as NextApiRequest, res as NextApiResponse)
)
}