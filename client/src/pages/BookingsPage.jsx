import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";

import BookingDates from "../BookingDates";
import { Link } from "react-router-dom";

export default function BookingsPage() {
    const [bookings,setBookings] = useState([]);
    useEffect(() => {
      axios.get('/bookings').then(response => {
        console.log(response.data); 
        setBookings(response.data);
      });
    }, []);

  return (
    <div>
      <AccountNav />
      <div className="mt-5">
        {bookings?.length > 0 && bookings.map(booking => (
          <Link to={`/account/bookings/${booking._id}`} key={booking} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden ">
            <div className="w-48">
                <PlaceImg place={booking.place}/>
            </div>
            <div className="py-3 pr-3 grow">
                <h2 className="text-xl">{booking.place.title}</h2>
                <div className="text-xl ">
                <BookingDates booking={booking} className="mb-2 mt-4 text-gray-500" />

                    <div className="flex gap-1 text-lg">
                        <svg fill="currentColor" viewBox="0 0 16 16" className="w-8 h-8">
                            <path d="M0 4a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H2a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v1h14V4a1 1 0 00-1-1H2zm13 4H1v5a1 1 0 001 1h12a1 1 0 001-1V7z" />                                <path d="M2 10a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-1z" />
                        </svg>
                        <span className="text-2xl">Total price: ${booking.price}</span>        
                    </div>
                        
                </div>
            </div>
            </Link>
        ))}
      </div>
    </div>
  );
}
