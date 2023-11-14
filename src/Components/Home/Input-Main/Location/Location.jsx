import React, { useEffect, useState, useRef } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import DropdownLocation from '../../Input-Dropdown/DropdownLocation';
import NearestAirports from './NearestAirports';
import SearchedAirpots from './SearchedAirports';
import { fetchAccessToken } from '../../../../FetchAPIs';

const Location = ({ tag, location, airport, airportCode, onSelect }) => {
    const containerRef = useRef(null); // create a ref
    const [accessToken, setAccessToken] = useState('');
    const [dropdown, setDropdown] = useState(false);
    const [searchText, setSearchText] = useState('');

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
    
    const nearestAirports = NearestAirports(accessToken);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            // Check if the clicked element is neither the container nor the search box
            if (containerRef.current && !containerRef.current.contains(event.target) && !event.target.closest('.searchBox')) {
                setSearchText('');
        
                 // Reset dropdown items to default
                document.querySelectorAll('.dropdownItem').forEach((item) => { 
                    item.style.display = 'flex'; 
                });
                setDropdown(false);
            }
        };
    
        document.addEventListener('click', handleOutsideClick);
    
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);
    

    // Search in the dropdown list
    const handleSearch = (event) => {
        const search = event.target.value.toLowerCase();
        setSearchText(search);

        const dropdownList = document.querySelectorAll('.dropdownItem');
        dropdownList.forEach((item) => {
            const city = item.querySelector('.City').textContent.toLowerCase();
            const country = item.querySelector('.Country').textContent.toLowerCase();
            const airport = item.querySelector('.airport-name').textContent.toLowerCase();
            const airportCode = item.querySelector('.airport-code').textContent.toLowerCase();
            if (city.indexOf(search) === -1 && country.indexOf(search) === -1 && airport.indexOf(search) === -1 && airportCode.indexOf(search) === -1) {
                item.style.display = 'none';
            } else {
                item.style.display = 'flex';
            }
        });
    };

    const handleSelect = (city, country, airport, airportCode) => {
        setSearchText('');
        document.querySelectorAll('.dropdownItem').forEach((item) => { item.style.display = 'flex'; });
        onSelect(city, country, airport, airportCode);
        setDropdown(false);
    };

    return (
        <>
            <div ref={containerRef} className="locationButton mainInput" onClick={() => {
                setDropdown(!dropdown);
            }}>
                <div className="dataBox DataLocation">
                    <span className='constant-tag'>{tag} <MdArrowDropDown className="icon" id='dropdownArrow' /></span>
                    <span className='location-name Middle'>{location}</span>
                    <div className="airportInfo" style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}>
                        <span className='airport-name Last'>{airport}</span>
                        <span className='airport-code Last'>{airportCode}</span>
                    </div>

                </div>
            </div>

            <div className="dropdownListSearch" style={dropdown ? { display: 'block' } : { display: 'none' }}>
                <div className='searchBox'>
                    <AiOutlineSearch className="icon" id='searchIcon' />
                    <input type="text" className='search' value={searchText} onChange={handleSearch} />
                </div>
                {nearestAirports.map((item) => (
                    <DropdownLocation
                        key={item.iataCode + item.relevance}
                        city={item.address.cityName}
                        country={item.address.countryName}
                        airport={item.name}
                        code={item.iataCode}
                        onDropdownItemSelect={handleSelect}
                    />
                ))}
            </div>
        </>
    );
};

export default Location;