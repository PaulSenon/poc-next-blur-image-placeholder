// import { useEffect } from 'react';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // useEffect(() => {
  //   if (typeof window.Worker !== 'undefined' 
  //       && typeof window.OffscreenCanvas !== 'undefined') {
  //         window.blurhashWorker = new Worker(new URL('../src/workers/blurhashDecoder.worker', import.meta.url));
  //       }
  // }, []);

  return <Component {...pageProps} />
}

export default MyApp
