// components/Slideshow.js

import { useState, useEffect } from 'react';

const Slideshow = ({ imageURL }) => {
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % imageURL.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [imageURL.length]);

    return (
        <div className='slideshow-container'>
            {imageURL.map((url, index) => (
                <div
                    key={index}
                    className={`mySlides ${index === slideIndex ? 'active' : ''}`}
                >
                    <img src={url} alt={`item-${index + 1}`} />
                </div>
            ))}
            <style jsx>{`
        .slideshow-container {
          max-width: 1000px;
          position: relative;
          margin: auto;
        }

        .mySlides {
          display: none;
          border-radius: 1rem;

        }

        .mySlides.active {
          display: block;
          border-radius: 1rem;
        }

        img {
            border-radius: 1rem;
            width: 100%;
            height: auto;
        }
      `}</style>
        </div>
    );
};

export default Slideshow;
