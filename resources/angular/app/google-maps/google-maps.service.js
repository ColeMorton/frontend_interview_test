(function () {
    'use strict';

    angular
        .module('googleMaps')
        .constant('_', _)
        .factory('googleMaps', googleMaps);

    function googleMaps($log, $http, _) {
        const service = {
            getLocation: getLocation
        };

        const GOOGLE_MAPS_API_KEY = 'AIzaSyCZRuly0os2pFfT3z6LrrfSnErAFFbB7wc';

        return service;

        function getLocation(address) {
            const errorResponse = angular.merge({}, address, { successful: false, location: { lat: null, lng: null } });
            const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
                address.houseNumber + '+' +
                address.street + ',+' +
                address.postCode + ',+' +
                address.city + '&' +
                'key=' + GOOGLE_MAPS_API_KEY;
            const request = {
                method: 'GET',
                url: url
            };

            return $http(request).then(successCallback, errorCallback);

            function successCallback(response) {
                const location = _.get(response, 'data.results[0].geometry.location');
                return location ?
                    angular.merge({}, address, { successful: true, location: { lat: location.lat, lng: location.lng } }) :
                    errorResponse;
            }

            function errorCallback() {
                return errorResponse;
            }
        }
    }

})();
