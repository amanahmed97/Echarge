from flask import request
from shapely import wkb
from app import app, db
from app.models import Vehicle, Station, Booking
from mapbox import DirectionsMatrix
from pprint import pprint

from app.services.station_service import distance_matrix_service, all_stations_service, add_stations_service


@app.route('/distance-matrix', methods=['GET', 'POST'])
def distance_matrix():
    return distance_matrix_service()


@app.route('/all-stations', methods=['GET'])
def all_stations():
    return all_stations_service()


@app.route('/add-stations', methods=['POST'])
def add_stations():
    return add_stations_service()