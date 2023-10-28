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
import { MdFlight } from "react-icons/md";
import { FaSuitcaseRolling } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import axios from "axios";

const SearchPage = () => {
    const data = useLocation();
    const searchParams = new URLSearchParams(data.search);
    const [accessToken, setAccessToken] = useState("");

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
    const [loading, setLoading] = useState(true);
/*
    const [flightData, setFlightData] = useState({
        "data": [],
        "dictionaries": {
            "locations": {},
            "aircraft": {},
            "currencies": {},
            "carriers": {}
        }
    });*/

    const {
        setFromData,
        setToData,
        setDepartureDate,
        setReturnDate,
        setPassengerAndClass,
        passengerAndClass,
        formatDate,
        fromData,
        toData,
        returnDate,
        departureDate,
        radioValue,
        handleRadioChange,
        handleSelect,
        handleDateSelect,
        handlePassengerAndClassSelect,
        onSwap,
        passengerCount,
        classType,
        searchClicked,
    } = useSearchInputs();



    useEffect(() => {

        setFromData({
            city: searchParams.get("fromCity"),
            country: searchParams.get("fromCountry"),
            airport: searchParams.get("fromAirport"),
            airportCode: searchParams.get("fromAirportCode")
        });

        setToData({
            city: searchParams.get("toCity"),
            country: searchParams.get("toCountry"),
            airport: searchParams.get("toAirport"),
            airportCode: searchParams.get("toAirportCode")
        });

        setPassengerAndClass({
            passenger_count: searchParams.get("passengerCount"),
            class_type: searchParams.get("classType")
        });

        setDepartureDate({
            date: searchParams.get("departureDateExact"),
            day: searchParams.get("departureDay")
        });

        setReturnDate({
            date: searchParams.get("returnDateExact"),
            day: searchParams.get("returnDay")
        });

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
    }, []);

    //[data.search, returnDate, searchParams]);

    const parseDuration = (duration) => {
        const match = duration.match(/PT(\d+H)?(\d+M)?/); // matches PT#H#M
        const hours = match[1] ? parseInt(match[1]) : 0; // gets hours if present, otherwise 0
        const minutes = match[2] ? parseInt(match[2]) : 0; // gets minutes if present, otherwise 0
        return hours * 60 + minutes; // returns duration in minutes
    };

    /*const handleSelectClick = () => {
        // Page change to another link
        // navigate('/payment');
        
    };*/

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

    //const flightData = useFlightSearch(accessToken, fromData, toData, departureDate, returnDate, passenger, classData);

    
        const flightData = {
            "data": [{
                "type": "flight-offer",
                "id": "1",
                "source": "GDS",
                "instantTicketingRequired": false,
                "nonHomogeneous": false,
                "oneWay": false,
                "lastTicketingDate": "2023-12-10",
                "lastTicketingDateTime": "2023-12-10",
                "numberOfBookableSeats": 9,
                "itineraries": [
                    {
                        "duration": "PT26H55M",
                        "segments": [
                            {
                                "departure": {
                                    "iataCode": "SYD",
                                    "terminal": "1",
                                    "at": "2023-12-10T12:20:00"
                                },
                                "arrival": {
                                    "iataCode": "XMN",
                                    "terminal": "3",
                                    "at": "2023-12-10T18:40:00"
                                },
                                "carrierCode": "MF",
                                "number": "802",
                                "aircraft": {
                                    "code": "789"
                                },
                                "operating": {
                                    "carrierCode": "MF"
                                },
                                "duration": "PT9H20M",
                                "id": "112",
                                "numberOfStops": 0,
                                "blacklistedInEU": false
                            },
                            {
                                "departure": {
                                    "iataCode": "XMN",
                                    "terminal": "3",
                                    "at": "2023-12-11T08:50:00"
                                },
                                "arrival": {
                                    "iataCode": "BKK",
                                    "at": "2023-12-11T11:15:00"
                                },
                                "carrierCode": "MF",
                                "number": "853",
                                "aircraft": {
                                    "code": "738"
                                },
                                "operating": {
                                    "carrierCode": "MF"
                                },
                                "duration": "PT3H25M",
                                "id": "113",
                                "numberOfStops": 0,
                                "blacklistedInEU": false
                            }
                        ]
                    }
                ],
                "price": {
                    "currency": "EUR",
                    "total": "224.02",
                    "base": "77.00",
                    "fees": [
                        {
                            "amount": "0.00",
                            "type": "SUPPLIER"
                        },
                        {
                            "amount": "0.00",
                            "type": "TICKETING"
                        }
                    ],
                    "grandTotal": "224.02"
                },
                "pricingOptions": {
                    "fareType": [
                        "PUBLISHED"
                    ],
                    "includedCheckedBagsOnly": true
                },
                "validatingAirlineCodes": [
                    "MF"
                ],
                "travelerPricings": [
                    {
                        "travelerId": "1",
                        "fareOption": "STANDARD",
                        "travelerType": "ADULT",
                        "price": {
                            "currency": "EUR",
                            "total": "224.02",
                            "base": "77.00"
                        },
                        "fareDetailsBySegment": [
                            {
                                "segmentId": "112",
                                "cabin": "ECONOMY",
                                "fareBasis": "SOW6AAUS",
                                "class": "S",
                                "includedCheckedBags": {
                                    "quantity": 1
                                }
                            },
                            {
                                "segmentId": "113",
                                "cabin": "ECONOMY",
                                "fareBasis": "SOW6AAUS",
                                "class": "S",
                                "includedCheckedBags": {
                                    "quantity": 1
                                }
                            }
                        ]
                    }
                ]
            },
            {
                "type": "flight-offer",
                "id": "3",
                "source": "GDS",
                "instantTicketingRequired": false,
                "nonHomogeneous": false,
                "oneWay": false,
                "lastTicketingDate": "2023-12-10",
                "lastTicketingDateTime": "2023-12-10",
                "numberOfBookableSeats": 9,
                "itineraries": [
                    {
                        "duration": "PT9H25M",
                        "segments": [
                            {
                                "departure": {
                                    "iataCode": "SYD",
                                    "terminal": "1",
                                    "at": "2023-12-10T10:00:00"
                                },
                                "arrival": {
                                    "iataCode": "BKK",
                                    "at": "2023-12-10T15:25:00"
                                },
                                "carrierCode": "TG",
                                "number": "476",
                                "aircraft": {
                                    "code": "77W"
                                },
                                "operating": {
                                    "carrierCode": "TG"
                                },
                                "duration": "PT9H25M",
                                "id": "43",
                                "numberOfStops": 0,
                                "blacklistedInEU": false
                            }
                        ]
                    }
                ],
                "price": {
                    "currency": "EUR",
                    "total": "396.39",
                    "base": "331.00",
                    "fees": [
                        {
                            "amount": "0.00",
                            "type": "SUPPLIER"
                        },
                        {
                            "amount": "0.00",
                            "type": "TICKETING"
                        }
                    ],
                    "grandTotal": "396.39"
                },
                "pricingOptions": {
                    "fareType": [
                        "PUBLISHED"
                    ],
                    "includedCheckedBagsOnly": true
                },
                "validatingAirlineCodes": [
                    "TG"
                ],
                "travelerPricings": [
                    {
                        "travelerId": "1",
                        "fareOption": "STANDARD",
                        "travelerType": "ADULT",
                        "price": {
                            "currency": "EUR",
                            "total": "396.39",
                            "base": "331.00"
                        },
                        "fareDetailsBySegment": [
                            {
                                "segmentId": "43",
                                "cabin": "ECONOMY",
                                "fareBasis": "VLOST",
                                "class": "V",
                                "includedCheckedBags": {
                                    "weight": 25,
                                    "weightUnit": "KG"
                                }
                            }
                        ]
                    }
                ]
            }],
            "dictionaries": {
                "locations": {
                    "BKK": {
                        "cityCode": "BKK",
                        "countryCode": "TH"
                    },
                    "DMK": {
                        "cityCode": "BKK",
                        "countryCode": "TH"
                    },
                    "KUL": {
                        "cityCode": "KUL",
                        "countryCode": "MY"
                    },
                    "HKG": {
                        "cityCode": "HKG",
                        "countryCode": "HK"
                    },
                    "DPS": {
                        "cityCode": "DPS",
                        "countryCode": "ID"
                    },
                    "TPE": {
                        "cityCode": "TPE",
                        "countryCode": "TW"
                    },
                    "MNL": {
                        "cityCode": "MNL",
                        "countryCode": "PH"
                    },
                    "NRT": {
                        "cityCode": "TYO",
                        "countryCode": "JP"
                    },
                    "ICN": {
                        "cityCode": "SEL",
                        "countryCode": "KR"
                    },
                    "XMN": {
                        "cityCode": "XMN",
                        "countryCode": "CN"
                    },
                    "SIN": {
                        "cityCode": "SIN",
                        "countryCode": "SG"
                    },
                    "SGN": {
                        "cityCode": "SGN",
                        "countryCode": "VN"
                    },
                    "SYD": {
                        "cityCode": "SYD",
                        "countryCode": "AU"
                    },
                    "HND": {
                        "cityCode": "TYO",
                        "countryCode": "JP"
                    }
                },
                "aircraft": {
                    "321": "AIRBUS A321",
                    "333": "AIRBUS A330-300",
                    "359": "AIRBUS A350-900",
                    "738": "BOEING 737-800",
                    "772": "BOEING 777-200/200ER",
                    "773": "BOEING 777-300",
                    "781": "BOEING 787-10",
                    "788": "BOEING 787-8",
                    "789": "BOEING 787-9",
                    "32Q": "AIRBUS A321NEO",
                    "77W": "BOEING 777-300ER",
                    "77L": "BOEING 777-200LR"
                },
                "currencies": {
                    "EUR": "EURO"
                },
                "carriers": {
                    "PR": "PHILIPPINE AIRLINES",
                    "CI": "CHINA AIRLINES LTD.",
                    "EK": "EMIRATES",
                    "OZ": "ASIANA AIRLINES",
                    "TG": "THAI AIRWAYS INTERNATIONAL",
                    "OD": "BATIK AIR MALAYSIA",
                    "QF": "QANTAS AIRWAYS",
                    "CX": "CATHAY PACIFIC",
                    "VN": "VIETNAM AIRLINES",
                    "MF": "XIAMEN AIRLINES",
                    "KE": "KOREAN AIR",
                    "NH": "ALL NIPPON AIRWAYS",
                    "ID": "BATIK AIR INDONESIA",
                    "MH": "MALAYSIA AIRLINES",
                    "TR": "SCOOT",
                    "SQ": "SINGAPORE AIRLINES"
                }
            }
        };
    
/*
    const [params, setParams] = useState({
        originLocationCode: searchParams.get("fromAirportCode"),
        destinationLocationCode: searchParams.get("toAirportCode"),
        departureDate: formatDate(searchParams.get("departureDateExact")),
        // Uncomment the next line if you wish to include returnDate in your request
        // returnDate: returnDateTime,
        adults: searchParams.get("passengerCount"),
        // Uncomment the next line if you wish to include travelClass in your request
        // travelClass: classType,
        nonStop: false,
        // Uncomment the next line if you wish to include currencyCode in your request
        // currencyCode: 'USD',
        max: 50,
    });

    useEffect(() => {
        const fetchFlightOffers = async () => {
            try {
                if (accessToken) {
                    const response = await axios.get(
                        'https://test.api.amadeus.com/v2/shopping/flight-offers',
                        {
                            params: params,
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                        }
                    );
                    console.log(response.data);
                    setFlightData(response.data);
                }
            } catch (error) {
                console.error('Error fetching flight offers:', error);
            }
        };
        fetchFlightOffers();
    }, [searchParams, accessToken]);
*/
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
                                day={returnDate.day}
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
                    <div className="controller">
                        <div className="controller-container">
                            <span className="ct-title">Price Range</span>
                            <div className="range-controller-box rangeBox">
                                <input type="range" />
                            </div>
                            <div className="price-range-text">
                                <span className="">100 EUR</span>
                                <span className="">800 EUR</span>
                            </div> 
                            <span className="ct-title">Duration Range</span>
                            <div className="duration-range-box rangeBox">
                                <input type="range" />
                            </div>
                            <div className="price-range-text">
                                <span className="">30 Min</span>
                                <span className="">20 Hours+</span>
                            </div> 
                        </div>
                    </div>
                    <div className="flights">
                        {
                            flightData.data.map((flight, index) => {
                                return (
                                    <div className="flight">
                                        <div className="carrier-info">
                                            <div className="carriers">
                                                {
                                                    flight.itineraries[0].segments.map((segment, index) => {
                                                        // put flight carrierCode and id in hash map
                                                        const carrierCode = segment.carrierCode;
                                                        const carrierName = flightData.dictionaries.carriers[carrierCode];

                                                        return (
                                                            <div className="each-carrier">
                                                                <div className="carrier-company">
                                                                    <div className="carrier-logo">
                                                                        <img src={`https://images.kiwi.com/airlines/64/${carrierCode}.png`} alt="AF" />
                                                                    </div>
                                                                    <div className="carrier-name">{carrierName}</div>
                                                                </div>
                                                                <p className="carrier-model">{flightData.dictionaries.aircraft[segment.aircraft.code]}</p>
                                                            </div>
                                                        );
                                                    })
                                                }

                                            </div>

                                            <div className="pricing">
                                                <span className="price">{flight.price.grandTotal}</span> <span className="price-currency">{flight.price.currency}</span>
                                            </div>
                                        </div>

                                        {/** Flight facilites information*/}
                                        <div className="facilities-info">
                                            <div className="left-facilities">
                                                <div className="checked-bags">
                                                    <FaSuitcaseRolling className="icon" /> Checked luggage {
                                                        flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.quantity
                                                    } {
                                                        flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weight &&
                                                        `(${flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weight}
                                                ${flight.travelerPricings[0].fareDetailsBySegment[0].includedCheckedBags.weightUnit})`
                                                    }
                                                </div>
                                                <div className="dot-gray"></div>
                                                {
                                                    flight.itineraries[0].segments.length - 1 > 0 ?
                                                        <div className="layover-count">
                                                            {`${flight.itineraries[0].segments.length - 1} Transit`}
                                                        </div> : <div className="layover-count">Direct Flight</div>
                                                }
                                                {flight.itineraries[0].segments.length - 1 > 0 ? <div className="dot-gray"></div> : null}
                                                {

                                                    flight.itineraries[0].segments.length - 1 > 0 ?
                                                        <div className="layover-duration-total"> Transit duration total:
                                                            {
                                                                (() => {
                                                                    // Parse total duration in minutes
                                                                    let totalDurationMinutes = parseDuration(flight.itineraries[0].duration);

                                                                    flight.itineraries[0].segments.forEach((segment) => {
                                                                        // Parse segment duration in minutes
                                                                        const segmentDurationMinutes = parseDuration(segment.duration);

                                                                        // Subtract segment duration from total duration
                                                                        totalDurationMinutes -= segmentDurationMinutes;
                                                                    });

                                                                    const layoverHours = Math.floor(totalDurationMinutes / 60);
                                                                    const layoverMinutes = totalDurationMinutes % 60;

                                                                    return ` ${layoverHours} ${layoverHours > 9 ? 'Hours' : 'Hour'}, ${layoverMinutes} ${layoverMinutes > 9 ? 'Minutes' : 'Minute'} `;
                                                                })()
                                                            }
                                                        </div>
                                                        : null
                                                }
                                            </div>
                                            <div className="right-facilities">
                                                {passengerAndClass.class_type}
                                            </div>
                                        </div>

                                        <div className="itineraries-data">
                                            <div className="left-iti">
                                                <span className="departure-airport">{flight.itineraries[0].segments[0].departure.iataCode}</span>
                                                <span className="departure-date">
                                                    {
                                                        `
                                                   ${new Date(flight.itineraries[0].segments[0].departure.at).getDate()}
                                                   ${new Date(flight.itineraries[0].segments[0].departure.at).toLocaleString('default', { month: 'short' })}, 
                                                   ${new Date(flight.itineraries[0].segments[0].departure.at).getFullYear()}
                                                `
                                                    }
                                                </span>
                                                <span className="departure-time">
                                                    {
                                                        new Date(flight.itineraries[0].segments[0].departure.at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                                                    }
                                                </span>
                                            </div>
                                            <div className="middle-iti">
                                                <div className="visual-flight-meta-data">
                                                    <div className="left-dot"></div>
                                                    <div className="line">
                                                        <MdFlight className="icon" />
                                                    </div>
                                                    <div className="right-dot"></div>
                                                </div>
                                                <div className="total-flight-duration">
                                                    {
                                                        flight.itineraries[0].duration.split('T')[1].split('H')[0] + ` ${flight.itineraries[0].duration.split('T')[1].split('H')[0] > 9 ? 'Hours' : 'Hour'}` + ' ' + flight.itineraries[0].duration.split('T')[1].split('H')[1].split('M')[0] + `${flight.itineraries[0].duration.split('T')[1].split('H')[1].split('M')[0] > 9 ? ' Minutes' : ' Minute'}`
                                                    }
                                                </div>
                                            </div>
                                            <div className="right-iti">
                                                <span className="departure-airport">{flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.iataCode}</span>
                                                <span className="departure-date">
                                                    {
                                                        `
                                                   ${new Date(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at).getDate()}
                                                   ${new Date(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at).toLocaleString('default', { month: 'short' })}, 
                                                   ${new Date(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at).getFullYear()}
                                                `
                                                    }
                                                </span>
                                                <span className="departure-time">
                                                    {
                                                        new Date(flight.itineraries[0].segments[0].departure.at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                        <div className="operation-buttons">
                                            <div className="flight-detail-button operation-button">
                                                <span>Flight Details</span>
                                                <RiArrowDropDownLine className="icon" />
                                            </div>
                                            <div className="price-detail-button operation-button">
                                                <span>Price Details</span>
                                                <RiArrowDropDownLine className="icon" />
                                            </div>
                                            <div className="select-button">
                                                SELECT
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }

                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;
