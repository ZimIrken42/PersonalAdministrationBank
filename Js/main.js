////// ###################### : Premisas de criação : ######################
////
//  toda função deve fazer algo(somente uma coisa) e deve faze-lo bem, sem 
// besteirinhas ou mensagens desnecesarias.
// 
//  Erro Padrão (-1), variavel de controle e de teste padrão 
// 
// 	Objetivo, do programa é o usuario poder digitar quanto ganha (a sua renda)
// e o valor das suas despesas e o programa dizer quanto ele pode gastar 
// 
// 
//  somatorio do valor das dispessas não podem exeder 65% do capital
// 
////							   	V 1.5
////// ###################### : Premisas de criação : ######################
//////// ########################## : Fim : ################################

mostrarView = false  // flag de mensagens de log
			// false - não mostrar
			// true - mostrar

class Dispesa { // Classe base para criar objeto dispesa
	
	constructor (_nome, _valor, _duracao, _lastrar) { // Metodo Construtor da dispesa

		_lastrar = (_lastrar != null) ? _lastrar : false
		_nome = (_nome != null) ? _nome : false
		_valor = (_valor != null) ? _valor : 0
		_duracao = (_duracao != null) ? _duracao : 0

		this.nome = ((_nome) ? _nome : "")
		this.valor = ((_lastrar) ? -1 : _valor) // valor da dispesa
		this.taxa = ((_lastrar) ? 0.1 : 0) // taxa de acumulação pela renda
		this.duracao = ((_lastrar) ? 0 : _duracao)  // messes de duração -1 indefinido
		this.teto = (((_lastrar) && (this.duracao != 0)) ? 1 : 4) // quantidade que pode ser acumulada,
		this.montante = 0 // valor acumulado					//  -1 indefinido, lastro
		this.tempo = ((_lastrar) ? -1 : 0) // tempo em messes, para chegar ao teto, contagem
		this.espera = false // flag de esvaziamento do montante em função do tempo
		this.iniciada = ((_lastrar) ? true : ( // mostrar que 
							(this.valor <= 0) ? false : true)) // não foi setada
		this.reserva = ((this.iniciada) ? false : (
							(this.montante <= this.valor) ? true : false)) // apontar que não se tem 
																// dinheiro suficiente
	}

	// Metodos

	isCheck () { // checar se foi iniciada e se não esta na reserva
		
		if (this.iniciada) {

			if (!(this.reserva)) {
			
				if (this.duracao < 0) {

					return false
				}

				return true
			} else {

				if ((!(this.reserva)) && this.espera) {

					return true
				} else {

					return false
				}
			} return true
		} else return false
	}

	isTeto () { // ferifica se montante esta no teto, para distribuição de renda

		if (this.isCheck()) {

			this.boleano = false

			if (this.montante > 0) {

				if ((this.valor * this.teto) <= this.montante) {

					this.boleano = true
				}
			}

			return this.boleano
		} return -1
	}

	isAtualizar () { // atualizar de acordo com o tempo e o capital, zerando
			//// zerando tempo de 1 mes da aplicação, restando somente montante armazenado
	
		if (this.isCheck()) {
	
			// this.iniciada = false
			////
			// removido por ser mais interesante mostrar a taxa depois de atualixar
			// this.taxa = 0.0

			if (this.duracao > 0) {

				if ((--this.duracao) == 0) {

					this.duracao = -1
					//return false
				}
			}


			if (this.tempo > 0) {

				this.tempo--
			} else {

				this.espera = true
				// this.tempo = 0
				this.tempo=0
			}

			if (this.valor > 0) {

				if (this.montante >= this.valor) {
					
					this.montante -= this.valor
				} else {

					if ((this.montate < this.valor) && (this.espera)) {

						this.espera = false
					}
				}
			}			

			return true
		} else return false
	}

	isCapitalizar () { // adicionar o valor ja subtraido do capital ao montante ja retirado da renda

		if (this.isCheck()) {

			if (!(this.isTeto())) {
			
				if (!(this.espera)) {

					this.montante += this.valor
				}
			}
			return true
		
		} return -1
	}
	
	// Inicio metodos Get e Set

	setNome (_nome) {

		this.nome = _nome
	}
	getNome () {

		return this.nome 
	}

	setEspera (_espera) {

		this.espera = _espera
	}
	getEspera () {

		return this.espera 
	}

	setValor (_valor) {

		this.valor = _valor
	}
	getValor () {

		return this.valor 
	}

	setEto (_teto) {

		this.teto = _teto
	}
	getEto () {

		return this.teto 
	}

	setMontante (_montante) {

		this.montante = _montante
	}
	getMontante () {

		return this.montante 
	}

	setTaxa (_taxa) {

		this.taxa = _taxa
	}
	getTaxa () {

		return this.taxa
	}

	setTempo (_tempo) {

		this.tempo = _tempo
	}
	getTempo () {

		return this.tempo
	}

	setDuracao (_duracao) {

		this.duracao = _duracao
	}
	getDuracao () {

		return this.duracao 
	}

	setReserva (_reserva) {

		this.reserva = _reserva
	}
	getReserva () {

		return this.reserva 
	}

	setIniciada (_inicia) {

		this.inicia = _inicia
	}
	getIniciada () {

		return this.iniciada 
	}
}

class Renda {

	constructor (_renda) {

		this.capitalInicial = ((_renda != null) ? _renda : 0.0) // valor de capitalização/renda
		this.capital = this.capitalInicial // passar a renda inicial para o capital
	}

	isCapitalizar () {

		this.capitalInicial = this.capital
		return this.capital
	}

	setRenda (_capital) {

		this.capitalInicial = _capital
	}

	getRenda () {

		return this.capitalInicial
	}

	setMontante (_capital) {

		this.capital = _capital
	}

	getMontante () {

		return this.capital
	}
}

function mostrarVetor (_despesas, _renda) { // mostra vetor e renda no console
	
	if (_despesas != null) {

		if (mostrarView) {
			i = 0

			if (_renda != null) console.log("CapitalInicial: " + Math.round(casas(_renda.getRenda())) + 
										"\nCapital: " + Math.round(casas(_renda.getMontante())))

			while (i < _despesas.length) {

				console.log((i+1) + " : " + _despesas[i].getNome())
				console.log(_despesas[i])

				i++
			}
		}
	} else return -1
}

function somaValoresDespesas (_despesas) { // retorna soma do valor das despesas 

	if (_despesas != null) {

		var soma = 0

		var i = 1

		while (i < _despesas.length) {

			if (!(_despesas[i].getEspera()))
				soma += _despesas[i].getValor()
			i++
		}

		return soma
	} return -1
}

function casas (_numero, _precicao) { // diminui as casas decimais ou almenta

	precicao = (_precicao != null) ? (_precicao * 10) : 100000 // altera a precição da função
													//// almenta ou diminui casas decimais
	return ((((_numero % 1 * precicao - (_numero % 1 * precicao % 1)) / // devolve numero
				 precicao)) + (_numero - (_numero % 1)))			//// com nova precição
}

function isCapitalizar (_dispesa) { // retorna valor do metodo isCapitalizar
	
	return _dispesa.isCapitalizar()
}

function Capitalizar (_despesas) { // capitaliza vetor de despesas
	
	var i = 1

	boleano = true

	while (i < _despesas.length) {

		 boleano = (boleano && (isCapitalizar(_despesas[i])))
		i++
	}
	return boleano
}

function CapitalizaRenda (_renda) { // atualiza valor da renda com o montante

	return _renda.isCapitalizar()
}

function Checar (_dispesa) {  // checa dispesa com metodo isCheck
	
	return _dispesa.isCheck()
}

function checarValores (_despesas) { // dis se alguma dispesa não esta ok	

	check = true

	var i = 1

	while (i < _despesas.length) {
		
		check = (check && Checar(_despesas[i]))
		
		i++
	}

	return check
}

function isTeto (_despesas) { // dis quantos chegaram no teto e seta flags 

	var somatorio = 0

	var i = 1

	while (i < _despesas.length) {
		
		if (_despesas[i].isTeto()) {
			
			_despesas[i].setEspera(true)
			somatorio++
		} else {

			if (_despesas[i].getEspera()) {

				if (_despesas[i].getMontante() < _despesas[i].getValor()) {

					_despesas[i].setEspera(false)
					_despesas[i].setReserva(false)
				}
			}
		}

		i++
	}

	return somatorio
}

function atualizarRenda (_despesas, _renda) {
	
	var soma = somaValoresDespesas(_despesas)

	_renda.setMontante(_renda.getMontante() - soma)
}

function isAtualizar (_dispesa) { // atualizar de acordo com o tempo e o capital subtraindo do montante ao 
			//// tempo de 1 mes da aplicação, restando somente montante armazenado, exedente de valor da dispesa
		

	if (_dispesa.isCheck()) {

		if (_dispesa.getDuracao() < 0) {

			return false
		}

		return _dispesa.isAtualizar()
	} return -1
}

function Atualizar (_despesas) { // atualiza tempo. despesas com a passagem de um mes e a renda remove dispessas 
					//// que estiverem vencidas
	
	boleano = true

	numDespesas = _despesas.length

	if (numDespesas > 1) {

		var i = 0

		while (i < numDespesas) {
				
			if (_despesas[i].getDuracao() < 0) { // deleta dispesa que for temporaria

				isAtualizar(_despesas[i])
				// _despesas[0].setMontante(_despesas[0].getMontante() + _despesas[i].getMontante())
				_despesas.splice(i,1)
				numDespesas--
			} else {

				boleano = (boleano && (isAtualizar(_despesas[i])))
			}

			i++
		}
	}

	return boleano // retorno se tudo ocorreu bem
}

function calculaLastro (_despesas, _renda) { // dis quanto o lastro tera da renda total comumente se é 
							//// 10% do valor inicialmente


	juros = (_renda.getMontante() * _despesas[0].getTaxa())

	montante = _despesas[0].getMontante() + juros

	_despesas[0].setMontante(montante) // taxa de 10% do capital

	_renda.setMontante(_renda.getMontante() - juros)
}

function distribuiRenda (_despesas, _renda) { // distribui a renda entre as despesas

	if ((_despesas != null) && (_renda != null)) {

		CapitalizaRenda (_renda)

		atualizarRenda (_despesas,_renda) // renda sera diminuida do valor das despesas
									//// sobrando o montante resultante que sera distribuido

		if (_renda.getMontante () > 0) {

			CapitalizaRenda (_renda)

			Capitalizar (_despesas)

			soma = somaValoresDespesas (_despesas)

			calculaLastro (_despesas, _renda)

			var i = 1

			var conta = isTeto (_despesas)

			if (_despesas.length > 0) { // metodos da ultima modificação da função taxacao
							//// distribuindo a renda por igual as despesas, taxando-as e altualizando renda

				montante = (_renda.getMontante () / (_despesas.length - 1 - (conta)))

				
				taxa = (montante / _renda.getMontante ()) // calcula taxa para todas as despesas

				_renda.isCapitalizar() // atualiza renda para ser proporcional a taxa real
			
				i = 1

				while (i < _despesas.length) { // atualizar taxa em todas as despesas
									//// agora também setar montate de despesas e tempo

					//console.log(((!(_despesas[i].getEspera())) && (_despesas[i].getDuracao() > 0)))

					if (!(_despesas[i].getEspera ()) && (_despesas[i].getDuracao () == 0)) {

						juros = (taxa * _renda.getRenda ()) // calcula juros
						_despesas[i].setTaxa (taxa)

						tempo = (((_despesas[i].getEto () * _despesas[i].getValor ()) - // tempo para se chegar ao teto
									_despesas[i].getMontante ()) / juros) // Resolvido o Tempo *-* >< ^^
						
						if (((_despesas[i].getEto () * _despesas[i].getValor ()) - 
												_despesas[i].getMontante ()) > 0)  
								_despesas[i].setMontante (_despesas[i].getMontante () + juros) 
						// else _despesas[i].setEspera (true)
						
						_renda.setMontante (_renda.getMontante () - juros)
						_despesas[i].setTempo ( Math.round (tempo) )
					}
					
					i++
				}	
			}
			
			_despesas[0].setMontante (_despesas[0].getMontante () + _renda.getMontante ())
			_renda.setMontante (0)
			_renda.isCapitalizar ()
		}
	}
}

function Tempo (_despesas, _renda, _temp) { // tempo de aplicação
	
	var tempoMesses = ((_temp != null) && (_temp > 0)) ? _temp : 1

	var valorRenda =  _renda.getMontante() 

	var soma = somaValoresDespesas(_despesas)

	var s = 0

	while (s < tempoMesses) {

		var i = 1

		_renda.setMontante (valorRenda)

		distribuiRenda (_despesas,_renda)

		// if (mostrarView) console.log("################### ANTES : Mes: "+(1+s))

		// mostrarVetor(_despesas, _renda)

		Atualizar (_despesas)

		if (mostrarView) console.log("################### Mes: "+(1+s))

		mostrarVetor(_despesas, _renda)

		// mostrarVetor(_despesas,_renda)
		s++
	}
}

function criaVetorDespesas (_valores, _renda) { // recebe vetor de informações e retorna, criando vetor de objetos

	var _despesas = new Array()

	var i = 0

	var soma = _valores.listaValores[i]

	_despesas.push(new Dispesa("lastro", // Lastro, cresimento !(logaritmo) algebrico, juros 
					0,0,true)) // compostos (_renda.capitalInicial*0.1),-1,true)) // depois adicionar o resto
					

	if (_valores != null) {

		while (_valores.listaNomes[i] != null) {		

			if ((_valores.listaValores[i] + soma) <= (0.65 * _renda.getMontante())) { // limite de despesas ate 65%
				_despesas.push(new Dispesa(_valores.listaNomes[i],
						_valores.listaValores[i], _valores.listaDuracao[i])) 
				soma += _valores.listaValores[i]
			} else {

				console.log("Dispesa exede teto de despesas base")
			}

			i++
		}
	}

	return _despesas
}

function Inicio () {

	////
	// primeira etapa, iniciar programa
	console.log("iniciar") 

	////
	// segunda etapa, coletar informações
	valorRenda = 1600 // valor da renda

	_tempo = 12 // tempo de duração

	var valores = { // informações para inicializar objetos

		listaNomes : {

			0 : "aluguel",
 			1 : "comida",
			2 : "internet",
			3 : "agua",
			4 : "luz"
		},

		listaValores : { 

			0 : 300,
			1 : 20,
			2 : 100,
			3 : 50,
			4 : 30
		},

		listaDuracao : {

			0 : 0,
			1 : 0,
			2 : 7,
			3 : 0,
			4 : 0
		}
	};

	////
	// terceira etapa, criar objetos de manipulação
	var _renda = new Renda(valorRenda) // cria renda
	var _despesas = criaVetorDespesas(valores, _renda) // cria despesas

	// mostrar informações no console, opicional
	if (mostrarView) mostrarVetor (_despesas, _renda)

	////
	// quarta etapa, iniciar tempo
	Tempo(_despesas, _renda, _tempo)
}

//// ###########################################################//////
// ######################## : Inicio : ############################ // 
//// ###########################################################//////

// inicia programa

// Inicio() 

///////////////////////////////////////////////////////////////////////
/////////////////////////// Interação HTML ////////////////////////////
///////////////////////////////////////////////////////////////////////

__valorRenda = 0.0

__arrayDespesas = new Array ()

__arrayDespesas.push(new Dispesa("lastro",0,0,true)) // cria lastro

function atualizaInformacoes () {

	var stringValores = ""

	stringValores = "Informações: <br/>\n\n"
	stringValores += "Renda: " + __valorRenda

	stringValores = stringValores + "<br/>\n"
	i = 1

	stringValores = stringValores + "Dispesa 01: " + 
			__arrayDespesas[0].getNome()+", R$ " + __arrayDespesas[0].getMontante()+"<br/>\n"

	while (i < __arrayDespesas.length) {
		

		stringValores = stringValores + "Dispesa "+(((i+1) < 10) ? "0"+(i+1) : (i+1))+": " + 
			__arrayDespesas[i].getNome()+", R$ " + __arrayDespesas[i].getMontante()+"<br/>\n"
		i++
	}

	return stringValores
}

function atualizaCampoHTML () {

	document.getElementById("valores").innerHTML = atualizaInformacoes()
}

function comeTela() {

	document.getElementById('renda').style.display = 'none';
	document.getElementById('dados').style.display = 'block';
	document.getElementById('tempoForm').style.display = 'block';
}

function Start() {

	var lixo = document.getElementById("rendaCampo").value

	if (lixo != "") {

		lixo = parseInt(lixo)

		if ((typeof(lixo) == typeof(0)) && (!(isNaN(lixo)))) {
			
			__valorRenda = (parseInt(document.getElementById("rendaCampo").value))
			document.getElementById("rendaCampo").value = ""
			comeTela ()
			atualizaCampoHTML ()
		
		} else alert ("Insira Valor Valido da Renda")
	} else alert("Insira Valor da Renda");
}

function CriaDispesa () {

	var continuar = false

	var nome = document.getElementById('nomeDaDispesa').value
	var valor = parseInt(document.getElementById('valorDaDispesa').value)
	var duracao = parseInt(document.getElementById('duracaoDaDispesa').value)

	if (isNaN(duracao)) {

		duracao = 0
	}

	if (typeof(nome) == typeof("")) {

		if ((typeof(valor) == typeof(0)) && (!(isNaN(valor))) && (valor > 0)) {

			if ((typeof(duracao) == typeof(0)) && (!(isNaN(duracao)))) {
					
				continuar = true

				document.getElementById('nomeDaDispesa').value = ""
				document.getElementById('valorDaDispesa').value = ""
				document.getElementById('duracaoDaDispesa').value = ""
			} else alert ("Insira a Duração da Dispesa: numeros")
		} else alert ("Insira o Valor da Dispesa: numeros")
	} else alert ("Insira o Nome da Dispesa")

	if (continuar) {
		
		if ((nome != "") && (!(isNaN(valor)))) {
			
			var soma = somaValoresDespesas(__arrayDespesas)

			soma += valor

			if ((soma / __valorRenda) <= 0.65) {
				__arrayDespesas.push(new Dispesa(nome,valor,duracao))
				atualizaCampoHTML ()
			} else alert ("Despesas Não Podem Exeder 65% da Renda")
		} else alert("Insira Valores Obrigatorios da Dispesa");
	}
}

function arrayDespesasString (_despesasVectorHtml) {
	
	var stringLixo = ""

	var i = 1

	stringLixo += "Nome: "+_despesasVectorHtml[0].getNome()+"  "
	stringLixo += " Montante: "+_despesasVectorHtml[0].getMontante()+"  "

	if ((_despesasVectorHtml.length) > 12) { // bloqueio para Stouro de Memoria

		i = _despesasVectorHtml.length - 12
	}
	
	while (i < _despesasVectorHtml.length) {

		stringLixo += "Nome: "+_despesasVectorHtml[i].getNome()+"  "
		stringLixo += " Valor: "+_despesasVectorHtml[i].getValor()+"  "
		stringLixo += " Montante: "+_despesasVectorHtml[i].getMontante()+" Tempo: "+"  "
		stringLixo += _despesasVectorHtml[i].getTempo()+"  "

		i++
	}

	return stringLixo
}

function calculaTempoHtml () {

	var tempo = document.getElementById("tempoMesses").value

	if (tempo != "") {

		tempo = parseInt(tempo)

		if ((!(isNaN(tempo))) && (typeof(tempo) == typeof(0))) {

			var stringTempo = ""

			var __renda = new Renda(__valorRenda)

			var tempoMesses = ((tempo != null) && (tempo > 0)) ? tempo : 1

			var valorRenda =  __renda.getMontante() 

			var soma = somaValoresDespesas(__arrayDespesas)

			var s = 0

			while (s < tempoMesses) {

				var i = 1

				__renda.setMontante (valorRenda)

				distribuiRenda (__arrayDespesas,__renda)

				Atualizar (__arrayDespesas)

				stringTempo += "###### Mes: "+(1+s)+"  "

				stringTempo += "Renda: " + __renda.getMontante()+"  "

				stringTempo += arrayDespesasString (__arrayDespesas)

				s++
			}

			document.getElementById("conteudo").textContent = stringTempo

			atualizaCampoHTML()
		} else alert ("Digite um Tempo Valido")
	} else alert ("Digite O Tempo Em Messes Antes")
}

//////
//// Fim Interação HTML
//