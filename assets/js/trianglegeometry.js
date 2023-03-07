function setup() {
    var canvasDiv = document.getElementById('trianglegeometry');
    var width = canvasDiv.offsetWidth;
    var my_canvas = createCanvas(width, 512);
    my_canvas.parent("trianglegeometry");
    smooth();
    
    a = new Point(-width/3, 0.0);
    b = new Point(width/3, 0.0);
    c = new Point(0.0,-height/3);
  }
  
  let EPS = ( 0.0000000001 );
  
  function LineIntersect( x1, y1,
                          x2, y2,
                          x3, y3,
                          x4, y4 )
  {
      var mua, mub;
      var denom, numera, numerb;
      var x, y;
      
      denom  = ( y4 - y3 ) * ( x2 - x1 ) - ( x4 - x3 ) * ( y2 - y1 );
      numera = ( x4 - x3 ) * ( y1 - y3 ) - ( y4 - y3 ) * ( x1 - x3 );
      numerb = ( x2 - x1 ) * ( y1 - y3 ) - ( y2 - y1 ) * ( x1 - x3 );
      
      /* Are the line coincident? */
      if ( Math.abs( numera ) < EPS && Math.abs( numerb ) < EPS && Math.abs( denom ) < EPS )
      {
          return nil;
          //x = ( x1 + x2 ) / 2.0;
          //y = ( y1 + y2 ) / 2.0;
          //return new Point_t( ( float )x, ( float )y, PointType_On );
      }
      
      /* Are the line parallel */
      if ( Math.abs( denom ) < EPS )
      {
          //assert( false );
          return nil;
      }
      
      // Is the intersection along the the segments
      
      mua = numera / denom;
      mub = numerb / denom;
      
      /*if ( mua < 0.0f || mua > 1.0f || mub < 0.0f || mub > 1.0f )
      {
          x = 0;
          y = 0;
          return 0;
      }
      */
      
      x = x1 + mua * ( x2 - x1 );
      y = y1 + mua * ( y2 - y1 );
      
      return new Point( x, y );
  }
  
  function insegment( x1, y1,
                      x2, y2,
                      x3, y3,
                      x4, y4 )
  {
      var mua, mub;
      var denom, numera, numerb;
      var x, y;
      
      denom  = ( y4 - y3 ) * ( x2 - x1 ) - ( x4 - x3 ) * ( y2 - y1 );
      numera = ( x4 - x3 ) * ( y1 - y3 ) - ( y4 - y3 ) * ( x1 - x3 );
      numerb = ( x2 - x1 ) * ( y1 - y3 ) - ( y2 - y1 ) * ( x1 - x3 );
      
      /* Are the line coincident? */
      if ( Math.abs( numera ) < EPS && Math.abs( numerb ) < EPS && Math.abs( denom ) < EPS )
      {
          return 0;
          //x = ( x1 + x2 ) / 2.0;
          //y = ( y1 + y2 ) / 2.0;
          //return new Point_t( ( float )x, ( float )y, PointType_On );
      }
      
      /* Are the line parallel */
      if ( Math.abs( denom ) < EPS )
      {
          //assert( false );
          return 1;
      }
      
      // Is the intersection along the the segments
      
      mua = numera / denom;
      mub = numerb / denom;
      
      if ( mua < 0.0)// || mua > 1.0f || mub < 0.0f || mub > 1.0f )
      {
          //print("%lf, %lf\n", mua, mub);
          return 1;
      }
      
      if ( mua > 1.0) {
        return 2;
      }
      
      return 0;
    
  }
  
  function dottedLine( x1, y1, x2, y2, steps ){
    var d = sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
    steps *= d;
    for( var i=0; i <= steps; i++ ) {
      var x = lerp(x1, x2, i/steps);
      var y = lerp(y1, y2, i/steps);
      noStroke();
      fill(128);
      ellipse(x, y,2,2);
    }
  } 
  
  class Point {
    
    near( x, y ) {
      return (x-this.x)*(x-this.x)+(y-this.y)*(y-this.y) <  64*64;
    }
    constructor( x, y ) {
      this.x = x;
      this.y = y;
    }
    
    draw( ) {
      push();
      translate(this.x, this.y);
      fill(0);
      noStroke();
      ellipse(0.0, 0.0, 8.0, 8.0);
      pop();
    }
  }
  
  var a, b, c;
  
  
  function draw() {
    translate(width/2, height/2);
    background(255);
    
    fill(0);
    stroke(0);
    strokeWeight(1);
    line(a.x, a.y, b.x, b.y);
    line(b.x, b.y, c.x, c.y);
    line(c.x, c.y, a.x, a.y);
    a.draw();
    b.draw();
    c.draw();
    
    noFill();
    stroke(0);
    strokeWeight(1);
    //arc(a.x, a.y, 32, 32, atan2(c.y-a.y, c.x-a.x), atan2(b.y-a.y, b.x-a.x));
    drawArc(a.x, a.y, 32, b.x, b.y, c.x, c.y);
    drawArc(b.x, b.y, 32, a.x, a.y, c.x, c.y);
    drawArc(c.x, c.y, 32, a.x, a.y, b.x, b.y);
    //arc(b.x, b.y, 32, 32, atan2(a.y-b.y, a.x-b.x), 2.0*PI+atan2(c.y-b.y, c.x-b.x));
    //arc(c.x, c.y, 32, 32, atan2(b.y-c.y, b.x-c.x), atan2(a.y-c.y, a.x-c.x));
    
    var p1 = LineIntersect(a.x, a.y, b.x, b.y, c.x, c.y, c.x + (a.y-b.y), c.y + (b.x-a.x));
    p1.draw();
    dottedLine(c.x, c.y, p1.x, p1.y, 0.1);
    var s1 = insegment(a.x, a.y, b.x, b.y, c.x, c.y, c.x + (a.y-b.y), c.y + (b.x-a.x));
    if (s1==1) {
      dottedLine(p1.x, p1.y, a.x, a.y, 0.1);
    }
   
    if (s1==2) {
      dottedLine(p1.x, p1.y, b.x, b.y, 0.1);
    }   
    
    var p2 = LineIntersect(b.x, b.y, c.x, c.y, a.x, a.y, a.x + (b.y-c.y), a.y + (c.x-b.x));
    p2.draw();
    dottedLine(a.x, a.y, p2.x, p2.y, 0.1);
    var s2 = insegment(b.x, b.y, c.x, c.y, a.x, a.y, a.x + (b.y-c.y), a.y + (c.x-b.x));
    if (s2==1) {
      dottedLine(p2.x, p2.y, b.x, b.y, 0.1);
    }
   
    if (s2==2) {
      dottedLine(p2.x, p2.y, c.x, c.y, 0.1);
    }   
    
    var p3 = LineIntersect(a.x, a.y, c.x, c.y, b.x, b.y, b.x + (a.y-c.y), b.y + (c.x-a.x));
    p3.draw();
    dottedLine(b.x, b.y, p3.x, p3.y, 0.1);
    var s3 = insegment(a.x, a.y, c.x, c.y, b.x, b.y, b.x + (a.y-c.y), b.y + (c.x-a.x));
    if (s3==1) {
      dottedLine(p3.x, p3.y, a.x, a.y, 0.1);
    }
   
    if (s3==2) {
      dottedLine(p3.x, p3.y, c.x, c.y, 0.1);
    }   
  }
  
  function drawArc( x1, y1, r, x2, y2, x3, y3 ) {
    
    noFill();
    stroke(0);
    strokeWeight(1);
    
    var a1 = atan2(y2-y1, x2-x1);
    if (a1<0) a1 += 2*PI;
    var a2 = atan2(y3-y1, x3-x1);
    if (a2<0) a2 += 2*PI;
    if (a2<a1) {
      var t = a2;
      a2 = a1;
      a1 = t;
    }
    if (a2-a1<PI)
      arc(x1, y1, r, r, a1, a2);
    else
      arc(x1, y1, r, r, a2, a1+2*PI);
  }
  
  
  var dragging_a, dragging_b, dragging_c;
  var mx, my, px, py;
  
  function mousePressed() {
    if (a.near(mouseX-width/2, mouseY-height/2)) {
      mx = mouseX;
      my = mouseY;
      dragging_a = true;
      return;
    }
    
    if (b.near(mouseX-width/2, mouseY-height/2)) {
      mx = mouseX;
      my = mouseY;
      dragging_b = true;
      return;
    }
    
    if (c.near(mouseX-width/2, mouseY-height/2)) {
      mx = mouseX;
      my = mouseY;
      dragging_c = true;
      return;
    }
      
  }
  
  function mouseDragged() {
    if (dragging_a) {
      a.x = a.x + mouseX-mx;
      a.y = a.y + mouseY-my;
      mx = mouseX;
      my = mouseY;
    }
    
    if (dragging_b) {
      b.x = b.x + mouseX-mx;
      b.y = b.y + mouseY-my;
      mx = mouseX;
      my = mouseY;
    }
    
    if (dragging_c) {
      c.x = c.x + mouseX-mx;
      c.y = c.y + mouseY-my;
      mx = mouseX;
      my = mouseY;
    }
   
  }
  
  function mouseReleased() {
    dragging_a = false;
    dragging_b = false;
    dragging_c = false;
  }