var draggables = document.querySelectorAll('.draggable');
var mouse = {
    //x: pageX,
    //y: pageY
}
for (var i = 0; i < draggables.length; i++){
    draggables[i].style.position = 'relative';
    draggables[i].style.cursor = '-webkit-grab';
   
    draggables[i].addEventListener('mousedown',function(){
        this.style.cursor = '-webkit-grabbing';
    });

    
}