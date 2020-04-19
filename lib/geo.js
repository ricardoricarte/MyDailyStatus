export function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = toRad(lat2 - lat1); // deg2rad below
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1)
    var lat2 = toRad(lat2)
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

export function toRad(Value) {
    return Value * (Math.PI / 180)
}