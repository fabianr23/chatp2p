//Global
var getUserMedia = require('getusermedia')
var overlay = document.getElementById("Overlay");
overlay.style.display = 'none';


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
		
		
		
		console.log("1: ");
		let IdStorage=document.getElementById('otherId').value;
		// var otherId = JSON.parse(document.getElementById('otherId').value)
		// peer.signal(otherId)
		let respst= localStorage.getItem(IdStorage);
		console.log("2: "+respst);
		var otherId = JSON.parse(respst);
		localStorage.removeItem(IdStorage);
		peer.signal(otherId);
		document.getElementById('loginconexion').style.display="none";
		document.getElementById('mensajerespuesta').style.display="block"; 
		overlay.style.display = 'visible';
		

		
	})


	document.getElementById('send').addEventListener('click',function(){
		var yourMessage = document.getElementById('yourMessage').value
		peer.send(yourMessage)
	})

	peer.on ('data',function(data){
		document.getElementById('messages').textContent += data +'\n'
	})

	peer.on('stream', function (stream) {
    	var video = document.createElement('video')
    	var videocamara = document.getElementById("container-camara");
		videocamara.appendChild(video);
    	/*document.body.appendChild(video)*/
    	video.src = window.URL.createObjectURL(stream);
    	video.play();
  })
})

