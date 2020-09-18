import React, { useContext } from 'react';
import { TouristSpotData } from '../../App';
import './Booking.css';
import hotelData from '../../FakeData/HotelData'

const Booking = () => {
    const [spotData, setSpotData] = useContext(TouristSpotData)
    const hotelDetails = hotelData;
    console.log(hotelData)
    return (
        <div className="container booking">
            <div className="bookingArea">
                <h5 className="guests">252 stays Apr 13-17 3 guests</h5>
                <div className="d-flex justify-content-between">
                    <div className="hotel-area">
                        <h3 className="staySpot text-dark">Stay in {spotData.name}</h3>
                        {
                            hotelDetails.map(hotel => <div className="d-flex mb-3 pt-2 justify-content-between">
                                <div className="hotelImage">
                                    <img src={hotel.hotelImg} alt=""/>
                                </div>
                                <div>
                                    <h3 className="hotel-name text-dark">{hotel.hotelName}</h3>
                                    <p>{hotel.roomDetails}</p>
                                    <p className="mb-2">{hotel.detail}</p>
                                    <span className="hotel-rate d-flex align-items-center">
                                        <img src="https://i.ibb.co/mqWpx9k/star-1.png" alt=""/>
                                        <p className="m-0 pl-2 text-dark text-rate">{hotel.rating}</p>
                                        <p className="pl-5 text-dark hotel-price">${hotel.price}/</p>
                                        <p>night</p>
                                    </span>
                                </div>
                            </div>)
                        }
                    </div>
                    <div className="map-area">
                        <img className="mapImage" src={spotData.hotelMapImg} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;