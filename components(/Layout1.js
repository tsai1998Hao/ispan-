import Navbar from "@/components(/Navbar";
import Head from "next/head";


export default function Layout1({children}){
    return (
        <>
            <Head>
                <title>網站作業</title>
            </Head>
            <div className="container"><Navbar></Navbar></div>
            <div className="container">{children}</div>
        </>
);
}