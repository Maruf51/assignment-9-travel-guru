import React, { useContext } from 'react';
import './TouristSpotDetail.css'
import { Link, useParams } from 'react-router-dom';
import { TouristSpotData } from '../../App';
import fakeData from '../../FakeData/FakeData';

const TouristSpotDetail = () => {
    const [spotData, setSpotData] = useContext(TouristSpotData);
    const {nickName} = useParams();

    const touristSpotBackground = {
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${spotData.bgURL})`
    }

    const spotDataDetail = fakeData.find(spotNickName => spotNickName.nickName === nickName);
    setSpotData(spotDataDetail);

    return (
        <div className="d-flex align-items-center justify-content-between px-5 touristSpot" style={touristSpotBackground}>
            <div className="detailTextArea">
                <h1 className="text-white spotName">{spotData.name}</h1>
                <p className="spotDetail">{spotData.detail}</p>
            </div>
            <form className="detailFormArea">
                <label htmlFor="origin" >Origin</label>
                <input type="text" name="origin" id="origin" placeholder="Your Origin..." required/>
                <label htmlFor="destination" >Destination</label>
                <input type="text" name="destination" id="destination" placeholder="Your Destination..." defaultValue={spotData.name} required/>
                <div className="d-flex justify-content-between">
                    <div className="dateFrom">
                        <label htmlFor="from" >Origin</label>
                        <input type="date" name="from" id="from" required/>
                    </div>
                    <div className="dateTo">
                        <label htmlFor="to" >Origin</label>
                        <input type="date" name="to" id="to" required/>
                    </div>
                </div>
                <Link to={'/booking/' + spotData.nickName}><button className="btn btn-warning startBookingBtn">Start Booking</button></Link>
            </form>
        </div>
    );
};

export default TouristSpotDetail;