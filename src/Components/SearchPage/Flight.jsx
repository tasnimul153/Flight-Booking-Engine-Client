import React from "react";
import { useFlightSearch } from "../SearchPage/useFlightSearch";
import { MdFlight } from "react-icons/md";
import { FaSuitcaseRolling } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useEffect, useState } from "react";


const Flight = ({ flight, dictionaries, passengerAndClass }) => {

    const [isExpended, setIsExpended] = useState(false);

    const parseDuration = (duration) => {
        const match = duration.match(/PT(\d+H)?(\d+M)?/); // matches PT#H#M
        const hours = match[1] ? parseInt(match[1]) : 0; // gets hours if present, otherwise 0
        const minutes = match[2] ? parseInt(match[2]) : 0; // gets minutes if present, otherwise 0
        return hours * 60 + minutes; // returns duration in minutes
    };

    const handleFlightDetailSelect = () => {
        setIsExpended(!isExpended);
        console.log(isExpended);
    }

    return (
        <div className="flight">
            <div className="carrier-info">
                <div className="carriers">
                    {
                        flight.itineraries[0].segments.map((segment, index) => {
                            // put flight carrierCode and id in hash map
                            const carrierCode = segment.carrierCode;
                            const carrierName = dictionaries.carriers[carrierCode];

                            return (
                                <div className="each-carrier">
                                    <div className="carrier-company">
                                        <div className="carrier-logo">
                                            <img src={`https://images.kiwi.com/airlines/64/${carrierCode}.png`} alt="AF" />
                                        </div>
                                        <div className="carrier-name">{carrierName}</div>
                                    </div>
                                    <p className="carrier-model">{dictionaries.aircraft[segment.aircraft.code]}</p>
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

            {
                !isExpended ?
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
                                {/*
                            flight.itineraries[0].duration.split('T')[1].split('H')[0] + ` ${flight.itineraries[0].duration.split('T')[1].split('H')[0] > 9 ? 'Hours' : 'Hour'}` + ' ' + flight.itineraries[0].duration.split('T')[1].split('H')[1].split('M')[0] + `${flight.itineraries[0].duration.split('T')[1].split('H')[1].split('M')[0] > 9 ? ' Minutes' : ' Minute'}`
                      */}
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
                                    new Date(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                                }
                            </span>
                        </div>
                    </div> :

                    <div className="full-data">
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
                                    {/*
                            flight.itineraries[0].duration.split('T')[1].split('H')[0] + ` ${flight.itineraries[0].duration.split('T')[1].split('H')[0] > 9 ? 'Hours' : 'Hour'}` + ' ' + flight.itineraries[0].duration.split('T')[1].split('H')[1].split('M')[0] + `${flight.itineraries[0].duration.split('T')[1].split('H')[1].split('M')[0] > 9 ? ' Minutes' : ' Minute'}`
                      */}
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
                                        new Date(flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                                    }
                                </span>
                            </div>
                        </div>
                        <div className="divider"></div>
                        {
                            flight.itineraries[0].segments.map((segment, index) => {
                                return (
                                    <div className="details">
                                        <div className="detail-info">
                                            {index == 0 && <span className="titleDetail dateDetail">Date</span>}
                                            <span className="valueDetail dateValue">
                                                {
                                                    ` 
                                                        ${new Date(segment.departure.at).getDate()}
                                                        ${new Date(segment.departure.at).toLocaleString('default', { month: 'short' })},
                                                        ${new Date(segment.departure.at).getFullYear()}
                                                        `
                                                }
                                            </span>
                                        </div>
                                        <div className="detail-info">
                                            {index == 0 && <span className="titleDetail timeDetail">Time</span>}
                                            <span className="valueDetail timeValue" style={index != 0 ? {marginLeft: "-108px"} : {}}>
                                                {`${new Date(segment.departure.at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`}
                                            </span>
                                        </div>
                                        <div className="detail-info">
                                            {index == 0 && <span className="titleDetail originTitle">Origin</span>}
                                            <span className="valueDetail originValue" style={index != 0 ? {marginLeft: "-150px"} : {}}> {`${segment.departure.iataCode}`}</span>
                                        </div>
                                        <div className="visual" style={index != 0 ? {marginLeft: "-200px", marginTop: "-25px"} : {}}>
                                            <MdFlight className="icon" />
                                            <div className="lineJourney"></div>
                                        </div>
                                        <div className="detail-info">
                                            {index == 0 && <span className="titleDetail destinationTitle">Destination</span>}
                                            <span className="valueDetail destinationValue"style={index != 0 ? {marginLeft: "-105px"} : {}}>{`${segment.arrival.iataCode}`}</span>
                                        </div>
                                    </div>
                                );
                            })
                        }

                    </div>
            }
            <div className="operation-buttons">
                <div className="flight-detail-button operation-button" onClick={handleFlightDetailSelect}>
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
}

export default Flight;