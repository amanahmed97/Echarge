from app import db
from geoalchemy2.types import Geometry
from flask_login import LoginManager, UserMixin


class User(UserMixin, db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(30))
    user_email = db.Column(db.String(50), unique=True)
    user_password = db.Column(db.String(150))
    user_phone = db.Column(db.String(12), unique=True)
    vehicle = db.relationship('Vehicle', backref='user', lazy=True, uselist=False)

    def get_id(self):
        return self.user_id


class Vehicle(db.Model):
    vehicle_id = db.Column(db.Integer, primary_key=True)
    vehicle_loc = db.Column(Geometry('POINT'))
    battery_status = db.Column(db.Float)
    ac_status = db.Column(db.Integer)
    car_status = db.Column(db.Integer)
    bookings = db.relationship('Booking', backref='vehicle', lazy=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)


class Station(db.Model):
    station_id = db.Column(db.Integer, primary_key=True)
    station_name = db.Column(db.String)
    station_add = db.Column(db.String)
    station_loc = db.Column(Geometry('POINT'))
    charge_type = db.Column(db.Integer)
    charge_time = db.Column(db.Float)
    bookings = db.relationship('Booking', backref='station', lazy=True)


class Booking(db.Model):
    booking_id = db.Column(db.Integer, primary_key=True)
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.vehicle_id'), nullable=False)
    station_id = db.Column(db.Integer, db.ForeignKey('station.station_id'), nullable=False)
    distance = db.Column(db.Float)
    reach_time = db.Column(db.Float)
    wait_time = db.Column(db.Float)
    charge_time = db.Column(db.Float)
    total_time = db.Column(db.Float)
    eta = db.Column(db.DateTime)
    etd = db.Column(db.DateTime)
    active = db.Column(db.Boolean)


