$(document).ready(function() {
  var markers = [];
  // var waypts = [];
  var searchResults = [];
  var origin;
  var destination;
  var map;
  var dirDisp = new google.maps.DirectionsRenderer();
  var dirServ = new google.maps.DirectionsService();
  var globalCat;
  var dirurl;
  var showHint = true;

  // debugger;
  function init() {
    var startInput = document.getElementById("start-location-input");
    var endInput = document.getElementById("destination-location-input");
    var autocompleteStart = new google.maps.places.Autocomplete(startInput);
    var autocompleteEnd = new google.maps.places.Autocomplete(endInput);

    map = new google.maps.Map(document.getElementById("gmap"), {
      center: new google.maps.LatLng(40.450886, -74.338184),
      zoom: 7
    });

    dirDisp.setMap(map);
    // dirDisp.setPanel(document.getElementById("gdir"));

    var onClickGoHandler = function() {
      clearAll();
      origin = startInput.value;
      destination = endInput.value;
      // getDestlnglat(destination);
      calculateAndDisplayRoute();
    };

    document
      .getElementById("go-btn")
      .addEventListener("click", onClickGoHandler);
    google.maps.event.addListener(map, "click", function(event) {
      deleteMarkers();
      placeMarker(event.latLng);
    });
  } // end of init function

  function calculateAndDisplayRoute() {
    dirServ.route(
      {
        origin: origin,
        destination: destination,
        optimizeWaypoints: true,
        provideRouteAlternatives: false,
        travelMode: "DRIVING"
      },
      function(response, status) {
        if (status === "OK") {
          dirDisp.setDirections(response);
          // populatePlacesTab(response);
          var distance = response.routes[0].legs[0].distance.value;
          var duration = response.routes[0].legs[0].duration.value;
          //alert(duration);
          calculateandDisplayRate(distance, duration);
          if (showHint) {
            //TODO write a logic to append ratecard
            $("#msgModaltitle").html(
              '<span class="fa fa-lightbulb-o" style="font-size:24px"></span> Hint'
            );
            $("#modal-message").text("A modal Head.");
            $("#modal-message").append("  A modal Body ");
            $("#msgModal").modal("show");
            showHint = false;
          }
        } else {
          $("#msgModaltitle").html(
            '<span class="fa fa-warning" style="font-size:24px"></span> Warning'
          );
          $("#modal-message").text(
            "The route could not be generated.  Please check your starting and ending points."
          );
          $("#msgModal").modal("show");
        }
      }
    );
  }

  function calculateandDisplayRate(distance, duration) {
    let distinKm = (distance / 1000).toFixed(2);
    let durinMin = (duration / 60).toFixed(2);
    console.log(typeof distinKm + " " + durinMin);
    const initFare = 175.0;
    const farePerKm = 6.0;
    const farePerMin = 2;
    const finalRate =
      initFare + farePerKm * Number(distinKm) + farePerMin * Number(durinMin);
    console.log(finalRate + " " + typeof finalRate);
    let rideRate = document.getElementById("rideRate");
    rideRate.innerHTML = `${finalRate.toFixed(2)}`;

    // Dir Nav Info

    let dirServInfo = document.getElementById("dirServInfo");
    dirServInfo.innerHTML = `<b>${durinMin}</b> <small>Mins</small> for <b>${distinKm}<b> <small>Km</small>`;
    dirServInfo.classList.add("dirServInfo");
  }

  // function addPlaceToPlaces(id) {
  //   var request = {
  //     placeId: id
  //   };

  //   service = new google.maps.places.PlacesService(map);
  //   service.getDetails(request, callback);

  //   function callback(place, status) {
  //     if (status == google.maps.places.PlacesServiceStatus.OK) {
  //       console.log(place);
  //       pDiv = $("<div>")
  //         .attr("id", place.place_id)
  //         .addClass("place-chip");

  //       if (!(place.photos == null)) {
  //         pDiv.append(
  //           $("<img>")
  //             .attr(
  //               "src",
  //               place.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 })
  //             )
  //             .addClass("place-pic")
  //         );
  //       } else {
  //         pDiv.append(
  //           $("<img>")
  //             .attr("src", "assets/images/placesPlaceholder.png")
  //             .addClass("place-pic")
  //         );
  //       }
  //       pDiv.append(place.name).addClass("chip-name");

  //       if (place.rating == null) {
  //         pDiv.append(
  //           $("<p>")
  //             .html("No Rating Available")
  //             .addClass("chip-rating")
  //         );
  //       } else {
  //         pDiv.append(
  //           $("<p>")
  //             .html("Rating: " + place.rating + " of 5")
  //             .addClass("chip-rating")
  //         );
  //       }

  //       $("#place_list").append(pDiv);
  //     }
  //   }
  // }

  function placeMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      type: "nearby",
      animation: google.maps.Animation.DROP
    });
    markers.push(marker);

    // calculateAndDisplayRoute(); Do not refresh map, preserve zoom level an location
    if (markers.length > 0) {
      displayPlacesAroundMarker(markers);
      $("a[href='#cities']").click();
    }
  } // end of placeMarker function

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  } // end of setMapOnAll function

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  function showMarkers() {
    setMapOnAll(map);
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    //make a copy of the current markers so that after we remove all of them, we can add back the waypoint markers
    var markersHold = markers;
    clearMarkers();
    markers = [];

    //if a marker is a waypoint, leave it on the map so the user has a way to remove from the route
    for (var i = 0; i < markersHold.length; i++) {
      if (markersHold[i].waypt) {
        //reset the index hold area of the marker since only waypoint markers are kept
        markersHold[i].markeri = markers.length;
        markers.push(markersHold[i]);
      }
    }
    showMarkers();
  } // end of deleteMarkers function
  // end of makeShort funtion

  function clearAll() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
    waypts = [];
    searchResults = [];
  } // end of clearAll function

  google.maps.event.addDomListener(window, "load", init);
}); // end document ready
