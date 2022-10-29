let conversas = [];

const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');

// console.log('Enviou o pedido');
promise.then(answerArrived);
//promise.catch(serverErro);

askNameUser();

function answerArrived(answer) {
    console.log("RESPOSTA CHEGOU");
    console.log(answer);
    console.log(answer.data);

    conversas = answer.data;
}

function askNameUser(){

   // let nameUser = prompt('Qual o seu nome?');
   let nameUser = 'ana';

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',{name:nameUser});

   promise.then(tratarNome);

    const chatList = document.querySelector('.chat') ;
    chatList.innerHTML += `<li class = 'joinedLeaveRoom'><span class = 'time'>(09:21:45)</span> <spam class = 'name'>${nameUser}</spam> entra na sala...</li>`;

    promise.catch(deuErro);

}



function tratarNome(element) {

    console.log("RESPOSTA CHEGOU");
    console.log(element);
    console.log(element.status); 

    if(element.status !== 200 ){
        alert('Já existe um usuario online com esse nome digitado, por favor digite outro nome:');
        askNameUser();
    } else return 
        
}

function deuErro(erro) {
    alert("Mensagem de erro: " + erro.data);
}



function addMessage(){
    const typedText = document.querySelector('input').value;
    //const newMessages = {time:,name:,talkTo:,message:typedText};
    //conversas.push(newMessages);

    const promessa = axios.post('',newMessages);
    // promessa.then();




    renderizarConversas()
}

function renderizarConversas(){
    //const chatList = document.querySelector('.chat') ;

    //chatList.innerHTLM = '';

//     for(let i =0; i < conversas.length; i++){

//         let conversa = conversas[i];

//        // chatList.innerHTML += ``;
      //}
}