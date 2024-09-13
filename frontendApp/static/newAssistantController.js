let assistantId = 0;




async function changeAssistantType() {

}

async function submitForm() {
        let buttonElement = document.getElementById('buttonToSubmit')
        buttonElement.style.display = 'none'

        let formClass = document.querySelector('.formClass')

        showLoader();
        let htmlObject = await callToApi();
        hideLoader();
        assistantId = htmlObject.assistantId;
        setTimeout(() => {
            window.location.href = `/assistant/${assistantId}/basicInfoTab`
        },1000)
}

function showLoader() {
    let loader = document.querySelector('.loader')
    loader.style.display = 'block'
}

function hideLoader() {
    let loader = document.querySelector('.loader')
    loader.style.display = 'none'
}

async function getMockForHttp() {
    let objToReturn = {
        'assistantId': 31
    }
    await new Promise(r => setTimeout(r, 2000));

    return objToReturn;
}

async function callToApi() {
    let storySummary = {
        language: $('#languageInput').val(),
        type: $('#assistantTypeInput').val(),
        gender: $('#genderAssistantInput').val(),
        name: $('#nameOfAssistantInput').val(),
        mainGoals: $('#mainGoalInput').val(),
    }

    let apiCallResponse = await fetch("/api/submit_assistant_form", {
        method: "POST",
        body: JSON.stringify(storySummary),
        credentials: "same-origin",
        headers: {
            "X-CSRFToken": getCookie("csrftoken"),
            "Accept": "application/json",
            'Content-Type': 'application/json'
        },
    })

    let apiCallParsedResponse = await apiCallResponse.json();

    let formElement = document.querySelector('.formClass');
    formElement.style.display = "none"
    let infoMessage = document.getElementById('infoAfterSave');
    let objToReturn = {
        'assistantId': apiCallParsedResponse.assistantId
    }
    return objToReturn;
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
    return apiCallParsedResponse.userWalletBalance;
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

async function init() {
//    await getBalanceOfCurrentUser();
    return true
}

let alreadyInited = false;
if (!alreadyInited) {
    alreadyInited = init();
}