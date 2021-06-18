import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { getBase64,/* getCss, getBlurhash,*/ getCustomLQIP, getCustomLQIP2 } from '../src/shared/placeholderGenerator';
import { getArticles } from '../src/shared/articles';
import Image from '../src/components/Image/Image';
// import NextImage from '../src/components/Image/ImageNext';

export const getStaticProps = async (ctx) => {

  const articles = await getArticles();
  const targetSize = 400;
  let totalb64 = 0;
  let totalcustom = 0;
  let totalcustom2 = 0;
  for (let article of articles) {
    const { image } = article;
    image.base64 = await getBase64(image.src);
    totalb64 += parseInt(image.base64.length);
    // image.css = await getCss(image.src);
    image.lqip = await getCustomLQIP(image.src, 32);
    totalcustom += parseInt(image.lqip.length);
    image.lqip2 = await getCustomLQIP2(image.src, 30, targetSize);
    totalcustom2 += parseInt(image.lqip2.length);
    // image.blurhash = await getBlurhash(image.src);
    // console.log(image.blurhash)
  }

  return {
    props:{
      articles,
      avgDefault: totalb64/articles.length,
      avgCustom: totalcustom/articles.length,
      avgCustom2: totalcustom2/articles.length,
      target: targetSize
    }
  }
}


export default function Home({ articles, avgCustom, avgDefault, avgCustom2, target }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>LQIP tests</title>
      </Head>
      {/* <svg>
          <filter id="svg-blur">
              <feTurbulence type="turbulence" baseFrequency="0.05"
        numOctaves="2" result="turbulence"/>
              <feDisplacementMap in2="turbulence" in="SourceGraphic"
                  scale="50" xChannelSelector="R" yChannelSelector="G"/>
              <feGaussianBlur stdDeviation="15" />
          </filter>
      </svg>  */}

      <main className={styles.main}>
        <h1 className={styles.title}>
          CUSTOM LQIP TESTS
        </h1>
        <div className={styles.columns}>
          <div className={styles.container}>
            <h2>classic lqip (avg = {Math.round(avgDefault)} B)</h2>
            <div>w=10, jpeg</div>
            <div className={styles.text}>not so good</div>
            {articles.map(({id, image}) => <Image key={id} src={image.src} base64={image.base64} css={''} placeholderStyle={{
              transform: 'scale(1.2)',
              filter: 'blur(20px)',
            }}/>)}
          </div>
          <div className={styles.container}>
            <h2>custom lqip (avg = {Math.round(avgCustom)} B)</h2>
            <div>w=32, webp, css filter instead of image preprocessing</div>
            <div className={styles.text}>we triple the def and reduce the size.</div>
            {articles.map(({id, image}) => <Image key={id} src={image.src} base64={image.lqip} css={''}/>)}
          </div>
          <div className={styles.container}>
            <h2>custom lqip adaptative (avg = {Math.round(avgCustom2)} B)</h2>
            <div>w=32 && <strong>target size={target}</strong>, pick one version out of different quality</div>
            <div className={styles.text}>just like custom lqip, but simplest images just look better, and more complex ones do not add more weight.</div>
            {articles.map(({id, image}) => <Image key={id} src={image.src} base64={image.lqip2} css={''} placeholderStyle={{
              // imageRendering: 'unset',
              transform: 'scale(1.05)',
              filter: 'blur(9px) saturate(1.3) brightness(1.1)',
            }}/>)}
          </div>
          {/* <div className={styles.container}>
            {articles.map(({id, image}) => <NextImage key={id} src={image.src} base64={image.base64} css={image.css}/>)}
          </div> */}
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
