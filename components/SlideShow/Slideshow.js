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
            width: 15vw;
            height:15vw;
        }

        @media (max-width: 768px) {
            img {
                width: 40vw;
                height:40vw;
            }
        }

      `}</style>
        </div>
    );
};

export default Slideshow;
