from flask import request, jsonify
from shapely import wkb
from app import app, db
from app.models import Vehicle, Station, Booking
from mapbox import DirectionsMatrix
from pprint import pprint


def distance_matrix_service():
    service = DirectionsMatrix()

    source = {'type': 'Feature', 'geometry': {'type': 'Point',
              'coordinates': [float(request.args.get('longitude')), float(request.args.get('latitude'))]}}

    stations = Station.query.all()

    places = [source]
    for s in stations:
        places.append({'type': 'Feature',
                       'geometry': {'type': 'Point', 'coordinates': [float(wkb.loads(bytes(s.station_loc.data)).y),
                                                                     float(wkb.loads(bytes(s.station_loc.data)).x)]}})

    response = service.matrix(places, profile='mapbox/driving', sources=[0],
                              annotations=['distance', 'duration'])

    destinations = response.json()['destinations']
    distances = response.json()['distances'][0][1:]
    durations = response.json()['durations'][0]

    stations_list = []
    stations_list_15 = []
    for i, d in enumerate(distances):
        if d <= 7000.0:
            s = stations[i]
            point = wkb.loads(bytes(s.station_loc.data))
            stations_list.append({'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': [point.y, point.x]},
            'properties': {
                'station_id': s.station_id, 'station_name': s.station_name, 'station_add': s.station_add,
                'charge_type': s.charge_type, 'charge_time': s.charge_time,
                'distance': distances[i], 'duration': durations[i]}
            })

        if 7000.0 < d <= 15000.0:
            s = stations[i]
            point = wkb.loads(bytes(s.station_loc.data))
            stations_list_15.append({'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': [point.y, point.x]},
            'properties': {
                'station_id': s.station_id, 'station_name': s.station_name, 'station_add': s.station_add,
                'charge_type': s.charge_type, 'charge_time': s.charge_time,
                'distance': distances[i], 'duration': durations[i]}
            })


    return_obj = {"stations": stations_list, "status": "SUCCESS"}
    if not stations_list:
        return_obj = {"stations": stations_list_15, "status": "SUCCESS"}
    if not stations_list_15 and not stations_list:
        return_obj = {"stations": [], "status": "FAIL"}

    # return response.json()
    return return_obj


def all_stations_service():

    stations = Station.query.all()
    stations_list = []
    for s in stations:
        point = wkb.loads(bytes(s.station_loc.data))
        stations_list.append({'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': [point.y, point.x]},
          'properties': {
            'station_id': s.station_id, 'station_name': s.station_name, 'station_add': s.station_add,
            'charge_type': s.charge_type, 'charge_time': s.charge_time}
        })

    return_obj = {"stations": stations_list, "status": "SUCCESS"}
    if not stations_list:
        return_obj = {"stations": [], "status": "FAIL"}

    # return response.json()
    return return_obj


def add_stations_service():
    station = Station(station_name='HSR-NIFT',
                      station_add='Brigosha Technologies Pvt Ltd, 3rd Floor, 17th Cross, 27th Main Rd, Parangi Palaya, Sector 2, HSR Layout, Bengaluru, Karnataka 560102',
                      station_loc='POINT(12.911692 77.651567)', charge_type=1, charge_time=12.5)
    db.session.add(station)
    db.session.commit()
    station = Station(station_name='BTM-Layout',
                      station_add='676, 29th Main Rd, BTM 2nd Stage, Kuvempu Nagar, Stage 2, BTM 2nd Stage, Bengaluru, Karnataka 560076',
                      station_loc='POINT(12.914908 77.615300)', charge_type=1, charge_time=12.5)
    db.session.add(station)
    db.session.commit()
    station = Station(station_name='Chamrajpet',
                      station_add='196, 5th Main Rd, Chamrajpet, Bengaluru, Karnataka 560018',
                      station_loc='POINT(12.957156 77.571204)', charge_type=1, charge_time=12.5)
    db.session.add(station)
    db.session.commit()
    station = Station(station_name='Yeswanthpur',
                      station_add='NH75, Muniswara Nagar, Yeswanthpur, Bengaluru, Karnataka 560022',
                      station_loc='POINT(13.034320 77.540917)', charge_type=0, charge_time=20)
    db.session.add(station)
    db.session.commit()
    station = Station(station_name='Hebbal',
                      station_add='Chola Nagar, Anandnagar, Hebbal, Bengaluru, Karnataka 560024',
                      station_loc='POINT(13.036516 77.593193)', charge_type=0, charge_time=20)
    db.session.add(station)
    db.session.commit()
    station = Station(station_name='Indira Nagar',
                      station_add='Swami Vivekananda Rd, Kadiranapalya, Indiranagar, Bengaluru, Karnataka 560008',
                      station_loc='POINT(12.984492 77.642186)', charge_type=0, charge_time=20)
    db.session.add(station)
    db.session.commit()
    station = Station(station_name='Kithaganur Main Rd',
                      station_add='Thambu Chetty Palya, Battarahalli, Bengaluru, Karnataka 560049',
                      station_loc='POINT(13.021163 77.705850)', charge_type=0, charge_time=20)
    db.session.add(station)
    db.session.commit()
    station = Station(station_name='Brookefield',
                      station_add='Varthur Rd, BEML Layout, Brookefield, Bengaluru, Karnataka 560066',
                      station_loc='POINT(12.955893 77.717668)', charge_type=0, charge_time=20)
    db.session.add(station)
    db.session.commit()
    station = Station(station_name='Electronic City',
                      station_add='Huskur Rd, Electronic City Phase II, Electronic City, Bengaluru, Karnataka 560100',
                      station_loc='POINT(12.841576 77.686588)', charge_type=1, charge_time=12.5)
    db.session.add(station)
    db.session.commit()
    station = Station(station_name='BTM Layout',
                      station_add='55, Bannerghatta Main Rd, New Gurappana Palya, 1st Stage, BTM Layout, Bengaluru, Karnataka 560029',
                      station_loc='POINT(12.919542 77.600238)', charge_type=0, charge_time=20)
    db.session.add(station)
    db.session.commit()
    return "Stations Added Successfully"
