async function init() {
    await callToApi();
    await getBalanceOfCurrentUser();
}

function injectHtmlWithAnswer(htmlResponse) {

    let assistantClass = document.querySelector('.assistantBody')

    let style = htmlResponse.substring(htmlResponse.indexOf('<style>'), htmlResponse.indexOf('</style>') + 8);

    let displayForHtml = style + assistantBlock + decisionBlockForHtml;
    displayForHtml = displayForHtml.replaceAll(assistantClass.innerHTML, '')

    assistantClass.innerHTML += style + displayForHtml;
    assistantClass.outerHtml += style + displayForHtml;
    assistantClass.html += style + displayForHtml;
}


async function callToApi() {
    let assistantSummary = {}
    debugger
    let apiCallResponse = await fetch("/api/get_my_assistants", {
        method: "GET",
        credentials: "same-origin",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
    })
    let apiCallParsedResponse = await apiCallResponse.json();
    let assistants = apiCallParsedResponse.assistants;
    let assistantsElement = document.querySelector('.myAssistants')
    assistants.forEach(assistant => {
        let assistantCard = buildBootstrapCard(assistant);
        assistantsElement.html += assistantCard;
        assistantsElement.innerHTML += assistantCard;
        assistantsElement.outerHtml += assistantCard;
    })
}

function getGenderIcon(assistant) {
    return assistant.gender == 'Male' ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gender-male" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8"/>
                </svg>` : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gender-female" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8M3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5"/>
                        </svg>`
}
function buildBootstrapCard(assistant) {
    console.log(assistant.gender)

    return `<div class="card shadow p-3 mb-5 bg-white rounded" style="margin:10px; width:31%;  min-width: 300px; " >
              <img class="bg_img"
                src="/static/images/background_${assistant.type}.png"
                alt=""
              >
        <div class="card-body  " style='' >
            <div class="cardText" style='min-height:150px'>
            <h4 class="card-subtitle mb-2 text-muted" style="text-align: center">Assistant: ${assistant.name} ${getGenderIcon(assistant)}</h4>
            </p>
            <h6 class="card-subtitle mb-2 text-muted" style="text-align: center">Language: ${assistant.language} </p>
            <h6 class="card-subtitle mb-2 text-muted" style="text-align: center">Type: ${assistant.type}</p>
            <h6 class="card-subtitle mb-2 text-muted" style="text-align: center">Main goals: ${assistant.mainGoals}</p>
            </div>
            <button class="card-text btn btn-secondary buttonForDecision"  style="text-align: center; width:100%" id=${assistant.id} onclick="openassistant(event)">Manage</button>
        </div>
    </div>`
}

function openassistant(event) {
    window.location.href = `/assistant/${event.currentTarget.id}/basicInfoTab`
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

async function getBalanceOfCurrentUser() {
    let apiCallResponse = await fetch("/api/get_balance", {
        method: "GET",
        credentials: "same-origin",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
    })

    let apiCallParsedResponse = await apiCallResponse.json();
    document.querySelector('#balance_value').textContent = apiCallParsedResponse.userWalletBalance;
}

let alreadyInited = false;
if (!alreadyInited) {
    alreadyInited = init();
}
