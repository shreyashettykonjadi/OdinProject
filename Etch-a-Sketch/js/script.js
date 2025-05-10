let Rainbow=false;
let Eraser=false;

document.querySelector('.buttons').addEventListener('click',function(e){
    if(e.target.tagName==='BUTTON'){
        let buttonClicked = e.target.textContent
        switch(buttonClicked){
            case 'Edit grid':
                editGrid();
                break;
            case 'Rainbow':
                rainbow();
                break;
            case 'Reset':
                reset();
                break;
            case 'Start':
                start();
                break;
            case 'Eraser':
                eraser();
                break;
        }
    }
});

function start(){
    let defaultSize=25
    editGrid(defaultSize);
}

function editGrid(defaultSize){
    reset()
    let size
    if(!defaultSize){  //if default size=0 or null
        do{
            size=prompt('Enter number of squares per side')
            if(!(size>0 && size<=100)){   // size less than 0 or more than 100 or not a number
                alert('Invalid size')
            }
        }while(size<0 || size>100);
    }else{
        size=defaultSize;
    }

    const sketchPad=document.querySelector('.sketchPad')
    for(let i=0;i<size;i++){
        const line =document.createElement('div');
        line.style.boxSizing='border-box'
        line.style.width=`${sketchPad.clientWidth}px`;
        line.style.height=`${sketchPad.clientHeight / size}px`;
        line.style.display='flex'
        line.classList.add('line');

        for(let j=0;j<size;j++){
            const div=document.createElement('div');
            div.classList.add('square');
            div.style.boxSizing='border-box'
            div.style.border='0.5px solid black'
            div.style.width=`${sketchPad.clientWidth / size}px`;
            div.style.height=`${sketchPad.clientHeight / size}px`;
            line.appendChild(div);
        }
        sketchPad.appendChild(line)
    }
}

function reset(){
    const sketchPad=document.querySelector('.sketchPad')
    sketchPad.innerHTML=''
    sketchPad.removeAttribute('style')
    Rainbow=false
    Eraser=false
}

function rainbow(){
    Eraser=false
    Rainbow=true;
}

document.querySelector('.sketchPad').addEventListener('mouseover',function(e){
    if(e.target.classList.contains('square')){
        e.target.style.backgroundColor=getColor(Rainbow,Eraser);
    }
});

function getColor(choice,eraser){
    if(eraser){
        return 'white'
    }
    if(!choice){
        return 'black'
    }
    if(choice){
        let randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        console.log('randomness')//
        return randomColor
    }
}

function eraser(){
    Eraser=!Eraser
}