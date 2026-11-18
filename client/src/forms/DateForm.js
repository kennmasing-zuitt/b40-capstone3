import React,  { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { getDay, setHours, setMinutes } from "date-fns";
import Swal from 'sweetalert2';
import moment from 'moment';

const DateForm = (props) => {
	
	const [startDate, setStartDate] = useState("")

	const [bookingHours, setBookingHours ] = useState([])

	const [ newBookingHours, setNewBookingHours ] = useState([])

useEffect( ()=>{
        setBookingHours([
            setHours(setMinutes(startDate, 0), 8), //8
            setHours(setMinutes(startDate, 30), 9), //9:30
            setHours(setMinutes(startDate, 0), 11), //11
            setHours(setMinutes(startDate, 30), 12), //12:30
            setHours(setMinutes(startDate, 0), 14), //2
            setHours(setMinutes(startDate, 30), 15), //3:30
            setHours(setMinutes(startDate, 0), 17)
        ])
    }, [startDate])

	// useEffect(() => {
	// 	filterBookingHours()
	// }, [bookingHours])

	console.log("PROPS BOOKINGS IN DATE FORM", props.bookings)

    const filterBookingHours = () =>{
        //1) GET SCHEDULE FIELD OF BOOKINGS FOR THIS PARTICULAR MEMBER
        // CONVER TO UNIX TIMESTAMP
        const bookings = props.bookings.map(booking => booking.parkingId == props.parkingId && new Date(booking.schedule).getTime() )
                .filter(booking => booking != false )

        console.log("PROP BOOKING SCHED IN UNIX", bookings)

        //2) CONVERT BOOKING HOURS TO UNIX FORMAT
        // RESET SECONDS AND MILLISECONDS OF BOOKING HOURS TO 0
        const bh = bookingHours.map(bh => {
            bh.setSeconds(0)
            return new Date(bh.setMilliseconds(0)).getTime()
        })

        console.log("BOOKING HOURS IN UNIX", bh)

        //3) COMPARE BOOKING SCHEDULES AND BOOKING HOURS TO REMOVE DUPLICATES
        const filteredBh = bh.filter(bh => !bookings.includes(bh))
        console.log("FILTERED BOOKING HOURS", filteredBh)

        //4) REVERT REMAINING BOOKING HOURS TO ORIG FORMAT
        const newBookingHours = filteredBh.map(bh => new Date(bh))
        console.log("CONVERTED BOOKING HOURS", newBookingHours)

        //5) UPDATE NEWBOOKING HOURS
        setNewBookingHours(newBookingHours)

    }


	const isWeekday = date => {
		const day = getDay(date)
		return day !== 0 && day !== 6
	}

	const onSubmitHandler = (e) => {
		e.preventDefault()

		const d = new Date(startDate.getTime())
		const html = `${d.toDateString()} ${d.toLocaleTimeString()}`


		Swal.fire({
			icon: "question",
			title: "Confirm Selected Schedule",
			html: html,
			focusConfirm: false,
			showCloseButton: true
		}).then(response => {

			if(response.value){
				//ACCESS DB

				const schedule = startDate.setSeconds(0) //reset seconds into 0

				const booking = {
					schedule: new Date(schedule), //revert to original date format
					toBeBooked: props.toBeBooked
				}

				props.createBooking(booking, html)
				setStartDate("") //resets
			}

		})
	}

	return (
		<form onSubmit={ e => onSubmitHandler(e) }>
	  			<DatePicker
					selected={startDate}
					onChange={date => setStartDate(date)}
					selectsStart
					startDate={startDate}
					// endDate={endDate}
					minDate={new Date()}
					// excludeDates={bookingDates}
					className="mr-3 container-fluid"
					filterDate={isWeekday}
					showTimeSelect
					includeTimes={bookingHours}
					// dateFormat="MMMM d, yyyy h:mm aa"
				/>
			<button className="btn btn-success">Book</button>
		</form>
	)
}

export default DateForm;
