import Head from 'next/head';
import styles from '../styles/Gallery.module.css';
// import { getBase64 } from '../src/shared/placeholderGenerator';
import { getArticles } from '../src/shared/articles';
import Gallery from '../src/components/Gallery';

export const getStaticProps = async (ctx) => {

  const articles = await getArticles();
  const images = [];
  for (let article of articles) {
    const { image } = article;
    // image.base64 = await getBase64(image.src);
    // image.css = await getCss(image.src);
    // image.blurhash = await getBlurhash(image.src);
    images.push(image);
  }

  return {
    props:{
      images
    }
  }
}


export default function GalleryPage({ images }) {
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
          <Gallery images={images} />
        </div>
        
      </main>
    </div>
  );
}
