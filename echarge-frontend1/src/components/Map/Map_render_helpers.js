var size = 150;
export const puslingDotFunc = (map) => {
var pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // get rendering context for the map canvas when layer is added to the map
    onAdd: function() {
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
    },

    // called once before every frame where the icon will be used
    render: function() {
        var duration = 1000;
        var t = (performance.now() % duration) / duration;

        var radius = (size / 2) * 0.3;
        var outerRadius = (size / 2) * 0.7 * t + radius;
        var context = this.context;

        // draw outer circle
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
        context.fill();

        // draw inner circle
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 100, 100, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // update this image's data with data from the canvas
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
        ).data;

        // continuously repaint the map, resulting in the smooth animation of the dot
        map.triggerRepaint();

        // return `true` to let the map know that the image was updated
        return true;
    }
};
return pulsingDot;
}

export const features = [{
    'type': 'Feature',
    'geometry': {
        'type': 'Point',
        'coordinates': [77.651567, 12.914908]
    }
},
{
    'type': 'Feature',
    'geometry': {
        'type': 'Point',
        'coordinates': [77.6153, 12.914908]
    }
},
{
    'type': 'Feature',
    'geometry': {
        'type': 'Point',
        'coordinates': [77.571204, 12.957156]
    }
},
{
    'type': 'Feature',
    'geometry': {
        'type': 'Point',
        'coordinates': [77.540917, 13.03432]
    }
},
{
    'type': 'Feature',
    'geometry': {
        'type': 'Point',
        'coordinates': [77.593193, 13.036516]
    }
},
{
    'type': 'Feature',
    'geometry': {
        'type': 'Point',
        'coordinates': [77.642186, 12.984492],
    }
},
{
    'type': 'Feature',
    'geometry': {
        'type': 'Point',
        'coordinates': [77.70585, 13.021163]
    }
},
{
    'type': 'Feature',
    'geometry': {
        'type': 'Point',
        'coordinates': [77.717668, 12.955893]
    }
},
{
    'type': 'Feature',
    'geometry': {
        'type': 'Point',
        'coordinates': [77.571204, 12.841576]
    }
},
{
    'type': 'Feature',
    'geometry': {
        'type': 'Point',
        'coordinates': [77.600238, 12.919542]
    }
},
{
    'type': 'Feature',
    'geometry': {
        'type': 'Point',
        'coordinates': [77.600238, 12.919542]
    }
},
{
    'type': 'Feature',
    'geometry': {
        'type': 'Point',
        'coordinates': [77.600238, 12.919542]
    }
}
];

export function getRoute(start, end, map, mapboxgl) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;
  
    // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onload = function() {
      var json = JSON.parse(req.response);
      var data = json.routes[0];
      var route = data.geometry.coordinates;
      var geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route
        }
      };
      map.addSource('route', {
        'type': 'geojson',
        'data': geojson
        });
        map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#888',
        'line-width': 8
        }
        });
      // add turn instructions here at the end
    };
    req.send();
  }