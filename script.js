import data from './data.json' assert { type: 'json' }; 
const mainContainer = document.getElementById("main-container");
const replyMainContainer = document.createElement("div");
const body = document.getElementById("body");
let idNumber = 4;
// functions of markup
function markup(id,picture,name,time,text,score){ 
    return`
    <div id=${id} class="message-section">
        <div class="message-header">
            <img alt = ${name} class="picture-styles" src=${picture}>
            <h1 class="Name-styles">${name}</h1>
            <span class="text-style">${time}</span>
        </div>
        <p class="text-style">
            ${text}
        </p>
        <div class="message-footer">
            <div class="plus-minus-style"> 
                <img onclick="plusScore(event)"  alt="plus" class="plus-minus-icons plus" src="./assets/icon-plus.svg" />
                <span class="score">${score}</span>
                <img onclick="minusScore(event)" alt="minus" class="plus-minus-icons minus" src="./assets/icon-minus.svg" />
            </div>
            <div class="reply-section">
                <img class="reply-img-style" alt="reply" src="./assets/icon-reply.svg"/>
                <span>Reply</span>
            </div>
        </div>
    </div>`
};

function structureForJson(text,time,score,picture,name){
    return{
        "id": idNumber,
        "content":text,
        "createdAt": time,
        "score": score,
        "user": {
          "image": { 
            "png": "${picture}",
            "webp": "./assets/image-amyrobson.webp"
          },
          "username": name
        },
        "replies": []
    }
}

function replyMarkup(picture,name,time,text,score){
    return`
    <div class="message-reply-section">
        <div class="message-header">
            <img alt = ${name} class="picture-styles" src=${picture}>
            <h1 class="Name-styles">${name}</h1>
            <span class="text-style">${time}</span>
        </div>
        <p class="text-style">
            ${text}
        </p>
        <div class="message-reply-footer">
            <div class="plus-minus-style"> 
                <img onclick="plusScore(event)"  alt="plus" class="plus-minus-icons" src="./assets/icon-plus.svg" />
                <span class="score">${score}</span>
                <img onclick="minusScore(event)" alt="minus" class="plus-minus-icons" src="./assets/icon-minus.svg" />
            </div>
            <div class="reply-section">
                <img class="reply-img-style" alt="reply" src="./assets/icon-reply.svg"/>
                <span>Reply</span>
            </div>
        </div>
    </div>`
};
   
function MyMessage(picture,name,time,text,score){
    return `
        <div id=${idNumber} class="message-header">
            <img alt = "${name}" class="picture-styles" src=${picture}>
            <div class="you-julius">
                <h1 class="Name-styles">${name}</h1>
                <div class="you-text">
                    <span>you</span>
                </div>
                </div>
                <span class="text-style">${time}</span>
            </div>
        <p id="messageTextElement" class="text-style">${text}</p>
        <div class="you-message-footer">
            <div class="plus-minus-style"> 
                <img onclick="plusScore(event)" alt="plus" class="plus-minus-icons" src="./assets/icon-plus.svg" />
                <span class='score'>${score}</span>
                <img onclick="minusScore(event)" alt="minus" class="plus-minus-icons" src="./assets/icon-minus.svg" />
            </div>
            <div class="recycle-edit-buttons">
                <button onclick="deleteIcon(event)" type="button" class="recycle-bin">
                    <img alt="recycle-bin" src="./assets/icon-delete.svg"/>
                    <span>Delete</span>
                </button>
                <button type="button" class="edit-button">
                    <img alt="recycle-bin" src="./assets/icon-edit.svg"/>
                    <span onclick="editText(event)">Edit</span>
                </button>
            </div>
        </div>`
};


const MessageKeyboard = `<form class="text-area" id="text-area">
<textarea id="message-area"  class="send-message"  rows="4" cols="50" placeholder="Add a comment…"></textarea>
<div class="text-area-footer">
    <img class="picture-styles" alt="juliusomo" src="./assets/image-juliusomo.png"/>
    <button onclick="sendText()"  class="send-button" type="button">SEND</button>
</div>
</form>`;
const DeleteSection =`<div class="cover-div" id="delete-section-style" >
        <div class="delete-section-style" >
            <h2 class="delete-text-style">Delete comment</h2>
            <p class="text-style description">
                Are you sure you want to delete this comment? This will remove the comment and can’t be undone.
            </p>
            <div class="buttons-section">
                <button onclick="closeDeleteSection()" class="cancel-button" type="button">NO, CANCEL</button>
                <button onclick="deleteMessage()" class="delete-button" type="button">YES, DELETE</button>
        </div>
    <div/>    
</div>`

// score functions

window.minusScore=(event)=>{
    if(event.target.previousElementSibling.textContent<=0){
        return
    }else{
        event.target.previousElementSibling.textContent--;
    }
}
window.plusScore = (event)=>{
    event.target.nextElementSibling.textContent++
}
//button text send  function
window.sendText=()=>{
    idNumber++;
    const picture = data.currentUser.image.png;
    const name = data.currentUser.username;
    const textTime = "2 days ago";
    const score = 0; 
    const messageArea = document.getElementById("message-area").value;
    const trimMessageArea = messageArea.trim();
    let newMessage =MyMessage(picture,name,textTime,trimMessageArea,score);
    const textArea = document.getElementById("text-area");
    let MessageMainContainer = document.createElement('div');
    MessageMainContainer.classList="my-new-message";
    MessageMainContainer.innerHTML=newMessage;
    if(trimMessageArea!=""){
        let structuredNewMessage = structureForJson(trimMessageArea,textTime,score,picture,name)
        mainContainer.insertBefore(MessageMainContainer,textArea);
        document.getElementById("message-area").value="";
        data.comments.push(structuredNewMessage);
    }
}

// delete function
let clickedMessage;
window.deleteIcon=(event)=>{
    let deleteDiv = document.getElementById("delete-section-style");
    deleteDiv.style.display="flex";
    body.style.overflow ="hidden";
    clickedMessage=event.target;
}

window.closeDeleteSection=()=>{
    let deleteDiv = document.getElementById("delete-section-style");
    deleteDiv.style.display="none";
    body.style.overflow ="auto";
}

window.deleteMessage=()=>{
    let deleteDiv = document.getElementById("delete-section-style");
    deleteDiv.style.display="none";
    body.style.overflow ="auto";
    let mainMessageMother = clickedMessage.parentNode.parentNode.parentNode.parentNode;
    let messageId = mainMessageMother.firstElementChild.id;
    let replyMother =mainMessageMother.parentNode.parentNode.previousElementSibling.id;
    mainMessageMother.remove();
    if(replyMother===""){
        let messageDataIndex = data.comments.findIndex((element) =>element.id==messageId);
        data.comments.splice(messageDataIndex,1);
    }else{
        let replyMotherElement = data.comments.find((element) => element.id==replyMother);
        let replyMessageIndex = replyMotherElement.replies.findIndex((element) => element.id== messageId);
        replyMotherElement.replies.splice(replyMessageIndex,1);
    }
}

// edit function

window.editText=(event)=>{
    let messageTextElement = event.target.parentNode.parentNode.parentNode.previousElementSibling;
    let messageArea = document.createElement("textarea");
    console.log(event.target.parentNode.parentNode.parentNode.previousElementSibling)
    messageArea.classList="send-message";
    messageArea.setAttribute("rows","4");
    messageArea.setAttribute("cols","50");
    messageArea.value=messageTextElement.textContent;
    messageTextElement.parentNode.replaceChild(messageArea,messageTextElement)

}

mainContainer.innerHTML += DeleteSection;
let MessageMainContainerOne = document.createElement('div');
MessageMainContainerOne.classList="message-main-container";
let MessageMainContainerTwo = document.createElement('div');
MessageMainContainerTwo.classList="message-main-container";
for(let i = 0; i < data.comments.length; i++){
    const Picture = data.comments[i].user.image.png;
    const Name = data.comments[i].user.username;
    const TextTime = data.comments[i].createdAt;
    const Text = data.comments[i].content;
    const Score = data.comments[i].score;
    if(i===0){
        MessageMainContainerOne.innerHTML += markup(i+1,Picture,Name,TextTime,Text,Score);
    }else{
        MessageMainContainerTwo.innerHTML += markup(i+1,Picture,Name,TextTime,Text,Score);
    }
}
replyMainContainer.classList="reply-main-container";
let line = document.createElement('hr');
line.classList="reply-line";
replyMainContainer.appendChild(line)
let replyContainer = document.createElement('div');
replyContainer.classList="reply-container";
replyMainContainer.appendChild(replyContainer);
MessageMainContainerTwo.appendChild(replyMainContainer);
mainContainer.appendChild(MessageMainContainerOne);
mainContainer.appendChild(MessageMainContainerTwo);
for (let i = 0; i < data.comments[1].replies.length; i++){
    const Picture = data.comments[1].replies[i].user.image.png;
    const Name = data.comments[1].replies[i].user.username;
    const TextTime = data.comments[1].replies[i].createdAt;
    const Text = data.comments[1].replies[i].content;
    const Score = data.comments[1].replies[i].score;    
    if(i===0){
        replyContainer.innerHTML += replyMarkup(Picture,Name,TextTime,Text,Score);
    }else{
        let newMessage =MyMessage(Picture,Name,TextTime,Text,Score);
        let MessageMainContainer = document.createElement('div');
        MessageMainContainer.classList="my-new-message";
        MessageMainContainer.innerHTML=newMessage;
        replyContainer.appendChild(MessageMainContainer);
    }
}
mainContainer.innerHTML += MessageKeyboard;



