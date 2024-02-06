"use client";
import { useContext } from "react";
import "@/styles/globals.css";
import {
  ProdContext,
  ProductDataProvider,
} from "@/utils/context/products-data";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import NoSSR from "react-no-ssr";
import { TestContext, TestProvider } from "@/context/Product.context";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  const { name } = useContext(ProdContext);

  console.log(name, "name");

  return getLayout(
    <ProductDataProvider>
      <NoSSR>
        <Component {...pageProps} />
      </NoSSR>
    </ProductDataProvider>
  );
}
