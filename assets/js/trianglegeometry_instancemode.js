var s = function( p ) {

  var originalWidth;
  var originalHeight;
  var scale = 1;

  p.setup = function( ) {
    var canvasDiv = document.getElementById('trianglegeometry');
    var width = canvasDiv.offsetWidth;
    var height = 512;
    console.log(width);
    var my_canvas = p.createCanvas(width, height);
    //my_canvas.parent("trianglegeometry");
    p.smooth();
    // -312, -190
    // 300, -70
    // -158, 210
    a = new Point(-width/2+60, -height/2+70);
    b = new Point(width/2-60, -70);
    c = new Point(-width/2+200, height/2-50);
    originalWidth = width;
    originalHeight = p.height;

    //my_canvas.mouseOver(mouseOver);
  }

  p.windowResized = function() {
    var canvasDiv = document.getElementById('trianglegeometry');
    var width = canvasDiv.offsetWidth;
    var height = canvasDiv.offsetHeight;
    console.log(width)
    console.log(originalWidth)
    scale = width / originalWidth;
    console.log(scale)
    p.resizeCanvas(width, 512*scale);
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
    steps = 0.08;
    var d = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
    steps *= d;
    for( var i=0; i <= steps; i++ ) {
      var x = p.lerp(x1, x2, i/steps);
      var y = p.lerp(y1, y2, i/steps);
      p.noStroke();
      p.fill(128);
      p.ellipse(x, y,4,4);
    }
  } 
  
  class Point {
    
    near( x, y ) {
      x /= scale
      y /= scale
      return (x-this.x)*(x-this.x)+(y-this.y)*(y-this.y) <  64*64;
    }
    
    constructor( x, y ) {
      this.x = x;
      this.y = y;
    }
    
    draw( ) {
      p.push();
      p.translate(this.x, this.y);
      p.noStroke();
      if (this.over) {
        p.fill(0);
        p.ellipse(0.0, 0.0, 16.0, 16.0);
      }
      else {
        p.fill(0);
        p.ellipse(0.0, 0.0, 12.0, 12.0);
      }
      
      p.pop();
    }
  }
  
  var a, b, c;
  
  p.draw = function() {

    mouseOver();

    p.translate(p.width/2, p.height/2);
    p.scale(scale)
    p.background(255,255,192);
    
    p.fill(0);
    p.stroke(0);
    p.strokeWeight(2);
    p.line(a.x, a.y, b.x, b.y);
    p.line(b.x, b.y, c.x, c.y);
    p.line(c.x, c.y, a.x, a.y);
    a.draw();
    b.draw();
    c.draw();
    
    p.noFill();
    p.stroke(0);
    p.strokeWeight(1);
    //arc(a.x, a.y, 32, 32, atan2(c.y-a.y, c.x-a.x), atan2(b.y-a.y, b.x-a.x));
    drawArc(a.x, a.y, 48, b.x, b.y, c.x, c.y);
    drawArc(b.x, b.y, 48, a.x, a.y, c.x, c.y);
    drawArc(c.x, c.y, 48, a.x, a.y, b.x, b.y);
    //arc(b.x, b.y, 32, 32, atan2(a.y-b.y, a.x-b.x), 2.0*PI+atan2(c.y-b.y, c.x-b.x));
    //arc(c.x, c.y, 32, 32, atan2(b.y-c.y, b.x-c.x), atan2(a.y-c.y, a.x-c.x));
    
    var p1 = LineIntersect(a.x, a.y, b.x, b.y, c.x, c.y, c.x + (a.y-b.y), c.y + (b.x-a.x));
    p1.draw();
    dottedLine(c.x, c.y, p1.x, p1.y, 0.08);
    var s1 = insegment(a.x, a.y, b.x, b.y, c.x, c.y, c.x + (a.y-b.y), c.y + (b.x-a.x));
    if (s1==1) {
      dottedLine(p1.x, p1.y, a.x, a.y, 0.05);
    }
   
    if (s1==2) {
      dottedLine(p1.x, p1.y, b.x, b.y, 0.05);
    }   
    
    var p2 = LineIntersect(b.x, b.y, c.x, c.y, a.x, a.y, a.x + (b.y-c.y), a.y + (c.x-b.x));
    p2.draw();
    dottedLine(a.x, a.y, p2.x, p2.y, 0.05);
    var s2 = insegment(b.x, b.y, c.x, c.y, a.x, a.y, a.x + (b.y-c.y), a.y + (c.x-b.x));
    if (s2==1) {
      dottedLine(p2.x, p2.y, b.x, b.y, 0.05);
    }
   
    if (s2==2) {
      dottedLine(p2.x, p2.y, c.x, c.y, 0.05);
    }   
    
    var p3 = LineIntersect(a.x, a.y, c.x, c.y, b.x, b.y, b.x + (a.y-c.y), b.y + (c.x-a.x));
    p3.draw();
    dottedLine(b.x, b.y, p3.x, p3.y, 0.05);
    var s3 = insegment(a.x, a.y, c.x, c.y, b.x, b.y, b.x + (a.y-c.y), b.y + (c.x-a.x));
    if (s3==1) {
      dottedLine(p3.x, p3.y, a.x, a.y, 0.05);
    }
   
    if (s3==2) {
      dottedLine(p3.x, p3.y, c.x, c.y, 0.05);
    }   
  }
  
  function drawArc( x1, y1, r, x2, y2, x3, y3 ) {
    
    p.noFill();
    p.stroke(0);
    p.strokeWeight(2);
    
    var a1 = p.atan2(y2-y1, x2-x1);
    if (a1<0) a1 += 2*Math.PI;
    var a2 = p.atan2(y3-y1, x3-x1);
    if (a2<0) a2 += 2*Math.PI;
    if (a2<a1) {
      var t = a2;
      a2 = a1;
      a1 = t;
    }
    if (a2-a1<Math.PI)
      p.arc(x1, y1, r, r, a1, a2);
    else
      p.arc(x1, y1, r, r, a2, a1+2*Math.PI);
  }
  
  
  var dragging_a, dragging_b, dragging_c;
  var mx, my, px, py;

  function mouseOver() {
    a.over = false;
    b.over = false;
    c.over = false;

    if (a.near(p.mouseX-p.width/2, p.mouseY-p.height/2)) {
      a.over = true;
      return;
    }
    
    if (b.near(p.mouseX-p.width/2, p.mouseY-p.height/2)) {
      b.over = true;
      return;
    }
    
    if (c.near(p.mouseX-p.width/2, p.mouseY-p.height/2)) {
      c.over = true;
      return;
    }
  }
  
  p.mousePressed = function() {

    console.log( p.mouseX-p.width/2 )
    console.log( p.mouseY-p.height/2 )
    
    if (a.near(p.mouseX-p.width/2, p.mouseY-p.height/2)) {
      mx = p.mouseX;
      my = p.mouseY;
      dragging_a = true;
      return;
    }
    
    if (b.near(p.mouseX-p.width/2, p.mouseY-p.height/2)) {
      mx = p.mouseX;
      my = p.mouseY;
      dragging_b = true;
      return;
    }
    
    if (c.near(p.mouseX-p.width/2, p.mouseY-p.height/2)) {
      mx = p.mouseX;
      my = p.mouseY;
      dragging_c = true;
      return;
    }
      
  }
  
  p.mouseDragged = function() {
    if (dragging_a) {
      a.x = a.x + p.mouseX-mx;
      a.y = a.y + p.mouseY-my;
      mx = p.mouseX;
      my = p.mouseY;
    }
    
    if (dragging_b) {
      b.x = b.x + p.mouseX-mx;
      b.y = b.y + p.mouseY-my;
      mx = p.mouseX;
      my = p.mouseY;
    }
    
    if (dragging_c) {
      c.x = c.x + p.mouseX-mx;
      c.y = c.y + p.mouseY-my;
      mx = p.mouseX;
      my = p.mouseY;
    }
   
  }
  
  p.mouseReleased = function() {
    dragging_a = false;
    dragging_b = false;
    dragging_c = false;
  }
}

var myp5 = new p5(s, 'trianglegeometry');