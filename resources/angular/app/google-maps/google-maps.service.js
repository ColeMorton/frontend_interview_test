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
            const request = function (address) {
                const url = function (address) {
                    return 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
                        address.houseNumber + '+' +
                        address.street + ',+' +
                        address.postCode + ',+' +
                        address.city + '&' +
                        'key=' + GOOGLE_MAPS_API_KEY;
                };
                return { method: 'GET', url: url(address) };
            };
            const getNewAddress = function (address) {
                const newAddress = function (address, location) {
                    const newAddressProps = function (location) {
                        return {
                            successful: location ? true : false,
                            location: {
                                lat: location ? location.lat : null,
                                lng: location ? location.lng : null
                            }
                        };
                    };
                    return _.merge(address, newAddressProps(location));
                };
                const location = function (response) {
                    return _.get(response, 'data.results[0].geometry.location');
                };
                return function (response) {
                    return newAddress(address, location(response));
                };
            };
            return $http(request(address)).then(getNewAddress(address));
        }
    }

})();
