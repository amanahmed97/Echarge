from app import app, db
from app.models import Vehicle, Station, Booking
from shapely import wkb


@app.route('/')
@app.route('/index')
def index():
    vehicle = Booking.query.filter_by(booking_id=1).first()
    # print(user.geom.geometry_type)
    point = wkb.loads(bytes(vehicle.station_loc.data))
    return "{} {}".format(vehicle.vehicle_id, vehicle.station_id)


@app.route('/insertVehicle')
def insertV():
    vehicle = Vehicle(vehicle_loc='POINT(12.898687 77.650395)', battery_status=80, ac_status=1, car_status=0)
    db.session.add(vehicle)
    db.session.commit()
    return "Successfully inserted {}".format(vehicle.ac_status)


@app.route('/insertStation')
def insertS():
    station = Station(station_loc='POINT(12.898687 77.650395)', charge_type=1)
    db.session.add(station)
    db.session.commit()
    return "Successfully inserted {}".format(station.charge_type)


@app.route('/insertBooking')
def insertB():
    station = Booking(vehicle_id=1, station_id=1, distance=2, reach_time=5, wait_time=10, charge_time=2, total_time=17, active=True)
    db.session.add(station)
    db.session.commit()
    return "Successfully inserted {}".format(station.charge_time)

