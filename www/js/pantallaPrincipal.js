document.addEventListener("deviceready", onDeviceReady, false);

var db = null;
var user = '';
var latitud = null;
var longitud = null;

function onDeviceReady() {

	// Abrimos o creamos la bbdd interna
	db = window.sqlitePlugin.openDatabase({name: 'smf.db', location: 'default'});

	$("#borrarUsuario").click(function() {
		db = window.sqlitePlugin.deleteDatabase({name: 'smf.db', location: 'default'});
	});

	$("#enviaAlerta").click(function() {
		// Recuperamos el usuario de la bbdd
		db.transaction(function(tx) {
			tx.executeSql('SELECT * FROM smf WHERE id = ?', [1], function(tx, res) {
				user = res.rows.item(0).name;
			}, function(error) {
				alert("Error en executeSql");
			});
		}, function(error) {
			alert('Transaction ERROR: ' + error.message);
		}, function() {
			console.log('SELECT OK');
		});

		getPosition();
	});

	function getPosition() {
		var options = {
	  		enableHighAccuracy: true,
	  		maximumAge: 3600000
		}
	
		var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

		function onSuccess(position) {
			latitud = position.coords.latitude;
			longitud = position.coords.longitude;

			alert(user);
			alert(latitud);
			alert(longitud);
			// Así se busca en google maps con coordenadas: https://www.google.es/maps/@41.6474246,-0.9152144,15z
			var localizacion = "https://www.google.es/maps/@" + latitud + "," + longitud + "z"

			// Envíamos los datos pertinentes al servidor de SMF
			$.ajax({
				type: "POST",
				url: "http://smfdatabase.esy.es/pruebaServidor/insertar.php",
				data: ({name: user, location: localizacion})
			})
			.done(function(data) {
				if (data == "1") {
					alert("Aviso insertado");
				} else {
					alert("Error en el envío de datos");
					alert(data);
				}
			})
			.fail(function() {
				alert("Error en el ajax");
			});
   		}

		function onError(error) {
			alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
		}
	}
}
