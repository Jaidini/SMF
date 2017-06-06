document.addEventListener("deviceready", onDeviceReady, false);

var db = null;

function onDeviceReady() {

	// Abrimos o creamos la bbdd interna
	db = window.sqlitePlugin.openDatabase({name: 'smf.db', location: 'default'});

	$("#borrarUsuario").click(function() {
		db = window.sqlitePlugin.deleteDatabase({name: 'smf.db', location: 'default'});
	});

	$("#enviaAlerta").click(function() {
		alert("Debería enviar una alerta");
	});
}
