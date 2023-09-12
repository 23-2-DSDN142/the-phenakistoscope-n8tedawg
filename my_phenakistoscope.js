const SLICE_COUNT = 12;//(Min 6, Max 18, recommended 10) 
// This changes how many slices the phenakistoscope has. More slices means it will move slower.

function setup_pScope(pScope){
  //pScope.output_mode(STATIC_DISK);// change the mode using the setting
  pScope.output_mode(STATIC_DISK);
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(true); //remove boundary layers, true or false 
  pScope.set_direction(CCW); //  Counter Clock Wise or Clock Wise. Affects how it spins.
  pScope.set_slice_count(SLICE_COUNT);
  //pScope.load_image("tiki_test_0" , "png"); //big design
  //pScope.load_image_sequence("tiki_test", "png", 1)
  pScope.load_image_sequence("tiki_explode", "png", 12);
  pScope.load_image("flower_lei" , "png");
  //pScope.load_image("tiki_explode_0" , "png"); //smaller design
}

function setup_layers(pScope){

  new PLayer(null, 242, 221, 150);  //lets us draw the whole circle background, ignoring the boundaries. the second number value determines colour.

//  let boom = new PLayer(mushroom_clouds);// insert to faces the function you are using
//  boom.mode( SWIRL(1) ); // number determines how many of the object show on each slice. SWIRL goes out from the middle, towards the end
  //number technically means how many swirls it needs to complete
//  boom.set_boundary( 600, 1100 ); // the first number talks about the length from the origin and where the object starts.
  // second number talks about how far it goes from the origin to the edge of the radius.

  let garland = new PLayer(flowers);
  garland.mode( SWIRL(1) );
  garland.set_boundary( 0, 300 );

  //let layer2 = new PLayer(squares);
  //layer2.mode( RING ); // i think the ring moves in a ring-like shape. idk
  //layer2.set_boundary( 0, 400 );

  let tikisequence = new PLayer(tiki);
  tikisequence.mode( RING );
  tikisequence.set_boundary( 0, 200 );
  //first number determines the length from the origin. The second number talks about how far it goes from origin to edge of circle

  let eruption = new PLayer(molten);
  eruption.mode( SWIRL(3) );
  eruption.set_boundary( 600, 1400 );
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
    pScope.draw_image("flower_lei",x,y);
  }
  pop()

  push()
  scale(0.65)
  if(animation.frame ==0){
    pScope.draw_image("flower_lei",x,y);
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

  scale (animation.frame*3);

  strokeWeight(0)
  fill(252, 136, 3)
  ellipse(0,0,60,100);
  //quad(moltenX, moltenY, moltenX-45, moltenY+50, moltenX, moltenY+100, moltenX+45, moltenY+50);
  triangle(moltenX, moltenY+100, moltenX-27, moltenY+50, moltenX+27, moltenY+50);

  let moltenXL = -90
  let moltenYL = 20
  strokeWeight(0)
  ellipse(moltenXL, moltenYL+26 ,60 ,100);
  triangle(moltenXL, moltenYL+100, moltenXL-27, moltenYL+50, moltenXL+27, moltenYL+50);

  let moltenXR = 90
  let moltenYR = 20
  strokeWeight(0)
  ellipse(moltenXR, moltenYR+26 ,60 ,100);
  triangle(moltenXR, moltenYR+100, moltenXR-27, moltenYR+50, moltenXR+27, moltenYR+50);
}
