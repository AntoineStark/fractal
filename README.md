# fractal
making Lsystems Fractals!
this is a tiny javascript browser L-system fractal renderer.

##The Fractals
Fractals are stored into an object, with :
* An iteration count
* an angle
* an axiom, the starting instructions
* a scale, when you need to make parts of the fractal smaller,
* a set of rules, to replace replace the parts of the original instruction
Example :
```
kochFractal = {
  n: 5,  // 5 iterations to create the fractal
  theta: 60, // making 60 degrees turn
  axiom: "F", // the starting string is "F"
  rules: {
    "F": "F+F--F+F" // at each iterations we replace F by "F+F--F+F"
  }
  // no need to specify a scale here.
```
This is all it need to specify a fractal, here it is the Koch Curve.
next, you just need to draw it
```
drawFractal(kochFractal,canvas) //the canvas need to be square or it wont always draw it totaly inside.
```
*So, What happents?* 
for each iteration, we replace the string, from the stratrtting string, according to the rules
here we have:
F
F        + F        -- F        + F
F+F--F+F + F+F--F+F -- F+F--F+F + F+F--F+F
And, with n=3,  F+F--F+F + F+F--F+F -- F+F--F+F + F+F--F+F
              + F+F--F+F + F+F--F+F -- F+F--F+F + F+F--F+F
              --F+F--F+F + F+F--F+F -- F+F--F+F + F+F--F+F
              + F+F--F+F + F+F--F+F -- F+F--F+F + F+F--F+F


Once we have this list of instructions, we can start to draw it:
* **[A-Z]** or **|** the turtle draw a line
* **[a-z]** the turtle move, but _does not_ draw a line
* **+** the turtle turn around itself by the angle, the right and trigonometric way.
* **-** the turtle turn around itself by the angle, the wrong and clock-not-wise way.
* **[1-9]** the turtle will turn harder next time a **+** or **-** comes out. your number can have multiple digits, but have to be an integer.
* __*__ the lines the turtle will be bigger by the scale.
* __/__ the lines the turtle will be smaller by the scale.
* **[** the turtle saves the current state
* **[** the turtle loads the last saved state that have not been loaded yet.
* Any other character wont do anything, but can be used in the rules

That way, it will draw the fractal with a nice 10% of the width around it!
Have fun!
