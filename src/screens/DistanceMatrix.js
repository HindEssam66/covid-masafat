




var origin1 = new google.maps.LatLng(55.930385, -3.118425);
var origin2 = 'Greenwich, England';
var destinationA = 'Stockholm, Sweden';
var destinationB = new google.maps.LatLng(50.087692, 14.421150);

var service = new google.maps.DistanceMatrixService();
service.getDistanceMatrix(
  {
    origins: [origin1, origin2],
    destinations: [destinationA, destinationB],
    travelMode: 'DRIVING',
    transitOptions: TransitOptions,
    drivingOptions: DrivingOptions,
    unitSystem: UnitSystem,
    avoidHighways: Boolean,
    avoidTolls: Boolean,
  }, callback);

function callback(response, status) {
  // See Parsing the Results for
  // the basics of a callback function.
}
/*
function response()
{
    "originAddresses": [ "Greenwich, Greater London, UK", "13 Great Carleton Square, Edinburgh, City of Edinburgh EH16 4, UK" ],
    "destinationAddresses": [ "Stockholm County, Sweden", "Dlouhá 609/2, 110 00 Praha-Staré Město, Česká republika" ],
    "rows": [ {
      "elements": [ {
        "status": "OK",
        "duration": {
          "value": 70778,
          "text": "19 hours 40 mins"
        },
        "distance": {
          "value": 1887508,
          "text": "1173 mi"
        }
      }, {
        "status": "OK",
        "duration": {
          "value": 44476,
          "text": "12 hours 21 mins"
        },
        "distance": {
          "value": 1262780,
          "text": "785 mi"
        }
      } ]
    }, {
      "elements": [ {
        "status": "OK",
        "duration": {
          "value": 96000,
          "text": "1 day 3 hours"
        },
        "distance": {
          "value": 2566737,
          "text": "1595 mi"
        }
      }, {
        "status": "OK",
        "duration": {
          "value": 69698,
          "text": "19 hours 22 mins"
        },
        "distance": {
          "value": 1942009,
          "text": "1207 mi"
        }
      } ]
    } ]
  } */