/**
 * Created by ESmallwood on 9/22/2015.
 */
var app = angular.module('app', []);
app.constant('CONSTANTS', {
    WORKDAYS_OF_THE_YEAR: 261,
    PRICE_PER_LITRE_AUS: 1.26,
    FUEL_CONSUMPTION_PER_100KM: 8,
    DEPRECIATION:.20,
    SERVICE_COST_PER_YEAR: 2800,
    INSURANCE_COST_PER_YEAR: 2800,
    TAX_COST_PER_YEAR: 280,
    FINANCING_COST_PPY: .05,
    PARKING_COST_PER_DAY: 10
});


app.controller('ctrl', function($scope, CONSTANTS){
    $scope.carCost = 0;
    $scope.distanceToWork = 0;
    $scope.timeToWork = 0;
    $scope.$watch("[carCost, distanceToWork, timeToWork]", function(newValue, oldValue){

       $('#container').highcharts({
            chart: {
              type: 'bar'
            },
            title: {
                text: 'Cost Comparison'
            },
            xAxis: {
                categories: ["Owning a Car"]
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total Cost'
                }
            },
           legend: {
               reversed: true
           },
           plotOptions: {
               series: {
                   stacking: 'normal'
               }
           },
           series: [{
               name: 'Financing Cost',
               data: [($scope.carCost * CONSTANTS.FINANCING_COST_PPY)]
           }, {
               name: 'Gas Cost',
               data: [$scope.distanceToWork *
                      CONSTANTS.WORKDAYS_OF_THE_YEAR *
                      (CONSTANTS.FUEL_CONSUMPTION_PER_100KM /100)*
                      CONSTANTS.PRICE_PER_LITRE_AUS]
           },{
               name: 'Depreciation',
               data: [$scope.carCost * CONSTANTS.DEPRECIATION]
           },{
               name: 'Miscellaneous',
               data: [CONSTANTS.SERVICE_COST_PER_YEAR +
                      CONSTANTS.INSURANCE_COST_PER_YEAR +
                      CONSTANTS.TAX_COST_PER_YEAR]
           },{
               name: 'Parking',
               data: [CONSTANTS.PARKING_COST_PER_DAY + CONSTANTS.WORKDAYS_OF_THE_YEAR]
           }
           ]

       });
    }, true);
});
