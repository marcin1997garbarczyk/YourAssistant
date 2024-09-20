let url = window.location.pathname;
let urlWithoutBased = url.replace('/testChatTab','');
let assistantId = urlWithoutBased.substring(urlWithoutBased.lastIndexOf('/') + 1);

async function init() {
    await initChatMessages();
}

async function initChatMessages() {
    let chatBase = await getChatBase();
    chatBase.messages.forEach(message => {
        addMessageToChatOnHtml(message)
    })
}

function addMessageToChatOnHtml(message) {

    let chatMessagesClass = document.querySelector('.testChatMessages')
    let newHtmlBody = chatMessagesClass.innerHTML;
    if(message.role == 'user') {
        newHtmlBody += buildMessageFromUser(message.content)
    } else if(message.role == 'assistant') {
        newHtmlBody += buildMessageFromBot(message.content)
    }
    chatMessagesClass.innerHTML = newHtmlBody
}

async function sendMessage() {
    showLoader()
    let chatInput = document.querySelector('#testChatInput');
    let message = {role: 'user', content: chatInput.value}
    addMessageToChatOnHtml(message)
    chatInput.value = '';
    let askObject = {'assistantId': assistantId, 'answer': message.content}
    let responseFromApi = await callToApiWithAnswer(askObject);
    debugger
    let answerMessage = {'role':'assistant','content':responseFromApi.message}
    debugger
    addMessageToChatOnHtml(answerMessage)
    hideLoader()
}

async function startNewChat() {
    showLoader()
    await callToApiWithResetChat();
    let chatMessagesClass = document.querySelector('.testChatMessages')
    chatMessagesClass.innerHTML = '';
    await initChatMessages();
    showButtons();
    hideLoader()
}


function hideButtons() {
    let buttonToConvert = document.querySelector('.buttonToConvert')
    let buttonToSend = document.querySelector('.buttonToSend')
    buttonToConvert.style = 'display:none';
    buttonToSend.style = 'display:none';
}

function showButtons() {
    let buttonToSend = document.querySelector('.buttonToSend')
    buttonToSend.style = 'display:block';
}


function customNavigateToBasicInformation(name) {
    const currentUrl = window.location.href.replaceAll('/basicInfoTab','').
                                            replaceAll('/knowledgeBaseTab','')
                                            .replaceAll('/chatAndTeachTab','')
                                            .replaceAll('/testChatTab','')
                                            .replaceAll('/historyTab','');
    const newUrl = currentUrl + '/'+name;
    window.location.href = newUrl;
}

function buildMessageFromUser(message) {
    return `<div class="d-flex flex-row justify-content-start" style="margin:25px; padding:10px">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                              alt="avatar 1" style="width: 45px; height: 100%;">
                            <div>
                              <p class="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary">${message}</p>
                            </div>
                          </div>`;
}


function buildMessageFromBot(message) {
    return `<div class="d-flex flex-row justify-content-end mb-4 pt-1" style="margin:25px; padding:10px">
                            <div>
                              <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">${message}</p>
                            </div>
                            <img src="/static/images/robotIcon.png"
                              alt="avatar 1" style="width: 45px; height: 100%;">
                          </div>`
}

async function getChatBase() {
    let apiCallResponse = await fetch(`/api/get_test_messages/${assistantId}`, {
        method: "GET",
        credentials: "same-origin",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
    })
    let apiCallParsedResponse = await apiCallResponse.json();
    return apiCallParsedResponse;
}

function showLoader() {
    let loader = document.querySelector('.loader')
    loader.classList.add('fade-out');
    loader.style.setProperty('display', 'inline-block', 'important')
    setTimeout(() => {
        loader.classList.remove('fade-out')
        loader.classList.add('fade-in-container');
    }, 1000)
}


function hideLoader() {
    let loader = document.querySelector('.loader')
    loader.classList.add('fade-out');
    loader.style.setProperty('display', 'none', 'important')
}

async function callToApiWithResetChat() {

    let apiCallResponse = await fetch("/api/reset_chat", {
        method: "POST",
        body: JSON.stringify({'assistantId': assistantId, 'context':'test'}),
        credentials: "same-origin",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
    })
    let apiCallParsedResponse = await apiCallResponse.json();
    return apiCallParsedResponse;
}


async function callToApiWithAnswer(askObject) {
    debugger
    let apiCallResponse = await fetch("/api/submit_answer_from_user_test", {
        method: "POST",
        body: JSON.stringify(askObject),
        credentials: "same-origin",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
    })


    let apiCallParsedResponse = await apiCallResponse.json();
    debugger
    let objToReturn = {
        'message': apiCallParsedResponse.message,
        'storyId': apiCallParsedResponse.storyId
    }

    return objToReturn;
}


function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


let alreadyInited = false;
if (!alreadyInited) {
    alreadyInited = init();
}


const listener = event => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
         sendMessage();
    }
};

document.addEventListener("keydown", listener);