//Array com perguntas em formato de json

var perguntas = [

    {"titulo":"HTML é uma linguagem de...", 
     "alternativa":["Programação", "Exclusão", "Marcação", "criação"],
     "correta":"c"
    },
    {"titulo":"Como devemos declarar uma função em php?", 
     "alternativa":["def functionName() :", "function functionName(){}", "string functionName(){}", "functionName{}"],
     "correta":"b"
    },
    {"titulo":"Qual a forma correta de declarar uma variável no PHP ?", 
     "alternativa":["String variavelNome;", "var variavelNome;", "let variavelNome;", "$variavelNome;"],
     "correta":"d"
    },
     {"titulo":"Para que seja impresso em phyton um texto na tela, utilizamos:", 
     "alternativa":["echo 'Texto';", "print('hello')", "System.out.println('Texto');", "printf('Hello World');"],
     "correta":"b"
    },
    {"titulo":"Quais das seguintes linguagens não é obrigatório uso de ponto e vírgula ?", 
     "alternativa":["Javascript e phyton", "Java e C", "Php e javascript", "Java e phyton"],
     "correta":"a"
    }
]

//Arrays para manipular questões e resultados
var gabarito = [], respostasUsuario = [], respostasCorretas = [], respostasErradas = []
var quantidadeRepostas, quantidadeAcertos, quantidadeErros


var controlaQuestoes = 0, exibeQuantidadeQuestoes = 1, calculaQuestoes = 0;

var alternativas = ['a', 'b', 'c', 'd']

//Variaveis do temporizador
var min = 0, seg = 31;


window.onload = function(){

document.getElementById("result").style.display = "none"
gerarQuestoes(0)
startTemporizador()


//O loop percore todas as posições do array de perguntas e coleta as repostas corretas das questões
for (var i = 0; i < perguntas.length; i++) {
   
   gabarito[i] = perguntas[i].correta
}


document.getElementById("quantidade-questoes").innerHTML = "Questão "+exibeQuantidadeQuestoes+" de "+perguntas.length

}

function resetasEstilos(){

document.getElementById("a").style.background = "aliceblue"
document.getElementById("b").style.background = "aliceblue"
document.getElementById("c").style.background = "aliceblue"
document.getElementById("d").style.background = "aliceblue"

document.getElementById("a").style.pointerEvents = "visible"
document.getElementById("b").style.pointerEvents = "visible"
document.getElementById("c").style.pointerEvents = "visible"
document.getElementById("d").style.pointerEvents = "visible"
}

function desabilitaAlternativas(){

document.getElementById("a").style.pointerEvents = "none"
document.getElementById("b").style.pointerEvents = "none"
document.getElementById("c").style.pointerEvents = "none"
document.getElementById("d").style.pointerEvents = "none"
}

function pegarRespostaUsuario(alternativaSelecionada, posicaoElemento){

//Adiciona a resposta do usuário
quantidadeRepostas = respostasUsuario.push(alternativaSelecionada)

//Compara a resposta do usuário com o gabarito da questão atual
if(alternativaSelecionada == gabarito[calculaQuestoes]){

//Se tiver correta adiciona no array de respostas corretas
 quantidadeAcertos = respostasCorretas.push(alternativaSelecionada)

document.getElementById("acertos").innerHTML = "Quantidade acertos: "+quantidadeAcertos
document.getElementsByTagName("div")[posicaoElemento].style.background = "green"

}else{

quantidadeErros = respostasErradas.push(alternativaSelecionada)

document.getElementById("erros").innerHTML = "Quantidade erros: "+quantidadeErros
//Destaca a reposta errada selecionada pelo usuário e a correta 
document.getElementsByTagName("div")[posicaoElemento].style.background = "red"
document.getElementById(gabarito[calculaQuestoes]).style.background = "green"
}

desabilitaAlternativas()
}

function proximaQuestao(){

if(exibeQuantidadeQuestoes < perguntas.length){

resetasEstilos()
controlaQuestoes++
exibeQuantidadeQuestoes++
calculaQuestoes++

if(exibeQuantidadeQuestoes <= perguntas.length){

    document.getElementById("quantidade-questoes").innerHTML = "Questão "+exibeQuantidadeQuestoes+" de "+perguntas.length
}

gerarQuestoes(controlaQuestoes)
startTemporizador()
seg = 31
min = 0

}else{

desabilitaAlternativas()
document.getElementById("result").style.display = "block"
}
}

function gerarQuestoes(numeroQuestao){

//Atribui o titulo da questão do array a tela do usuario
document.getElementById("title-questao").innerHTML = perguntas[numeroQuestao].titulo

span = document.getElementsByTagName("span").length

//Atribui as opcoes (a, b, c, d) do array de perguntas a tela do usuario
for(var i = 0; i < 4; i++){

document.getElementsByTagName("span")[i].innerHTML = perguntas[numeroQuestao].alternativa[i]
}

}

function startTemporizador() {

if((min == 0) && (seg == 31)){
temporizador()
}
}

function temporizador(){		

if((min > 0) || (seg > 0)){				
if(seg == 0){					
    seg = 31;					
    min = min - 1	
}				
else{					
    seg = seg - 1;				
}				
if(min.toString().length == 1){					
    min = "0" + min;				
}				
if(seg.toString().length == 1){					
    seg = "0" + seg;				
}				
document.getElementById('timer-sec').innerHTML = min + ":" + seg;
document.getElementById('timer-sec').style.color = "white";				
setTimeout('temporizador()', 1000);
}			
else{				
document.getElementById('timer-sec').innerHTML = "00:00";		
document.getElementById('timer-sec').style.color = "red";		
/*min = 1;
seg = 1;*/

startTemporizador()
seg = 31;
min = 0;
proximaQuestao()
}		
}

function resultadoFinal(){

for (var i = 0; i < perguntas.length; i++) {

document.write(perguntas[i].titulo+"<br>");

for(var contar = 0; contar < 4; contar++){

    document.write(alternativas[contar]+") "+perguntas[i].alternativa[contar]+"<br>");

}

var color

if(respostasUsuario[i] == gabarito[i]){

    color = 'green'

    //adicionaAcertos = corretas.push(respostasUsuario[i])

}else{

    color = 'red'

    //adicionaErros = erradas.push(respostasUsuario[i])

}


document.write("<font color="+color+">"+"Sua reposta: "+respostasUsuario[i]+"</font>"+"<br>")
document.write("Reposta correta: "+perguntas[i].correta+"<br><br>");	

}

document.write("Quantidade de acertos: "+quantidadeAcertos+" de "+respostasUsuario.length+" questões repondidas")
document.write("<br><a href='index.html'>Voltar</a>")
}