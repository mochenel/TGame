# Travesal Game Instructions
**The rules of the game.**

**Traversal** is played on a rectangular board divided into squares. Some of the squares are empty,
while others contain "active" pieces.

  <img src="images/tvl_e.png" width="50" > Empty square

  <img src="images/tvl_x.png" width="50" >  Wall, never moves

  <img src="images/tvl_s.png" width="50" >  Player, moved by the user (keys on the keyboard)

  <img src="images/tvl_t.png" width="50" >  Target, never moves
 
If the player is at the left (or right) edge of the board, moving left (or right) off the board has no
effect.In other words, the player cannot move beyond the left and right edge of the board. On the
other hand,if the player is at the top (or bottom) edge of the board, moving up (or down) makes
the player appear at the other edge.In other words, the player can wrap around the board from
the top to the bottom and vice versa.

# Switchers
**Switchers** are active pieces that are either on or off. When they are on, the player is not allowed to
move onto them; "touching" them will end the round. When they are off, the player can move over
switchers. Switchers toggle between the on/off states based whenever the player moves.
Horizontal switchers toggle every time the player makes a horizontal move (either left or right);
vertical switchers toggle every time the player makes a vertical move (either up or down).


  <img src="images/tvl_sh1.png" width="100">  <img src="images/tvl_sv1.png" width="100"> Horizontal and vertical switchers in on state

  <img src="images/tvl_sh0.png" width="100">  <img src="images/tvl_sv0.png" width="100"> Horizontal and vertical switchers in off state

# Keys and ports

**Ports** are active pieces that are either open or closed. Keys are also active pieces. At the start of
a round, all keys are "available": when the player moves over a key, it toggles all of the ports on the
board between their open/closed states. In other words, all ports that are open, change to closed; all ports that are closed,
change to open. Once a key has toggled the ports, the key becomes
unavailable and can never toggle the ports again. The player is not allowed to move onto closed ports;
"touching" them will end the round. The player can move onto open ports.

<img src="images/tvl_p1.png" width="100"> Closed port

<img src="images/tvl_p0.png" width="100"> Open port

<img src="images/tvl_k1.png" width="100"> Available key

<img src="images/tvl_k0.png" width="100"> Unavailable key

# Walls
Walls remain stationary, "touching" them will end the round.
