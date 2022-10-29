let conversas = [];
let nameUser = '';

getMessages();

askNameUser();

setInterval(keepConection,5000);

function getMessages() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then((res) => {renderizarConversas(res.data)});
    promise.catch(() => console.log("Mensagem de erro: Erro de requisicao do servidor"));
}


function askNameUser(){

   // nameUser = prompt('Qual o seu nome?');
   nameUser = 'daksdmqinqsncajscasjx[q';

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',{name:nameUser});

    promise.then();
    promise.catch(() => {
        alert('Já existe um usuario online com esse nome digitado, por favor digite outro nome.');
        askNameUser();
    });
    
}

function keepConection() {
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',{name:nameUser});
    promise.then()
    promise.catch(() => console.log("Mensagem de erro: Erro de requisicao do servidor"));
}



function addMessage(){

    const typedText = document.querySelector('input').value;

    const newMessages = `{
        from: ${nameUser},
        to: "nome do destinatário (Todos se não for um específico)",
        text: ${typedText},
        type: "message" 
    };`;

    //conversas.push(newMessages);

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',newMessages);
    // promessa.then();
    //promessa.catch((erro) => alert("Mensagem de erro: " + erro.data));
    //renderizarConversas(newMessages);
}

function renderizarConversas(message){

    const chatList = document.querySelector('.chat');
    const filteredMessage = filterMessages(message);
    console.log(filteredMessage);

    chatList.innerHTLM = '';

    for(let i =0; i < filteredMessage.length; i++){

        const objMessage = filteredMessage[i];

        if(filteredMessage[i].type === 'status') {
            chatList.innerHTML += `<li class = 'joinedLeaveRoom'><span class = 'time'>${objMessage.time}</span> <spam class = 'name'>${objMessage.from}</spam> ${objMessage.text}</li>`;
        } else if (filteredMessage[i].type === 'message') {
            chatList.innerHTML += `<li><span class = 'time'>${objMessage.time}</span> <spam class = 'name'>${objMessage.from}</spam> para <spam class = 'name'>Todos</spam>: ${objMessage.text}</li>`;
        } else {
            chatList.innerHTML += `<li class = 'privateMessage'><span class = 'time'>${objMessage.time}</span> <spam class = 'name'>${objMessage.from}</spam> reservadamente para <spam class = 'name'>${nameUser}</spam>: ${objMessage.text}</li>`;
        }
    
    }

      
}

function filterMessages(message) {

    const filteredMessage = [];

    for(let i =0; i < message.length; i++){

        if(message[i].type !== 'private_message') {
            filteredMessage.push(message[i]);
        } else if (message[i].type === 'private_message' && message[i].to === nameUser){
            filteredMessage.push(message[i]);
        }

    }

    return filteredMessage;

}