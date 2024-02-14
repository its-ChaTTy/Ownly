import './How.scss'

const How = () => {
    return (
        <div className='How'>
            <div className='How__header'>
                <p className='How__header--text1'>How it works</p>
                <p className='How__header--text2'>How to Rent on Ownly</p>
                <p className='How__header--text3'>Access items without Owning them by renting them from<br />people around you in a few easy steps.</p>
            </div>
            <div className='How__blocks'>
                <img src='/Images/Assets/before.png' />
                <img src='/Images/Assets/during.png' />
            </div>
        </div>
    )
}

export default How