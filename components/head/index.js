import React from "react";
import Head from "next/head";

export default function CustomHead({title, children}) {
  return <Head>
    <title>{title}</title>
    <link rel="icon" href="/pelazio/logo.png"/>
    {children}
  </Head>
}