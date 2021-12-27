import Head from 'next/head';
import Link from 'next/link';
import styles from './claim.module.css';
import { getSortedPostsData } from '../../lib/posts'

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}

export default ({ allPostsData }) => {
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
            <ul>
                {allPostsData.map(({ id, date, title }) => (
                    <li key={id}>
                        {title}
                        <br />
                        {id}
                        <br />
                        {date}
                    </li>
                ))}
            </ul>
        </>
    )
}
