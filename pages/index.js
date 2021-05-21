import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { getBase64, getCss/*, getBlurhash*/ } from '../src/shared/placeholderGenerator';
import { getArticles } from '../src/shared/articles';
import Image from '../src/components/Image/Image';

export const getStaticProps = async (ctx) => {

  const articles = await getArticles();
  for (let article of articles) {
    const { image } = article;
    image.base64 = await getBase64(image.src);
    image.css = await getCss(image.src);
    // image.blurhash = await getBlurhash(image.src);
    // console.log(image.blurhash)
  }

  return {
    props:{
      articles
    }
  }
}


export default function Home({ articles }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div className={styles.container}>
          {articles.map(({id, image}) => <Image key={id} src={image.src} base64={image.base64} css={image.css}/>)}
        </div>
        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
        </a>
      </footer>
    </div>
  );
}
