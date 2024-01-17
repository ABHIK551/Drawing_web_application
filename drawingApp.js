$(function(){
    $("#slider").slider({
        min:3,
        max:30,
        slide:function(e,ui){
           $("#circle").height(ui.value),
            $("#circle").width(ui.value)
        }
    });
//    declare variable
    
    //         paintingerasing or not
var paint = false;
    //         painting or erasing
var paint_erase = "paint";
    //         get the canvas and context
var canvas = document.getElementById('paint');
      var ctx = canvas.getContext('2d');
//         get the canvas and container
    var container = $(".container");
//         mousePosition
    var mouse = {x:0, y:0};
//   onLoad load saved worked form localStorage
    if(localStorage.getItem("imgCanvas")!=null){
       var img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 0, 0);
        }
        img.src = localStorage.getItem("imgCanvas");
    };
//    set drawing parameter(lineWidth, lineJoin, lijneCap)
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
//    click inside container
    container.mousedown(function(e){
       paint = true;
        
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x, mouse.y);
    });
//    Move the mouse while holding mouse key
    container.mousemove(function(e){
       
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint==true){
            if(paint_erase=="paint"){
                //get color input
                ctx.strokeStyle= $("#paintColor").val();
            }else{
                //white color
                ctx.strokeStyle= "white";
            }
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
//    mouse up-->we are not painthingerasing anymore
    container.mouseup(function(){
        paint = false;
    })
    
//    if we leave the container we are not painting anymore
     container.mouseleave(function(){
        paint = false;
    })
//    cl8ick on the reset button
    $("#reset").click(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        paint_erase ="paint";
        $("#erase").removeClass("ersoeMode");
    });
    
//    click on the save button
   $("#save").click(function(){
        if(typeof(localStorage)!=null){
        localStorage.setItem("imgCanvas", canvas.toDataURL());
            alert(localStorage.getItem("imgCanvas"))
    }else{
        alert("your devise or browser not support localStorage");
    }
   })
    
//    click on the erase buttoon
    $("#erase").click(function(){
        if(paint_erase == "paint"){
            paint_erase = "erase";
        }else{
            paint_erase ="paint";
        }
        $(this).toggleClass("ersoeMode");
    })
//    change color input
    $("#paintColor").change(function(){
        $("#circle").css("background-color", $(this).val());
    })
    
//    change lineWidth using slider
    $("#slider").slider({
        min:3,
        max:30,
        slide:function(e,ui){
           $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value
        }
         });
    
//    functions
})