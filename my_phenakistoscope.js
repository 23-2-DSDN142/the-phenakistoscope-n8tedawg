const SLICE_COUNT = 10;//(Min 6, Max 18, recommended 10) 
// This changes how many slices the phenakistoscope has. More slices means it will move slower.

function setup_pScope(pScope){
  //pScope.output_mode(STATIC_DISK);// change the mode using the setting
  pScope.output_mode(ANIMATED_DISK);
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(true); //remove boundary layers, true or false 
  pScope.set_direction(CCW); //  Counter Clock Wise or Clock Wise. Affects how it spins.
  pScope.set_slice_count(SLICE_COUNT);
  //pScope.load_image("tiki_test_0" , "png"); //big design
  //pScope.load_image_sequence("tiki_test", "png", 1)
  //pScope.load_image_sequence("tiki_explode", "png", 1)
  pScope.load_image("tiki_explode_0" , "png"); //smaller design
}

function setup_layers(pScope){

  new PLayer(null, 242, 221, 150);  //lets us draw the whole circle background, ignoring the boundaries. the second number value determines colour.

  let layer1 = new PLayer(faces);// insert to faces the function you are using
  layer1.mode( SWIRL(4) ); // number determines how many of the object show on each slice. SWIRL goes out from the middle, towards the end
  //number technically means how many swirls it needs to complete
  layer1.set_boundary( 200, 1000 ); // the first number talks about the length from the origin and where the object starts.
  // second number talks about how far it goes from the origin to the edge of the radius.

  let layer2 = new PLayer(squares);
  layer2.mode( RING ); // i think the ring moves in a ring-like shape. idk
  layer2.set_boundary( 0, 400 );

  let tikisequence = new PLayer(tiki);
  tikisequence.mode( RING );
  tikisequence.set_boundary( 0, 200 );
}

// THE TIKI
function tiki(x, y, animation, pScope){

  //scale(0.1); //tiki_test_0
  scale(0.8); //tiki_explode_0 // literally makes the scale bigger
 //pScope.draw_image_from_sequence("tiki_test", 0, -150, animation.frame);
 //pScope.draw_image("tiki_test_0",x,-5000); // big design
 pScope.draw_image("tiki_explode_0",x,-700); //smaller design
 //the number on the edge determines how far apart they are from each other
}


function faces(x, y, animation, pScope){ // emitting this affects the animation and makes it a swirl instead for some odd reason.
  
  scale(animation.frame*3);// emitting this affects the animation and makes it a swirl instead for some odd reason.
  //scale(animation.wave*2) // oddly makes the face repeat multiple times
  // making this animation.frame says to the code "from the origin, start at 0 and when you reach the end, make them a size of 1"
  // you can add scale(n), n = the size of all the faces.

  fill(56, 78, 91)
  ellipse(0,0,50,50); // draw head
  fill(0);
  // ellipse(-10,-10,10,10); //draw eye
  // ellipse(10,-10,10,10); // draw eye
  // arc(0,10,20,10,0,180); // draw mouth
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

