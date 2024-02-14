import { GetServerSidePropsContext } from "next";
import getServerSession from "./getServerSession";

export async function serverAuthCheck(context: GetServerSidePropsContext) {
    const session  = await getServerSession(context.req, context.res);
    if (!session) {
        return {
            redirect: {
                destination: "/sign-in",
                permanent: false,
            },
        };
    }
    const isAdminRoute = context.resolvedUrl.includes("/admin");
    if (session.user?.role !== "admin" && isAdminRoute) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
}