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
import axios from 'axios';
import axiosRetry from 'axios-retry';
import Flight from "./Flight";

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

    const [flightData, setFlightData] = useState({
        "data": [],
        "dictionaries": {
            "locations": {},
            "aircraft": {},
            "currencies": {},
            "carriers": {}
        }
    });


    axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

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

    /*
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
    */

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
            setLoading(true); // Set loading to true before starting the fetch
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
            } finally {
                setLoading(false); // Set loading to false after fetch is complete
            }
        };
    
        fetchFlightOffers();
    }, [accessToken]); 

    /*useEffect(() => {
        setFlightData(
            {
                "meta": {
                    "count": 41,
                    "links": {
                        "self": "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=AUS&destinationLocationCode=IAH&departureDate=2023-11-29&adults=1&nonStop=false&max=50"
                    }
                },
                "data": [
                    {
                        "type": "flight-offer",
                        "id": "1",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 9,
                        "itineraries": [
                            {
                                "duration": "PT59M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T07:15:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "C",
                                            "at": "2023-11-29T08:14:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "1004",
                                        "aircraft": {
                                            "code": "738"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT59M",
                                        "id": "76",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "247.33",
                            "base": "217.00",
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
                            "grandTotal": "247.33"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "UA"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "247.33",
                                    "base": "217.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "76",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "HAA0AKEN",
                                        "brandedFare": "ECONOMY",
                                        "class": "H",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "2",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 9,
                        "itineraries": [
                            {
                                "duration": "PT59M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T16:00:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "C",
                                            "at": "2023-11-29T16:59:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "685",
                                        "aircraft": {
                                            "code": "320"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT59M",
                                        "id": "77",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "247.33",
                            "base": "217.00",
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
                            "grandTotal": "247.33"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "UA"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "247.33",
                                    "base": "217.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "77",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "HAA0AKEN",
                                        "brandedFare": "ECONOMY",
                                        "class": "H",
                                        "includedCheckedBags": {
                                            "quantity": 0
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
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 9,
                        "itineraries": [
                            {
                                "duration": "PT1H4M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T09:25:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "C",
                                            "at": "2023-11-29T10:29:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "2196",
                                        "aircraft": {
                                            "code": "73G"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT1H4M",
                                        "id": "7",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "247.33",
                            "base": "217.00",
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
                            "grandTotal": "247.33"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "UA"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "247.33",
                                    "base": "217.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "7",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "HAA0AKEN",
                                        "brandedFare": "ECONOMY",
                                        "class": "H",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "4",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 9,
                        "itineraries": [
                            {
                                "duration": "PT1H6M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T17:45:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "C",
                                            "at": "2023-11-29T18:51:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "1326",
                                        "aircraft": {
                                            "code": "738"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT1H6M",
                                        "id": "12",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "247.33",
                            "base": "217.00",
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
                            "grandTotal": "247.33"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "UA"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "247.33",
                                    "base": "217.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "12",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "HAA0AKEN",
                                        "brandedFare": "ECONOMY",
                                        "class": "H",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "5",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 9,
                        "itineraries": [
                            {
                                "duration": "PT1H11M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T14:25:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "B",
                                            "at": "2023-11-29T15:36:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "6013",
                                        "aircraft": {
                                            "code": "E7W"
                                        },
                                        "duration": "PT1H11M",
                                        "id": "15",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "247.33",
                            "base": "217.00",
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
                            "grandTotal": "247.33"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "UA"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "247.33",
                                    "base": "217.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "15",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "HAA0AKEN",
                                        "brandedFare": "ECONOMY",
                                        "class": "H",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "6",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 9,
                        "itineraries": [
                            {
                                "duration": "PT9H5M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T15:00:00"
                                        },
                                        "arrival": {
                                            "iataCode": "DEN",
                                            "at": "2023-11-29T16:22:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "231",
                                        "aircraft": {
                                            "code": "738"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT2H22M",
                                        "id": "10",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "DEN",
                                            "at": "2023-11-29T20:45:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "C",
                                            "at": "2023-11-30T00:05:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "2179",
                                        "aircraft": {
                                            "code": "739"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT2H20M",
                                        "id": "11",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "355.98",
                            "base": "305.00",
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
                            "grandTotal": "355.98"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "UA"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "355.98",
                                    "base": "305.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "10",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "WAA4OKEN",
                                        "brandedFare": "ECONOMY",
                                        "class": "W",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "11",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "KAA4AWDN",
                                        "brandedFare": "ECONOMY",
                                        "class": "K",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "7",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 9,
                        "itineraries": [
                            {
                                "duration": "PT9H43M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T11:07:00"
                                        },
                                        "arrival": {
                                            "iataCode": "DEN",
                                            "at": "2023-11-29T12:30:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "1252",
                                        "aircraft": {
                                            "code": "320"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT2H23M",
                                        "id": "58",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "DEN",
                                            "at": "2023-11-29T17:30:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "C",
                                            "at": "2023-11-29T20:50:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "465",
                                        "aircraft": {
                                            "code": "753"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT2H20M",
                                        "id": "59",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "355.98",
                            "base": "305.00",
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
                            "grandTotal": "355.98"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "UA"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "355.98",
                                    "base": "305.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "58",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "WAA4OKEN",
                                        "brandedFare": "ECONOMY",
                                        "class": "W",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "59",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "KAA4AWDN",
                                        "brandedFare": "ECONOMY",
                                        "class": "K",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "8",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 9,
                        "itineraries": [
                            {
                                "duration": "PT10H55M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T08:53:00"
                                        },
                                        "arrival": {
                                            "iataCode": "DEN",
                                            "at": "2023-11-29T10:13:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "595",
                                        "aircraft": {
                                            "code": "738"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT2H20M",
                                        "id": "66",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "DEN",
                                            "at": "2023-11-29T16:25:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "C",
                                            "at": "2023-11-29T19:48:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "710",
                                        "aircraft": {
                                            "code": "739"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT2H23M",
                                        "id": "67",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "355.98",
                            "base": "305.00",
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
                            "grandTotal": "355.98"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "UA"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "355.98",
                                    "base": "305.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "66",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "WAA4OKEN",
                                        "brandedFare": "ECONOMY",
                                        "class": "W",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "67",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "KAA4AWDN",
                                        "brandedFare": "ECONOMY",
                                        "class": "K",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "9",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 9,
                        "itineraries": [
                            {
                                "duration": "PT11H57M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T08:53:00"
                                        },
                                        "arrival": {
                                            "iataCode": "DEN",
                                            "at": "2023-11-29T10:13:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "595",
                                        "aircraft": {
                                            "code": "738"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT2H20M",
                                        "id": "72",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "DEN",
                                            "at": "2023-11-29T17:30:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "C",
                                            "at": "2023-11-29T20:50:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "465",
                                        "aircraft": {
                                            "code": "753"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT2H20M",
                                        "id": "73",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "355.98",
                            "base": "305.00",
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
                            "grandTotal": "355.98"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "UA"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "355.98",
                                    "base": "305.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "72",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "WAA4OKEN",
                                        "brandedFare": "ECONOMY",
                                        "class": "W",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "73",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "KAA4AWDN",
                                        "brandedFare": "ECONOMY",
                                        "class": "K",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "10",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 9,
                        "itineraries": [
                            {
                                "duration": "PT12H58M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T11:07:00"
                                        },
                                        "arrival": {
                                            "iataCode": "DEN",
                                            "at": "2023-11-29T12:30:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "1252",
                                        "aircraft": {
                                            "code": "320"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT2H23M",
                                        "id": "74",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "DEN",
                                            "at": "2023-11-29T20:45:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "C",
                                            "at": "2023-11-30T00:05:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "2179",
                                        "aircraft": {
                                            "code": "739"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT2H20M",
                                        "id": "75",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "355.98",
                            "base": "305.00",
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
                            "grandTotal": "355.98"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "UA"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "355.98",
                                    "base": "305.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "74",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "WAA4OKEN",
                                        "brandedFare": "ECONOMY",
                                        "class": "W",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "75",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "KAA4AWDN",
                                        "brandedFare": "ECONOMY",
                                        "class": "K",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "11",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 9,
                        "itineraries": [
                            {
                                "duration": "PT15H12M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T08:53:00"
                                        },
                                        "arrival": {
                                            "iataCode": "DEN",
                                            "at": "2023-11-29T10:13:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "595",
                                        "aircraft": {
                                            "code": "738"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT2H20M",
                                        "id": "20",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "DEN",
                                            "at": "2023-11-29T20:45:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "C",
                                            "at": "2023-11-30T00:05:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "2179",
                                        "aircraft": {
                                            "code": "739"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT2H20M",
                                        "id": "21",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "355.98",
                            "base": "305.00",
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
                            "grandTotal": "355.98"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "UA"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "355.98",
                                    "base": "305.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "20",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "WAA4OKEN",
                                        "brandedFare": "ECONOMY",
                                        "class": "W",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "21",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "KAA4AWDN",
                                        "brandedFare": "ECONOMY",
                                        "class": "K",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "12",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 9,
                        "itineraries": [
                            {
                                "duration": "PT9H42M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T08:53:00"
                                        },
                                        "arrival": {
                                            "iataCode": "DEN",
                                            "at": "2023-11-29T10:13:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "595",
                                        "aircraft": {
                                            "code": "738"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT2H20M",
                                        "id": "54",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "DEN",
                                            "at": "2023-11-29T15:15:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "C",
                                            "at": "2023-11-29T18:35:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "489",
                                        "aircraft": {
                                            "code": "739"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT2H20M",
                                        "id": "55",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "355.98",
                            "base": "305.00",
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
                            "grandTotal": "355.98"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "UA"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "355.98",
                                    "base": "305.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "54",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "WAA4OKEN",
                                        "brandedFare": "ECONOMY",
                                        "class": "W",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "55",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "LAA7AWEN",
                                        "brandedFare": "ECONOMY",
                                        "class": "L",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "13",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 9,
                        "itineraries": [
                            {
                                "duration": "PT13H35M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T07:00:00"
                                        },
                                        "arrival": {
                                            "iataCode": "ORD",
                                            "terminal": "1",
                                            "at": "2023-11-29T09:47:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "786",
                                        "aircraft": {
                                            "code": "738"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT2H47M",
                                        "id": "50",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "ORD",
                                            "terminal": "1",
                                            "at": "2023-11-29T17:50:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "C",
                                            "at": "2023-11-29T20:35:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "1813",
                                        "aircraft": {
                                            "code": "739"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT2H45M",
                                        "id": "51",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "366.73",
                            "base": "315.00",
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
                            "grandTotal": "366.73"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "UA"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "366.73",
                                    "base": "315.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "50",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "WAA7AFEN",
                                        "brandedFare": "ECONOMY",
                                        "class": "W",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "51",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "KAA4AWDN",
                                        "brandedFare": "ECONOMY",
                                        "class": "K",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "14",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 9,
                        "itineraries": [
                            {
                                "duration": "PT15H51M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T07:00:00"
                                        },
                                        "arrival": {
                                            "iataCode": "ORD",
                                            "terminal": "1",
                                            "at": "2023-11-29T09:47:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "786",
                                        "aircraft": {
                                            "code": "738"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT2H47M",
                                        "id": "64",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "ORD",
                                            "terminal": "1",
                                            "at": "2023-11-29T19:55:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "C",
                                            "at": "2023-11-29T22:51:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "2665",
                                        "aircraft": {
                                            "code": "7M8"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT2H56M",
                                        "id": "65",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "366.73",
                            "base": "315.00",
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
                            "grandTotal": "366.73"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "UA"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "366.73",
                                    "base": "315.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "64",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "WAA7AFEN",
                                        "brandedFare": "ECONOMY",
                                        "class": "W",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "65",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "KAA4AWDN",
                                        "brandedFare": "ECONOMY",
                                        "class": "K",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "15",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 9,
                        "itineraries": [
                            {
                                "duration": "PT12H25M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T06:04:00"
                                        },
                                        "arrival": {
                                            "iataCode": "LAX",
                                            "terminal": "7",
                                            "at": "2023-11-29T07:26:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "502",
                                        "aircraft": {
                                            "code": "320"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT3H22M",
                                        "id": "36",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "LAX",
                                            "terminal": "7",
                                            "at": "2023-11-29T13:10:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "C",
                                            "at": "2023-11-29T18:29:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "432",
                                        "aircraft": {
                                            "code": "752"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT3H19M",
                                        "id": "37",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "375.33",
                            "base": "323.00",
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
                            "grandTotal": "375.33"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "UA"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "375.33",
                                    "base": "323.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "36",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "SAP7AFDN",
                                        "brandedFare": "ECONOMY",
                                        "class": "S",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "37",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "KAP4AWDN",
                                        "brandedFare": "ECONOMY",
                                        "class": "K",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "16",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 9,
                        "itineraries": [
                            {
                                "duration": "PT12H41M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T06:04:00"
                                        },
                                        "arrival": {
                                            "iataCode": "LAX",
                                            "terminal": "7",
                                            "at": "2023-11-29T07:26:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "502",
                                        "aircraft": {
                                            "code": "320"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT3H22M",
                                        "id": "52",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "LAX",
                                            "terminal": "7",
                                            "at": "2023-11-29T13:30:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "C",
                                            "at": "2023-11-29T18:45:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "2377",
                                        "aircraft": {
                                            "code": "739"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT3H15M",
                                        "id": "53",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "375.33",
                            "base": "323.00",
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
                            "grandTotal": "375.33"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "UA"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "375.33",
                                    "base": "323.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "52",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "SAP7AFDN",
                                        "brandedFare": "ECONOMY",
                                        "class": "S",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "53",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "KAP4AWDN",
                                        "brandedFare": "ECONOMY",
                                        "class": "K",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "17",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 9,
                        "itineraries": [
                            {
                                "duration": "PT17H55M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T06:04:00"
                                        },
                                        "arrival": {
                                            "iataCode": "LAX",
                                            "terminal": "7",
                                            "at": "2023-11-29T07:26:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "502",
                                        "aircraft": {
                                            "code": "320"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT3H22M",
                                        "id": "68",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "LAX",
                                            "terminal": "7",
                                            "at": "2023-11-29T18:45:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "C",
                                            "at": "2023-11-29T23:59:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "1680",
                                        "aircraft": {
                                            "code": "739"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT3H14M",
                                        "id": "69",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "375.33",
                            "base": "323.00",
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
                            "grandTotal": "375.33"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "UA"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "375.33",
                                    "base": "323.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "68",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "SAP7AFDN",
                                        "brandedFare": "ECONOMY",
                                        "class": "S",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "69",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "KAP4AWDN",
                                        "brandedFare": "ECONOMY",
                                        "class": "K",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "18",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 9,
                        "itineraries": [
                            {
                                "duration": "PT9H",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T05:35:00"
                                        },
                                        "arrival": {
                                            "iataCode": "DTW",
                                            "terminal": "EM",
                                            "at": "2023-11-29T09:30:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1040",
                                        "aircraft": {
                                            "code": "319"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H55M",
                                        "id": "1",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "DTW",
                                            "terminal": "EM",
                                            "at": "2023-11-29T12:45:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "A",
                                            "at": "2023-11-29T14:35:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1307",
                                        "aircraft": {
                                            "code": "319"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H50M",
                                        "id": "2",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "379.72",
                            "base": "332.00",
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
                            "grandTotal": "379.72"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "DL"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "379.72",
                                    "base": "332.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "1",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "UAUQA0BQ",
                                        "brandedFare": "BASICECON",
                                        "class": "E",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "2",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "XRUNA0BG",
                                        "brandedFare": "BASICECON",
                                        "class": "E",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "19",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 3,
                        "itineraries": [
                            {
                                "duration": "PT12H11M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T05:35:00"
                                        },
                                        "arrival": {
                                            "iataCode": "DTW",
                                            "terminal": "EM",
                                            "at": "2023-11-29T09:30:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1040",
                                        "aircraft": {
                                            "code": "319"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H55M",
                                        "id": "16",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "DTW",
                                            "terminal": "EM",
                                            "at": "2023-11-29T15:50:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "A",
                                            "at": "2023-11-29T17:46:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1718",
                                        "aircraft": {
                                            "code": "319"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H56M",
                                        "id": "17",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "385.00",
                            "base": "332.00",
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
                            "grandTotal": "385.00"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "DL"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "385.00",
                                    "base": "332.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "16",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "UAUQA0BQ",
                                        "brandedFare": "BASICECON",
                                        "class": "E",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "17",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "XRUNA0BG",
                                        "brandedFare": "BASICECON",
                                        "class": "E",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "20",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 3,
                        "itineraries": [
                            {
                                "duration": "PT16H24M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T18:20:00"
                                        },
                                        "arrival": {
                                            "iataCode": "DTW",
                                            "terminal": "EM",
                                            "at": "2023-11-29T22:19:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1630",
                                        "aircraft": {
                                            "code": "320"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H59M",
                                        "id": "34",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "DTW",
                                            "terminal": "EM",
                                            "at": "2023-11-30T08:55:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "A",
                                            "at": "2023-11-30T10:44:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1690",
                                        "aircraft": {
                                            "code": "319"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H49M",
                                        "id": "35",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "385.00",
                            "base": "332.00",
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
                            "grandTotal": "385.00"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "DL"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "385.00",
                                    "base": "332.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "34",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "UAUQA0BQ",
                                        "brandedFare": "BASICECON",
                                        "class": "E",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "35",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "XRUNA0BG",
                                        "brandedFare": "BASICECON",
                                        "class": "E",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "21",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 3,
                        "itineraries": [
                            {
                                "duration": "PT16H26M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T05:35:00"
                                        },
                                        "arrival": {
                                            "iataCode": "DTW",
                                            "terminal": "EM",
                                            "at": "2023-11-29T09:30:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1040",
                                        "aircraft": {
                                            "code": "319"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H55M",
                                        "id": "38",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "DTW",
                                            "terminal": "EM",
                                            "at": "2023-11-29T20:15:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "A",
                                            "at": "2023-11-29T22:01:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1633",
                                        "aircraft": {
                                            "code": "319"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H46M",
                                        "id": "39",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "385.00",
                            "base": "332.00",
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
                            "grandTotal": "385.00"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "DL"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "385.00",
                                    "base": "332.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "38",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "UAUQA0BQ",
                                        "brandedFare": "BASICECON",
                                        "class": "E",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "39",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "XRUNA0BG",
                                        "brandedFare": "BASICECON",
                                        "class": "E",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "22",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 9,
                        "itineraries": [
                            {
                                "duration": "PT18H56M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T11:07:00"
                                        },
                                        "arrival": {
                                            "iataCode": "LAS",
                                            "terminal": "3",
                                            "at": "2023-11-29T14:53:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "1252",
                                        "aircraft": {
                                            "code": "320"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT5H46M",
                                        "stops": [
                                            {
                                                "iataCode": "DEN",
                                                "duration": "PT1H20M",
                                                "arrivalAt": "2023-11-29T12:30:00",
                                                "departureAt": "2023-11-29T13:50:00"
                                            }
                                        ],
                                        "id": "70",
                                        "numberOfStops": 1,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "LAS",
                                            "terminal": "3",
                                            "at": "2023-11-30T01:00:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "C",
                                            "at": "2023-11-30T06:03:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "1151",
                                        "aircraft": {
                                            "code": "738"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT3H3M",
                                        "id": "71",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "385.23",
                            "base": "328.00",
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
                            "grandTotal": "385.23"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "UA"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "385.23",
                                    "base": "328.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "70",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "TAK7AWDN",
                                        "brandedFare": "ECONOMY",
                                        "class": "T",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "71",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "LAA4AWDN",
                                        "brandedFare": "ECONOMY",
                                        "class": "L",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "23",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 3,
                        "itineraries": [
                            {
                                "duration": "PT9H6M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T05:50:00"
                                        },
                                        "arrival": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T09:03:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1344",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H13M",
                                        "id": "13",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T13:40:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "A",
                                            "at": "2023-11-29T14:56:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1572",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H16M",
                                        "id": "14",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "408.65",
                            "base": "354.00",
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
                            "grandTotal": "408.65"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "DL"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "408.65",
                                    "base": "354.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "13",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "UAUNA0MC",
                                        "brandedFare": "MAINCABIN",
                                        "class": "U",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "14",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "LAUNA0MQ",
                                        "brandedFare": "MAINCABIN",
                                        "class": "L",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "24",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 3,
                        "itineraries": [
                            {
                                "duration": "PT9H14M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T07:10:00"
                                        },
                                        "arrival": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T10:24:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1258",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H14M",
                                        "id": "26",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T15:10:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "A",
                                            "at": "2023-11-29T16:24:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1605",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H14M",
                                        "id": "27",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "408.65",
                            "base": "354.00",
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
                            "grandTotal": "408.65"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "DL"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "408.65",
                                    "base": "354.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "26",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "UAUNA0MC",
                                        "brandedFare": "MAINCABIN",
                                        "class": "U",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "27",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "LAUNA0MQ",
                                        "brandedFare": "MAINCABIN",
                                        "class": "L",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "25",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 3,
                        "itineraries": [
                            {
                                "duration": "PT9H47M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T09:45:00"
                                        },
                                        "arrival": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T13:01:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "2957",
                                        "aircraft": {
                                            "code": "320"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H16M",
                                        "id": "62",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T18:15:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "A",
                                            "at": "2023-11-29T19:32:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1223",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H17M",
                                        "id": "63",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "408.65",
                            "base": "354.00",
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
                            "grandTotal": "408.65"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "DL"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "408.65",
                                    "base": "354.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "62",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "UAUNA0MC",
                                        "brandedFare": "MAINCABIN",
                                        "class": "U",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "63",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "LAUNA0MQ",
                                        "brandedFare": "MAINCABIN",
                                        "class": "L",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "26",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 3,
                        "itineraries": [
                            {
                                "duration": "PT10H13M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T13:00:00"
                                        },
                                        "arrival": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T16:19:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1071",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H19M",
                                        "id": "22",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T22:00:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "A",
                                            "at": "2023-11-29T23:13:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1601",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H13M",
                                        "id": "23",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "408.65",
                            "base": "354.00",
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
                            "grandTotal": "408.65"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "DL"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "408.65",
                                    "base": "354.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "22",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "UAUNA0MC",
                                        "brandedFare": "MAINCABIN",
                                        "class": "U",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "23",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "LAUNA0MQ",
                                        "brandedFare": "MAINCABIN",
                                        "class": "L",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "27",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 3,
                        "itineraries": [
                            {
                                "duration": "PT10H34M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T05:50:00"
                                        },
                                        "arrival": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T09:03:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1344",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H13M",
                                        "id": "46",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T15:10:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "A",
                                            "at": "2023-11-29T16:24:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1605",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H14M",
                                        "id": "47",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "408.65",
                            "base": "354.00",
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
                            "grandTotal": "408.65"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "DL"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "408.65",
                                    "base": "354.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "46",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "UAUNA0MC",
                                        "brandedFare": "MAINCABIN",
                                        "class": "U",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "47",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "LAUNA0MQ",
                                        "brandedFare": "MAINCABIN",
                                        "class": "L",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "28",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 3,
                        "itineraries": [
                            {
                                "duration": "PT11H2M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T08:30:00"
                                        },
                                        "arrival": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T11:40:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1405",
                                        "aircraft": {
                                            "code": "320"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H10M",
                                        "id": "3",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T18:15:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "A",
                                            "at": "2023-11-29T19:32:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1223",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H17M",
                                        "id": "4",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "408.65",
                            "base": "354.00",
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
                            "grandTotal": "408.65"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "DL"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "408.65",
                                    "base": "354.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "3",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "UAUNA0MC",
                                        "brandedFare": "MAINCABIN",
                                        "class": "U",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "4",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "LAUNA0MQ",
                                        "brandedFare": "MAINCABIN",
                                        "class": "L",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "29",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 3,
                        "itineraries": [
                            {
                                "duration": "PT12H13M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T11:00:00"
                                        },
                                        "arrival": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T14:16:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "3031",
                                        "aircraft": {
                                            "code": "320"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H16M",
                                        "id": "24",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T22:00:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "A",
                                            "at": "2023-11-29T23:13:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1601",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H13M",
                                        "id": "25",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "408.65",
                            "base": "354.00",
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
                            "grandTotal": "408.65"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "DL"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "408.65",
                                    "base": "354.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "24",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "UAUNA0MC",
                                        "brandedFare": "MAINCABIN",
                                        "class": "U",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "25",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "LAUNA0MQ",
                                        "brandedFare": "MAINCABIN",
                                        "class": "L",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "30",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 3,
                        "itineraries": [
                            {
                                "duration": "PT12H22M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T07:10:00"
                                        },
                                        "arrival": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T10:24:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1258",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H14M",
                                        "id": "30",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T18:15:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "A",
                                            "at": "2023-11-29T19:32:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1223",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H17M",
                                        "id": "31",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "408.65",
                            "base": "354.00",
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
                            "grandTotal": "408.65"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "DL"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "408.65",
                                    "base": "354.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "30",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "UAUNA0MC",
                                        "brandedFare": "MAINCABIN",
                                        "class": "U",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "31",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "LAUNA0MQ",
                                        "brandedFare": "MAINCABIN",
                                        "class": "L",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "31",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 3,
                        "itineraries": [
                            {
                                "duration": "PT13H28M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T09:45:00"
                                        },
                                        "arrival": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T13:01:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "2957",
                                        "aircraft": {
                                            "code": "320"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H16M",
                                        "id": "42",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T22:00:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "A",
                                            "at": "2023-11-29T23:13:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1601",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H13M",
                                        "id": "43",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "408.65",
                            "base": "354.00",
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
                            "grandTotal": "408.65"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "DL"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "408.65",
                                    "base": "354.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "42",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "UAUNA0MC",
                                        "brandedFare": "MAINCABIN",
                                        "class": "U",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "43",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "LAUNA0MQ",
                                        "brandedFare": "MAINCABIN",
                                        "class": "L",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "32",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 3,
                        "itineraries": [
                            {
                                "duration": "PT13H42M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T05:50:00"
                                        },
                                        "arrival": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T09:03:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1344",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H13M",
                                        "id": "56",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T18:15:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "A",
                                            "at": "2023-11-29T19:32:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1223",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H17M",
                                        "id": "57",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "408.65",
                            "base": "354.00",
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
                            "grandTotal": "408.65"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "DL"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "408.65",
                                    "base": "354.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "56",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "UAUNA0MC",
                                        "brandedFare": "MAINCABIN",
                                        "class": "U",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "57",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "LAUNA0MQ",
                                        "brandedFare": "MAINCABIN",
                                        "class": "L",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "33",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 3,
                        "itineraries": [
                            {
                                "duration": "PT14H43M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T08:30:00"
                                        },
                                        "arrival": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T11:40:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1405",
                                        "aircraft": {
                                            "code": "320"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H10M",
                                        "id": "60",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T22:00:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "A",
                                            "at": "2023-11-29T23:13:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1601",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H13M",
                                        "id": "61",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "408.65",
                            "base": "354.00",
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
                            "grandTotal": "408.65"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "DL"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "408.65",
                                    "base": "354.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "60",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "UAUNA0MC",
                                        "brandedFare": "MAINCABIN",
                                        "class": "U",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "61",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "LAUNA0MQ",
                                        "brandedFare": "MAINCABIN",
                                        "class": "L",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "34",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 3,
                        "itineraries": [
                            {
                                "duration": "PT16H3M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T07:10:00"
                                        },
                                        "arrival": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T10:24:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1258",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H14M",
                                        "id": "5",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T22:00:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "A",
                                            "at": "2023-11-29T23:13:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1601",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H13M",
                                        "id": "6",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "408.65",
                            "base": "354.00",
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
                            "grandTotal": "408.65"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "DL"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "408.65",
                                    "base": "354.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "5",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "UAUNA0MC",
                                        "brandedFare": "MAINCABIN",
                                        "class": "U",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "6",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "LAUNA0MQ",
                                        "brandedFare": "MAINCABIN",
                                        "class": "L",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "35",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 3,
                        "itineraries": [
                            {
                                "duration": "PT17H23M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T05:50:00"
                                        },
                                        "arrival": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T09:03:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1344",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H13M",
                                        "id": "32",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "ATL",
                                            "terminal": "S",
                                            "at": "2023-11-29T22:00:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "A",
                                            "at": "2023-11-29T23:13:00"
                                        },
                                        "carrierCode": "DL",
                                        "number": "1601",
                                        "aircraft": {
                                            "code": "321"
                                        },
                                        "operating": {
                                            "carrierCode": "DL"
                                        },
                                        "duration": "PT2H13M",
                                        "id": "33",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "408.65",
                            "base": "354.00",
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
                            "grandTotal": "408.65"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "DL"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "408.65",
                                    "base": "354.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "32",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "UAUNA0MC",
                                        "brandedFare": "MAINCABIN",
                                        "class": "U",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "33",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "LAUNA0MQ",
                                        "brandedFare": "MAINCABIN",
                                        "class": "L",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "36",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 9,
                        "itineraries": [
                            {
                                "duration": "PT11H14M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T06:04:00"
                                        },
                                        "arrival": {
                                            "iataCode": "LAX",
                                            "terminal": "7",
                                            "at": "2023-11-29T07:26:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "502",
                                        "aircraft": {
                                            "code": "320"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT3H22M",
                                        "id": "28",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "LAX",
                                            "terminal": "7",
                                            "at": "2023-11-29T12:03:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "C",
                                            "at": "2023-11-29T17:18:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "2237",
                                        "aircraft": {
                                            "code": "739"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT3H15M",
                                        "id": "29",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "422.63",
                            "base": "367.00",
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
                            "grandTotal": "422.63"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "UA"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "422.63",
                                    "base": "367.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "28",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "SAP7AFDN",
                                        "brandedFare": "ECONOMY",
                                        "class": "S",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "29",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "LAG4AWDN",
                                        "brandedFare": "ECONOMY",
                                        "class": "L",
                                        "sliceDiceIndicator": "LOCAL_AVAILABILITY",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "37",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 3,
                        "itineraries": [
                            {
                                "duration": "PT10H28M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T06:00:00"
                                        },
                                        "arrival": {
                                            "iataCode": "SEA",
                                            "at": "2023-11-29T08:24:00"
                                        },
                                        "carrierCode": "AS",
                                        "number": "595",
                                        "aircraft": {
                                            "code": "73J"
                                        },
                                        "operating": {
                                            "carrierCode": "AS"
                                        },
                                        "duration": "PT4H24M",
                                        "id": "40",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "SEA",
                                            "at": "2023-11-29T10:00:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "A",
                                            "at": "2023-11-29T16:28:00"
                                        },
                                        "carrierCode": "AS",
                                        "number": "438",
                                        "aircraft": {
                                            "code": "73J"
                                        },
                                        "operating": {
                                            "carrierCode": "AS"
                                        },
                                        "duration": "PT4H28M",
                                        "id": "41",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "586.12",
                            "base": "524.00",
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
                            "grandTotal": "586.12"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "AS"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "586.12",
                                    "base": "524.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "40",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "VH4OASBN",
                                        "brandedFare": "SV",
                                        "class": "X",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "41",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "VH4OASBN",
                                        "brandedFare": "SV",
                                        "class": "X",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "38",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 3,
                        "itineraries": [
                            {
                                "duration": "PT11H4M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T18:55:00"
                                        },
                                        "arrival": {
                                            "iataCode": "SEA",
                                            "at": "2023-11-29T21:39:00"
                                        },
                                        "carrierCode": "AS",
                                        "number": "318",
                                        "aircraft": {
                                            "code": "73J"
                                        },
                                        "operating": {
                                            "carrierCode": "AS"
                                        },
                                        "duration": "PT4H44M",
                                        "id": "8",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "SEA",
                                            "at": "2023-11-29T23:40:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "A",
                                            "at": "2023-11-30T05:59:00"
                                        },
                                        "carrierCode": "AS",
                                        "number": "452",
                                        "aircraft": {
                                            "code": "73J"
                                        },
                                        "operating": {
                                            "carrierCode": "AS"
                                        },
                                        "duration": "PT4H19M",
                                        "id": "9",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "586.12",
                            "base": "524.00",
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
                            "grandTotal": "586.12"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "AS"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "586.12",
                                    "base": "524.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "8",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "VH4OASBN",
                                        "brandedFare": "SV",
                                        "class": "X",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "9",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "VH4OASBN",
                                        "brandedFare": "SV",
                                        "class": "X",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "39",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 3,
                        "itineraries": [
                            {
                                "duration": "PT13H34M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T16:25:00"
                                        },
                                        "arrival": {
                                            "iataCode": "SEA",
                                            "at": "2023-11-29T19:09:00"
                                        },
                                        "carrierCode": "AS",
                                        "number": "503",
                                        "aircraft": {
                                            "code": "73J"
                                        },
                                        "operating": {
                                            "carrierCode": "AS"
                                        },
                                        "duration": "PT4H44M",
                                        "id": "48",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "SEA",
                                            "at": "2023-11-29T23:40:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "A",
                                            "at": "2023-11-30T05:59:00"
                                        },
                                        "carrierCode": "AS",
                                        "number": "452",
                                        "aircraft": {
                                            "code": "73J"
                                        },
                                        "operating": {
                                            "carrierCode": "AS"
                                        },
                                        "duration": "PT4H19M",
                                        "id": "49",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "591.40",
                            "base": "524.00",
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
                            "grandTotal": "591.40"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "AS"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "591.40",
                                    "base": "524.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "48",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "VH4OASBN",
                                        "brandedFare": "SV",
                                        "class": "X",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "49",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "VH4OASBN",
                                        "brandedFare": "SV",
                                        "class": "X",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "40",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 7,
                        "itineraries": [
                            {
                                "duration": "PT15H28M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T17:27:00"
                                        },
                                        "arrival": {
                                            "iataCode": "FLL",
                                            "terminal": "3",
                                            "at": "2023-11-29T21:04:00"
                                        },
                                        "carrierCode": "B6",
                                        "number": "212",
                                        "aircraft": {
                                            "code": "320"
                                        },
                                        "operating": {
                                            "carrierCode": "B6"
                                        },
                                        "duration": "PT2H37M",
                                        "id": "44",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "FLL",
                                            "terminal": "1",
                                            "at": "2023-11-30T07:00:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "C",
                                            "at": "2023-11-30T08:55:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "2261",
                                        "aircraft": {
                                            "code": "739"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT2H55M",
                                        "id": "45",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "1400.88",
                            "base": "1277.00",
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
                            "grandTotal": "1400.88"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "TK"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "1400.88",
                                    "base": "1277.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "44",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "YREFY5",
                                        "class": "Y",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "45",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "QAA7AKEN",
                                        "class": "Q",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "flight-offer",
                        "id": "41",
                        "source": "GDS",
                        "instantTicketingRequired": false,
                        "nonHomogeneous": false,
                        "oneWay": false,
                        "lastTicketingDate": "2023-11-14",
                        "lastTicketingDateTime": "2023-11-14",
                        "numberOfBookableSeats": 7,
                        "itineraries": [
                            {
                                "duration": "PT20H11M",
                                "segments": [
                                    {
                                        "departure": {
                                            "iataCode": "AUS",
                                            "at": "2023-11-29T17:27:00"
                                        },
                                        "arrival": {
                                            "iataCode": "FLL",
                                            "terminal": "3",
                                            "at": "2023-11-29T21:04:00"
                                        },
                                        "carrierCode": "B6",
                                        "number": "212",
                                        "aircraft": {
                                            "code": "320"
                                        },
                                        "operating": {
                                            "carrierCode": "B6"
                                        },
                                        "duration": "PT2H37M",
                                        "id": "18",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    },
                                    {
                                        "departure": {
                                            "iataCode": "FLL",
                                            "terminal": "1",
                                            "at": "2023-11-30T11:39:00"
                                        },
                                        "arrival": {
                                            "iataCode": "IAH",
                                            "terminal": "C",
                                            "at": "2023-11-30T13:38:00"
                                        },
                                        "carrierCode": "UA",
                                        "number": "306",
                                        "aircraft": {
                                            "code": "738"
                                        },
                                        "operating": {
                                            "carrierCode": "UA"
                                        },
                                        "duration": "PT2H59M",
                                        "id": "19",
                                        "numberOfStops": 0,
                                        "blacklistedInEU": false
                                    }
                                ]
                            }
                        ],
                        "price": {
                            "currency": "EUR",
                            "total": "1400.88",
                            "base": "1277.00",
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
                            "grandTotal": "1400.88"
                        },
                        "pricingOptions": {
                            "fareType": [
                                "PUBLISHED"
                            ],
                            "includedCheckedBagsOnly": false
                        },
                        "validatingAirlineCodes": [
                            "TK"
                        ],
                        "travelerPricings": [
                            {
                                "travelerId": "1",
                                "fareOption": "STANDARD",
                                "travelerType": "ADULT",
                                "price": {
                                    "currency": "EUR",
                                    "total": "1400.88",
                                    "base": "1277.00"
                                },
                                "fareDetailsBySegment": [
                                    {
                                        "segmentId": "18",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "YREFY5",
                                        "class": "Y",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    },
                                    {
                                        "segmentId": "19",
                                        "cabin": "ECONOMY",
                                        "fareBasis": "QAA7AKEN",
                                        "class": "Q",
                                        "includedCheckedBags": {
                                            "quantity": 0
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "dictionaries": {
                    "locations": {
                        "ORD": {
                            "cityCode": "CHI",
                            "countryCode": "US"
                        },
                        "IAH": {
                            "cityCode": "HOU",
                            "countryCode": "US"
                        },
                        "LAX": {
                            "cityCode": "LAX",
                            "countryCode": "US"
                        },
                        "DTW": {
                            "cityCode": "DTT",
                            "countryCode": "US"
                        },
                        "FLL": {
                            "cityCode": "FLL",
                            "countryCode": "US"
                        },
                        "ATL": {
                            "cityCode": "ATL",
                            "countryCode": "US"
                        },
                        "DEN": {
                            "cityCode": "DEN",
                            "countryCode": "US"
                        },
                        "SEA": {
                            "cityCode": "SEA",
                            "countryCode": "US"
                        },
                        "LAS": {
                            "cityCode": "LAS",
                            "countryCode": "US"
                        },
                        "AUS": {
                            "cityCode": "AUS",
                            "countryCode": "US"
                        }
                    },
                    "aircraft": {
                        "319": "AIRBUS A319",
                        "320": "AIRBUS A320",
                        "321": "AIRBUS A321",
                        "738": "BOEING 737-800",
                        "739": "BOEING 737-900",
                        "752": "BOEING 757-200",
                        "753": "BOEING 757-300",
                        "7M8": "BOEING 737 MAX 8",
                        "E7W": "EMBRAER 175 (ENHANCED WINGLETS)",
                        "73G": "BOEING 737-700",
                        "73J": "BOEING 737-900"
                    },
                    "currencies": {
                        "EUR": "EURO"
                    },
                    "carriers": {
                        "AS": "ALASKA AIRLINES",
                        "B6": "JETBLUE AIRWAYS",
                        "DL": "DELTA AIR LINES",
                        "UA": "UNITED AIRLINES"
                    }
                }
            }
        );
        setLoading(false);
    }, []);*/

    return (
        <>
            {
                loading ?
                    <div className="loading">
                        <div className="loader">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <span className="loadingTitle">Loading</span>
                    </div> :
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
                                            <Flight 
                                                key={index}
                                                flight={flight}
                                                dictionaries={flightData.dictionaries}
                                                passengerAndClass={passengerAndClass}
                                                //onSelect={(flight) => handleFlightDetailSelect(flight)}
                                            />
                                        );
                                    })
                                }

                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default SearchPage;

