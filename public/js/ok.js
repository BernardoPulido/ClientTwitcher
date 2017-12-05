$( document ).ready(function() {


});

function perrona(){
    document.getElementById('entrar').innerHTML="Salir";
}
function salir(){
    document.getElementById('entrar').innerHTML="Entrar";
}
function changetext(){
    document.getElementById('entrar').innerHTML="Salir";
}

function openInNewTab(url) {
    var win = window.open(url, '_blank');
}