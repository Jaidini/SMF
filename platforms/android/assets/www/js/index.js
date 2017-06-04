document.addEventListener("deviceready", onDeviceReady, false);

var db = null;

function onDeviceReady() {

	// Abrimos o creamos la bbdd interna
	db = window.sqlitePlugin.openDatabase({name: 'smf.db', location: 'default'});

	// Creamos, si no existen, la tabla de usuarios
	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS smf (id integer primary key unique, name text, pass text)');
	}, function(error) {
		alert('Transaction ERROR: ' + error.message);
	}, function() {
		console.log('Populated database OK');
	});

	// Comprobamos si hay algún usuario en la bbdd
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM smf WHERE id = ?', [1], function(tx, res) {
			alert(res.rows.length);
			if (res.rows.length == 0) {
				window.location.href = "elige.html";
			} else {
				window.location.href = "pantallaPrincipal.html";
			}
		}, function(error) {
			alert("Error en executeSql");
		});
	}, function(error) {
		alert('Transaction ERROR: ' + error.message);
	}, function() {
		console.log('SELECT OK');
	});

}