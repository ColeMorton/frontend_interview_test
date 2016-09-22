(function () {
    'use strict';

    angular
        .module('mcmakler')
        .controller('TestCtrl', testController);

    function testController(googleMaps, $timeout) {
        var vm = this;
        vm.submit = submit;
        vm.address = {
            street: null,
            houseNumber: null,
            postalCode: null,
            city: null
        };

        const MESSAGE_DURATION = 2000;

        function submit() {
            googleMaps.getLocation(vm.address).then(onLocationReceived);

            function onLocationReceived(address) {
                vm.address = address;
                vm.displayAlert = true;

                const hideAlert = function() {
                    vm.displayAlert = false;
                };

                $timeout(hideAlert, MESSAGE_DURATION);
            }
        }
    }

})();
