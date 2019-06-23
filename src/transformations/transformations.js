function timeConvert(min) {
    var num = min;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + "h " + rminutes;
  }

function getLegs(legs) {
    let newLegs = [];
    for(var k in legs) {
        var leg = legs[k];
        var myDate = new Date(leg.Departure);
        var minutes = myDate.getMinutes();
        var hours = myDate.getHours();
        newLegs[leg.Id] = {};
        newLegs[leg.Id].departure = hours+":"+minutes;
        var myDate = new Date(leg.Arrival);
        var minutes = myDate.getMinutes();
        var hours = myDate.getHours();
        newLegs[leg.Id].arrival = hours+":"+minutes;//leg.Arrival;
        newLegs[leg.Id].duration = timeConvert(leg.Duration);
    }
    return newLegs;
}

const getAirportCode = (places, i) => {
    const res = places.find(({Id}) => +i === Id); //+i to cast string to int
    if(!res) throw new Error("Airport not found");
    return res.Code;
}

const transformResult = (results) => {
    const newResult = [];
    const itineraries = results.Itineraries;
    const newLegs = getLegs(results.Legs);

    for(let oneIt of itineraries) {
        for (let itOption of oneIt.PricingOptions) {
            newResult.push({
                origin : getAirportCode(results.Places, results.Query.OriginPlace),
                destination : getAirportCode(results.Places, results.Query.DestinationPlace),
                price : itOption.Price,
                deeplinkUrl : itOption.DeeplinkUrl,
                outbound : {
                    departure: newLegs[oneIt.OutboundLegId].departure,
                    arrival: newLegs[oneIt.OutboundLegId].arrival,
                    duration: newLegs[oneIt.OutboundLegId].duration,
                    stops: ""
                },     
                inbound : {
                    departure: newLegs[oneIt.InboundLegId].departure,
                    arrival: newLegs[oneIt.InboundLegId].arrival,
                    stops: ""
                }
            });
        }
    }
    return newResult;
}

const transformPlaceResult = (results) => {
    const newPlacesResult = [];
    const places = results.Places
    if(places.length>0) {
        for(let onePlace of places) {
            newPlacesResult.push({
                placeName : onePlace.PlaceName,
                placeId : onePlace.PlaceId.replace("-sky", "")
            })
        }
    }
    
    return newPlacesResult;
}

module.exports = {timeConvert, getLegs, transformResult, transformPlaceResult};