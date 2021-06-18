import React, { useEffect, useRef } from 'react';
// import {Image} from './Image/Image';
// import PhotoSwipeLightbox from 'photoswipe/src/js/lightbox/lightbox';
// import PhotoswipeCore from 'photoswipe/dist/photoswipe.esm';
import Head from 'next/head';

export default React.forwardRef(({
    images
}, ref) => {

    useEffect(async() => {
        const { default: PhotoSwipeLightbox } = await import('photoswipe/dist/photoswipe-lightbox.esm');
        const a = await import('photoswipe/dist/photoswipe.esm');
        console.log(URL.createObjectURL(a));
        const lightbox = new PhotoSwipeLightbox({
            // may select multiple "galleries"
            gallerySelector: '#gallery--simple',
        
            // Elements within gallerySelector (slides)
            childSelector: 'a',
        
            // Include PhotoSwipe Core
            // and use absolute path (that starts with http(s)://)
            pswpModule: URL.createObjectURL(a),
        
            // Include CSS file,
            // (if you haven't included in via <link>)
            pswpCSS: '',
        });
        lightbox.init();
        
    }, []);
    
    return <>

        <div ref={ref}>
            {/* {images.map(({src, alt}) => <img key={src} src={src} alt={alt}/>)} */}
            <div className="pswp-gallery pswp-gallery--single-column" id="gallery--simple">
                <a href="https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-2500.jpg" 
                    data-pswp-width="1669" 
                    data-pswp-height="2500" 
                    target="_blank">
                    <img src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/2/img-200.jpg" alt="" />
                </a>

                <a href="https://cdn.photoswipe.com/photoswipe-demo-images/photos/7/img-2500.jpg" 
                    data-pswp-width="1875" 
                    data-pswp-height="2500" 
                    data-cropped="true" 
                    target="_blank">
                    <img src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/7/img-200.jpg" alt="" />
                </a>
                
                <a href="https://unsplash.com" 
                    data-pswp-src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-2500.jpg"
                    data-pswp-width="2500" 
                    data-pswp-height="1666" 
                    target="_blank">
                    <img src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/3/img-200.jpg" alt="" />
                </a>

                <a href="http://example.com" 
                    data-pswp-src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/5/img-2500.jpg"
                    data-pswp-width="2500" 
                    data-pswp-height="1668" 
                    target="_blank">
                </a>

                <div>
                    <a href="https://cdn.photoswipe.com/photoswipe-demo-images/photos/6/img-2500.jpg"
                    data-pswp-width="2500" 
                    data-pswp-height="1667" 
                    target="_blank">
                        <img src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/6/img-200.jpg" alt="" />
                    </a>
                </div>
            </div>
        </div>
    </>
});