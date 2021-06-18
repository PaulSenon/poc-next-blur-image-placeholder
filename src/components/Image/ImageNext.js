import React, { useMemo, useEffect, useCallback, useRef } from 'react';
import styles from '../../../styles/Image.module.css';
import clsx from 'clsx';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

export default React.forwardRef(({
    src, 
    base64,
    css, 
    // blurhash,
    lazy=true, 
    className,
}, ref) => {
    const imageRef = useRef();

    // useEffect(() => {
    //     if (!imageRef.current.complete) {
    //         imageRef.current.classList.add(styles.hidden);
    //     }
    // }, [imageRef]);


    function handleLoad(e) {
        console.log('Has loaded')
        e.target.classList.remove(styles.hidden);
    }

    return <>
        <div className={clsx(styles.img, className)}>
            <Image className={styles.mainImage} src={src} layout="fill" placeholder="blur" blurDataURL={base64} onLoad={handleLoad}/>
        </div>
    </>
});