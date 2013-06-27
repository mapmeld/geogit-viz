var knownFeatures = { };

var map = L.map('map').setView( [ 42.361207, -71.06506 ], 13 );
map.attributionControl.setPrefix('');

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy;2013 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// wkt
var wktlayer = function(txt){
  var wkt = new Wkt.Wkt();
  wkt.read( txt );
  return wkt.toObject();
};

var mapfeature = function(feature){
  if(typeof feature.geometry != "undefined"){
    // adding geo
    var lyr = wktlayer( feature.geometry );
    var color = "#ccc";
    if(feature.change == "ADDED"){
      color = "#30aa30";
    }
    else if(feature.change == "MODIFIED"){
      color = "#00f";
    }
    else if(feature.change == "REMOVED"){
      color = "#ff0000";
    }
    if(typeof lyr.setStyle != "undefined"){
      // line or polygon
      lyr.setStyle({ color: color });
        //.bindPopup( makeTable( feature.attributes ) );
    }
    else{
      // change marker to circle
      lyr = new L.CircleMarker( lyr.getLatLng(), { color: color, opacity: 0.8, fillOpacity: 0.8 } );
        //.bindPopup( makeTable( feature.attributes ) );
    }
    knownFeatures[ feature.id ] = { geo: lyr };
    map.addLayer(lyr);
  }
  else{
    knownFeatures[ feature.newPath ].gitid = feature.newObjectId;
    $.getJSON("/featuredetails?path=" + encodeURIComponent(feature.newPath) + "&gitid=" + feature.newObjectId, function(data){
      var table = '<table border="1">';
      for(key in data.attributes){
        var keyfix = key.split(' ');
        keyfix = keyfix[ keyfix.length - 1 ];
        if(keyfix.indexOf("DTTM") > -1){
          // datetime print
          data.attributes[key] = (new Date( data.attributes[key].split('mapmeld')[0] * 1 )).toDateString();
        }
        table += '<tr><td><strong>' + keyfix + '</strong></td><td>' + data.attributes[key].split('mapmeld')[0] + '</td></tr>';
      }
      table += '</table>';
      knownFeatures[ data.path ].geo.bindPopup(table);
    });
  }
};

var mapme = function(json){
  if(json.response.Feature.length){
    for(var f=0;f<json.response.Feature.length;f++){
      mapfeature( json.response.Feature[f] );
    }
  }
  else{
    mapfeature( json.response.Feature );
  }
  var s = document.createElement('script');
  s.src = "http://localhost:8080/geogit/diff?oldRefSpec=b6b12e83119dc91f7ad7204c07996b2e50c15665&output_format=json&all=true&callback=maptoattr";
  s.type = "text/javascript";
  document.body.appendChild(s);
};

var maptoattr = function(json){
  if(json.response.diff.length){
    for(var f=0;f<json.response.diff.length;f++){
      mapfeature( json.response.diff[f] );
    }
  }
  else{
    mapfeature( json.response.diff );
  }
};

var s = document.createElement('script');
s.src = "http://localhost:8080/geogit/diff?oldRefSpec=b6b12e83119dc91f7ad7204c07996b2e50c15665&output_format=json&all=true&showGeometryChanges=true&callback=mapme";
s.type = "text/javascript";
document.body.appendChild(s);