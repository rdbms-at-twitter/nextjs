import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css"
import Link from "next/link";


/*** import { Children } from "react"; ***/

const title_name = "Sample Next.js";
export const site_title = "Next.js Trial";

function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <header className={styles.header}> 
                {home ? (
                    <>
                    <img 
                    src="/images/profile.png" 
                    clasName={` ${utilStyles.borderCircle} ${styles.headerHomeImage} `}
                    />
                    <h1 className={utilStyles.heading2Xl}>{title_name}</h1>
                    </>
                ) : (
                    <>
                    <img 
                    src="/images/profile.png" 
                    clasName={` ${utilStyles.borderCircle} `}
                    />
                    <h1 className={utilStyles.heading2Xl}>{title_name}</h1>
                    </>
                )}

            </header>
            <main>{children}</main>
            {!home && (
                <div>
                    <Link href="/">Back to the home.</Link>
                </div>    
            )}
        </div>
    );
}

export default Layout;