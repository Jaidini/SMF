document.addEventListener("deviceready", onDeviceReady, false);

var db = null;

function onDeviceReady() {

	// Abrimos o creamos la bbdd interna
	db = window.sqlitePlugin.openDatabase({name: 'smf.db', location: 'default'});

	$("#btnCrear").click(function() {
		var user = $("#nomUser").val();
		var pass = $("#passUser").val();
		db.transaction(function(tx) {
			alert("antes de executeSql");
			tx.executeSql('INSERT INTO smf (id, name, pass) VALUES (?,?,?)', [1, user, pass]);
			alert("despues de executeSql");
		}, function(error) {
			alert('Transaction ERROR: ' + error.message);
		}, function() {
			alert('Populated database OK');
		});
	});

	$("#btnCrear").click(function() {
		var user = $("#nomUser").val();
		var pass = $("#passUser").val();
		var dni = $("#dniUser").val();
		var fec = $("#fecNacUser").val();
		var ciudad = $("#ciuUser").val();
		var mail = $("#mailUser").val();
		var maltrato = $("#maltratoUser").val();
		$.ajax({
			type: "POST",
			url: "http://smfdatabase.esy.es/pruebaServidor/insertarUsuarios.php",
			data: ({name: user, password: pass, documento: dni, fecha: fec, city: ciudad, emilio: mail, mal: maltrato})
		})
		.done(function(data) {
			alert(data);
			if (data == "1") {
				window.location.href = "pantallaPrincipal.html";
			} else {
				navigator.notification.alert("Usuario ya existente");
			}
		})
		.fail(function(data) {
			alert(data);
			alert("Error en el ajax");
		});
	});
}
