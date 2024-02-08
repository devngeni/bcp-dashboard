import "@/styles/globals.css";
import { AuthProvider } from "@/utils/context/auth-provider";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import NoSSR from "react-no-ssr";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <AuthProvider>
        {getLayout(
          <NoSSR>
            <Component {...pageProps} />
          </NoSSR>
        )}
      </AuthProvider>
    </SessionProvider>
  );
}
