import {React, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export const useSearchInputs = () => {
    const [fromData, setFromData] = useState({
        city: 'Dhaka',
        country: 'Bangladesh',
        airport: 'HAZRAT SHAH INTL',
        airportCode: 'DAC',
    });

    const [toData, setToData] = useState({
        city: 'Chittagong',
        country: 'Bangladesh',
        airport: 'SHAH AMANAT INTL',
        airportCode: 'CGP',
    });

    const [departureDate, setDepartureDate] = useState({
        date: '16 Aug 23',
        day: 'Monday',
    });

    const [returnDate, setReturnDate] = useState({
        date: '16 Aug 23',
        day: 'Monday',
    });

    const [passengerAndClass, setPassengerAndClass] = useState({
        passenger_count: 1,
        class_type: 'Economy',
    });

    const [radioValue, setRadioValue] = useState('oneway');

    const navigate = useNavigate();

    // Airport Selection 
    const handleSelect = (tag, city, country, airport, airportCode) => {
        const selectedData = { city, country, airport, airportCode };
        tag === 'From' ? setFromData(selectedData) : setToData(selectedData);
    };

    // Date Selection
    const handleDateSelect = (tag, date, day) => {
        const selectedDate = { date, day };
        tag == 'Departure' ? setDepartureDate(selectedDate) : setReturnDate(selectedDate);
    };

    // Passenger and Class Selection
    const handlePassengerAndClassSelect = (newPassengerCount, newClassType) => {
        const selectedData = {
            passenger_count: newPassengerCount !== undefined ? newPassengerCount : passengerAndClass.passenger_count,
            class_type: newClassType !== undefined ? newClassType : passengerAndClass.class_type,
        };
        setPassengerAndClass(selectedData);
    };

    // Swap Button
    const onSwap = () => {
        const temp = fromData;
        setFromData(toData);
        setToData(temp);
    };

    // Current date function 
    const getCurrentDate = () => {
        const date = new Date();
        const options = { day: 'numeric', month: 'long', year: '2-digit' };
        return {
            date: date.toLocaleDateString('en-US', options),
            day: date.toLocaleDateString('en-US', { weekday: 'long' })
        };
    };

    // Radio Button
    const handleRadioChange = (radio) => {
        setRadioValue(radio);
        if (radio === 'oneway') {
            setReturnDate({ date: 'N/A', day: '-' });
        } else if(radio === 'roundtrip') {
            setReturnDate({...getCurrentDate()});
        }
    };

    // Set current date
    useEffect(() => {
        setDepartureDate({ ...getCurrentDate()});
        handleRadioChange('oneway');
    }, []);

    // Search Button
    const searchClicked = () => {
        const queryParams = [
            `fromData=${fromData.airportCode}`,
            `toData=${toData.airportCode}`,
            `departureDate=${departureDate.date}`,
            `returnDate=${returnDate.date}`,
            `passengerCount=${passengerAndClass.passenger_count}`,
            `classType=${passengerAndClass.class_type}`,
            `tripType=${radioValue}`
        ].join('&');

        navigate(`/search?${queryParams}`);
    };
    return {
        handleSelect,
        handleDateSelect,
        handlePassengerAndClassSelect,
        onSwap,
        searchClicked, 
        handleRadioChange,
        fromData,
        toData,
        departureDate,
        returnDate,
        passengerAndClass,
        radioValue
    };
};