import React, { useContext } from 'react';
import './TouristSpot.css';
import { TouristSpotData } from '../../App';
import fakeData from '../../FakeData/FakeData'
import { Link } from 'react-router-dom';

const TouristSpot = () => {
    const [spotData, setSpotData] = useContext(TouristSpotData)

    // for dynamic background image
    const touristSpotBackground = {
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${spotData.bgURL})`
    }
    // for dynamic photo link
    const coxBazarStyle = {
        backgroundImage: `linear-gradient( rgb(0 0 0 / 0%), rgba(0, 0, 0, 0.5) ), url(${fakeData[0].imgURL})`
    }
    const sreemangalStyle = {
        backgroundImage: `linear-gradient( rgb(0 0 0 / 0%), rgba(0, 0, 0, 0.5) ), url(${fakeData[1].imgURL})`
    }
    const sundarbansStyle = {
        backgroundImage: `linear-gradient( rgb(0 0 0 / 0%), rgba(0, 0, 0, 0.5) ), url(${fakeData[2].imgURL})`
    }
    return (
        <div className="d-flex align-items-center justify-content-between px-5 touristSpot" style={touristSpotBackground}>
            <div className="text-white spotTextArea">
                <h1 className="spotName">{spotData.name}</h1>
                <p className="spotDetail">{spotData.shortDetail}</p>
                <Link to={'/details/' + spotData.nickName}><button className="btn btn-warning">Booking 🠪</button></Link>
            </div>
            <div className="spotImgArea">
                <div onClick={() => setSpotData(fakeData[0])} className="spotImg" style={coxBazarStyle}>
                    <h2 className="imgSpotName">COX'S BAZAR</h2>
                </div>
                <div onClick={() => setSpotData(fakeData[1])} className="spotImg mx-4" style={sreemangalStyle}>
                    <h2 className="imgSpotName">SREEMANGAL</h2>
                </div>
                <div onClick={() => setSpotData(fakeData[2])} className="spotImg" style={sundarbansStyle}>
                    <h2 className="imgSpotName">SUNDARBANS</h2>
                </div>
            </div>
        </div>
    );
};

export default TouristSpot;