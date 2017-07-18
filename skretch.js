var drawing=false;		//true while mouse is pressed over the canvas
var drawables=[];			//array of objects to draw
var currentdraw=null;		//the object currently drawn
var mode="line";			//drawMode (
												//Line,			A Single Line
												//rect,			A Rectangular shape between start and end point 	
												//lines,		Manny Lines in a Row Also known as Brush
												//ellipse,	A Ellipse with its center at the beginning
												//ellipse2	A Ellipse between start and Endpoint
var selected=0;				//hold the position of the selected Onject in drawables , back or new
var backColor="#FF0000";	//stores the Backgroundcollor

/*-----------------------------------------------------------------------------------*/  
//Name:		setup()
//Use:		initialisation function of p5
function setup() { 					// The Setup function of p5
  createCanvas(400, 400);		// Creates the Canvas to draw on
}  

/*---------------------------------------------------------------------------------------*/
//Name:		draw()
//Use:		periodically (de:aufgerufene) function for drawing on the canvas
function draw() { 
  background(color(backColor)); 				//fills the background with backColor
  drawables.forEach(function(element){	//foreach lopp for drawing each drawable
   element.draw(); 											//draw the current drawable
  });
  
  if( drawing)
    currentdraw.show(mouseX,mouseY);		//draws the privew of the current drawable
}
/*---------------------------------------------------------------------------*/
//Name:		mouseInCan()
//Use:		returns true if the mouse is inside the canvas otherwise false
function mouseInCan(){
 return (mouseX>1&mouseX<width&mouseY>0&mouseY<height); 	//compares the mouse position with the canvas
}
/*------------------------------------------------------------------------------*/
//Name:		touchStarted()
//UsE:		Function called by p5 when the mouse gets pressed or the touchscreen touch begins.
//					Creates a new object to draw according to the drawmode
function touchStarted() {
  if(mouseInCan()){			//if the mouse is inside the canvas
    drawing=true;				//drawing is enabled
  switch(mode){					//diferentiate the drawmodes
    case "ellipse":			//drawing an ecipse with the beginning in the center
      console.log("start ellipse");
      currentdraw=new Ellipse(		//creating a new Ellipse
        		createVector(mouseX,mouseY),		// start position
        		color(document.getElementById("html5colorpicker").value),	//take the color from the colorpicker
          	document.getElementById("width").value					//takes the width from the slider
      );
      break;	
    case "line":			//drawing a line
      console.log("start line");
      currentdraw=new Line(createVector(mouseX,mouseY),color(document.getElementById("html5colorpicker").value),document.getElementById("width").value);
    	break;
    case "lines":			//drawing Lines
      console.log("start lines");
      currentdraw=new Lines(createVector(mouseX,mouseY),color(document.getElementById("html5colorpicker").value),document.getElementById("width").value);
      break;
    case "rect":			//drawing a rectangle
      console.log("start rect");
      currentdraw=new Rect(createVector(mouseX,mouseY),color(document.getElementById("html5colorpicker").value),document.getElementById("width").value);
      break;
    case "ellipse2":	//drawing a ellipse inbetween start and end point
      console.log("start ellipse2");
      currentdraw=new Ellipse2(createVector(mouseX,mouseY),color(document.getElementById("html5colorpicker").value),document.getElementById("width").value);
      break;
     	}
  }
}

/*-------------------------------------------------------*/
//Name:		touchEnded()
//Use:		called by p5 when mouse is released or the touchscreen is released
//					finalizes the object to draw and put it onto the stack
function touchEnded(){
  //console.log(currentdraw.isfinal);
  if(!currentdraw.isfinal){
  currentdraw.final(mouseX,mouseY);
  drawing=false;
  drawables.push(currentdraw);
  //currentdraw=null;
  drawsDisplay();
  selected="new";
  document.getElementById("thingName").text=drawables[selected].name;
  console.log("stop drawing");
 }
}

/*------------------------------------------------------------*/
//Name:		iEllipse()
//Use:		called by the circleimage's onClick tag
//					sets the drawmode to eclipse
function iEllipse(){
  mode="ellipse";
 console.log("Tool changes to "+ mode); 
}
/*--------------------------------------------------------------*/
//Name:		iEllipse2()
//Use:		called  by the second circleimage's onClick tag
//					sets the drawmode to eclipse2
function iEllipse2(){
  mode="ellipse2";
  console.log("Tool changes to "+ mode); 
}
/*----------------------------------------------------------------*/
//Name:		iLine()
//Use:		called  by the Lineimage's onClick tag
//					sets the drawmode to line
function iLine(){
  mode="line";
 console.log("Tool changes to "+ mode); 
}
/*------------------------------------------------------------------*/
//Name:		iLines()
//Use:		called  by the linesimage's onClick tag
//					sets the drawmode to lines
function iLines(){
  mode="lines";
 console.log("Tool changes to "+ mode); 
}
/*--------------------------------------------------------------------*/
//Name:		iRect()
//Use:		called  by the Rectimage's onClick tag
//					sets the drawmode to rect
function iRect(){
  mode="rect";
 console.log("Tool changes to "+ mode); 
}
/*-------------------------------------------------------------------*/
//Name:		iPxel()		#Unused
//Use:		called  by the Pensilimage's onClick tag
//					sets the drawmode to pixel
function iPixel(){
  mode="pixel";
 console.log("Tool changes to "+ mode); 
}
/*------------------------------------------------------------------*/
//Name:		iBack()
//Use:		called  by the Backimage's onClick tag
//					removes the last drawn object from the stack
function iBack(){
  drawables.pop();
  drawsDisplay(); 
  console.log("last action removed");
}
/*---------------------------------------------------------------------*/
//Name:		iSave()
//Use:		called  by the Saveimages onClick tag
//					Saves the Canvas as Image
function iSave(){ 
  saveCanvas();
}
/*--------------------------------------------------------------------------*/
//Name:		iNew()
//Use:		called  by the Newimage's onClick tag
//					clears the stack
function iNew(){
  drawables=[];
  drawsDisplay(); 
}
/*------------------------------------------------------------------*/
//Name:		resize()
//Use:		called  by one of the size inputs's onChange tag
//					changes the size of the canvas
function resize(){
	var sx=int( document.getElementById("X").value) ;
  var sy=int( document.getElementById("Y").value );
  resizeCanvas(sx ,sy);
  background(220);
  console.log("canvas set to "+sx+":"+sy);
}
/*-------------------------------------------------------------------------*/
//Name:		clickcolor()
//Use:		called by the colorpickers onChange tag
//					sets the collor of the selected object or background
function clickColor() {
    var c;
        c = document.getElementById("html5colorpicker").value;
  	if(selected>=0) drawables[selected].color=color(c);
  console.log("srokem color set to: "+c);
  	if(selected=="back") backColor= document.getElementById("html5colorpicker").value;
  console.log(selected);
}
 /*---------------------------------------------------------------------------*/
//Name:		resizeStroke()
//Use:		called by the tag range inputs onChange tag
//					sets the drawmode to eclipse2
function resizeStroke(){
  var c=document.getElementById("width").value;
  if(selected>=0) drawables[selected].width=c;
  //console.log
  }
/*---------------------------------------------------------------------------*/
//Name:		drawsDisplay()
//Use:		updates the list of drawn objects
function drawsDisplay(){
 	var out ="";
  for(var i=0;i<drawables.length;i+=1){
   out+="<option value='"+i+"'>"+i+":"+drawables[i].name+"</option>";
  }
  out="<option value='back'>background</option>"+out+"<option value='new'> new </option>";
  console.log(out);
  document.getElementById("things").innerHTML=out;
}
/*--------------------------------------------------------------------*/
//Name:		chooseThing()
//Use:		called by the onChange tag from the object diplayer
//					sets the selected variable and color, Name and width of the GUI
function chooseThing(){
  if(selected>=0) drawables[selected].selected=false;
  selected=document.getElementById("things").value;
  	
  if(document.getElementById("things").value>=0){
  	document.getElementById("width").disabled=false;
  	document.getElementById("thingName").value=drawables[selected].name;
  	document.getElementById("width").value=drawables[selected].width;
    var c="#"+ 
      intToHex(red(		drawables[selected].color),16,2)+
      intToHex(green(	drawables[selected].color),16,2)+
      intToHex(blue(	drawables[selected].color),16,2);
    document.getElementById("html5colorpicker").value=c;
    console.log(selected+""+document.getElementById("things").value+" "+c+drawables[selected].color)
  	drawables[selected].selected=true;
  }else{
    switch(document.getElementById("things").value){
     case "back":
      document.getElementById("width").disabled=true;
        document.getElementById("thingName").value="background";
     document.getElementById("html5colorpicker").value=backColor;
     break; 
     case "new":
        document.getElementById("thingName").value="New";
        document.getElementById("width").disabled=false;
       break;
   }
  }
}
/*---------------------------------------------------------------------*/
//Name:		renameThing()
//Use:		called by the onChange tag of the textinput displaying the object name
//					changes the name of the selected object
function renameThing(){
  drawables[selected].name=document.getElementById("thingName").value;
  drawsDisplay();
}
/*------------------------------------------------------------------------*/
//Name:		intToHex
//Use:		returns the string of an number with difrent bases and minimal length.
//Param:	number:
//				base:
//				stellen:
function intToHex(number, base=10,stellen=0){
    var b="";
  if(stellen>0){
     var s;
    
    	s= number.toString(base).length;
    console.log(number+","+s+","+stellen);
    for(var i=0;s+i<stellen;i+=11){
        b+="0";
        }
  }else{
    
  }
  return b+number.toString(base).toUpperCase();
}

/*------------------------------------------------------------------*/
//Name:		colorInvert(color)
//Use:		inverts the given color
//Parm:		color:	the reference color
//				return:	the inverted color
function colorInvert(ccolor){
  console.log(hue(ccolor))
  return color('hsl('+360-hue(ccolor)+', '+100-saturation(ccolor)+'%, '+100-lightness(ccolor)+'%)')
  //return color(255-red(ccolor),255-green(ccolor),255-blue(ccolor));
}
