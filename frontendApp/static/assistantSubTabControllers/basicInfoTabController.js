let url = window.location.pathname;
let urlWithoutBased = url.replace('/basicInfoTab','');
let assistantId = urlWithoutBased.substring(urlWithoutBased.lastIndexOf('/') + 1);

async function init() {
    let assistant = await getAssistantBaseInfo();
    debugger
    document.querySelectorAll('.nameOfAssistant').forEach(e => e.textContent = assistant.name)
    document.querySelectorAll('.genderOfAssistant').forEach(e => e.textContent = assistant.gender)
    document.querySelectorAll('.typeOfAssistant').forEach(e => e.textContent = assistant.type)
    document.querySelectorAll('.mainGoalsOfAssistant').forEach(e => e.textContent = assistant.mainGoals)
    document.querySelectorAll('.langOfAssistant').forEach(e => e.textContent = assistant.language)
}


async function getAssistantBaseInfo() {
    let apiCallResponse = await fetch(`/api/get_assistant_base_info/${assistantId}`, {
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
    return apiCallParsedResponse.assistant[0];
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