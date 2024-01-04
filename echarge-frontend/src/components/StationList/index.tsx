import * as React from 'react';
import './style.scss';
import cancelIcon from '../../assets/cancel-icon.svg';
import distanceIcon from '../../assets/dis-icon.png';
import estimateTimeIcon from '../../assets/esti-time-icon.png';

interface StationListProps {
    changeTab: () => void;
    stationList: [];
    selectStation: (stationData: any) => void;
}

interface StationProps {
    station: any;
    selectStation: (stationData: any) => void;
}


export const StationList = (props: StationListProps) => {
    return (<div>
        <div className='header1'>
            <div className='cross' onClick={props.changeTab}>
                <h2>X</h2>
            </div>
            <p>Charging Stations</p>
            <div></div>
        </div>
        <div className='list'>
        {props.stationList.map((entry) => (
            <Station station={entry} selectStation={props.selectStation}/>
        ))}
        </div>
        
    </div>);
};


export const Station = (props: StationProps) => {

    const stationData = props.station['properties'];
    let locationName='Not Available';
    if(stationData['station_add']!=null)
        locationName = stationData['station_add'].slice(0,20) + '....';
    let distance = (stationData['distance'] / 1000).toFixed(2);
    let minute = (stationData['duration'] / 60).toFixed(0);
    let type = 'type0';
    if(stationData['charge_type'] == 1)
        type = 'type1';
    const bookStation = () => {
        props.selectStation(props.station);
    };
    return (<div className='station-card' id={type}>
        <div className='row1'>
            <div className='row11'>
                <p className='loc'>Location </p>
                <p className='loc-name'>: {locationName}</p>
            </div>
            <img className='card-logo' src='https://i.imgur.com/kiviDKU.png'></img>
        </div>
        <div className='row2'>
           <div className='row21'>
                <img className='icon2' src={distanceIcon}></img>
                <p>{distance} Km</p>
           </div>
           <div className='row22'>
                <img className='icon2' src={estimateTimeIcon}></img>
                <p>{minute} min</p>
           </div>
        </div>
        <button className='book-btn' id={type} onClick={bookStation}>Book</button>
        
    </div>)
};