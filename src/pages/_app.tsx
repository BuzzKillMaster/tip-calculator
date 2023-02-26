import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Head from "next/head";
import React from "react";

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>Splitter | Tip Calculator</title>
                <meta name="description"
                      content="The next-level tip calculator with a beautiful design that works across devices and screen sizes for quick and easy access."/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Component {...pageProps} />
        </>
    )
}
