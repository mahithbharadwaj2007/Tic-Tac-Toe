let boxes=document.querySelectorAll(".box");
let reset=document.querySelector(".reset")
let start=document.querySelector(".start")
let msg=document.querySelector(".msg")
let newGame=document.querySelector(".newGame")

start.addEventListener("click",()=>{
    start.style.display="none"
    document.querySelector(".container").classList.remove("hidden")
    reset.classList.remove("hidden")
})

const winning=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]

// Working

let disable=()=>{
    boxes.forEach((box)=>{
     box.disabled=true
     box.style.pointerEvents="none"
    })
}
let enable=()=>{
    boxes.forEach((box)=>{
     box.innerText=''
     box.disabled=false
     box.style.pointerEvents=""
    })
}
let win=false
let turnX=true;
boxes.forEach((box)=>{
    box.addEventListener("mouseenter",()=>{
        if(turnX){
            box.style.backgroundColor="rgba(168, 221, 254, 1)"
        }
        else{
            box.style.backgroundColor="rgba(254, 168, 234, 1)"
        }
        
    })
    box.addEventListener("mouseleave",()=>{
        box.style.backgroundColor="rgb(255, 255, 255)"
        // box.style.backgroundColor="black"
    })
    box.addEventListener("click",()=>{
        if(turnX){
            box.style.color="rgb(6,3,104)";
            box.innerText="X"
            turnX=false
        } else{
            box.style.color="rgba(136, 7, 80, 1)";
            // box.style.color="rgba(252, 251, 252, 1)";
            // box.style.textShadow=" 0 0 1rem rgba(252, 5, 157, 0.99),0 0 1rem rgba(249, 126, 212, 0.97);"
            box.innerText="O"
            turnX=true
        }
        box.disabled=true;
        checkWin();
    })
})


//Check winner

const checkWin=()=>{
    for(let patterns of winning){
        let val1=boxes[patterns[0]].innerText
        let val2=boxes[patterns[1]].innerText
        let val3=boxes[patterns[2]].innerText

        if(val1!=''&&val2!=''&&val3!=''){
            if(val1==val2 && val2==val3){
                win=true
                winner(val1)
                disable()
                return
            }
        }
    }
    let allFilled = true
    boxes.forEach((box)=>{
        if(box.innerText===""){
            allFilled=false
        }
    })
    if(win==false&&allFilled==true){
        msg.classList.remove("hidden")
        msg.innerText="Match Drawn"
        newGame.classList.remove("hidden")
        reset.classList.add("hidden") 
        disable();      
    }
}

let winner=(val1)=>{
    msg.classList.remove("hidden")
    msg.innerText=`Congratulations, Winner is ${val1}`
    newGame.classList.remove("hidden")
    reset.classList.add("hidden")
}

//New Game
newGame.addEventListener("click",()=>{
    resetFunc()
    newGame.classList.add("hidden")
    msg.classList.add("hidden")
    reset.classList.remove("hidden")
    enable()
})

//Reset

const resetFunc=()=>{
     turnX=true;
     win=false
     enable()
}

reset.addEventListener("mouseenter",()=>{
    reset.style.backgroundColor=" rgba(168, 221, 254, 1)"
})
reset.addEventListener("mouseleave",()=>{
    reset.style.backgroundColor=" rgb(255, 255, 255)"
})
reset.addEventListener("click",()=>{
    resetFunc();
})

