import { getAllPostIds, getPostDataId } from '../../lib/posts'
import Link from 'next/link'
export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}
export async function getStaticProps({ params }) {
    const postData = getPostDataId(params.id)
    return {
        props: {
            postData
        }
    }
}
export default function Post({ postData }) {
    // console.log(postData)
    return (
        <div>
            <h3>THis is ID page</h3>
            <p>{postData.title}</p>
            <Link href="/">
                <p>Back to Home</p>
            </Link>
        </div>
    )
}