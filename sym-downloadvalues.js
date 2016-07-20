(function (CS) {
    'use strict';
    var contents;
    var def = {
        typeName: 'DownloadValues',
        iconUrl: 'Images/download.svg',
        datasourceBehavior: CS.DatasourceBehaviors.Multiple,
        getDefaultConfig: function () {
            return {
                DataShape: 'TimeSeries',
                DataQueryMode: CS.DataQueryMode.ModeEvents,
                Height: 50,
                Width: 400,
                TextColor: 'rgb(255,255,255)',
            };
        },
        init: init
    };

    function init(scope, elem) {
        var container = elem.find('#Download')[0];
        if (scope.symbol.DataSources) {
                scope.symbol.DataSources.forEach(function (item) {
                    item = item ? item.toString() : '';                         // Make sure it's a string
                    var path = item;
                    item = item.substr(item.lastIndexOf('\\') + 1) || item;     // strip out server and database
                    item = item.substr(0, item.indexOf('?')) || item;           // remove ID after last '?'
                    scope.label = item;
                });
            }
        
        function onUpdate(data) {
            if(data) {
                scope.contents= scope.label + "," + scope.symbol.DataSources[0] + "\r\n";
                data.Data[0].Values.forEach(
                    function(item) {
                    var time = item.Time;
                    var val = item.Value;
                    scope.contents = scope.contents + time + "," + val + "\r\n";
                });
            }
        }

        scope.download = function() {
            var datacsv = new Blob([scope.contents]);
            container.href = URL.createObjectURL(datacsv);
        };
        return { dataUpdate: onUpdate };
    }
    CS.symbolCatalog.register(def);
})(window.Coresight);