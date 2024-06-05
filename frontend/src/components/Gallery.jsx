import React from "react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export default function Gallery() {
    const container = useRef(null);
    const { username } = useParams();
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://product-gallery.cloudinary.com/latest/all.js";
        script.async = true;
        script.onload = () => {
          console.log('Script loaded!');
        };
    
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);
      useEffect(() => {
        if(window && container.current) {
            window.cloudinary.galleryWidget({
                container: container.current,
                cloudName: 'dgtngxdlp',
                mediaAssets: [
                    { tag: username }
                ],
                carouselStyle: 'indicators',
                carouselLocation: 'bottom',
            })
            .render();
        }
      }, []);
    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={container} />
        </>
    )
}