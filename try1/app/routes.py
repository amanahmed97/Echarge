from app import app, db
from flask import Flask, request, render_template, jsonify
import requests
from app.key import key
import googlemaps
from bs4 import BeautifulSoup

# TomTom key : KLnaX5wyz18mvpGA84bM5dg66zkaJFm1

search_url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
details_url = "https://maps.googleapis.com/maps/api/place/details/json"

@app.route('/hello-world')
def hello_world():
    return 'Hello World!'


@app.route("/", methods=["GET"])
def retreive():
    return render_template('layout.html')


@app.route("/sendRequest/<string:query>")
def results(query):
    search_payload = {"key":key, "query":query}
    search_req = requests.get(search_url, params=search_payload)
    search_json = search_req.json()

    place_id = search_json["results"][0]["place_id"]

    details_payload = {"key":key, "placeid":place_id}
    details_resp = requests.get(details_url, params=details_payload)
    details_json = details_resp.json()

    url = details_json["result"]["url"]
    return jsonify({'result' : url})

@app.route("/maps")
def maps_test():
    # gmaps = googlemaps.Client(key='AIzaSyCTqzS2NSx5h0atkgdlY0Ugp46F5cElX2E')
    # my_dist = gmaps.distance_matrix('Delhi', 'Mumbai')['rows'][0]['elements'][0]
    # print(my_dist)
    # r = requests.get(
    #     "https://api.tomtom.com/routing/1/calculateRoute/12.972956,77.617249:12.916540,77.630780/"
    #     "xml?avoid=unpavedRoads&key=KLnaX5wyz18mvpGA84bM5dg66zkaJFm1")
    r = requests.get(
        "https://api.tomtom.com/routing/1/calculateRoute/12.9177,77.6238:12.9733,77.6075/"
        "xml?avoid=unpavedRoads&key=KLnaX5wyz18mvpGA84bM5dg66zkaJFm1")
    # print(r)
    c = r.content  # Turn the XML data into a human readable format
    soup = BeautifulSoup(c)  # Print out the information
    # print(soup.prettify())
    return soup.prettify()
