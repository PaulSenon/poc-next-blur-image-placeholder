import React, { useMemo, useEffect, useCallback, useRef } from 'react';
import styles from '../../../styles/Image.module.css';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';


export default React.forwardRef(({
    src, 
    base64,
    css, 
    // blurhash,
    lazy=true, 
    className,
}, ref) => {
    // const canvasRef = useRef();
    const imageRef = useRef();
    const [lazyRef, inView] = useInView({
        rootMargin: '0px',
        triggerOnce: true,
    });

    const data = useMemo(() => {
        return {
            src: !lazy || inView ? src : null,
            srcSet: !lazy || inView ? null : src,
        }
    }, [src, inView, lazy]);

    useEffect(() => {
        if (!imageRef.current.complete) {
            imageRef.current.classList.add(styles.hidden);
        }

        // if (window.blurhashWorker) {
        //     const offCanvas = canvasRef.current.transferControlToOffscreen();
        //     window.blurhashWorker.postMessage({
        //         width: canvasRef.current.clientWidth,
        //         height: canvasRef.current.clientHeight,
        //         // values are not critical. But try to keep those <= generated values (and keep the ratio)
        //         xCount: blurhash.width,
        //         yCount: blurhash.height,
        //         hash: blurhash.hash,
        //         canvas: offCanvas,
        //     }, [offCanvas]);
        // }
        
    }, [imageRef/*, canvasRef*/, data.src]);

    const setRefs = useCallback((node) => {
        // Ref's from useRef needs to have the node assigned to `current`
        if (ref) ref.current = node;
        imageRef.current = node;
        // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
        lazyRef(node);
    }, [imageRef, lazyRef]);

    const handleLoad = () => {
        console.log('Has loaded')
        imageRef.current.classList.remove(styles.hidden);
    }

    return <>
        <div className={clsx(styles.img, className)}>
          {/* <img className={styles.placeholder} alt="" aria-hidden="true" role="presentation"  style={css}/> */}
          <img className={styles.placeholder} alt="" aria-hidden="true" role="presentation" src={base64}/>
          {/* <canvas ref={canvasRef} className={styles.placeholder} aria-hidden="true" role="presentation"></canvas> */}
          <img ref={setRefs} className={styles.mainImage} decoding="async" alt="" src={data.src} data-src={data.dataSrc} onLoad={handleLoad}/>
        </div>
    </>
});