jQuery(function($) {
  // Asynchronously Load the map API
  var script = document.createElement('script');
  script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
  document.body.appendChild(script);
});

function initialize() {
  var map;
  var bounds = new google.maps.LatLngBounds();
  var mapOptions = {
    mapTypeId: 'roadmap'
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  // establishing vars
  var infoWindow = new google.maps.InfoWindow(),
    marker,
    i;

  for (var x = 0; x < data.landmarks.length; x++) {
    var position = new google.maps.LatLng((data.landmarks[x].latitude), (data.landmarks[x].longitude));
    bounds.extend(position);
    marker = new google.maps.Marker({
      position: position,
      map: map,
      title: data.landmarks[x].name
    });

    console.log(data.landmarks[x].id);
    //for each landmark create li
    $(".list").append("<li id='" + (data.landmarks[x].id) + "'>" + (data.landmarks[x].name) + "</li>");
    map.fitBounds(bounds);
  }
  $(".landmarks ul li").click(
    function() {
      var position2 = new google.maps.LatLng(data.landmarks[this.id].latitude, data.landmarks[this.id].longitude);
      marker2 = new google.maps.Marker({
        position: position2,
        map: map,
        title: data.landmarks[this.id].name
      });
      console.log(data.landmarks[this.id]);
      infoWindow.setContent('<div class="info_content">' +
        '<h3>' + data.landmarks[this.id].name + '</h3>' +
        '<p>' + data.landmarks[this.id].description + '</p>' + '<a href="' + data.landmarks[this.id].reference + '"target="_blank">More Info</a>' + '</br>' +
        '<img src="' + data.landmarks[this.id].imgurl + '"/>' +
        '</div>');
      infoWindow.open(map, marker2);
      $(".landmarks ul li").css("background-color", "#fff");
      $("#" + this.id).css("background-color", "#ededed");
    }
  );
  
  var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
    this.setZoom(11);
    google.maps.event.removeListener(boundsListener);
  });

}
