var load=""
var status=""
var dog=[];
function preload(){
  load=loadImage("dog_cat.jpg")
}
function setup(){
    paper=createCanvas(380,380)
    paper.center()
    cam=createCapture(VIDEO)
    cam.size(380,380)
    cam.hide()
    detector=ml5.objectDetector('cocossd',message)
    document.getElementById("object").innerHTML="detecting..."
}
function message(){
  console.log("now my model is ready to use")
  status=true;
}
function gr(error, results) 
{
  if (error) {
    console.log(error);
  }
  console.log(results);
  dog=results;
}
function draw(){
    image(cam,0,0,380,380)
    if(status!=""){
      r=random(255)
      g=random(255)
      b=random(255)
      detector.detect(cam,gr)
      for(var i=0; i<dog.length;i++){
        document.getElementById("object").innerHTML="object detected"
        document.getElementById("total").innerHTML="No. of object detected"+dog.length;
        fill(r,g,b)
        p=Math.floor(dog[i].confidence*100)
        text(dog[i].label+" "+p+"%",dog[i].x,dog[i].y)
        noFill()
        stroke(r,g,b)
        rect(dog[i].x,dog[i].y,dog[i].width,dog[i].height) 
      }
      
    }
}