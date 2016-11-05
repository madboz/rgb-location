//arrays for stored values

        var storedLat = [];
        var storedLon = [];
        var storedAlt = [];
        
        if (Cookies.get('lat2')) {
            console.log(Cookies.get('lat2'));
            console.log(Cookies.get('lon2'));
            console.log(Cookies.get('alt2'));
            
            
            storedLat = JSON.parse(Cookies.get('lat2'));
            storedLon = JSON.parse(Cookies.get('lon2'));
            storedAlt = JSON.parse(Cookies.get('alt2'));
            
            for (var i = 0; i < storedLat.length; i++) {
                
                
                $(".archive").append("<div class='swatch' style='background-color: rgb( " +storedLat[i]+ ", " +storedLon[i]+ "," +storedAlt[i]+ " )'></div>");
                
            }
            
        }

    var successCallback = function(data) {
        
        //get latitude, longitute and altitude
        
        var lat = data.coords.latitude;
        var lon = data.coords.longitude;
        var alt = data.coords.altitude;
        
        //print lat, lon and alt
        
        console.log(lat);
        console.log(lon);
        console.log(alt);
        
        //convert lat, lon and alt into numbers out of 255
        
        var lat2 = Math.round((lat + 90) * 1.4166667);
        var lon2 = Math.round((lon + 180) * 0.7083333);
        var alt2;
        
        if (alt == null) {
            
            //if alt is null make it middle of spectrum
            
            alt2 = 127;
            
        } else if (alt <= 0) {
            
            alt2 = 255;
            
        } else if (alt > 0 && alt < 500) {
            
            alt2 = Math.round((alt * -0.019375) + 255);
            
        } else if (alt >= 500) {
            
            alt2 = 0;
            
        }
        
        //print adjusted values
        
        console.log(lat2);
        console.log(lon2);
        console.log(alt2);
        
        //access body and concatenate background colour
        
        $('body').css( 'background-color', 'rgb( ' +lat2+ ',' +lon2+ ',' +alt2+ ')');
        
        //adding swatch with current colour 
        
        $(".archive").append("<div class='swatch' style='background-color: rgb( " +lat2+ ", " +lon2+ "," +alt2+ " )'></div>");
        
        //showing and hiding archive
        
        var clicked = false;
        
        $(".button").click(function(){
            
            if ( clicked == false ) {
                
                $('.archive').removeClass('hidden');
                $('body').css('background-color','white');
                $('.button').html('current &#8594;').css('color','black');
            
                clicked = true;
                
            } else if ( clicked == true ) {
                
                $('.archive').addClass('hidden');
                $('body').css( 'background-color', 'rgb( ' +lat2+ ',' +lon2+ ',' +alt2+ ')');
                $('.button').html('&#8592 history').css('color','white');
                
                clicked = false;
                
            }

        });
        
        storedLat.push(lat2);
        storedLon.push(lon2);
        storedAlt.push(alt2);
            
        Cookies.set("lat2",storedLat);
        Cookies.set("lon2",storedLon);
        Cookies.set("alt2",storedAlt);
        
        console.log(storedLat);
        console.log(storedLon);
        console.log(storedAlt);
        
    };

    var failureCallback = function() {
        
        console.log("location failure :(");
        
    };

    var logLocation = function() {

        //determine if the handset has client side geo location capabilities
        
        if(navigator.geolocation){
            
           navigator.geolocation.getCurrentPosition(successCallback, failureCallback);
           
        }
        else{
            
           alert("Functionality not available :(");
           
        }
        
    };

    logLocation();