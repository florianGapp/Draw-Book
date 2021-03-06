function JsonFromVector(v){
  return '{"type":"vector","x":'+v.x+',"y":'+v.y+',"z":'+v.z+'}';
}

function JsonFromColor(c){
 return '{"type":"color","r":'+red(c)+',"g":'+green(c)+',"b":'+blue(c)+',"a":'+alpha(c)+'}'; 
}

function createDrawableFromJson(json){
 switch(json.type){
     
     case "Line":
     break;
     
     case "Ellipse":
     break;
		}
}

function Line(bbegin,ccolor,wwidth){
	this.width=wwidth;
  this.begin=bbegin;
  this.end=createVector(0,0); 
  this.color=ccolor;
  this.name="Line";
  this.isfinal=false;
  this.selected=false;
  this.inverted=false;
  
  this.tojson=function(){
   return '{"type":"Line",'+
     '"width":'+this.width+','+
     '"begin":'+JsonFromVector(this.begin)+','+
     '"end":'+JsonFromVector(this.end)+','+
     '"color":'+JsonFromColor(this.color)+','+
     '"name":"'+this.name+'",'+
     '"isfinal":'+this.isfinal+','+
     '"selected":'+this.selected+',"inverted":'+this.inverted+'}'; 
	var f=7;
	}
	
  
  this.show=function(xx,yy){
    stroke(this.color);
    strokeWeight(this.width);
   line(this.begin.x,this.begin.y,xx,yy);
  }
  this.draw=function(){
    if(this.selected){
      if(this.inverted){
    		stroke(colorInvert(this.color)); 
        this.inverted=!this.inverted;
      }else{
    		stroke(this.color);
        this.inverted=!this.inverted;
      }
    }else{
    	stroke(this.color);
    }
    strokeWeight(this.width);
   line(this.begin.x,this.begin.y,this.end.x,this.end.y);
  }
  this.final=function(xx,yy){
    this.end=createVector(xx,yy);
    this.isfinal=true;
  }
}


function Pixel(){
  this.draw=function(){
    
  }
  
}

function Ellipse(bbegin,ccolor,wwidth){
	this.width=wwidth;
  this.begin=bbegin;
  this.end=createVector(0,0);
  this.width=wwidth;
  this.color=ccolor;
  this.name="Ellipse";
  this.isfinal=false;
  this.selected=false;
  this.inverted=false;
  
  this.tojson=function(){
   return '{"type":"Ellipse",'+
     '"width":'+this.width+','+
     '"begin":'+JsonFromVector(this.begin)+','+
     '"end":'+JsonFromVector(this.end)+','+
     '"color":'+JsonFromColor(this.color)+','+
     '"name":"'+this.name+'",'+
     '"isfinal":'+this.isfinal+','+
     '"selected":'+this.selected+','+
     '"inverted":'+this.inverted+''+
  	'}'; 
  }
  
  this.show=function(xx,yy){
    fill(color(0,0,0,0));
    stroke(this.color);
    strokeWeight(this.width);
   ellipse(this.begin.x,this.begin.y,(xx-this.begin.x)*2,(yy-this.begin.y)*2);
  }
  this.draw=function(){
    fill(color(0,0,0,0));
    if(this.selected){
      if(this.inverted){
    		stroke(colorInvert(this.color));
        this.inverted=!this.inverted;
      }else{
    		stroke(this.color);
        this.inverted=!this.inverted;
      }
    }else{
    	stroke(this.color);
    }
    strokeWeight(this.width);
   ellipse(this.begin.x,this.begin.y,this.end.x,this.end.y);
  }
  this.final=function(xx,yy){
    this.end=createVector((xx-this.begin.x)*2,(yy-this.begin.y)*2);
  	this.isfinal=true;
  }
}

function Ellipse2(bbegin,ccolor,wwidth){
	this.width=wwidth;
  this.begin=bbegin;
  this.end=createVector(0,0);
  this.width=wwidth;
  this.color=ccolor;
  this.name="Ellipse2";
  this.isfinal=false;
  this.selected=false;
  this.inverted=false;
  
  this.tojson=function(){
   return '{"type":"Ellipse2",'+
    '"width":'+this.width+','+
     '"begin":'+JsonFromVector(this.begin)+','+
     '"end":'+JsonFromVector(this.end)+','+
     '"color":'+JsonFromColor(this.color)+','+
     '"name":"'+this.name+'",'+
     '"isfinal":'+this.isfinal+','+
     '"selected":'+this.selected+','+
     '"inverted":'+this.inverted+''+
  	'}'; 
  }
  
  this.show=function(xx,yy){
    fill(color(0,0,0,0));
    stroke(this.color);
    strokeWeight(this.width);
   ellipse(this.begin.x+(xx-this.begin.x)/2,this.begin.y+(yy-this.begin.y)/2,(xx-this.begin.x),(yy-this.begin.y));
  }
  this.draw=function(){
    fill(color(0,0,0,0));
    if(this.selected){
      if(this.inverted){
    		stroke(colorInvert(this.color));
        this.inverted=!this.inverted;
      }else{
    		stroke(this.color);
        this.inverted=!this.inverted;
      }
    }else{
    	stroke(this.color);
    }
    strokeWeight(this.width);
   ellipse(this.begin.x,this.begin.y,this.end.x,this.end.y);
  }
  this.final=function(xx,yy){
    this.end=createVector((xx-this.begin.x),(yy-this.begin.y));
    this.begin=createVector(this.begin.x+this.end.x/2,this.begin.y+this.end.y/2);
  	this.isfinal=true;
  }
}


function Rect(bbegin,ccolor,wwidth){
this.width=wwidth;
  this.begin=bbegin;
  this.end=createVector(0,0);
  this.width=wwidth;
  this.color=ccolor;
  this.name="rect";
  this.isfinal=false;
  this.selected=false;
  this.inverted=false;
  
  this.tojson=function(){
   return '{"type":"Rect",'+
     '"width":'+this.width+','+
     '"begin":'+JsonFromVector(this.begin)+','+
     '"end":'+JsonFromVector(this.end)+','+
     '"color":'+JsonFromColor(this.color)+','+
     '"name":"'+this.name+'",'+
     '"isfinal":'+this.isfinal+','+
     '"selected":'+this.selected+','+
     '"inverted":'+this.inverted+''+
  	'}'; 
  }
  
  this.show=function(xx,yy){
    fill(color(0,0,0,0));
    stroke(this.color);
    strokeWeight(this.width);
   rect(this.begin.x,this.begin.y,xx-this.begin.x,yy-this.begin.y);
  }
  this.draw=function(){
    fill(color(0,0,0,0));
    if(this.selected){
      if(this.inverted){
    		stroke(colorInvert(this.color));
        this.inverted=!this.inverted;
      }else{
    		stroke(this.color);
        this.inverted=!this.inverted;
      }
    }else{
    	stroke(this.color);
    }
    strokeWeight(this.width);
   rect(this.begin.x,this.begin.y,this.end.x,this.end.y);
  }
  this.final=function(xx,yy){
    this.end=createVector(xx-this.begin.x,yy-this.begin.y);
  	this.isfinal=true;
  }
}

function Lines(bbegin,ccolor,wwidth){
this.width=wwidth;
  this.pos=[];
  this.pos.push(bbegin);
  this.width=wwidth; 
  this.color=ccolor;
  this.name="Lines";
  this.isfinal=false;
  this.selected=false;
  this.inverted=false;
  this.drawable=null;
  
  this.tojson=function(){
   var out= '{"type":"Lines",'+
     '"width":'+this.width+','+
     '"pos":[';
     this.pos.forEach(function(element){	
 			  out+=JsonFromVector(element)+',';
	  	}); 
     out = out.substring(0, out.length - 1);
     out+='],"color":'+JsonFromColor(this.color)+','+
     '"name":"'+this.name+'",'+
     '"isfinal":'+this.isfinal+','+
     '"selected":'+this.selected+','+
     '"inverted":'+this.inverted+''+
  	'}';
    return out;
  } 
  
  this.show=function(xx,yy){
     this.pos.push(createVector(xx,yy));

    stroke(this.color);
    strokeWeight(this.width);
     for(var i=1;i<this.pos.length;i++){
       line(this.pos[i-1].x,this.pos[i-1].y,this.pos[i].x,this.pos[i].y);
     }
  }
  this.draw=function(){
    if(this.selected){
      if(this.inverted){
    		stroke(colorInvert(this.color));
        this.inverted=!this.inverted;
      }else{
    		stroke(this.color);
        this.inverted=!this.inverted;
      }
    }else{
    	stroke(this.color);
    }
    strokeWeight(this.width);
    noFill();
    beginShape();

     for(var i=0;i<this.pos.length;i++){
       //line(this.pos[i-1].x,this.pos[i-1].y,this.pos[i].x,this.pos[i].y);
       curveVertex(this.pos[i].x,this.pos[i].y);
     }
    endShape();
  }
  this.final=function(xx,yy){
  	this.isfinal=true;
  }
}