# Notes for .js files

// -- 1) -- //<br/>
// event.clientY - canvas.height/2 = distance from our mouse and the center of the screen

// -- 2) -- //<br/>
// angle produced from my mouse and the center of the screen (see picture)
// same as window.addEventListener() (e can omit the global object => is implicit)

// -- 3) -- //<br/>
// 1st for each: for each enemy we update (animate) it
// 2nd for each: we calculate the distance between each projectile and the enemy (math.hypot)

// -- 4) -- //<br/>
// setTimeout here to remove the flashing effect whenever there is a collision
// Upon collision bwn enemy-projectile, we remove an enemy from the array and when I go to the next frame the animation is still trying to dwaw, even thoigh has been removed)

// -- 5) -- //<br/>
// c.fillStyle = 'rgba(0,0,0,0.1)';
// c.fillRect(0, 0, canvas.width, canvas.height);
// fade effect: set the background color with alpha channel 0.1 (change the opacity of the fillStyle). As the particle moves we are only draw on the background at a certain transparency at a time (we get the fade effect)

// -- 6) -- //<br/>
// shrink / eliminate enemies
// -- // gsap library to interpolating between values( transitioning from one value to another smoothly, adding an easing curve between transition)

// -- 7) -- //<br/>
// Create particle explosion on hit ( random particle size, based on the size of the enemy)

// -- 8) -- //<br/>
// (Particle fade out over time. To make particles disappear after showing on hit. Start at 1: opaque, and make it transparent).

// -- 9) -- //<br/>
// velocity of the particle upon explosion:
//(Math.random() - 0.5) _ Math.random() _ 9;
// (Math.random() - 0.5) => generate a random number ( + or -)
// Math.random() \* 9 (Increase that speed, randomly, by 9)

// -- 10) -- //<br/>
// following player moevements(homing enemies).
// We get the angle produced between the enemy and the player, for every single enemy in the screen.
// const angle = Math.atan2(player.y - this.y, player.x - this.x);
// (player.y - this.y) (player.x - this.x) are the distance between the player and the enemy in the two axis).
// -- 10)a<br/>
// we use Math.cos and Math.sin togheter to get the velocity that's homing in our enemy based on the angle produced between the enemy and the player
// to check the value of this angle (because for all the enemyy is a bit confusing), remove setTimeout from spawnEnemies function and check with a console log on Enemy constructor.
// For every frame we are recaltulating this velocity (the angle is constantly changing because the position change)

// -- 11) -- //<br/>
// Most of the enemy(default) are going to be linear (travel in a linear movement) the center and 'homing enemy (go toward the player)<br/>
// ---- 11a) give a 25% chance to make an enemy 'homing' or 'spinning'

// -- 12) -- //<br/>
// Spinnig movement (we create a ring, that is moving on the screen, and the enemy orbit around that centre)
// ---- 12a) the range of cos is -1 to 1. Math.cos(0)/ Math.sin(0) increase the radians, \*100 so we create a larger ring( how large we want the ring where the enemy travels around)

// -- 13) -- //<br/>
// // why 10? 10 = image size /2 (20x20 is the image size of the powerUp icon)

// -- 14) -- //<br/>
// destructuring the event object (from the browser), and taking just eventX and eventY

// -- 15) -- //<br/>
// the code inside save() / restore() partain just to what is inside of it (locally). If we don't open and close with those, the changes (in this case the rotation) are applied globally, because canvas methods are global for the whole object
// ---- 15)a translate the powerUp back to where it was

// -- 16) -- //<br/>
// position: absolute; => so it won't be appended at the end of the body but in the canvas )we can see it in the canvas)
// ---- 16) a the user cannot select the label

// -- 17) -- //

// -- 18) -- //

// -- 19) -- //
