import React from "react";
import Head from "next/head";

const pelazioTitle = 'پلازیو ، پلتفرم خرید و فروش اینترنتی کالا در ایران و خاورمیانه'
export default function CustomHead({title = pelazioTitle, children}) {
  return <Head>
    <title>{title}</title>
    <link rel="icon" href="/pelazio/logo.png"/>
    {children}
  </Head>
}