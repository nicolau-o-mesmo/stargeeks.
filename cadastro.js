const formulario = document.getElementById("formulario");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("csenha");
var btn = document.getElementById("btn");
var check = document.getElementById("check")
const TOKENSTORAGE = "token";

function verificarEmail(emailv, evento) {
    let dados = JSON.parse(localStorage.getItem("bd")) || [];
    var emailrep = dados.find(elemento => elemento.emailcliente == emailv);     
    if (emailrep){
        evento.preventDefault();
        alert="E-mail já existente!";
    }
    else{
        criarUser(evento);

    }

}

function generateToken() {
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    return token;
}

function verifcacamp(evento){
    if (nome.value == ""){
        evento.preventDefault();
        alert = "Digite seu nome";
        nome.focus();
        return true;
    }
    if (email.value == ""){
        evento.preventDefault();
        alert = "Digite seu e-mail";
        email.focus();
        return true;
    }
    if (senha.value == ""){
        evento.preventDefault();
        alert = "Digite sua senha";
        senha.focus();
        return true;
    }
    if (confirmarSenha.value == ""){
        evento.preventDefault(); 
        alert = "Confirme sua senha";
        confirmarSenha.focus();
        return true;
    }
    if (senha.value != confirmarSenha.value){
        evento.preventDefault();
        alert = "Senhas não conferem";
        confirmarSenha.focus();
        return true;
    }
    return false;
}

function criarUser(evento) {
    
    let dados = JSON.parse(localStorage.getItem("bd")) || [];

    dados.push(
        {
            nomeclientes : nome.value,
            emailcliente : email.value,
            senhacliente : senha.value,
        }
        
    )
    const token = generateToken()
    if(check.checked){
        
        dados.push(
            {
                token : token
            }
        )
        localStorage.setItem("token", token);
           
        
    
    }
    
    
    
    
    localStorage.setItem("bd", JSON.stringify(dados));
    
    
    
    alert = "Usuario Cadastrado com Sucesso"
    evento.preventDefault();
    formulario.reset();
    
}

function redirect(){
    window.location.href = "catalogo.html";

}

formulario.onsubmit = (evento) =>{
    evento.preventDefault();
    if (verifcacamp(evento)){
        return;
    }

    verificarEmail(email.value, evento);
    redirect();

   
}