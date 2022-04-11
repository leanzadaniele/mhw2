const checkedURL= "images/checked.png";
const uncheckedURL= "images/unchecked.png";

let AQ1; let valueQ1;
let AQ2; let valueQ2;
let AQ3; let valueQ3;

const Answers = document.querySelectorAll(".choice-grid div");
addListeners();

function addListeners(){
    for (const ans of Answers){
        ans.addEventListener("click", check);
    }
}


const resultDiv = document.querySelector("#result");
const resetBtn = resultDiv.querySelector("button");
resetBtn.addEventListener("click",resetQuiz);

function check(event) {
    const item = event.currentTarget;
    item.classList.remove('unselected');
    item.classList.add('selected');
    const check = item.querySelector(".checkbox");
    check.src = checkedURL;
    const qstId= event.currentTarget.dataset.questionId;
    const ansValue = event.currentTarget.dataset.choiceId;

    if(qstId==="one"){
        AQ1=item.id;
        valueQ1 = ansValue;
    }
    else if(qstId==="two"){
        AQ2=item.id;
        valueQ2 = ansValue;
    }
    else{
        AQ3=item.id;
        valueQ3 = ansValue;
    }

    adjustCss(item.id,qstId);
}


function adjustCss(id, qst){
    for(const ans of Answers){
        if(ans.id!==id && ans.dataset.questionId===qst){
            ans.classList.remove("selected");
            ans.classList.add("unselected");
            ans.querySelector(".checkbox").src=uncheckedURL;
        }
    }
    answeredAll();
}

function answeredAll(){
    if(AQ1 && AQ2 && AQ3){
        for(let ans of Answers){
            ans.removeEventListener("click",check);
        }
        if(valueQ1===valueQ2 || valueQ1===valueQ3){ //leggenda, se passo 1 : primo caso
            showResult(1);

        }
        else if(valueQ2===valueQ1 || valueQ2===valueQ3){ //..passo 2 : secondo caso
            showResult(2);

        }

        else if(valueQ1!==valueQ2 && valueQ2 !== valueQ3){ //..passo 3 : terzo caso
            showResult(3);

        }
    }
}

function showResult(val){
    resultDiv.classList.remove("hidden");
    if(val === 1){
        resultDiv.querySelector("h1").textContent=  RESULTS_MAP[valueQ1].title;
        resultDiv.querySelector("p").textContent=  RESULTS_MAP[valueQ1].contents;
    }
    else if(val === 2){
        resultDiv.querySelector("h1").textContent=  RESULTS_MAP[valueQ2].title;
        resultDiv.querySelector("p").textContent=  RESULTS_MAP[valueQ2].contents;
    }
    else{
        resultDiv.querySelector("h1").textContent=  RESULTS_MAP[valueQ1].title;
        resultDiv.querySelector("p").textContent=  RESULTS_MAP[valueQ1].contents;
    }

    document.body.scrollTop = (document.documentElement.scrollTop = document.documentElement.scrollHeight);
}

function resetQuiz(){
    addListeners();
    AQ1=undefined;
    AQ2=undefined;
    AQ3=undefined;
    for(let ans of Answers){
        ans.classList.remove("selected");
        ans.classList.remove("unselected");
        ans.querySelector(".checkbox").src=uncheckedURL;
        resultDiv.classList.add("hidden");
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
}