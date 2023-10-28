import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSwap } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import video from '../../Assets/airplane.mp4';
import Radio from './Input-Main/Radio';
import Location from './Input-Main/Location/Location';
import DatePicker from './Input-Main/DatePicker';
import Passenger from './Input-Main/Passenger';
import './home.css';
import { useSearchInputs } from '../Functions/useSearchInputs';


const Home = () => {
    const { 
        fromData, 
        toData, 
        departureDate, 
        returnDate, 
        passengerAndClass, 
        radioValue, 
        handleRadioChange, 
        handleSelect, 
        handleDateSelect, 
        handlePassengerAndClassSelect, 
        onSwap, 
        searchClicked, 
    } = useSearchInputs();
    
    
    return (
        <>
            <section className='home'>
                {/*<div className='overlay2'></div>*/}
                <div className="overlay"></div>
                <video src={video} type="video/mp4" autoPlay muted loop></video>

                <div className="homeContent container">
                    <div className="textDiv">
                        <span className="smallText">Let us help you to</span>
                        <h1 className="homeTitle">Chose your flights</h1>
                    </div>

                    <div className="cardDiv">
                        <div id='overlayImg'></div>

                        <Radio onRadioChange={handleRadioChange} />
                        
                        <div className="inputBox">
                            <div className='inputFieldBox'>
                                <AiOutlineSwap className="icon" onClick={onSwap} id='swapIcon' />
                                <Location
                                    tag='From'
                                    location={fromData.city}
                                    airport={fromData.airport}
                                    airportCode={fromData.airportCode}
                                    onSelect={(city, country, airport, airportCode) => handleSelect('From', city, country, airport, airportCode)}
                                />
                            </div>
                            <div className='inputFieldBox'>
                                <Location
                                    tag='To'
                                    location={toData.city}
                                    airport={toData.airport}
                                    airportCode={toData.airportCode}
                                    onSelect={(city, country, airport, airportCode) => handleSelect('To', city, country, airport, airportCode)} 
                                />
                            </div>

                            <DatePicker
                                tag='Departure'
                                date={departureDate.date}
                                day={departureDate.day}
                                active={true}
                                onSelect={(date, day) => handleDateSelect('Departure', date, day)}
                            />
                            <DatePicker
                                tag='Return'
                                date={returnDate.date}
                                day={returnDate.day}
                                active={radioValue === 'oneway' ? false : true}
                                onSelect={(date, day) => handleDateSelect('Return', date, day)}
                            />

                            <Passenger
                                tag='Passengers & Class'
                                passenger_count={passengerAndClass.passenger_count}
                                class_type={passengerAndClass.class_type}
                                onSelect={(passenger_count, class_type) => handlePassengerAndClassSelect(passenger_count, class_type)}
                            />

                            <button className='searchBtn' onClick={searchClicked}>
                                <AiOutlineSearch className="icon" id='searchIcon' />Search
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};

export default Home;