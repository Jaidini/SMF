document.addEventListener("deviceready", onDeviceReady, false);

var db = null;

function onDeviceReady() {

	// Abrimos o creamos la bbdd interna
	db = window.sqlitePlugin.openDatabase({name: 'smf.db', location: 'default'});

	$("#btnLogin").click(function() {
		var user = $("#nomUser").val();
		var pass = $("#passUser").val();
		db.transaction(function(tx) {
			tx.executeSql('INSERT INTO smf (id, name, pass) VALUES (?,?,?)', [1, user, pass]);
		}, function(error) {
			alert('Transaction ERROR: ' + error.message);
		}, function() {
			console.log('Populated database OK');
		});
	});

	$("#btnLogin").click(function() {
		var user = $("#nomUser").val();
		var pass = $("#passUser").val();
		$.ajax({
			type: "POST",
			url: "http://smfdatabase.esy.es/pruebaServidor/comprueba.php",
			data: ({name: user, password: pass})
		})
		.done(function(data) {
			if (data == "1") {
				window.location.href = "pantallaPrincipal.html";
			} else {
				navigator.notification.alert("Usuario o contraseña incorrectos");
			}
		})
		.fail(function() {
			alert("Error en el ajax");
		});
	});
}
