import React from "react";
import { AppProps } from "next/app";
import '../styles/global.scss'
import { Header } from "../components/Header";
import { SessionProvider } from "next-auth/react";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "../prismicio";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <PrismicPreview repositoryName={repositoryName}>
        <Component {...pageProps} />
      </PrismicPreview>
    </SessionProvider>
  )
}
