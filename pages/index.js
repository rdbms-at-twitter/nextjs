import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from "next/link";  /*** Linkタグはリロードしないのでaタグより高速。SEO目的でaを残してもOK ***/
import Layout, { site_title } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import { getPostsData } from '../lib/post';

// In case of SSG : 更新頻度が低い為SSGでOK。
export async function getStaticProps() {
  const allPostsData = getPostsData(); //id,title,date, thumbnail
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}

// In case of SSR
// export async function getServerSideProps(context) {
//  return {
//    props: {
//      //コンポーネントに渡すPROPS
//    },
//  };
// }


export default function Home({ allPostsData }) {
  return <Layout home>
    <Head>
      <title>{site_title}</title>
    </Head>
    <section className={utilStyles.headingMd}>
    <p><a href='https://variable.jp'>RDBMS関連はこちら</a></p>
    </section>
  
  <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
    <h2>📝Travel in Japan</h2>
  <div className={styles.grid}>
    {allPostsData.map(({id,title,date,thumbnail})  => (
    // Map関数でデータを紐づける。
  <article key={id}>
    <Link href={`/posts/${id}`}>
    <img 
      src={`${thumbnail}`} alt="" className={styles.thumbnailImage} />
    </Link>
    <Link href={`/posts/${id}`}>
  <a className={utilStyles.boldText}>{title}</a>
</Link> 
<br />
<small className={utilStyles.lightText}>{date}</small>
</article>

    ))}
  </div>
  </section>
  </Layout>
};
