const SLICE_COUNT = 12;//(Min 6, Max 18, recommended 10) 
// This changes how many slices the phenakistoscope has. More slices means it will move slower.

function setup_pScope(pScope){
  //pScope.output_mode(ANIMATED_DISK);// change the mode using the setting
  pScope.output_mode(STATIC_DISK);
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(false); //remove boundary layers, true or false 
  pScope.set_direction(CCW); //  Counter Clock Wise or Clock Wise. Affects how it spins.
  pScope.set_slice_count(SLICE_COUNT);
  //pScope.load_image("tiki_test_0" , "png"); //big design
  //pScope.load_image_sequence("tiki_test", "png", 1)
  pScope.load_image_sequence("tiki_explode", "png", 12);
  pScope.load_image("less_flowers_lei" , "png");
  //pScope.load_image("tiki_explode_0" , "png"); //smaller design
}

function setup_layers(pScope){

  new PLayer(null, 69, 78, 82);  //lets us draw the whole circle background, ignoring the boundaries. the second number value determines colour.

//  let boom = new PLayer(mushroom_clouds);// insert to faces the function you are using
//  boom.mode( SWIRL(1) ); // number determines how many of the object show on each slice. SWIRL goes out from the middle, towards the end
  //number technically means how many swirls it needs to complete
//  boom.set_boundary( 600, 1100 ); // the first number talks about the length from the origin and where the object starts.
  // second number talks about how far it goes from the origin to the edge of the radius.

  let volcanocircle = new PLayer(volcanohole);
  volcanocircle.mode(RING);
  volcanocircle.set_boundary(0,0);

  let garland = new PLayer(flowers);
  garland.mode( SWIRL(1) );
  garland.set_boundary( 0, 300 );

  //let layer2 = new PLayer(squares);
  //layer2.mode( RING ); // i think the ring moves in a ring-like shape. idk
  //layer2.set_boundary( 0, 400 );

  let eruption = new PLayer(molten);
  eruption.mode( SWIRL(2) );
  eruption.set_boundary( 500, 1600 );

  let tikisequence = new PLayer(tiki);
  tikisequence.mode( RING );
  tikisequence.set_boundary( 0, 200 );
  //first number determines the length from the origin. The second number talks about how far it goes from origin to edge of circle

}

// THE TIKI EXPLODING
function tiki(x, y, animation, pScope){

  // let tikiSize = 100 + (animation.wave(1)*20)
  // let bouncepart = 50* animation.wave()

  //scale(0.1); //tiki_test_0
  scale(0.6); //tiki_explode_0 // literally makes the scale bigger
  pScope.draw_image_from_sequence("tiki_explode", 0, -900, animation.frame);
 //pScope.draw_image_from_sequence("tiki_test", 0, -150, animation.frame);
 //pScope.draw_image("tiki_test_0",x,-5000); // big design
 // pScope.draw_image("tiki_explode_0",x,-700); //smaller design
 
 //the number on the edge determines how far apart they are from each other

}

//first number moves it left if negative and right if positive
//second number moves it up negative and down positive
 function mushroom_clouds(x, y, animation, pScope){ // emitting this affects the animation and makes it a swirl instead for some odd reason.
  
  scale(animation.frame*3);// emitting this affects the animation and makes it a swirl instead for some odd reason.
  //scale(animation.wave*2) // oddly makes the face repeat multiple times
  // making this animation.frame says to the code "from the origin, start at 0 and when you reach the end, make them a size of 1"
  // you can add scale(n), n = the size of all the faces.
  //scale(1);

  strokeWeight(0)
  fill(255, 195, 15)
  rect(-25,-20,50,70) // neck of the cloud

  strokeWeight(0)
  fill(252, 136, 3)
  ellipse (-35,-20,60,60); //left cloud
  
  ellipse (35,-20,60,60); //right cloud
  ellipse (0,-50,60,60); //middle cloud
  
  strokeWeight(0) // inbetween circles that cover up the lines
  ellipse(17.5,-35,40,40); // circle inbetween left and middle cloud
  ellipse(-17.5,-35,40,40); // circle inbetween middle and right cloud
  //strokeWeight(1)
  

  // noFill();
  // beginShape();
  // vertex(x,y);
  // bezierVertex();
  // endShape();
}

function flowers(x, y, animation, pScope){
  push()
  scale(1.4)
  if(animation.frame ==0){
    pScope.draw_image("less_flowers_lei",x,y);
  }
  pop()

  push()
  scale(2.5)
  if(animation.frame ==0){
    pScope.draw_image("less_flowers_lei",x,y);
  }
  pop()

  push()
  scale(0.7)
  if(animation.frame ==0){
    pScope.draw_image("less_flowers_lei",x,y);
  }
  pop()

  push()
  scale(0)
  if(animation.frame ==0){
    pScope.draw_image("less_flowers_lei",x,y);
  }
  pop()
}

function squares(x, y, animation, pScope){

  // this is how you set up a background for a specific layer
  let angleOffset = (360 / SLICE_COUNT) / 2
  let backgroundArcStart = 270 - angleOffset;
  let backgroundArcEnd = 270 + angleOffset;

  // draws the inside circle
  fill(200, 135, 245) // colour of innner circle
  arc(x,y,400,400,backgroundArcStart,backgroundArcEnd); // draws "pizza slice" in the background
  // changing the number changes the size of the inner circle.

  // draws the small white squares in the inside circle
  fill(255)
  rect(-30,-300-animation.wave()*50,70,70) // .wave is a cosine wave btw
  //ellipse(-10,-300-animation.wave()*50,70,70)
  // number multiplied to animation.wave determines how fast and far it moves
  // second to last number is how far it stretches out horizontally
  // last number is how far it stretches out vertically
}

function molten(x, y, animation, pScope){

  let moltenX = 0
  let moltenY = -26

  scale (animation.frame*4);

  strokeWeight(0)
  fill(240, 91, 35)
  ellipse(0,15,60,60); // middle of the lava
  //quad(moltenX, moltenY, moltenX-45, moltenY+50, moltenX, moltenY+100, moltenX+45, moltenY+50);
  //fill(0,0,0);
  triangle(moltenX, moltenY+100, moltenX-20, moltenY+40, moltenX+20, moltenY+40);

//  let moltenXL = -90
//  let moltenYL = 20
//  strokeWeight(0)
//  rotate(-30);
//  //fill(40,100,140); //blue
//  ellipse(moltenXL, moltenYL+26 ,40 ,100);
//  triangle(moltenXL, moltenYL+100, moltenXL-20, moltenYL+40, moltenXL+20, moltenYL+40);
//
//  let moltenXR = 90
//  let moltenYR = 20
//  strokeWeight(0)
//  rotate(60);
//  //fill(140,40,100); //purple
//  ellipse(moltenXR, moltenYR+26 ,40 ,100);
//  triangle(moltenXR, moltenYR+100, moltenXR-20, moltenYR+40, moltenXR+20, moltenYR+40);

//  fill(252,252,252);

  let lavaX = 12 // 12
  let lavaY = 3 // 3
  beginShape();
  vertex(lavaX-130,lavaY+25);
  bezierVertex(lavaX-40, lavaY-25, lavaX-50, lavaY+80, lavaX-30, lavaY+85);
  bezierVertex(lavaX-62, lavaY+70, lavaX-42, lavaY+57, lavaX-130, lavaY+37);
  endShape();
  ellipse(lavaX-127, lavaY+31, lavaX+10, lavaY+9);
//  triangle(-20,120, -90, 60, -50, 40);

  let lavaXR = -12 // -12
  let lavaYR = 3 // 3

  beginShape();
  vertex(lavaXR+130,lavaYR+25);
  bezierVertex(lavaXR+40, lavaYR-25, lavaXR+50, lavaYR+80, lavaXR+30, lavaYR+85);
  bezierVertex(lavaXR+62, lavaYR+70, lavaXR+42, lavaYR+57, lavaXR+130, lavaYR+37);
  endShape();
  ellipse(lavaXR+127, lavaYR+31, lavaXR+34, lavaYR+9);

  let lavacirclesX = 0 //0
  let lavacirclesY = 0 //0
  let spikeNeckX = 0 //0
  let spikeNeckY = 0 //0

  //fill(0,0,0);
  ellipse(lavacirclesX-40, lavacirclesY+35, 70, 70);
  ellipse(lavacirclesX+40, lavacirclesY+35, 70, 70);

  fill(240, 91, 35);
  triangle(spikeNeckX-100,spikeNeckY+40,spikeNeckX-10,spikeNeckY+70,spikeNeckX-30,spikeNeckY+125); //left part of eruption
  triangle(spikeNeckX+100,spikeNeckY+40,spikeNeckX+10,spikeNeckY+70,spikeNeckX+30,spikeNeckY+125); //right park of eruption
  triangle(spikeNeckX-70,spikeNeckY+40,spikeNeckX,spikeNeckY+140,spikeNeckX+70,spikeNeckY+40); //middle park of the eruption

  fill(240, 127, 35)
  triangle(spikeNeckX-70,spikeNeckY+45,spikeNeckX-20,spikeNeckY+60,spikeNeckX-30,spikeNeckY+100); // left side shine of the lava
  triangle(spikeNeckX+70,spikeNeckY+45,spikeNeckX+20,spikeNeckY+60,spikeNeckX+30,spikeNeckY+100); // right side shine of the lava
  triangle(spikeNeckX-65,spikeNeckY+50,spikeNeckX,spikeNeckY+110,spikeNeckX+65,spikeNeckY+50);
  
  fill(240, 127, 35)
  ellipse(lavacirclesX-47, lavacirclesY+35, 50, 40); //left highlight
  ellipse(lavacirclesX+47, lavacirclesY+35, 50, 40); //right highlight
  ellipse(lavacirclesX+0,lavacirclesY+40,lavacirclesX+70,lavacirclesY+80)

}

function volcanohole(x, y, animation, pScope){
  fill(252,70,0);
  ellipse(0,0,250,250);

}