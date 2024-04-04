import './About.scss'

const About = () => {
    const cards = [
        {
            'title': 'Share your stuff',
            'description': 'Put your unused items to work and earn for you! List your item for rent, set availability and rental duration, and start earning money from your unused items.',
            'button': 'Start Sharing'
        },
        {
            'title': 'Browse from someone',
            'description': 'In need of a product for a short-term rental? Post a rent request and access a wide variety of products from other users, and conveniently rent them out for however long you need.',
            'button': 'Start Browsing'
        },
        {
            'title': 'Request an item',
            'description': 'Simply fill out our easy form to submit your item request. Our team will promptly review your request and work to fulfill it. Let us know what you need, and we will take care of the rest!',
            'button': 'Start Requesting'
        },
    ];
    
    return (
        <div className='AboutSection'>
            <div className='AboutSection__header'>
                {/* <p className='AboutSection__header--text1'>What sets us apart</p> */}
                <p className='AboutSection__header--text2'>What's in store <div className='AboutSection__header--text2--text21'>for you</div></p>
                {/* <p className='AboutSection__header--text3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.</p> */}
            </div>
            <div>
                <div className='AboutSection__cards'>
                    {cards.map((card, index) => (
                        <div style={{ backgroundColor: `${index == 0 ? "rgba(17, 52, 71, 1)" : (index == 1) ? "rgba(39, 124, 165, 1)" : "rgba(101, 194, 237, 1)"}` }} className='AboutSection__cards--card' key={index}>
                            <div className='AboutSection__cards--card__image'>
                                <img src={`/Images/Home_page/card${index + 1}.webp`} alt='card' />
                            </div>
                            <div className='AboutSection__cards--card__text'>
                                <p className='AboutSection__cards--card__text--title'>{card.title}</p>
                                <p style={{ color: `${index == 0 ? "rgba(235, 235, 235, 1)" : (index == 1) ? "rgba(235, 235, 235, 1)" : "rgba(235, 235, 235, 1)"}` }} className='AboutSection__cards--card__text--description'>{card.description}</p>
                                {/* <button className='AboutSection__cards--card__text--button'>{card.button}</button> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default About