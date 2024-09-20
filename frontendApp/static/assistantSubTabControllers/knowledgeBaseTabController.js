let url = window.location.pathname;
let urlWithoutBased = url.replace('/knowledgeBaseTab','');
let assistantId = urlWithoutBased.substring(urlWithoutBased.lastIndexOf('/') + 1);

async function init() {
    callToApiForKnowledgeBase();
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

async function callToApiForKnowledgeBase() {
    let assistantSummary = {}
    debugger
    let apiCallResponse = await fetch(`/api/get_knowledge_base/${assistantId}`, {
        method: "GET",
        credentials: "same-origin",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
    })
    let apiCallParsedResponse = await apiCallResponse.json();
    debugger
    let assistants = apiCallParsedResponse.assistants;
    let knowledgeInformations = apiCallParsedResponse.knowledgeInformations;

    let knowledgeElement = document.querySelector('.knowledgeBaseInformations')
    knowledgeInformations.forEach(knowledgeInfo => {
        let knowledgeInfoCard = buildBootstrapCard(knowledgeInfo);
        knowledgeElement.html += knowledgeInfoCard;
        knowledgeElement.innerHTML += knowledgeInfoCard;
        knowledgeElement.outerHtml += knowledgeInfoCard;
    })
}

function buildBootstrapCard(knowledgeInfo) {

    return `<div class="card shadow p-3 mb-5 bg-white rounded" style="height: 450px; margin:10px; width:40%;  min-width: 300px; max-height:400px; overflow: overlay; " >

        <div class="card-body  " style='height:350px' >
            <div class="cardText" style='min-height:300px'>
                <h4 class="card-subtitle mb-2 text-muted" style="text-align: center; height:150px"> ${knowledgeInfo.title}</h4>
                </p>
                <h6 class="card-subtitle mb-2 text-muted" style="text-align: center"> ${knowledgeInfo.content.replaceAll('**','<b>')} </p>
            </div>
        </div>
    </div>`
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