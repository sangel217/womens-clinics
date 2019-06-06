import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$().ready(function(){
    
    // This example requires the Places library. Include the libraries=places
    // parameter when you first load the API. For example:
    // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
  
    var map;
    var service;
    var infowindow;
    var bounds;
    var searchQuery = "seattle";
    
    window.initMap = function() {
        var location = new google.maps.LatLng(47.6, -122.3);

            
        infowindow = new google.maps.InfoWindow();
    
        map = new google.maps.Map(
            document.getElementById('map'), {center: location, zoom: 15});
    
        var request = {
            location: location,
            radius: '500',
            query: searchQuery + " planned parenthood",
            fields: ['name', 'geometry'],
        };

        service = new google.maps.places.PlacesService(map);
    
        service.nearbySearch(request, function(results, status) {
            console.log(results);
            if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
            map.setCenter(results[0].geometry.location);
            }                                                                                                                                                                            
        });
    
    }
    
    function createMarker(places) {
        places.forEach(place => {
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                title: place.name

        })
        location.extend(place.geometry.location);
        });
        
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(place.name);
            infowindow.open(map, this);
        });
        map(location);
    }


    $("#btn").click(function(){

        searchQuery = $("#search").val()
        initMap();
    })

});