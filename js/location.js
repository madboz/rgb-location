/*** Button Animation ***/

$(".button").hide().delay(4000).fadeIn(3000);

var storedLat = [];
var storedLon = [];
var storedAlt = [];

if (Cookies.get("red")) {

    console.log(Cookies.get("red"));
    console.log(Cookies.get("green"));
    console.log(Cookies.get("blue"));
    
    storedLat = JSON.parse(Cookies.get("red"));
    storedLon = JSON.parse(Cookies.get("green"));
    storedAlt = JSON.parse(Cookies.get("blue"));
    
    for (var i = 0; i < storedLat.length; i++) {
        
        $(".archive").append('<div class="swatch" style="background-color: rgb(' + storedLat[i] + ', ' + storedLon[i] + ',' + storedAlt[i] + ')"></div>');

    }
    
}

/*** Translation ***/

function successCallback(data) {
        
    var lat = data.coords.latitude;
    var lon = data.coords.longitude;
    var alt = data.coords.altitude;
        
    console.log("LAT: " + lat + "   LON: " + lon + "   ALT: " + alt);
        
    var red = Math.round((lat + 90) * 1.4166667);
    var green = Math.round((lon + 180) * 0.7083333);
    var blue;
    
    if (alt == null) {
        
        blue = 127;
        
    } else if (alt <= 0) {
        
        blue = 255;
        
    } else if (alt > 0 && alt < 500) {
        
        blue = Math.round((alt * -0.019375) + 255);
        
    } else if (alt >= 500) {
        
        blue = 0;
        
    }
    
    
    console.log("R: " + red + "   G: " + green + "   B: " + blue);
        
    $("body").css("background-color", "rgb( " + red + "," +green + "," + blue + ")");
    $(".archive").append('<div class="swatch" style="background-color: rgb(' + red + ',' + green + ',' + blue + ')"></div>');
    
    /*** Toggle Archive View ***/
        
    var clicked = false;

    $(".button").click(function(){
        
        if ( clicked == false ) {
            
            $(".archive").removeClass("hidden");
            $("body").css("background-color", "gainsboro");
            $(".button").html("Back to Current &#8594;");
        
            clicked = true;
            
        } else if ( clicked == true ) {
            
            $(".archive").addClass("hidden");
            $("body").css("background-color", "rgb(" + red + "," + green + "," + blue + ")");
            $(".button").html("&#8592; Location History");
            
            clicked = false;
            
        }

    });
    
    storedLat.push(red);
    storedLon.push(green);
    storedAlt.push(blue);
        
    Cookies.set("red", storedLat);
    Cookies.set("green", storedLon);
    Cookies.set("blue", storedAlt);
    
    // console.log(storedLat);
    // console.log(storedLon);
    // console.log(storedAlt);
    
}

function failureCallback() {
    
    console.log("Callback failure");
    
}

function logLocation() {
    
    if (navigator.geolocation) {
        
       navigator.geolocation.getCurrentPosition(successCallback, failureCallback);
       
    } else {
        
       alert("Functionality not available");
       
    }
    
}

logLocation();