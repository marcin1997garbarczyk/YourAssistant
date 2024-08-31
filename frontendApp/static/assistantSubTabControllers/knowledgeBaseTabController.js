let url = window.location.pathname;
let storyId = url.substring(url.lastIndexOf('/') + 1);;

async function init() {
    pushToChatMessages();
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

function pushToChatMessages() {
    let messages = [{role:'user', message:'hello'},{role:'robot', message:'hello'}];
    let chatMessagesClass = document.querySelector('.teachChatMessages')
    let newHtmlBody = '';
    messages.forEach(message => {
        if(message.role == 'user') {
            newHtmlBody += `<div class="d-flex flex-row justify-content-start">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                              alt="avatar 1" style="width: 45px; height: 100%;">
                            <div>
                              <p class="small p-2 ms-3 mb-1 rounded-3 bg-body-tertiary">${message.message}</p>
                            </div>
                          </div>`
        } else if(message.role == 'robot') {
            newHtmlBody += `<div class="d-flex flex-row justify-content-end mb-4 pt-1">
                            <div>
                              <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">${message.message}</p>
                            </div>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
                              alt="avatar 1" style="width: 45px; height: 100%;">
                          </div>`
        }
    })
    chatMessagesClass.innerHTML = newHtmlBody
}

async function callToApi() {
    let apiCallResponse = await fetch(`/api/get_story_details/${storyId}`, {
        method: "GET",
        credentials: "same-origin",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
    })
    let apiCallParsedResponse = await apiCallResponse.json();
}

function showLoader() {
    let loader = document.querySelector('.loader')
    loader.classList.add('fade-out');
    loader.style.setProperty('display', 'block', 'important')
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

async function callToApiWithAnswer(askObject) {

    let apiCallResponse = await fetch("/api/submit_answer_from_user", {
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