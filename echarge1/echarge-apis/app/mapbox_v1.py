from shapely import wkb

from app import app, db
from app.models import Vehicle, Station, Booking
from mapbox import DirectionsMatrix
from pprint import pprint
from mapbox import Geocoder


@app.route('/v1/hello',methods=['GET'])
def hello_check():
    return 'Hello Mapbox!'


@app.route('/v1/distance-matrix', methods=['GET','POST'])
def distance_matrix():
    service = DirectionsMatrix()
    geocoder = Geocoder(access_token="pk.eyJ1IjoiZmF5YXo3IiwiYSI6ImNrN2o1OWJkNDAyaGIzZ3E4b2w5cnp2MXgifQ.i4ZH_m1EbuU8J-hvtW0pRw")

    source = {'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': [77.590633, 12.979913]}}
    places = [
        {'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': [77.607382, 12.973337]}},
        {'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': [77.612074, 12.933282]}},
        {'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': [77.6214094, 12.9167139]}},
        {'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': [77.592077, 12.979156]}},
        {'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': [77.616205, 12.973225]}},
        {'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': [77.623060, 12.967046]}},
        {'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': [77.640807, 12.978832]}},
        {'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': [77.641361, 12.955016]}},
        {'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': [77.620562, 13.152445]}},
        {'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': [77.583909, 13.008307]}},
        {'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': [77.710222, 12.956242]}},
        {'type': 'Feature', 'geometry': {'type': 'Point', 'coordinates': [77.585567, 12.991866]}}
    ]

    stations = Station.query.all()
    # pprint(dict(stations))
    stations_list = []
    places1 = []
    for s in stations:
        places1.append({'type': 'Feature',
        'geometry': {'type': 'Point', 'coordinates': [float(wkb.loads(bytes(s.station_loc.data)).y),
                                                      float(wkb.loads(bytes(s.station_loc.data)).x)]}})
        point = wkb.loads(bytes(s.station_loc.data))
        stations_list.append({
        'station_name' : s.station_name,'station_add' : s.station_add,'latitude' : point.x, 'longitude' : point.y,
        'charge_type' : s.charge_type, 'charge_time' : s.charge_time})

    # pprint(places1[1])
    # pprint(stations_list)
    response = service.matrix(places1, profile='mapbox/driving', sources=[0], destinations=all, annotations=['distance','duration'])

    # response.status_code
    # response.headers['Content-Type']
    # pprint(response.json()['destinations'])

    destinations = response.json()['destinations']
    distances = response.json()['distances'][0]
    durations = response.json()['durations'][0]
    # pprint(destinations['destinations'][1]['distance'])
    # destinations['destinations'][1]['distance']

    distance_list = []
    for i,d in enumerate(distances):
        if d < 7000.0:
            distance_list.append(i)
    distance_list = distance_list[1:]
    pprint(distance_list)

    send_list = []
    for i,d in enumerate(destinations):
        if i in distance_list:
            destinations[i]["meters"] = distances[i]
            destinations[i]["seconds"] = durations[i]
            send_list.append(d)

    return_list = []
    for i, s in enumerate(stations_list):
        if i in distance_list:
            stations_list[i]["meters"] = distances[i]
            stations_list[i]["seconds"] = durations[i]
            return_list.append(s)

    # pprint(send_list)
    send_obj = {"destinations": send_list}
    return_obj = {"stations": return_list}
    # return str(response.json()['durations'])
    # return response.json()
    return return_obj
    # return send_obj

# portland = {
#     'type': 'Feature',
#     'properties': {'name': 'Portland, OR'},
#     'geometry': {
#     'type': 'Point',
#     'coordinates': [-122.7282, 45.5801]}}


@app.route('/add-stations', methods=['POST'])
def add_charging_stations():
    station = Station(station_name='HSR-NIFT', station_add='Brigosha Technologies Pvt Ltd, 3rd Floor, 17th Cross, 27th Main Rd, Parangi Palaya, Sector 2, HSR Layout, Bengaluru, Karnataka 560102', station_loc='POINT(12.911692 77.651567)', charge_type=1, charge_time=12.5)
    db.session.add(station)
    db.session.commit()
    station = Station(station_name='BTM-Layout', station_add='676, 29th Main Rd, BTM 2nd Stage, Kuvempu Nagar, Stage 2, BTM 2nd Stage, Bengaluru, Karnataka 560076', station_loc='POINT(12.914908 77.615300)', charge_type=1, charge_time=12.5)
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