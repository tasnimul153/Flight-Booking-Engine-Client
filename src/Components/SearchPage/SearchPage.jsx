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

  const [fromData, setFromData] = useState(null);
  const [toData, setToData] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [passengerCount, setPassengerCount] = useState(null);
  const [classType, setClassType] = useState(null);
  const [accessToken, setAccessToken] = useState("");

  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  useEffect(() => {
    setFromData(searchParams.get("fromData"));
    setToData(searchParams.get("toData"));
    setDepartureDate(formatDate(searchParams.get("departureDate")));
    setReturnDate(
      returnDate !== "N/A" ? formatDate(searchParams.get("returnDate")) : null
    );
    setPassengerCount(searchParams.get("passengerCount"));
    setClassType(searchParams.get("classType"));
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
        <div className="search-box-container"></div>
        <div className="searched-flights-container">
          <div className="controller"></div>
          <div className="flights">
            <div className="flight">
                <div className="carrier-info">
                    <div className="each-carrier">
                        <div className="carrier-logo">
                            <img src="https://images.kiwi.com/airlines/64/AF.png" alt="AF"/>
                        </div>
                        <div className="carrier-name">Air France</div>
                    </div>
                    <div className="each-carrier">
                        <div className="carrier-logo">
                            
                            <img src="https://images.kiwi.com/airlines/64/AA.png" alt="AA"/>
                        </div>
                        <div className="carrier-name">American Airline</div>
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
