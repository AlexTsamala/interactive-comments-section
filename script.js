import data from './data.json' assert { type: 'json' }; 
const mainContainer = document.getElementById("main-container");
const replyMainContainer = document.createElement("div");
const MessageKeyboard = `<form class="text-area">
<textarea class="send-message"  rows="4" cols="50" placeholder="Add a comment…"></textarea>
<div class="text-area-footer">
    <img class="picture-styles" alt="juliusomo" src="./assets/image-juliusomo.png"/>
    <button class="send-button" type="button">SEND</button>
</div>
</form>`;
const DeleteSection =`<div class="delete-section-style">
<h2 class="delete-text-style">Delete comment</h2>
<p class="text-style description">
    Are you sure you want to delete this comment? This will remove the comment and can’t be undone.
</p>
<div class="buttons-section">
    <button class="cancel-button" type="button">NO, CANCEL</button>
    <button class="delete-button" type="button">YES, DELETE</button>
</div>
</div>`
mainContainer.innerHTML += DeleteSection;
function markup(picture,name,time,text,score){ 
    return`
    <div class="message-section">
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
                <img alt="plus" class="plus-minus-icons" src="./assets/icon-plus.svg" />
                <span>${score}</span>
                <img alt="minus" class="plus-minus-icons" src="./assets/icon-minus.svg" />
            </div>
            <div class="reply-section">
                <img class="reply-img-style" alt="reply" src="./assets/icon-reply.svg"/>
                <span>Reply</span>
            </div>
        </div>
    </div>`
};

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
                <img alt="plus" class="plus-minus-icons" src="./assets/icon-plus.svg" />
                <span>${score}</span>
                <img alt="minus" class="plus-minus-icons" src="./assets/icon-minus.svg" />
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
    <div class="message-reply-section">
        <div class="message-header">
            <img alt = "${name}" class="picture-styles" src=${picture}>
            <div class="you-julius">
                <h1 class="Name-styles">${name}</h1>
                <div class="you-text">
                    <span>you</span>
                </div>
            </div>
            <span class="text-style">${time}</span>
        </div>
        <p class="text-style">
            ${text}
        </p>
        <div class="you-message-footer">
            <div class="plus-minus-style"> 
                <img alt="plus" class="plus-minus-icons" src="./assets/icon-plus.svg" />
                <span>${score}</span>
                <img alt="minus" class="plus-minus-icons" src="./assets/icon-minus.svg" />
            </div>
            <div class="recycle-edit-buttons">
                <button type="button" class="recycle-bin">
                    <img alt="recycle-bin" src="./assets/icon-delete.svg"/>
                    <span>Delete</span>
                </button>
                <button type="button" class="edit-button">
                    <img alt="recycle-bin" src="./assets/icon-edit.svg"/>
                    <span>Edit</span>
                </button>
            </div>
        </div>
    </div>`
};



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
        MessageMainContainerOne.innerHTML += markup(Picture,Name,TextTime,Text,Score);
    }else{
        MessageMainContainerTwo.innerHTML += markup(Picture,Name,TextTime,Text,Score);
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
        replyContainer.innerHTML += MyMessage(Picture,Name,TextTime,Text,Score);
    }
}
mainContainer.innerHTML += MessageKeyboard;

