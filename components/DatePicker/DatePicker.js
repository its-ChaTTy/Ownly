import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react'
import './DatePicker.scss'
import useAuth from '@/hooks/useAuth';
import { addCart } from '@/operations/user.fetch';

const DatePicker = ({ id, userId = 0, price }) => {

    const { itemStartDate,
        setItemStartDate,
        itemEndDate,
        setItemEndDate,
        itemPrice,
        setItemPrice,
        itemDays,
        setItemDays } = useAuth()

    const [startValue, setStartValue] = useState(new Date());
    const onChangeStart = (date) => {
        setStartValue(date)
    }

    const [endValue, setEndValue] = useState(new Date());

    const onChangeEnd = (date) => {
        setEndValue(date)
    }

    const calculateTotalDays = () => {
        const timeDifference = endValue - startValue;
        const totalDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return totalDays;
    };

    const calculateTotalPrice = () => {
        const pricePerDay = price;
        const totalDays = calculateTotalDays();
        const totalPrice = pricePerDay * totalDays;
        return totalPrice;
    };

    function getFormattedDate(currentDate) {

        // Define an array of suffixes for day
        const daySuffixes = ['th', 'st', 'nd', 'rd'];

        // Extract day, month, and year
        let day = currentDate.getDate();
        let month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);
        let year = currentDate.getFullYear();

        // Get the appropriate suffix for the day
        let daySuffix;
        if (day >= 11 && day <= 13) {
            daySuffix = 'th';
        } else {
            daySuffix = daySuffixes[day % 10] || 'th';
        }

        // Create the formatted date string
        let formattedDate = `${day}${daySuffix} ${month}, ${year}`;

        return formattedDate;
    }

    const addToCart = () => {
        if (startValue > endValue) {
            alert('Start Date should be less than End Date')
            return
        }

        setItemStartDate(startValue)
        setItemEndDate(endValue)
        setItemPrice(calculateTotalPrice())
        setItemDays(calculateTotalDays())

        const data = {
            'itemId': id,
            'startDate': startValue,
            'endDate': endValue,
            'price': calculateTotalPrice(),
            'days': calculateTotalDays(),
            'userId': userId
        }

        addCart(data).then((res) => {
            if (res.status === 200) {
                alert('Item added to cart')
                window.location.reload()
            }
            else {
                alert('Error adding item to cart')
                window.location.reload()
            }
        }).catch((err) => {
            console.log(err)
        });

    }

    return (
        <div className='DatePicker'>
            <div className='DatePicker__picker'>
                <div className='DatePicker__picker__start'>
                    <p className='DatePicker__picker__start--text'>Start Date</p>
                    <Calendar
                        onChange={onChangeStart}
                        value={startValue}
                    />
                    <p className='DatePicker__picker__start--selectedValue'>Selected Date - {getFormattedDate(startValue)}</p>
                </div>
                <div className='DatePicker__picker__end'>
                    <p className='DatePicker__picker__end--text'>End Date</p>
                    <Calendar
                        onChange={onChangeEnd}
                        value={endValue}
                    />
                    <p className='DatePicker__picker__end--selectedValue'>Selected Date - {getFormattedDate(endValue)}</p>
                </div>
            </div>
            <div className='DatePicker__values'>
                <div className='DatePicker__values--content'>
                    <p className='DatePicker__values--content__days'>Total Days = {calculateTotalDays()} days</p>
                    <p className='DatePicker__values--content__price'>Total Price = Rs. {calculateTotalPrice()}</p>
                </div>
                <button onClick={() => { addToCart() }} className='DatePicker__values--button'>Add to Cart</button>
            </div>
        </div>
    )
}

export default DatePicker