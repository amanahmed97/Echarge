import * as React from 'react';
import './style.scss';
import echargeLogo from '../../assets/echarge_logo.svg';
import menuLogo from '../../assets/icons8-menu.svg';
import batteryLogo from '../../assets/battery.svg';
import chargeLogo from '../../assets/charge.svg';
import mapboxgl from 'mapbox-gl'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { render } from '@testing-library/react';
import * as helper from './Map_render_helpers';
import axios from 'axios';
import { hitStations } from '../../communicator';
import { StationList } from '../StationList'

mapboxgl.accessToken = 'pk.eyJ1IjoiZmF5YXo3IiwiYSI6ImNrN2o1OWJkNDAyaGIzZ3E4b2w5cnp2MXgifQ.i4ZH_m1EbuU8J-hvtW0pRw';
export const MapUI = () => {
    const [lng, setLng] = React.useState(77.610238);
    const [lat, setLat] = React.useState(12.909542);
    const [zoom, setZoom] = React.useState(15);
    const [stations, setStations] = React.useState([]);
    const [displayList, setDisplayList] = React.useState(0);
    const [stationData, setStationData] = React.useState(null);

    React.useEffect(() => {
        if(stations.length == 0)
            axios.post('/distance-matrix', {'latitude': lat, 'longitude': lng}).then(res => {
                setStations(res.data.stations);
            });
        if(displayList == 1)
            return;
            
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [lng, lat],
            zoom: zoom,
        });
        map.on('load', function() {
            //rendering vehicle location
            map.addImage('pulsing-dot', helper.puslingDotFunc(map), {pixelRatio: 2});
            map.addSource('vehicle-point', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [lng, lat]
                            }
                        }
                    ]
                }
            });
            map.addLayer({
                'id': 'vehicle-point',
                'type': 'symbol',
                'source': 'vehicle-point',
                'layout': {
                    'icon-image': 'pulsing-dot'
                }
            });

            //rendering electric station markers
            map.loadImage('https://i.imgur.com/kiviDKU.png', 
                function(error, image) {
                    if (error) throw error;
                    map.addImage('station-marker', image);
                }
            );
            map.addSource('station-points', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': stations
                }
            });
            map.addLayer({
                'id': 'station-points',
                'type': 'symbol',
                'source': 'station-points',
                'layout': {
                    'icon-image': 'station-marker'
                }
            });
            if(stationData != null) {
                helper.getRoute([lng, lat], stationData['geometry']['coordinates'], map, mapboxgl);
            }
        });
        
        // if (stationData!=null) {
        //     console.log(stationData);
        //     map.on('load', function() {
        //         // make an initial directions request that
        //         // starts and ends at the same location
        //         helper.getRoute([lng, lat], stationData['geometry']['coordinates'], map, mapboxgl);
              

        //       });
        // }

       
    });

    const batteryPercentage = {
        'height': '22px',
        'top': '38px',
        'background-color': 'orange',
    };
    const changeTab = () => {
        if(displayList == 0)
            setDisplayList(1);
        else
            setDisplayList(0);
    };
    const displayRoute = (data) => {
        console.log(data);
        setDisplayList(0);
        setStationData(data);
    };
    return(
    <div>
        { displayList == 0 && <div>
        <div className="header">
            <img className='menu-logo' src={menuLogo}></img>
            <img className='logo' src={echargeLogo}></img>
            <div>
                <img className='battery-logo' src={batteryLogo}></img>
                <div className='fill-color' style={batteryPercentage}></div>
            </div>
            
        </div>
            <div id="map"></div>
            <div class="map-overlay top">
                <img className='charge-logo' src={chargeLogo} onClick={changeTab}></img>
        </div>
        </div> }

        {
            displayList == 1 && <StationList changeTab={changeTab} stationList={stations} selectStation={displayRoute}/>
        }

        
    </div>);
};
