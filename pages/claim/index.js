import Head from 'next/head';
import Link from 'next/link';
import styles from './claim.module.css';

export default () => {
    return (
        <>
            <Head>
                <title>Wow Excellent </title>
            </Head>
            <h1 className={styles.text}>First Post</h1>
            <h2>
                <Link href="/">
                    <p>Back to home</p>
                </Link>
            </h2>
        </>
    )
}