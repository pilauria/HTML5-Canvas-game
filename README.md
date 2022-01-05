# - PLANETOID - HTML5 CANVAS

## Description

Planetoid is a Space-themed multidirectional shooter arcade game inspired by the classic 'Asteroids' designed by Lyle Rains and Ed Logg released in November 1979 by Atari, Inc.[4] <br/>
The player controls a spaceship, both with keyboard keys and mouse, in an asteroid field which is periodically traversed by different types of flying objects. The object of the game is to shoot and destroy the asteroids while not colliding with them. <br/>
The game becomes harder as the number of asteroids increases.

## MVP

HTML5, DOM, Canvas API and Vanilla Javascript

## Data structure

Classes, funcions, and methods definition.

## States / States Transitions

### Game states

- **Start Screen**

  - Modal window with Start Game button.
  - Game Info.
  - Score info

- **Game Screen**
  - Canvas (with resizing screen)
- **Game Over Screen**
  - Modal window with game over text
  - Total score
  - Start button

## Task

Task definition in order of priority

#### **Main**

- [x] Create a player
- [x] Shoot projectiles
- [x] Create enemies
- [x] Detect collision on enemy / projectile hit
- [x] Detect collision on enemy / player hit
- [x] Remove off screen projectiles
- [x] Colorize game (background( c.fillStyle), player(new Player), enemies(f spawnEnemies ⇒ const color =),
- [x] Shrink enemies on hit (gsap=> [https://greensock.com/gsap/](https://greensock.com/gsap/))
- [x] Create particle explosion on hit
- [x] Add score
- [x] Add start game button
- [x] Add game over (UI)
- [x] Add restart button
      <br/>

#### **Player movements / Scene**

- [x] 2D Player movement
- [x] Homing Enemies (make enemies following the player)
- [x] Spinning Enemies / Fix Projectile Bug (shooting just from the center)
- [x] Homing-Spinning Enemies
- [x] Power-Ups
- [x] Dynamic Score Labels & Power Ups
- [x] Sound Effects
- [x] Background Music
- [x] Screen Resizing
- [x] UI Animations (score on player)

#### **Touch Ups**

- [x] Background image
- [x] Player Image
- [x] Split Files

## Links

### Trello

[Link url](https://trello.com)

### GitHub

URl for the project repo and deploy </br>
[Link Repo](https://github.com/pilauria/Planetoid-HTML5-Canvas-) </br>
[Link Deploy](https://pilauria.github.io/Planetoid-HTML5-Canvas/)

### Slides

URls for the project presentation (slides) </br>
[Link Slides](https://docs.google.com/presentation/d/1saHYKa8NRAETTdnK27RIqOByxUSWcA7PcbkN9Odpvgs/edit?usp=sharing)
