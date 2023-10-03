import { React, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineSwap } from "react-icons/ai";
import Location from "../Home/Input-Main/Location/Location";
import DatePicker from "../Home/Input-Main/DatePicker";
import Passenger from "../Home/Input-Main/Passenger";
import { useSearchInputs } from "../Functions/useSearchInputs";
import Radio from "../Home/Input-Main/Radio";
import "./searchPage.css";
import { fetchAccessToken } from "../../FetchAPIs";
import { useFlightSearch } from "../SearchPage/useFlightSearch";

const SearchPage = () => {
    const data = useLocation();
    const searchParams = new URLSearchParams(data.search);

    const [originCountry, setOriginCountry] = useState("");
    const [originCity, setOriginCity] = useState("");
    const [originAirport, setOriginAirport] = useState("");
    const [originAirportCode, setOriginAirportCode] = useState("");

    const [destinationCountry, setDestinationCountry] = useState("");
    const [destinationCity, setDestinationCity] = useState("");
    const [destinationAirport, setDestinationAirport] = useState("");
    const [destinationAirportCode, setDestinationAirportCode] = useState("");

    const [depDate, setDepDate] = useState("");
    const [retDate, setRetDate] = useState("");
    const [depDay, setDepDay] = useState("");
    const [retDay, setRetDay] = useState("");

    const [passenger, setPassenger] = useState("");
    const [classData, setClassData] = useState("");


    const {
        formatDate,
        fromCountry,
        fromCity,
        fromData,
        toData,
        fromAirport,
        fromAirportCode,
        toCountry,
        toCity,
        toAirport,
        toAirportCode,
        departureDateExact,
        returnDateExact,
        departureDay,
        returnDay,
        passengerAndClass,
        returnDate,
        departureDate,
        passengerCount,
        classType,
        radioValue,
        handleRadioChange,
        handleSelect,
        handleDateSelect,
        handlePassengerAndClassSelect,
        onSwap,
        searchClicked
    } = useSearchInputs();



    useEffect(() => {
        setOriginCountry(searchParams.get("fromCountry"));
        setOriginCity(searchParams.get("fromCity"));
        setOriginAirport(searchParams.get("fromAirport"));
        setOriginAirportCode(searchParams.get("fromAirportCode"));

        setDestinationCountry(searchParams.get("toCountry"));
        setDestinationCity(searchParams.get("toCity"));
        setDestinationAirport(searchParams.get("toAirport"));
        setDestinationAirportCode(searchParams.get("toAirportCode"));

        setDepDay(searchParams.get("departureDay"));
        setRetDay(searchParams.get("returnDay"));
        setDepDate(formatDate(searchParams.get("departureDateExact")));
        setRetDate(returnDate !== "N/A" ? formatDate(searchParams.get("returnDateExact")) : null);
        setPassenger(searchParams.get("passengerCount"));
        setClassData(searchParams.get("classType"));
    }, [data.search, returnDate, searchParams]); // add returnDate and searchParams here

    /*
      useEffect(() => {
          for (let param of searchParams.entries()) {
              console.log(param); // logs a [key, value] pair for each query parameter
          }
      }, [data.search]); // React will re-run this effect when `location.search` changes
    
      useEffect(() => {
          const getTokenFromBackend = async () => {
              try {
                  const response = await fetchAccessToken();
                  setAccessToken(response);
              } catch (error) {
                  console.error('Error fetching access token:', error);
                  setAccessToken('');
              }
          };
          getTokenFromBackend();
      }, []);
  
      const flightOffers = useFlightSearch(accessToken, fromData, toData, departureDate, returnDate, passengerCount, classType);
  */

    const flightData = {
        type: "flight-offer",
        id: "1",
        source: "GDS",
        instantTicketingRequired: false,
        nonHomogeneous: false,
        oneWay: false,
        lastTicketingDate: "2023-12-10",
        lastTicketingDateTime: "2023-12-10",
        numberOfBookableSeats: 9,
        itineraries: [
            {
                duration: "PT26H55M",
                segments: [
                    {
                        departure: {
                            iataCode: "SYD",
                            terminal: "1",
                            at: "2023-12-10T12:20:00",
                        },
                        arrival: {
                            iataCode: "XMN",
                            terminal: "3",
                            at: "2023-12-10T18:40:00",
                        },
                        carrierCode: "MF",
                        number: "802",
                        aircraft: {
                            code: "789",
                        },
                        operating: {
                            carrierCode: "MF",
                        },
                        duration: "PT9H20M",
                        id: "110",
                        numberOfStops: 0,
                        blacklistedInEU: false,
                    },
                    {
                        departure: {
                            iataCode: "XMN",
                            terminal: "3",
                            at: "2023-12-11T08:50:00",
                        },
                        arrival: {
                            iataCode: "BKK",
                            at: "2023-12-11T11:15:00",
                        },
                        carrierCode: "MF",
                        number: "853",
                        aircraft: {
                            code: "738",
                        },
                        operating: {
                            carrierCode: "MF",
                        },
                        duration: "PT3H25M",
                        id: "111",
                        numberOfStops: 0,
                        blacklistedInEU: false,
                    },
                ],
            },
        ],
        price: {
            currency: "EUR",
            total: "223.83",
            base: "77.00",
            fees: [
                {
                    amount: "0.00",
                    type: "SUPPLIER",
                },
                {
                    amount: "0.00",
                    type: "TICKETING",
                },
            ],
            grandTotal: "223.83",
        },
        pricingOptions: {
            fareType: ["PUBLISHED"],
            includedCheckedBagsOnly: true,
        },
        validatingAirlineCodes: ["MF"],
        travelerPricings: [
            {
                travelerId: "1",
                fareOption: "STANDARD",
                travelerType: "ADULT",
                price: {
                    currency: "EUR",
                    total: "223.83",
                    base: "77.00",
                },
                fareDetailsBySegment: [
                    {
                        segmentId: "110",
                        cabin: "ECONOMY",
                        fareBasis: "SOW6AAUS",
                        class: "S",
                        includedCheckedBags: {
                            quantity: 1,
                        },
                    },
                    {
                        segmentId: "111",
                        cabin: "ECONOMY",
                        fareBasis: "SOW6AAUS",
                        class: "S",
                        includedCheckedBags: {
                            quantity: 1,
                        },
                    },
                ],
            },
        ],
    };

    return (
        <>
            <div className="Container">
                <div className="search-box-container">
                    <div className="search-inputs">
                        <div>
                            <Location
                                tag='From'
                                location={fromData.city}
                                airport={fromData.airport}
                                airportCode={fromData.airportCode}
                                onSelect={(city, country, airport, airportCode) => handleSelect('From', city, country, airport, airportCode)}
                            />
                        </div>
                        <div className="locLast">
                            <Location
                                tag='To'
                                location={toData.city}
                                airport={toData.airport}
                                airportCode={toData.airportCode}
                                onSelect={(city, country, airport, airportCode) => handleSelect('To', city, country, airport, airportCode)}
                            />
                        </div>
                        <div className="dateLast">
                            <DatePicker
                                tag='Departure'
                                date={departureDate.date}
                                day={departureDate.day}
                                active={true}
                                onSelect={(date, day) => handleDateSelect('Departure', date, day)}
                            />
                        </div>
                        <div className="dateLast">
                            <DatePicker
                                tag='Return'
                                date={returnDate.date}
                                day={retDay}
                                active={radioValue === 'oneway' ? false : true}
                                onSelect={(date, day) => handleDateSelect('Return', date, day)}
                            />
                            <AiOutlineSwap className="icon" onClick={onSwap} id='swapIcon' />
                        </div>
                        <div className="lastPass">
                            <Passenger
                                tag='Passengers & Class'
                                passenger_count={passengerAndClass.passenger_count}
                                class_type={passengerAndClass.class_type}
                                onSelect={(passenger_count, class_type) => handlePassengerAndClassSelect(passenger_count, class_type)}
                            />
                        </div>
                    </div>
                </div>
                <div className="searched-flights-container">
                    <div className="controller"></div>
                    <div className="flights">
                        <div className="flight">
                            <div className="carrier-info">


                                <div className="each-carrier">
                                    <div className="carrier-company">
                                        <div className="carrier-logo">
                                            <img src="https://images.kiwi.com/airlines/64/AF.png" alt="AF" />
                                        </div>
                                        <div className="carrier-name">Air France</div>
                                    </div>
                                    <p className="carrier-model">Boeing 787</p>
                                </div>


                                <div className="each-carrier">
                                    <div className="carrier-company">
                                        <div className="carrier-logo">
                                            <img src="https://images.kiwi.com/airlines/64/AA.png" alt="AA" />
                                        </div>
                                        <div className="carrier-name">American Airlines</div>
                                    </div>
                                    <p className="carrier-model">Boeing 777</p>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;
