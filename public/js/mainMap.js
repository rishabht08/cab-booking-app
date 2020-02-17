$(document).ready(function () {

  var rideHistory;
  var markerOrigin;
  


  var userSession = [];
  $(".column-center").hide();

  $(".bg-modal-arrived").hide();
  $(".bg-modal-reached").hide();
  $(".booking-card").hide();

  var car =
    "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z";
  var icon = {
    path: car,
    scale: 0.7,
    strokeColor: "white",
    strokeWeight: 0.1,
    fillOpacity: 1,
    fillColor: "#404040",
    offset: "5%",
    // rotation: parseInt(heading[i]),
    anchor: new google.maps.Point(10, 25) // orig 10,50 back of car, 10,0 front of car, 10,25 center of car
  };

  $.ajax({

    url: "/sessionTest",
    method: "GET",
    success: function (response) {

      if (response.status == false) {
        $("#dashlogout").hide();
      }
      else {
        console.log("First response--->", response)
        userSession.push(response)
        $("#dashlogout").show();
        $.ajax({

          url: "/user/" + userSession[0].data["_id"],
          method: "GET",
          success: function (data) {
            // console.log("Rides-info after get--->",response);
            rideHistory = data;
            console.log("ride historuy--->", rideHistory)
          },
          error: function (error) {
            console.log(error);
          }


        });
      }

      //$('#SuccessMsg').html(msg);
    },

    error: function (error) {
      console.log(error);
    }

  })



  var map;
  var service;
  var infoWindow;
  var origin;
  var geocoder;
  var markers = [];
  var minDistance;
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  var pathLine;
  var pathLineMain;
  var source;
  var destination;
  var latestMarker;
  var price;
  
  var cabs = [
    {
      name: "Rupesh",
      contact: "8830547364"
    },
    {
      name: "Arvind",
      contact: "8830547364"
    },
    {
      name: "Sangmesh",
      contact: "8830547364"
    },
    {
      name: "Rahul",
      contact: "8830547364"
    },
    {
      name: "Ajim",
      contact: "8830547364"
    },
    {
      name: "Amol",
      contact: "8830547364"
    },
    {
      name: "Saif Ali",
      contact: "8830547364"
    },
    {
      name: "Tom Cruise",
      contact: "8830547364"
    },
    {
      name: "Naruto Uzumaki",
      contact: "8830547364"
    },
    {
      name: "Sasuke Uchiha",
      contact: "8830547364"
    },
    {
      name: "Goku",
      contact: "8830547364"
    },
    {
      name: "Vegeta",
      contact: "8830547364"
    },
    {
      name: "Captain America",
      contact: "8830547364"
    },
    {
      name: "Iron Man",
      contact: "8830547364"
    },
    {
      name: "Ichigo Kurasaki",
      contact: "8830547364"
    }
  ];

  function init() {
    //var delhi = new google.maps.LatLng(28.625671, 77.186626);

    // HTML5 geolocation.

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          origin = pos;
          console.log(origin);
          infoWindow = new google.maps.InfoWindow();
          var source = document.getElementById("destination");
          var destination = document.getElementById("destination2");
          autoCompleteInput(source, map, service);
          autoCompleteInput(destination, map, service);

          createRandomMarkers(map, origin);

          createLocationMarker(origin);

          infoWindow.setPosition(pos);

          map.setCenter(pos);

          //reverse geocoding
          geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: origin }, function (results, status) {
            console.log("My result--> ", results[0].geometry.location.lat());
            if (status === "OK") {
              if (results[0]) {
                document.getElementById("destination").value =
                  results[0].formatted_address;
              } else {
                window.alert("No results found");
              }
            } else {
              window.alert("Geocoder failed due to: " + status);
            }
          });
        },
        function () {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
    //Loading Mao
    map = new google.maps.Map(document.getElementById("map"), {
      center: origin,
      zoom: 15,
      disableDefaultUI: true
    });
    // Rendering Path on map
    directionsRenderer.setMap(map);

    function handleLocationError(browserHasGeolocation, infoWindow, origin) {
      infoWindow.setPosition(origin);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    }

    service = new google.maps.places.PlacesService(map);

    //Handling When place is changed in input box by he user

    var onChangeHandler = function () {
    
      calculateAndDisplayRoute(directionsService, directionsRenderer, null);

      
  


    };
    document
      .getElementById("destination2")
      .addEventListener("change", onChangeHandler);

    //Finding nearest cab to the source location

    var findNearestMarker = function () {
      var nearestMarker = markers[0];
      console.log(markers);
      minDistance = findDistance(origin, markers[0]);
      for (var i = 1; i < 15; i++) {
        if (minDistance > findDistance(origin, markers[i])) {
          minDistance = findDistance(origin, markers[i]);
          nearestMarker = markers[i];
        }
      }
      var markerCoords = {
        lat: nearestMarker.position.lat(),
        lng: nearestMarker.position.lng()
      };
      console.log(minDistance, nearestMarker);

      // Collect the markers which are not required on map
      var extraMarkers = markers.filter(marker => {
        return marker != nearestMarker;
      });

      // Remove the collected markers

      setTimeout(function () {
        removeMarkers(extraMarkers);
        calculateAndDisplayRouteFromCab(
          directionsService,
          directionsRenderer,
          origin,
          markerCoords,
          nearestMarker
        );
      }, 1000);

      var cabbyNumber = Math.floor(Math.random() * 15);
      var cabby = cabs[cabbyNumber];

      // Pop out the modal after 1 second

      /* $(".bg-modal").fadeIn(1000);
            // $(".column-center").show();
         

         $('#sidebar').toggleClass('active');
         document.querySelectorAll('#sizeId').forEach(ele => {
             ele.classList.add('icon-size');
             $('#sidebarCollapse').hide()
         });
         $(".click-temp").hide(); */
      $("#sidebar").removeClass("active");
      $("#sidebarCollapse").show();
      setTimeout(function () {
        $("#login-modal").modal("hide");
      }, 1000);
      $("#cabbyName").text("Name: " + cabby.name);
      $("#cabbyNumber").text("Contact: " + cabby.contact);
      $(".booking-card")
        .removeClass("booking-card")
        .addClass("booking-card-start")
        .fadeIn(1500);
      setTimeout(function () {
        $(".booking-card-start")
          .removeClass("booking-card-start")
          .addClass("booking-card")
          .fadeIn(1000);
      }, 3000);

      var onClickHandler = function () {
        $(".bg-modal-arrived").fadeOut(700);
        $(".btn-2").attr("disabled", true);
        markerOrigin.setMap(null); // Set origin marker to null after cab assignmnent
        $.ajax({

          url: "/user/" + userSession[0].data["_id"],
          method: "POST",
          data: { time: new Date(), from: source, to: destination, fare: price, status: true },
          success: function (response) {
            console.log("Rides-info--->", response);
          },
          error: function (error) {
            console.log(error);
          }
        })
        calculateAndDisplayRoute(
          directionsService,
          directionsRenderer,
          latestMarker
        );
      };

      //On Clicks
      $(".btn-cancel").on("click", function () {

        console.log("Session holder 2--->", userSession);
        /* $.ajax({

          url: "/user/" + userSession[0].data["_id"],
          method: "GET",
          success: function (response) {
            // console.log("Rides-info after get--->",response);
          },
          error: function (error) {
            console.log(error);
          } */
        $.ajax({

          url: "/user/" + userSession[0].data["_id"],
          method: "POST",
          data: { time: new Date(), from: source, to: destination, fare: price, status: false },
          success: function (response) {
            console.log("Rides-info--->", response);
            location.reload();
          },
          error: function (error) {
            console.log(error);
          }
        })
      });

      $(".btn-ride").on("click", onClickHandler);
      $(".btn-reached").on("click", function () {
        location.reload();
      });
    };

    //document.getElementById("searchCabs").addEventListener("click", findNearestMarker);
    document.getElementById("searchCabs").addEventListener("click", function () {
      if (document.getElementById("destination2").value == "") {
        return alert("Enter Destination");
      }

      console.log("checking fare---->", $("#rideRate").html()  )

      price =  Number($("#rideRate").html());

      source = document.getElementById("destination").value;
      destination = document.getElementById("destination2").value;
      $("#ride-planner").fadeOut(1000)

      //   $(".bg-modal").fadeIn(1000);

      if (userSession.length == 0) {
        setTimeout(function () {
          $("#login-modal").modal("show");
        }, 1000);
        // $(".column-center").show();

        $("#sidebar").toggleClass("active");
        document.querySelectorAll("#sizeId").forEach(ele => {
          ele.classList.add("icon-size");
          $("#sidebarCollapse").hide();
        });
        $(".click-temp").hide();
      }
      else {
        console.log("current session-->", userSession);
        findNearestMarker();
      }
    });

    //On Login popup click
    $("#login-form").on("submit", function (event) {
      event.preventDefault();

      var form = $(this);

      var email = $('#login-email').val().trim();

      var password = $('#login-password').val().trim();

      console.log(email, password);

      if (email !== "" && password !== "") {
        $.ajax({

          url: "/login",
          method: "POST",
          data: { email: email, password: password },
          success: function (response) {
            $('p').text("");
            if (response.status == 401) {
              $('<p/>').text(response.message).css("color", "red").appendTo($('#login-form'));
            }
            else {
              console.log("My login response--->", response.data);
              userSession.push(response);

              $("#dashlogout").show();
              findNearestMarker();
            }
          },
          complete: function () {

            $.ajax({

              url: "/user/" + userSession[0].data["_id"],
              method: "GET",
              success: function (data) {
                // console.log("Rides-info after get--->",response);
                rideHistory = data;
                console.log("ride historuy--->", rideHistory)
              },
              error: function (error) {
                console.log(error);
              }






            });
            //$('#SuccessMsg').html(msg);
          },
          error: function (error) {
            console.log(error);
          }

        })
      }
    });

    //On Register click

    $('#signup-form').on('submit', function (event) {

      event.preventDefault();

      var form = $(this);

      $('p').text("");

      var name = $('#signup-name').val().trim();

      var email = $('#signup-email').val().trim();

      var password = $('#signup-password').val().trim();

      var phonenumber = $('#signup-phonenumber').val().trim();

      console.log(name, email, password, phonenumber);


      $.ajax({

        url: "/signup",
        method: "POST",
        data: { name: name, email: email, phonenumber: phonenumber ,password: password },
        success: function (response) {

          if (response.status) {
            console.log(response.session);

            $("#dashlogout").show();
            $(".modal-backdrop").hide()
            $("#signup-content").hide()
            $("#signup-modal").hide()
            userSession.push(response);
           // rideHistory = createUserSession(userSession);
            findNearestMarker();




          }

          else {

            $('<p/>').text(response.data.message).css("color", "red").appendTo($('#signup-form'));
          }
        },
        complete: function () {
          $.ajax({

            url: "/user/" + userSession[0].data["_id"],
            method: "GET",
            success: function (data) {
              // console.log("Rides-info after get--->",response);
              rideHistory = data;
              console.log("ride historuy--->", rideHistory)

            },
            error: function (error) {
              console.log(error);
            }
          });
        }

        //$('#SuccessMsg').html(msg);
      })


    })

    //On logout
    $("#dashlogout").on("click", function () {

      $.ajax({

        url: "/logout",
        method: "POST",
        success: function (response) {

          if (response.status) {
            userSession = [];
            rideHistory = null;
            window.location = "/";
          }


        }
        //$('#SuccessMsg').html(msg);



      })

    })
    $(".btn-2").on("click", function () {
      location.reload();
    });
  }

  //Direction Source to destination

  function calculateAndDisplayRoute(
    directionsService,
    directionsRenderer,
    nearestMarker
  ) {
    directionsService.route(
      {
        origin: { query: document.getElementById("destination").value },
        destination: { query: document.getElementById("destination2").value },
        //origin: {query : source},
        //destination: {query : destination},
        travelMode: "DRIVING"
      },
      function (response, status) {
        if (status === "OK") {
          var distanceSrctoDest = response.routes[0].legs[0].distance.value;
          var price = parseInt((distanceSrctoDest * 6) / 1000);
          $("#rideRate").html(price);
          directionsRenderer.setDirections(response);

          distanceSrctoDest = response.routes[0].legs[0].distance.value;

          if (nearestMarker != null) {
            pathLineMain = response.routes[0].overview_path;
            createDynamicMarkerOnRoute(nearestMarker);
          }
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }

  function calculateAndDisplayRouteFromCab(
    directionsService,
    directionsRenderer,
    origin,
    marker,
    nearestMarker
  ) {
    console.log("myOrigin---->", origin);
    directionsService.route(
      {
        origin: { location: origin },
        destination: { location: marker },
        travelMode: "DRIVING"
      },
      function (response, status) {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
          console.log(
            "Checking response--->",
            response.routes[0].overview_path
          );
          pathLine = response.routes[0].overview_path;
          console.log("---------->>>>>>", pathLine, pathLine.length);
          createDynamicMarker(nearestMarker);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }

  var autoCompleteInput = function (input, map, service) {
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener("place_changed", function () {
      var dest = input.value;

      var request = {
        query: dest,
        fields: ["name", "geometry"]
      };
      if (input == document.getElementById("destination")) {
        service.findPlaceFromQuery(request, function (results, status) {
          console.log(results, status);
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }
            var location = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            };

            if (input == document.getElementById("destination")) {
              console.log("firs6 search-->", origin);
              origin = location;
              console.log("2nd search-->", origin);

              createRandomMarkers(map, location);
            }

            map.setCenter(results[0].geometry.location);
          }
        });
      }

      var place = autocomplete.getPlace();
      // place variable will have all the information you are looking for.
      console.log(place);
    });
  };

  function createMarker(place) {
    console.log("ghvjgvjg-->", place.geometry.location);
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, "click", function () {
      infoWindow.setContent(place.name);
      infoWindow.open(map, this);
    });
  }

  function createLocationMarker(pos) {
    markerOrigin = new google.maps.Marker({
      map: map,
      position: pos,
      draggable: true,
      icon: "images/mylocation.png",
      animation: google.maps.Animation.DROP
    });
    google.maps.event.addListener(markerOrigin, "click", function () {
      infoWindow.setContent("You're Here");
      infoWindow.open(map, this);
    });

    google.maps.event.addListener(markerOrigin, "drag", function (event) {
      geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: event.latLng }, function (results, status) {
        if (status === "OK") {
          if (results[0]) {
            document.getElementById("destination").value =
              results[0].formatted_address;
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      });
    });
  }

  function createRandomMarkers(map, origin) {
    console.log("sadsad", origin.lat, origin.lng);
    var southWest = new google.maps.LatLng(
      origin.lat + 0.02,
      origin.lng + 0.02
    );
    var northEast = new google.maps.LatLng(
      origin.lat - 0.02,
      origin.lng - 0.02
    );
    var lngSpan = northEast.lng() - southWest.lng();
    var latSpan = northEast.lat() - southWest.lat();

    // Create some markers
    for (var i = 0; i < 15; i++) {
      var location = new google.maps.LatLng(
        southWest.lat() + latSpan * Math.random(),
        southWest.lng() + lngSpan * Math.random()
      );

      var marker = new google.maps.Marker({
        position: location,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: icon
      });

      markers.push(marker);
    }
    console.log("My markers---->", markers);
  }

  function createDynamicMarker(iniitialMarker) {
    var position = pathLine.length - 1;

    var timer = setInterval(function () {
      var newPosition = {
        lat: pathLine[position].lat(),
        lng: pathLine[position].lng()
      };
      var heading = google.maps.geometry.spherical.computeHeading(
        iniitialMarker.getPosition(),
        new google.maps.LatLng(newPosition)
      );
      icon.rotation = heading;
      iniitialMarker.setMap(null);
      iniitialMarker = new google.maps.Marker({
        position: newPosition,
        map: map,
        icon: icon
      });
      calculateAndDisplayRouteDynamic(directionsService, directionsRenderer, new google.maps.LatLng(newPosition.lat, newPosition.lng), new google.maps.LatLng(pathLine[0].lat(), pathLine[0].lng()))
      position -= 1;
      if (position < 0) {
        latestMarker = iniitialMarker;
        $(".bg-modal-arrived").fadeIn(600);
        clearInterval(timer);
      }
    }, 1000);
  }
  function createDynamicMarkerOnRoute(nearestMarker) {
    var position = 0;

    var timer = setInterval(function () {
      var newPosition = {
        lat: pathLineMain[position].lat(),
        lng: pathLineMain[position].lng()
      };
      var heading = google.maps.geometry.spherical.computeHeading(
        nearestMarker.getPosition(),
        new google.maps.LatLng(newPosition)
      );
      icon.rotation = heading;
      nearestMarker.setMap(null);
      nearestMarker = new google.maps.Marker({
        position: newPosition,
        map: map,
        icon: icon
      });
      calculateAndDisplayRouteDynamic(directionsService, directionsRenderer, new google.maps.LatLng(newPosition.lat, newPosition.lng), new google.maps.LatLng(pathLineMain[pathLineMain.length - 1].lat(), pathLineMain[pathLineMain.length - 1].lng()))
      position += 1;
      if (position >= pathLineMain.length) {
        $(".bg-modal-reached").fadeIn(600);
        $("#reached").html("You've Reached: " + destination);
        clearInterval(timer);
      }
    }, 500);
  }

  function findDistance(origin, marker) {
    // Obtain the distance in meters by the computeDistanceBetween method
    // From the Google Maps extension using plain coordinates
    var distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng({
        lat: origin.lat,
        lng: origin.lng
      }),
      new google.maps.LatLng({
        lat: marker.position.lat(),
        lng: marker.position.lng()
      })
    );
    return distanceInMeters;
  }

  //Reverse Gocoding

  function reverseGeocode(marker) {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: marker }, function (results, status) {
      console.log("My result--> ", results[0].formatted_address);
      if (status === "OK") {
        if (results[0]) {
          return results[0].formatted_address;
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
  }

  function removeMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }

  function calculateAndDisplayRouteDynamic(directionsService, directionsDisplay, pointA, pointB) {
    directionsService.route({
      origin: pointA,
      destination: pointB,
      travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  $("#ridesHistory").on("click", function () {


    for (var i = 0; i < rideHistory.rides.length; i++) {



      $("<p/>").addClass("card-text").text("Time:" + rideHistory.rides[i].time).appendTo($(".main42").addClass("col text-left"));
      $("<img/>").attr("src", "images/green.png").height("7px").width("7px").appendTo($(".main42").addClass("col text-left"));
      $("<span/>").addClass("card-text").text("From:" + rideHistory.rides[i].from).appendTo($(".main42").addClass("col text-left"));
      $("<img/>").attr("src", "images/red.png").height("7px").width("7px").appendTo($(".main42").addClass("col text-left"));
      $("<span/>").addClass("card-text").text("To:" + rideHistory.rides[i].to).appendTo($(".main42").addClass("col text-left"));
      $("<p/>").text(rideHistory.rides[i].fare).appendTo($(".main43").addClass("col"));

      $(".main41").appendTo($(".main3").addClass("row"))
      $(".main42").appendTo($(".main3").addClass("row"))
      $(".main43").appendTo($(".main3").addClass("row"))
      $(".main3").appendTo($(".main2").addClass("card-body"))
      $(".main2").appendTo($(".main").addClass("card w-75"))


      $(".main").appendTo($(".top").addClass("modal-body"))

      //$("<p/>").text(rideHistory.rides[i].time).appendTo($(".main").addClass("card w-75"))

    }


  });

  function geocodeAddress(source, destination) {
    var src = {};
    var dst = {};

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ "address": source }, function (results, status) {
      console.log("My result geocode--> ", results[0].geometry.location.lng());
      src = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng()
      }
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {

        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
    geocoder = new google.maps.Geocoder();

    geocoder.geocode({ "address": destination }, function (results, status) {
      console.log("My result geocode--> ", results[0].geometry.location.lat());
      dst = {
        lat: results[0].geometry.location.lat(),
        lng: results[0].geometry.location.lng()
      }
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {

        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    });
    console.log("src,dst--->", src, dst);

    return [src, dst];
  }










  //Load Map
  google.maps.event.addDomListener(window, "load", init);
});
