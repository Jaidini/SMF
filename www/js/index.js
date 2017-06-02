document.addEventListener("deviceready", onDeviceReady, false);

var db = null;

function onDeviceReady() {

	// Abrimos o creamos la bbdd interna
	db = window.sqlitePlugin.openDatabase({name: 'smf.db', location: 'default'});

	// Creamos, si no existen, la tabla de usuarios
	db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS smf (name)');
	}, function(error) {
		alert('Transaction ERROR: ' + error.message);
	}, function() {
		alert('Populated database OK');
	});

	// Comprobamos si hay algún usuario en la bbdd
	db.transaction(function(tx) {
		tx.executeSql('SELECT * FROM smf', [], function(res) {
			alert(res.rows);
			// if (res.rows == 1) {
			// 	window.location.href = "pantallaPrincipal.html";
			// } else {
			// 	window.location.href = "login.html";
			// }
		}, function(error) {
			alert("Error en executeSql");
		});
	}, function(error) {
		alert('Transaction ERROR: ' + error.message);
	}, function() {
		alert('SELECT OK');
	});

}