const SLICE_COUNT = 10;//(Min 6, Max 18, recommended 10) 
// This changes how many slices the phenakistoscope has. More slices means it will move slower.

function setup_pScope(pScope){
  pScope.output_mode(ANIMATED_DISK);// change the mode using the setting
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(true); //remove boundary layers, true or false 
  pScope.set_direction(CCW); //  Counter Clock Wise or Clock Wise. Affects how it spins.
  pScope.set_slice_count(SLICE_COUNT);
}

function setup_layers(pScope){

  new PLayer(null, 50, 168, 168);  //lets us draw the whole circle background, ignoring the boundaries. the second number value determines colour.

  let layer1 = new PLayer(faces);// insert to faces the function you are using
  layer1.mode( SWIRL(4) ); // number determines how many of the object show on each slice. SWIRL goes out from the middle, towards the end
  //number technically means how many swirls it needs to complete
  layer1.set_boundary( 200, 1000 ); // the first number talks about the length from the origin and where the object starts.
  // second number talks about how far it goes from the origin to the edge of the radius.

  let layer2 = new PLayer(squares);
  layer2.mode( RING ); // i think the ring moves in a ring-like shape. idk
  layer2.set_boundary( 0, 400 );
}

function faces(x, y, animation, pScope){ // emitting this affects the animation and makes it a swirl instead for some odd reason.
  
  scale(animation.frame*3);// emitting this affects the animation and makes it a swirl instead for some odd reason.
  // scale(animation.wave*2) // oddly makes the face repeat multiple times
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

  fill(200, 135, 245)
  arc(x,y,800,800,backgroundArcStart,backgroundArcEnd); // draws "pizza slice" in the background

  fill(255)
  rect(-10,-300-animation.wave()*50,20,20) // .wave is a cosine wave btw

}
