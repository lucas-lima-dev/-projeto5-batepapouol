let nameUser = '';

getMessages();

askNameUser();

setInterval(keepConection,5000);

setInterval(getMessages,3000);

function getMessages() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then((res) => {renderizarConversas(res.data)});
    promise.catch(() => console.log("Mensagem de erro: Erro de requisicao do servidor"));
}


function askNameUser(){

   nameUser = prompt('Qual o seu nome?');
   //nameUser = 'daksdmqi';

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

    let typedText = document.querySelector('input').value;

    const newMessages = {
        from: nameUser,
        to: "Todos",
        text: typedText,
        type: "message" 
    };

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',newMessages);
    promessa.then();
    promessa.catch(() => window.location.reload());
    document.querySelector('input').value = '';
}

function renderizarConversas(message){

    const chatList = document.querySelector('.chat');
    const filteredMessage = filterMessages(message);
    

    chatList.innerHTLM = '';

    const lastTime =  chatList.lastElementChild.querySelector('.time').innerHTML.slice(1,9);

    const newTimeLastMessage = filteredMessage[filteredMessage.length-1].time;

    const isThereNewMessage = lastTime !==  newTimeLastMessage;
    console.log(lastTime);
    console.log(newTimeLastMessage);
    console.log(isThereNewMessage);

    for(let i =0; i < filteredMessage.length; i++){

        const objMessage = filteredMessage[i];

        if(filteredMessage[i].type === 'status') {
            chatList.innerHTML += `<li class = 'joinedLeaveRoom'><span class = 'time'>(${objMessage.time})</span> <spam class = 'name'>${objMessage.from}</spam> ${objMessage.text}</li>`;
            
        } else if (filteredMessage[i].type === 'message') {
            chatList.innerHTML += `<li><span class = 'time'>(${objMessage.time})</span> <spam class = 'name'>${objMessage.from}</spam> para <spam class = 'name'>Todos</spam>: ${objMessage.text}</li>`;
            
        } else {
            chatList.innerHTML += `<li class = 'privateMessage'><span class = 'time'>(${objMessage.time})</span> <spam class = 'name'>${objMessage.from}</spam> reservadamente para <spam class = 'name'>${nameUser}</spam>: ${objMessage.text}</li>`;
            
        }
    
    }

    if (isThereNewMessage) {
        chatList.lastElementChild.scrollIntoView();
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