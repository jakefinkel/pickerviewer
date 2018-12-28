var MongoClient = require('mongodb').MongoClient;
var url = "<URL goes here>";

var findDevices = function(db, callback) {
	var cursor = db.collection('pickerservice').find();// {deviceSerialNumber: "1738-02085171"} );
	try {
		var doc = cursor[0];
		if (doc != null) {
			console.dir(doc);
		}
	}
	finally {
		callback();
	}
};

MongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
	var db = client.db('pickerservice');
	findDevices(db, function() {
		client.close();
	});
});
