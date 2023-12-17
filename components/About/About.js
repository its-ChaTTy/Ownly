import React from 'react'
import './About.scss'

const About = () => {
    const cards = [
        {
            'title': 'Share your stuff',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.',
            'button': 'Start Sharing'
        },
        {
            'title': 'Browse from someone',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.',
            'button': 'Start Browsing'
        },
        {
            'title': 'Request an item',
            'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.',
            'button': 'Start Requesting'
        },
    ];
    
    return (
        <div className='AboutSection'>
            <div className='AboutSection__header'>
                <p className='AboutSection__header--text1'>What sets us apart</p>
                <p className='AboutSection__header--text2'>What's in store for you</p>
                <p className='AboutSection__header--text3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.</p>
            </div>
            <div>
                <div className='AboutSection__cards'>
                    {cards.map((card, index) => (
                        <div style={{ backgroundColor: `${index == 0 ? "rgba(17, 52, 71, 1)" : (index == 1) ? "rgba(39, 124, 165, 1)" : "rgba(101, 194, 237, 1)"}` }} className='AboutSection__cards--card' key={index}>
                            <div className='AboutSection__cards--card__image'>
                                <img src={`/Images/Home_page/card${index + 1}.png`} alt='card' />
                            </div>
                            <div className='AboutSection__cards--card__text'>
                                <p className='AboutSection__cards--card__text--title'>{card.title}</p>
                                <p style={{ color: `${index == 0 ? "rgba(110, 120, 141, 1)" : (index == 1) ? "rgba(235, 235, 235, 1)" : "rgba(235, 235, 235, 1)"}` }} className='AboutSection__cards--card__text--description'>{card.description}</p>
                                <button className='AboutSection__cards--card__text--button'>{card.button}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default About