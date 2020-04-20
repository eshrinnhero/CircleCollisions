class Circle
{
  
  constructor(cx, cy, r)
	{
		this.centerX = cx;
		this.centerY = cy;
		this.radius = r;
		this.speedX = 0;
		this.speedY = 0;
		
		this.prevCenterX = cx;
		this.prevCenterY = cy;
	}
	
	/*
	 * setSpeed
	 * @param x - Horizontal component of speed in pixels per second.
	 * @param y - Vertical component of speed in pixels per second.
	 */
	setSpeed(x, y)
	{
		this.speedX = x;
		this.speedY = y;
	}
	
	/*
	 * reverseSpeed
	 * Simulate collision response by negating speed to reverse direction.
	 */
	reverseSpeed()
	{
		this.speedX *= -1;
		this.speedY *= -1;
	}
	
	/*
	 * move
	 * @param deltaTimeSeconds - Elapsed time of one frame of animation in seconds.
	 * @param boundsWidth - width of HTML canvas window in pixels.
   * @param boundsHeight - height of HTML canvas window in pixels.
	 */
	move(deltaTimeSeconds, boundsWidth, boundsHeight)
	{
		this.prevCenterX = this.centerX;
		this.prevCenterY = this.centerY;
		
		// Increment position by speed in pixels / second x elapsed time per frame in seconds.
		this.centerX += (deltaTimeSeconds * this.speedX);
		// Wrap position around to opposide side of screen.
		if(this.centerX < 0)
		  this.centerX = boundsWidth;
		else if(this.centerX > boundsWidth)
		  this.centerX = 0;
			
		// Increment position by speed in pixels / second x elapsed time per frame in seconds.
		this.centerY += (deltaTimeSeconds * this.speedY);
		// Wrap position around to opposide side of screen.
		if(this.centerY < 0)
		  this.centerY = boundsHeight;
		else if(this.centerY > boundsHeight)
		  this.centerY = 0;		
	}
	
	/*
	 * undoMove
	 * Restore center position prior before most recent call to move.
	 */
	undoMove()
	{
		this.centerX = this.prevCenterX;
		this.centerY = this.prevCenterY;
	}
	
	/*
	 * draw
	 * @param canvasContext - HTML canvas 2D drawing context.
	 */
	draw(canvasContext)
	{
		// Set color of brush stroke - lines.
		canvasContext.strokeStyle = "black";
		// Set line width in pixels.
		canvasContext.lineWidth = 4;
		// Set color for filled interior of shapes.
		canvasContext.fillStyle = "#5DADE2";

		// To draw a circle we create a path that will consist of an arc.
		canvasContext.beginPath();
		// Arguments are centerX, centerY, radius, startAngle, endAngle (in radians)
		canvasContext.arc(this.centerX, this.centerY, this.radius, 0,2*Math.PI);
		// Draw filled interior of current path using specified fillStyle color.
		canvasContext.fill();
		// Complete drawing the path by issuing the stroke command.
		// Path will be drawn as a line - interior of closed shape is not filled.
		canvasContext.stroke();	
	}
	
	/*
	 * isCollides
	 * @param otherCircle - Given Circle object representing another Circle.
	 * @returns true if this Circle collides with given otherCircle; else, false.
	 */
	isCollides(otherCircle)
	{	
		// get the data to be used in the distance formula
		// x data is the x distance
		// y data is the y distance
		var xData = (otherCircle.centerX - this.centerX);
		var yData = (otherCircle.centerY - this.centerY);
		
		var distance = Math.sqrt((Math.pow(xData, 2) + (Math.pow(yData, 2))));
		
		if (distance < ((this.radius * 2))) {
			return true;
		}
		else {
			return false;
		}
	}
}