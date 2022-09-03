import data from './data.json' assert { type: 'json' }; 
const mainContainer = document.getElementById("main-container");
const body = document.getElementById("body");
let idNumber = 4;
// functions of markup
function markup(id,picture,name,time,text,score){ 
    return`
    <div id=${id} class="message-section">
    <div class="plus-minus-style-second"> 
                <img onclick="plusScore(event)"  alt="plus" class="plus-minus-icons plus" src="./assets/icon-plus.svg" />
                <span class="score">${score}</span>
                <img onclick="minusScore(event)" alt="minus" class="plus-minus-icons minus" src="./assets/icon-minus.svg" />
            </div>
        <div class = "header">
            <div class="message-header">
                <img alt = ${name} class="picture-styles" src=${picture}>
                <h1 class="Name-styles">${name}</h1>
                <span class="text-style">${time}</span>
            </div>
            <p class="text-style">
                ${text}
            </p>
        </div>    
        <div class="message-footer">
            <div class="plus-minus-style"> 
                <img onclick="plusScore(event)"  alt="plus" class="plus-minus-icons plus" src="./assets/icon-plus.svg" />
                <span class="score">${score}</span>
                <img onclick="minusScore(event)" alt="minus" class="plus-minus-icons minus" src="./assets/icon-minus.svg" />
            </div>
            <div class="reply-section">
                <button onclick="openReplySection(event,${id})" class="edit-button" type="button">
                    <img class="reply-img-style" alt="reply" src="./assets/icon-reply.svg"/>
                </button>
                <button onclick="openReplySection(event,${id})" class="edit-button" type="button">
                    <span>Reply</span>
                </button>
            </div>
        </div>
        <div class="reply-section-second">
                <button onclick="openReplySection(event,${id})" class="edit-button" type="button">
                    <img class="reply-img-style" alt="reply" src="./assets/icon-reply.svg"/>
                </button>
                <button onclick="openReplySection(event,${id})" class="edit-button" type="button">
                    <span>Reply</span>
                </button>
            </div>
    </div>`
};

function structureForJson(text,time,score,picture,name,replyingTo){
    return{
        "id": idNumber,
        "content":text,
        "createdAt": time,
        "score": score,
        "replyingTo":replyingTo,
        "user": {
          "image": { 
            "png": picture,
            "webp": "./assets/image-amyrobson.webp"
          },
          "username": name
        },
    }
}

function replyMarkup(id,picture,name,time,replyingTo,text,score){
    return`
    <div id=${id} class="message-reply-section">
            <div class="plus-minus-style-second"> 
                <img onclick="plusScore(event)"  alt="plus" class="plus-minus-icons" src="./assets/icon-plus.svg" />
                <span class="score">${score}</span>
                <img onclick="minusScore(event)" alt="minus" class="plus-minus-icons" src="./assets/icon-minus.svg" />
            </div> 
            <div class = "header">           
                <div class="message-header">
                    <img alt = ${name} class="picture-styles" src=${picture}>
                    <h1 class="Name-styles">${name}</h1>
                    <span class="text-style">${time}</span>
                    <div class="reply-section-third">
                        <button onclick="RepliedMessagesReplySection(event,${id})" class="edit-button" type="button">
                            <img class="reply-img-style" alt="reply" src="./assets/icon-reply.svg"/>
                        </button>
                        <button onclick="RepliedMessagesReplySection(event,${id})" class="edit-button" type="button">
                            <span>Reply</span>
                        </button>
                    </div>
                </div>
                <p class="text-style">
                <span class="replying-to">@${replyingTo}</span> ${text}
                </p>
            </div>
        <div class="message-reply-footer">
            <div class="plus-minus-style"> 
                <img onclick="plusScore(event)"  alt="plus" class="plus-minus-icons" src="./assets/icon-plus.svg" />
                <span class="score">${score}</span>
                <img onclick="minusScore(event)" alt="minus" class="plus-minus-icons" src="./assets/icon-minus.svg" />
            </div>
            <div class="reply-section">
                <button onclick="RepliedMessagesReplySection(event,${id})" class="edit-button" type="button">
                    <img class="reply-img-style" alt="reply" src="./assets/icon-reply.svg"/>
                </button>
                <button onclick="RepliedMessagesReplySection(event,${id})" class="edit-button" type="button">
                    <span>Reply</span>
                </button>
            </div>
        </div>
    </div>`
};

function MyReplyMessage(picture,name,time,text,score,replyingTo){
    return `
        <div class="plus-minus-style-second"> 
            <img onclick="plusScore(event)" alt="plus" class="plus-minus-icons" src="./assets/icon-plus.svg" />
            <span class='score'>${score}</span>
            <img onclick="minusScore(event)" alt="minus" class="plus-minus-icons" src="./assets/icon-minus.svg" />
        </div>
        <div class="header-my-message">
            <div id=${idNumber} class="message-header">
            <img alt = "${name}" class="picture-styles" src=${picture}>
            <div class="you-julius">
                <h1 class="Name-styles">${name}</h1>
                <div class="you-text">
                    <span>you</span>
                </div>
            </div>
                <span class="text-style">${time}</span>
                <div class="recycle-edit-buttons-second">
                <div class="edit-delete-style">
                    <button onclick="deleteIconOfReply(event)" type="button" class="recycle-bin">
                        <img alt="recycle-bin" src="./assets/icon-delete.svg"/>
                    </button>
                    <button onclick="deleteIconOfReply(event)" type="button" class="recycle-bin">
                        <span>Delete</span>
                    </button>
                </div>    
                <div class="edit-delete-style">
                    <button onclick="EditMyReplyText(event,${idNumber})" type="button" class="edit-button">
                        <img alt="edit" src="./assets/icon-edit.svg"/>
                    </button>
                    <button onclick="EditMyReplyText(event,${idNumber})" type="button" class="edit-button">
                        <span >Edit</span>
                    </button>
                </div>
            </div>
            </div>
            <p class="text-style">${replyingTo} ${text}</p>
        </div>
        <div class="reply-message-footer">
            <div class="plus-minus-style"> 
                <img onclick="plusScore(event)" alt="plus" class="plus-minus-icons" src="./assets/icon-plus.svg" />
                <span class='score'>${score}</span>
                <img onclick="minusScore(event)" alt="minus" class="plus-minus-icons" src="./assets/icon-minus.svg" />
            </div>
            <div class="recycle-edit-buttons">
                <div class="edit-delete-style">
                    <button onclick="deleteIconOfReply(event)" type="button" class="recycle-bin">
                        <img alt="recycle-bin" src="./assets/icon-delete.svg"/>
                    </button>
                    <button onclick="deleteIconOfReply(event)" type="button" class="recycle-bin">
                        <span>Delete</span>
                    </button>
                </div>    
                <div class="edit-delete-style">
                    <button onclick="EditMyReplyText(event,${idNumber})" type="button" class="edit-button">
                        <img alt="edit" src="./assets/icon-edit.svg"/>
                    </button>
                    <button onclick="EditMyReplyText(event,${idNumber})" type="button" class="edit-button">
                        <span >Edit</span>
                    </button>
                </div>
            </div>
        </div>`
};

function MyMessage(picture,name,time,text,score){
    return `
        <div class="plus-minus-style-second"> 
            <img onclick="plusScore(event)" alt="plus" class="plus-minus-icons" src="./assets/icon-plus.svg" />
            <span class='score'>${score}</span>
            <img onclick="minusScore(event)" alt="minus" class="plus-minus-icons" src="./assets/icon-minus.svg" />
        </div>
        <div>
        <div id=${idNumber} class="message-header">
            <img alt = "${name}" class="picture-styles" src=${picture}>
            <div class="you-julius">
                <h1 class="Name-styles">${name}</h1>
                <div class="you-text">
                    <span>you</span>
                </div>
                </div>
                <span class="text-style">${time}</span>
                <div class="recycle-edit-buttons-second-my">
                    <div class="edit-delete-style">
                        <button onclick="deleteIcon(event)" type="button" class="recycle-bin">
                            <img alt="recycle-bin" src="./assets/icon-delete.svg"/>
                        </button>
                        <button onclick="deleteIcon(event)" type="button" class="recycle-bin">
                            <span>Delete</span>
                        </button>
                    </div>    
                    <div class="edit-delete-style">
                        <button onclick="EditMyText(event,${idNumber})" type="button" class="edit-button">
                            <img alt="edit" src="./assets/icon-edit.svg"/>
                        </button>
                        <button onclick="EditMyText(event,${idNumber})" type="button" class="edit-button">
                            <span >Edit</span>
                        </button>
                    </div>
                </div>
            </div>
        <p class="my-message-style">${text}</p>
        </div>
        <div class="my-message-footer">
            <div class="plus-minus-style"> 
                <img onclick="plusScore(event)" alt="plus" class="plus-minus-icons" src="./assets/icon-plus.svg" />
                <span class='score'>${score}</span>
                <img onclick="minusScore(event)" alt="minus" class="plus-minus-icons" src="./assets/icon-minus.svg" />
            </div>
            <div class="recycle-edit-buttons">
            <div class="edit-delete-style">
                <button onclick="deleteIcon(event)" type="button" class="recycle-bin">
                    <img alt="recycle-bin" src="./assets/icon-delete.svg"/>
                </button>
                <button onclick="deleteIcon(event)" type="button" class="recycle-bin">
                    <span>Delete</span>
                </button>
                </div>    
                <div class="edit-delete-style">
                    <button onclick="EditMyText(event,${idNumber})" type="button" class="edit-button">
                        <img alt="edit" src="./assets/icon-edit.svg"/>
                    </button>
                    <button onclick="EditMyText(event,${idNumber})" type="button" class="edit-button">
                        <span >Edit</span>
                    </button>
            </div>
        </div>`
};


const MessageKeyboard = `<form class="text-area" id="text-area">
<img class="picture-styles picture-styles-second" alt="juliusomo" src="./assets/image-juliusomo.png"/>
<textarea id="message-area"  class="send-message"  rows="4" cols="50" placeholder="Add a comment…"></textarea>
<div class="text-area-footer">
    <img class="picture-styles" alt="juliusomo" src="./assets/image-juliusomo.png"/>
    <button onclick="sendText()"  class="send-button" type="button">SEND</button>
</div>
<button onclick="sendText()"  class="send-button send-button-second" type="button">SEND</button>
</form>`;

const newReplyMessageSection=`
    <img class="picture-styles-second" alt="image-juliusomo" src="./assets/image-juliusomo.png"/>
    <textarea id="message-area-reply"  class="new-reply-message-style"  rows="4" cols="50" placeholder="Add a comment…"></textarea>
    <div class="new-reply-footer">
        <img class="picture-styles" alt="image-juliusomo" src="./assets/image-juliusomo.png"/>
        <button onclick="replyButton(event)" class="send-button" type="button">REPLY</button>
    </div>
    <button onclick="replyButton(event)" class="send-button-second" type="button">REPLY</button>
    `

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
const DeleteSectionReply =`<div class="cover-div-reply" id="delete-section-reply" >
        <div class="delete-section-style" >
            <h2 class="delete-text-style">Delete comment</h2>
            <p class="text-style description">
                Are you sure you want to delete this comment? This will remove the comment and can’t be undone.
            </p>
            <div class="buttons-section">
                <button onclick="closeDeleteSectionReply()" class="cancel-button" type="button">NO, CANCEL</button>
                <button onclick="deleteMessageReply()" class="delete-button" type="button">YES, DELETE</button>
        </div>
    <div/>    
</div>`

// reply button functions
let clickedButtonParentIndex;
let clickedButtonParentIndexReply;
window.openReplySection=(event,id)=>{
    let width = screen.width;
    let replyMotherElement = data.comments.find((element) => element.id == id);
        clickedButtonParentIndex = id;
        let clickedButtonParent = document.getElementById(id)
        if(replyMotherElement.clickedOnReply!=true){
            if(event.target.tagName==="IMG"){
                event.target.style.transform = "rotate(-90deg)";
            }else{
                event.target.parentElement.previousElementSibling.firstElementChild.style.transform = "rotate(-90deg)"
            }
            let clickedDivParent = event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
            let clickedDivNextElement = clickedButtonParent.nextElementSibling;
            let replySectionParent = document.createElement("div");
            replySectionParent.classList="new-reply-window";
            replySectionParent.innerHTML = newReplyMessageSection;
            if(clickedDivNextElement===null){
                clickedDivParent.appendChild(replySectionParent);
            }else{
                let parentOfClickedTarget = clickedButtonParent.parentElement;
                parentOfClickedTarget.insertBefore(replySectionParent,clickedDivNextElement);
            }
            replyMotherElement.clickedOnReply=true;
        }else{
            let replySection = clickedButtonParent.nextElementSibling;
            

            replySection.remove();
            if(event.target.tagName==="IMG"){
                event.target.style.transform = "rotate(0deg)";
            }else{
            event.target.parentElement.previousElementSibling.firstElementChild.style.transform = "rotate(0deg)"
            }
            replyMotherElement.clickedOnReply=false;
        }
    let replyMessageValue
    if(width >= 1000){
        replyMessageValue = clickedButtonParent.nextElementSibling.children[1].value = "@" + replyMotherElement.user.username;
    }else{
        replyMessageValue = clickedButtonParent.nextElementSibling.children[1].value = "@" + replyMotherElement.user.username;
    }
    clickedButtonParentIndexReply = "";
}
let clickedOnReplyMessage=true;
window.RepliedMessagesReplySection=(event,id)=>{
    let width = screen.width;
    let parentDIV = document.getElementById(id);
    clickedButtonParentIndexReply = id;
    let parentOfClickedTarget = parentDIV.parentElement;
    if(clickedOnReplyMessage){
        if(event.target.tagName==="IMG"){
            event.target.style.transform = "rotate(-90deg)";
        }else{
            event.target.parentElement.previousElementSibling.firstElementChild.style.transform = "rotate(-90deg)"
        }
        let clickedDivNextElement = parentDIV.nextElementSibling;
        let replySectionParent = document.createElement("div");
        replySectionParent.classList="new-reply-window-second";
        replySectionParent.innerHTML = newReplyMessageSection;
        if(clickedDivNextElement!=null){
            parentOfClickedTarget.insertBefore(replySectionParent,clickedDivNextElement);
        }else{
            parentOfClickedTarget.appendChild(replySectionParent);
        }
        clickedOnReplyMessage=false;
    }else{
        clickedOnReplyMessage=true;
        const replySection = parentDIV.nextElementSibling;
        replySection.remove();
        if(event.target.tagName==="IMG"){
            event.target.style.transform = "rotate(0deg)";
        }else{
            event.target.parentElement.previousElementSibling.firstElementChild.style.transform = "rotate(0deg)"
        }
    }
    let parent = data.comments[1].replies[0].user.username
    let replyMessageValue = parentDIV.nextElementSibling.children[1].value = "@" + parent;
}
window.replyButton=(event)=>{
    idNumber++
    let width = screen.width;
    let whoIReplyingTo = document.getElementById(clickedButtonParentIndex);
    if(clickedButtonParentIndexReply===3){
        whoIReplyingTo = document.getElementById(clickedButtonParentIndexReply);
    }
    let replyButtonsParentsParent = event.target.parentElement.parentElement.parentElement;
    let replyButtonsParent = event.target.parentElement.parentElement;
    if(width >= 1000){
        replyButtonsParent = event.target.parentElement;
    }
    let replyImg = whoIReplyingTo.children[2].lastElementChild.firstElementChild.firstElementChild;
    if(width>=1000 && clickedButtonParentIndexReply<3){
        replyImg = whoIReplyingTo.children[3].firstElementChild.firstElementChild;
    }
    if(width>=1000 && clickedButtonParentIndexReply>2){
        replyImg = whoIReplyingTo.children[1].firstElementChild.lastElementChild.firstElementChild.firstElementChild;
        replyButtonsParentsParent = event.target.parentElement.parentElement;
    }
    let replyingTo ; 
    if(clickedButtonParentIndexReply<3){
        let messageDataIndex = data.comments.find((element) => element.id==clickedButtonParentIndex);
        replyingTo = messageDataIndex.user.username;
    }else{
        let messageDataIndex = data.comments[1].replies.find((element) => element.id==clickedButtonParentIndexReply);
        replyingTo = messageDataIndex.user.username;
    }
    const picture = data.currentUser.image.png;
    const name = data.currentUser.username;
    const time ="Just now";
    const score = 0;
    let replyMessage = event.target.parentElement.previousElementSibling.value;
    if(width>1000){
        replyMessage = event.target.parentElement.children[1].value;
    }
    let arr = replyMessage.split(" ");
    let newArray = [];
    for(let i = 0; i < arr.length; i++){
        let word = arr[i];
        if(word[0]==="@"){
            newArray.push(`<span class="replying-to">${word}</span>`);
            continue
        }
        newArray.push(word);
    }
    let clickedDivNextElement = event.target.parentElement.parentElement.nextElementSibling;
    if(width >= 1000){
        clickedDivNextElement = event.target.parentElement.parentElement.children[2];
    }
    
    let replySection = MyReplyMessage(picture,name,time,newArray.join(" "),score,"");
    let MessageMainContainer = document.createElement('div');
    MessageMainContainer.classList="my-reply-message";
    MessageMainContainer.innerHTML=replySection;
    if(replyMessage!=""){
        if(clickedButtonParentIndexReply<3){
            if(clickedDivNextElement!=null){
                if(width>=1000){
                    clickedDivNextElement.children[1].prepend(MessageMainContainer);
                }else{
                    clickedDivNextElement.children[1].prepend(MessageMainContainer);
                }
                
            }else{
                replyButtonsParentsParent.appendChild(MessageMainContainer);
            }
        }
        if(clickedButtonParentIndexReply>2){
            if(clickedDivNextElement!=null){
                replyButtonsParentsParent.insertBefore(MessageMainContainer,clickedDivNextElement);
            }else{
                replyButtonsParentsParent.appendChild(MessageMainContainer);
            }
        }
        replyImg.style.transform = "rotate(0deg)";
        replyButtonsParent.remove();
        clickedOnReplyMessage=true;
        data.comments[0].clickedOnReply="false";
        data.comments[1].clickedOnReply="false";
        let newReplyJsonMessage = structureForJson(replyMessage,time,score,picture,name,replyingTo);
        if(clickedButtonParentIndexReply<3){
            let messageDataIndex = data.comments.find((element) => element.id==clickedButtonParentIndex);
            messageDataIndex.replies.push(newReplyJsonMessage);
        }
    }
}
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
    const textTime = "Just now";
    const score = 0; 
    const messageArea = document.getElementById("message-area").value;
    const trimMessageArea = messageArea.trim();
    let newMessage = MyMessage(picture,name,textTime,trimMessageArea,score);
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

// delete function for my message
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
    let width = screen.width;
    let deleteDiv = document.getElementById("delete-section-style");
    deleteDiv.style.display="none";
    body.style.overflow ="auto";
    let mainMessageMother;
    if(width>=1000){
        mainMessageMother = clickedMessage.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    }else{
        mainMessageMother = clickedMessage.parentElement.parentElement.parentElement.parentElement.parentElement;
    }
    
    let messageId = mainMessageMother.firstElementChild.id;
    mainMessageMother.remove();
    let messageDataIndex = data.comments.findIndex((element) => element.id==messageId);
    data.comments.splice(messageDataIndex,1);
}

// delete function for my message reply
let clickedMessageReply;
window.deleteIconOfReply=(event)=>{
    let deleteDiv = document.getElementById("delete-section-reply");
    deleteDiv.style.display="flex";
    body.style.overflow ="hidden";
    clickedMessageReply=event.target;
}

window.closeDeleteSectionReply=()=>{
    let deleteDiv = document.getElementById("delete-section-reply");
    deleteDiv.style.display="none";
    body.style.overflow ="auto";
}

window.deleteMessageReply=()=>{
    let width = screen.width;
    let deleteDiv = document.getElementById("delete-section-reply");
    deleteDiv.style.display="none";
    body.style.overflow ="auto";
    let mainMessageMother;
    if(width>=1000){
        mainMessageMother = clickedMessageReply.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
    }else{
        mainMessageMother = clickedMessageReply.parentElement.parentElement.parentElement.parentElement.parentElement;
    }
    let messageId = mainMessageMother.firstElementChild.id;
    let replyMother = mainMessageMother.parentElement.parentElement.previousElementSibling.id;
    mainMessageMother.remove();
    let replyMotherElement = data.comments.find((element) => element.id == replyMother);
    let replyMessageIndex = replyMotherElement.replies.findIndex((element) => element.id == messageId);
    replyMotherElement.replies.splice(replyMessageIndex,1);
}

// edit function for my message
window.EditMyText=(event,id)=>{
    let width = screen.width;
    let messageTextElement;
    if(width>=1000){
        messageTextElement = event.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling;
    }else{
        messageTextElement = event.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.lastElementChild
    }
    let messageArea = document.createElement("textarea");
    messageArea.classList="send-message";
    messageArea.setAttribute("rows","4");
    messageArea.setAttribute("cols","50");
    messageArea.value=messageTextElement.textContent;
    messageTextElement.parentElement.replaceChild(messageArea,messageTextElement);
    let updateButton = document.createElement("button");
    updateButton.classList="update-button-style";
    updateButton.setAttribute("id","updateButton");
    updateButton.textContent="UPDATE";
    let deleteRecycleMotherDiv = event.target.parentElement.parentElement.parentElement;
    deleteRecycleMotherDiv.appendChild(updateButton);
    let editText = event.target.parentElement;
    let editImg = event.target.parentElement.previousElementSibling;
    let deleteText = event.target.parentElement.parentElement.previousElementSibling.firstElementChild;
    let deleteImg = event.target.parentElement.parentElement.previousElementSibling.firstElementChild.nextElementSibling;      
    if(event.target.tagName==="IMG"){
         editText = event.target.parentElement.nextElementSibling;
         editImg = event.target.parentElement;
    }
    editText.style.display ="none";
    editImg .style.display ="none";
    deleteText .style.display ="none";
    deleteImg .style.display ="none";
    updateButton.addEventListener("click",(event)=>{
        if(messageArea.value!=""){
            event.target.style.display = "none";
            editText.style.display ="block";
            editImg .style.display ="block";
            deleteText .style.display ="block";
            deleteImg .style.display ="block";
            let newParagraph = document.createElement("p");
            newParagraph.classList="text-style";
            let arr = messageArea.value.split(" ")
            let newArray = [];
            for(let i = 0; i < arr.length; i++){
                let word = arr[i];
                if(word[0]==="@"){
                    newArray.push(`<span class="replying-to">${word}</span>`);
                    continue
                }
                newArray.push(word);
            }
            newParagraph.innerHTML=newArray.join(" ");
            messageArea.parentElement.replaceChild(newParagraph,messageArea);
            let indexOfSection = id;
            let addressOfSectionInData = data.comments.find((element) => element.id==indexOfSection);
            addressOfSectionInData.content=newParagraph.textContent;
        }
    })
}
// edit function for my message REPLY
window.EditMyReplyText=(event,id)=>{
    let width = screen.width;
    let messageTextElement ;
    if(width>=1000){
        messageTextElement = event.target.parentElement.parentElement.parentElement.parentElement.nextElementSibling;
    }else{
        messageTextElement = event.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.lastElementChild
    }
    
    let messageArea = document.createElement("textarea");
    messageArea.classList="send-message";
    messageArea.setAttribute("rows","4");
    messageArea.setAttribute("cols","50");
    messageArea.value=messageTextElement.textContent;
    messageTextElement.parentElement.replaceChild(messageArea,messageTextElement);
    let updateButton = document.createElement("button");
    updateButton.classList="update-button-style";
    updateButton.textContent="UPDATE";
    let deleteRecycleMotherDiv = event.target.parentElement.parentElement.parentElement;
    deleteRecycleMotherDiv.appendChild(updateButton);
    let editText = event.target.parentElement;
    let editImg = event.target.parentElement.previousElementSibling;
    let deleteText = event.target.parentElement.parentElement.previousElementSibling.firstElementChild;
    let deleteImg = event.target.parentElement.parentElement.previousElementSibling.firstElementChild.nextElementSibling;      
    if(event.target.tagName==="IMG"){
         editText = event.target.parentElement.nextElementSibling;
         editImg = event.target.parentElement;
    }
    editText.style.display ="none";
    editImg .style.display ="none";
    deleteText .style.display ="none";
    deleteImg .style.display ="none";
    updateButton.addEventListener("click",(event)=>{
        if(messageArea.value!=""){
            event.target.style.display = "none";
            editText.style.display ="block";
            editImg .style.display ="block";
            deleteText .style.display ="block";
            deleteImg .style.display ="block";
            let newParagraph = document.createElement("p");
            newParagraph.classList="text-style";
            let arr = messageArea.value.split(" ")
            let newArray = [];
            for(let i = 0; i < arr.length; i++){
                let word = arr[i];
                if(word[0]==="@"){
                    newArray.push(`<span class="replying-to">${word}</span>`);
                    continue
                }
                newArray.push(word);
            }
            newParagraph.innerHTML=newArray.join(" ");
            messageArea.parentElement.replaceChild(newParagraph,messageArea);
            let indexOfSectionParent = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.id;
            let indexOfSection = id;
            if(clickedButtonParentIndexReply<3){
                let addressOfParentInData = data.comments.find((element) => element.id==indexOfSectionParent);
                let addressOfSectionInData = addressOfParentInData.replies.findIndex((element) => element.id==indexOfSection);
                addressOfParentInData.replies[addressOfSectionInData].content=newParagraph.textContent;
            }
        }
    })
}

mainContainer.innerHTML += DeleteSection;
mainContainer.innerHTML += DeleteSectionReply;
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
const replyMainContainer = document.createElement("div");
replyMainContainer.classList="reply-main-container";
let line = document.createElement('hr');
line.classList="reply-line";
replyMainContainer.appendChild(line)
let replyContainer = document.createElement('div');
replyContainer.classList="reply-container";
replyMainContainer.appendChild(replyContainer);

const replyMainContainer1 = document.createElement("div");
replyMainContainer1.classList="reply-main-container";
let line1 = document.createElement('hr');
line1.classList="reply-line";
replyMainContainer1.appendChild(line1)
let replyContainer1 = document.createElement('div');
replyContainer1.classList="reply-container";
replyMainContainer1.appendChild(replyContainer1);

MessageMainContainerOne.appendChild(replyMainContainer1);
MessageMainContainerTwo.appendChild(replyMainContainer);
mainContainer.appendChild(MessageMainContainerOne);
mainContainer.appendChild(MessageMainContainerTwo);
for (let i = 0; i < data.comments[1].replies.length; i++){
    const Picture = data.comments[1].replies[i].user.image.png;
    const Name = data.comments[1].replies[i].user.username;
    const TextTime = data.comments[1].replies[i].createdAt;
    const replyingTo = data.comments[1].replies[i].replyingTo;
    const Text = data.comments[1].replies[i].content;
    const Score = data.comments[1].replies[i].score;
    const replyingName =`<span class="replying-to">@${replyingTo}</span>`  
    if(i===0){
        replyContainer.innerHTML += replyMarkup(3,Picture,Name,TextTime,replyingTo,Text,Score);
    }else{
        let newMessage =MyReplyMessage(Picture,Name,TextTime,Text,Score,replyingName);
        let MessageMainContainer = document.createElement('div');
        MessageMainContainer.classList="my-reply-message";
        MessageMainContainer.innerHTML=newMessage;
        replyContainer.appendChild(MessageMainContainer);
    }
}
mainContainer.innerHTML += MessageKeyboard;



