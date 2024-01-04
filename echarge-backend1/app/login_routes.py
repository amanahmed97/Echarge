from app import app, db
from flask import request, session, Flask, jsonify
from flask_login import login_user, login_required, logout_user, current_user
from app.models import *
from werkzeug.security import generate_password_hash, check_password_hash
from shapely import wkb

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        if current_user.is_active:
            return jsonify(login_status="User session is currently LoggedIn")

        email = request.json['user_email']
        password = request.json['user_password']
        remember = request.json['user_remember']
        user = User.query.filter_by(user_email=email).first()
        if not user:
            return jsonify(login_status="Incorrect Credentials"), 400
        if check_password_hash(user.user_password, password):
            login_user(user, remember=remember)
            return jsonify(login_status="Logged In")
        else:
            return jsonify(login_status="Incorrect Credentials"), 400

    if current_user.is_active:
        return jsonify(user_name=current_user.user_name, user_email=current_user.user_email, user_phone=current_user.user_phone)
    return jsonify(login_status='Please Login'), 400


@app.route('/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        email = request.json['user_email']
        username = request.json['user_name']
        password = request.json['user_password']
        password = generate_password_hash(password)
        phone = request.json['user_phone']

        # if this returns a user, then the email already exists in database
        user = User.query.filter_by(user_email=email).first()

        if user:
            return jsonify(signup_status="user already exists")

        new_user = User(user_name=username, user_email=email, user_password=password, user_phone=phone)
        db.session.add(new_user)
        db.session.commit()

        return jsonify(signup_status="Created Successfully")


@app.route('/home', methods=['GET'])
@login_required
def home():
    if request.method == 'GET':
        return jsonify(login_status=current_user.user_name)


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify(logout_status="Logged Out")


@app.route('/index')
def index():
    vehicle = Station.query.filter_by(station_id=1).first()
    # print(user.geom.geometry_type)
    point = wkb.loads(bytes(vehicle.station_loc.data))
    return "{}".format(point.y)


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

