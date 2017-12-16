//////
/// calculadora
function botao( num ) {
	var salvo = document.getElementById('tela').value;
	document.getElementById('tela').value = salvo + num;
}

function reset() {

	document.getElementById('tela').value = '';
}

function calcule() {

	var resultado = 0;
	resultado = document.getElementById('tela').value;
	alert(resultado);
}

function Opencalc() {

	document.getElementById('calc').style.display = 'block';
}

function closecalc() {

	document.getElementById('calc').style.display = 'none';
}

function botao( num ) {

	var salvo = document.getElementById('tela').value;
	document.getElementById('tela').value = salvo + num;
}

function reset() {

	document.getElementById('tela').value = '';
}

function calcule() {

	var resultado = 0;
	resultado = document.getElementById('tela').value;
	document.getElementById('tela').value = '';
	document.getElementById('tela').value = eval(resultado);
}