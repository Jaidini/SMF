// Impedimos volver atrás en las pantallas pantallaPrincipal.html y elige.html

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

	document.addEventListener("backbutton", function() {
		navigator.notification.confirm("", function(button) {
			if (button == 2) {
				navigator.app.exitApp();
			}
		}, "¿Deseas salir de la aplicación?", "No,Sí");
	}, false);

}
