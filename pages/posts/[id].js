import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from '../../styles/utils.module.css';
import Head from "next/head";

export async function getStaticPaths() {
    const paths = getAllPostIds();

    return{
        paths,
        fallback: false, //存在しないパスは404にする。エラーログが表示される。(true, blocking)
    };
}

// データをもって来る。 非同期処理で持ってきているのでこちらもasync＋awaitで処理。
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        },
    };

}

export default function Post({postData}) {
    return (
    <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
        <h1 className={utilStyles.headingx1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.date} </div>
        <div dangerouslySetInnerHTML={{__html: postData.blogContentHTML}}></div>
        </article>
    </Layout>
    );
    // dangerouslySetInnerHTMLは,外部POSTする場合はサニタイズした方が良い。
}