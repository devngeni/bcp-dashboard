import DashBoardLayout from "@/components/layout/dashboardLayout";
import Dashboard from "@/pages";
import { NextComponentType } from "next";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";

interface withAuthProps {
  [key: string]: any;
}

export function withAuth<T extends withAuthProps>(
  Component: NextComponentType<any, any, T>
): ComponentType<T> {
  return function ProtectedRoute(props: T) {
    const { data: session, status } = useSession();
    const router = useRouter();
    console.log("session", session);

    useEffect(() => {
      // Only perform actions if the session status is not loading
      if (status === "loading") return;
      // Redirect to sign-in page if not authenticated
      if (!session) {
        router.push("/sign-in");
      }
    }, [session, status, router]);

    // Render a loading state or placeholder while checking authentication
    if (status === "loading") {
      // Optionally, return a loading component instead of null to improve UX
      return <div>Loading...</div>;
    }

    // Proceed to render the component if the session exists
    // return <Component {...props} />;

    return (
      <DashBoardLayout pageTitle="Better call paul | Products">
        <Component {...props} />
      </DashBoardLayout>
    );
  };
}
