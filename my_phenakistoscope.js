const SLICE_COUNT = 12; //(Minimum 6 slices, Max 18 slices, recommended 10 slices) 

function setup_pScope(pScope){
  pScope.output_mode(ANIMATED_DISK);// Change the mode to ANIMATED or STATIC
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(false); // Remove the boundary layers
  pScope.set_direction(CCW); // Affects how it spins Clockwise or Counter Clockwise
  pScope.set_slice_count(SLICE_COUNT);
  pScope.load_image_sequence("tiki_explode", "png", 12); // Insert the image sequence of the tikis
  pScope.load_image("yellow_flowers_lei" , "png"); // Insert the image of the leis
}

function setup_layers(pScope){

  new PLayer(null, 69, 78, 82); // Draws the whole circle background, ignoring the boundaries. The second to fourth number value determines colour.

  let volcanocircle = new PLayer(volcanohole); // Draws the orange circle in the middle of the phenakistoscope (The Lava Hole).
  volcanocircle.mode( RING );
  volcanocircle.set_boundary( 0, 0 ); 

  let garland = new PLayer(flowers); // Draws the Leis
  garland.mode( SWIRL(1) );
  garland.set_boundary( 0, 300 );

  let eruption = new PLayer(lava); // Draws the Lava Projectiles
  eruption.mode( SWIRL(3) );
  eruption.set_boundary( 500, 1600 );

  let tikisequence = new PLayer(tiki); // Draws the Tikis
  tikisequence.mode( RING );
  tikisequence.set_boundary( 0, 200 );
}

// THE TIKI ANIMATION
function tiki(x, y, animation, pScope){

  scale(0.6); //tiki_explode_0 // literally makes the scale bigger
  pScope.draw_image_from_sequence("tiki_explode", 0, -900, animation.frame); // Draws the Tikis

}

// THE LEIS
function flowers(x, y, animation, pScope){
  
  push()
  scale(0.7)
  if(animation.frame ==0){
    pScope.draw_image("yellow_flowers_lei",x,y); // Draws the smallest Lei (Closest to the origin).
  }
  pop()

  push()
  scale(1.4)
  if(animation.frame ==0){
    pScope.draw_image("yellow_flowers_lei",x,y); // Draws the medium-sized Lei.
  }
  pop()

  push()
  scale(2.5)
  if(animation.frame ==0){
    pScope.draw_image("yellow_flowers_lei",x,y); // Draws the largest Lei (The Lei underneath the Tikis).
  }
  pop()

}

// THE LAVA PROJECTILES
function lava(x, y, animation, pScope){

  let moltenX = 0
  let moltenY = -26

  scale (animation.frame*4); // Determines the scale of the Lava Projectile

  strokeWeight(0)
  fill(240, 91, 35) // The Reddish-Orange Colour
  ellipse(0,15,60,60); // Draws the middle top of the Lava Projectile
  triangle(moltenX, moltenY+100, moltenX-20, moltenY+40, moltenX+20, moltenY+40);

  let lavaXL = 12
  let lavaYL = 3

  beginShape(); // Very Left curve of the Lava Projectile 
  vertex(lavaXL-130,lavaYL+25);
  bezierVertex(lavaXL-40, lavaYL-25, lavaXL-50, lavaYL+80, lavaXL-30, lavaYL+85);
  bezierVertex(lavaXL-62, lavaYL+70, lavaXL-42, lavaYL+57, lavaXL-130, lavaYL+37);
  endShape();
  ellipse(lavaXL-127, lavaYL+31, lavaXL+10, lavaYL+9); // The rounded corner of the Left curve of the Lava Projectile

  let lavaXR = -12
  let lavaYR = 3

  beginShape(); // Very Right curve of the Lava Projectile
  vertex(lavaXR+130,lavaYR+25);
  bezierVertex(lavaXR+40, lavaYR-25, lavaXR+50, lavaYR+80, lavaXR+30, lavaYR+85);
  bezierVertex(lavaXR+62, lavaYR+70, lavaXR+42, lavaYR+57, lavaXR+130, lavaYR+37);
  endShape();
  ellipse(lavaXR+127, lavaYR+31, lavaXR+34, lavaYR+9); // The rounded corner of the Right curve of the Lava Projectile

  let lavacirclesX = 0
  let lavacirclesY = 0
  let spikeNeckX = 0 // Named 'spikeNeck' because its the triangle neck part of the Lava Projectile (The lower part of the Lava Projectile)
  let spikeNeckY = 0

  ellipse(lavacirclesX-40, lavacirclesY+35, 70, 70); // Top Left ellipse of Lava Projectile
  ellipse(lavacirclesX+40, lavacirclesY+35, 70, 70); // Top Right ellipse of Lava Projectile

  fill(240, 91, 35);
  triangle(spikeNeckX-100,spikeNeckY+40,spikeNeckX-10,spikeNeckY+70,spikeNeckX-30,spikeNeckY+125); //left part of eruption
  triangle(spikeNeckX+100,spikeNeckY+40,spikeNeckX+10,spikeNeckY+70,spikeNeckX+30,spikeNeckY+125); //right part of eruption
  triangle(spikeNeckX-70,spikeNeckY+40,spikeNeckX,spikeNeckY+140,spikeNeckX+70,spikeNeckY+40); //middle park of the eruption

  fill(240, 127, 35); // Lighter Orange (In the middle of the Lava Projectile)
  triangle(spikeNeckX-70,spikeNeckY+45,spikeNeckX-20,spikeNeckY+60,spikeNeckX-30,spikeNeckY+100); // Left triangle shine of the lava
  triangle(spikeNeckX+70,spikeNeckY+45,spikeNeckX+20,spikeNeckY+60,spikeNeckX+30,spikeNeckY+100); // Right triangle shine of the lava
  triangle(spikeNeckX-65,spikeNeckY+50,spikeNeckX,spikeNeckY+110,spikeNeckX+65,spikeNeckY+50); // Middle triangle shine of the lava
  
  ellipse(lavacirclesX-47, lavacirclesY+35, 50, 40); // Left highlight
  ellipse(lavacirclesX+47, lavacirclesY+35, 50, 40); // Right highlight
  ellipse(lavacirclesX+0,lavacirclesY+40,lavacirclesX+70,lavacirclesY+80) // Middle highlight

}

// THE MIDDLE OF THE VOLCANO (The orange circle in the middle)
function volcanohole(x, y, animation, pScope){

  fill(252,70,0);
  ellipse(0,0,250,250);

}