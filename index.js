//Global
var getUserMedia = require('getusermedia')

getUserMedia({ video: true, audio: false }, function (err, stream) {
  if (err) return console.error(err)

	var Peer = require('simple-peer')
	var peer = new Peer({
		initiator: location.hash === '#init',
		trickle: false,
		stream: stream
	})

	peer.on('signal',function(data){
		let IdCorto = 'User' + Math.round(Math.random()*100000);
		let IdLargo=JSON.stringify(data);
		document.getElementById('yourId').value = IdCorto;
		document.getElementById('IDSesion').innerHTML = 'ID de sesión <strong>'+IdCorto+'</strong>';
		console.log(JSON.stringify(data));
		localStorage.setItem(IdCorto, IdLargo);
	})

	
	document.getElementById('connect').addEventListener('click',function(){		
		// var overlay = document.getElementById("overlay");
		// overlay.style.display = "block";

		console.log("1: ");
		let IdStorage=document.getElementById('otherId').value;
		// var otherId = JSON.parse(document.getElementById('otherId').value)
		// peer.signal(otherId)
		let respst= localStorage.getItem(IdStorage);
		console.log("2: "+respst);
		var otherId = JSON.parse(respst);
		localStorage.removeItem(IdStorage);
		peer.signal(otherId);
		// overlay.style.display = "none";
		document.getElementById('loginconexion').style.display="none";
		document.getElementById('mensajerespuesta').style.display="block"; 
		
	})

	document.getElementById('send').addEventListener('click',function(){
		let idMessager = document.getElementById('IDSesion').textContent;
		let preMessage = idMessager + " escribió: ";
		let yourMessage = document.getElementById('yourMessage').value;
		document.getElementById('messages').innerHTML += '<strong>Tu dices: </strong>' 
		+ yourMessage+'<br />';
		let ComposeMessage = '<strong>'+preMessage+'</strong>' + yourMessage;
		document.getElementById('yourMessage').value = "";
		peer.send(ComposeMessage);
	})

	document.getElementById('camaraon').addEventListener('click',function(){
		document.getElementById('camaraon').style.display="none";
		document.getElementById('camaraoff').style.display="block";
		document.getElementById('camarablock').style.display="block";
	})
	

	document.getElementById('camaraoff').addEventListener('click',function(){
		document.getElementById('camaraon').style.display="block";
		document.getElementById('camaraoff').style.display="none";
		document.getElementById('camarablock').style.display="none";
	})

	document.getElementById('cerrar').addEventListener('click',function(){
		peer.destroy();
		document.getElementById('loginconexion').style.display="block";
		document.getElementById('mensajerespuesta').style.display="none";
	})

	peer.on ('data',function(data){
		document.getElementById('messages').innerHTML += data +'<br />'
	})

	peer.on('stream', function (stream) {
    	var video = document.createElement('video')
    	var videocamara = document.getElementById("camarablock");
		videocamara.appendChild(video);
    	/*document.body.appendChild(video)*/
    	video.src = window.URL.createObjectURL(stream);
    	video.play();
  })
})

