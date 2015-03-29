var canvas = document.getElementById("canvas");

function animateSpike(canvas)
{
	var fractal = 	{
	"n":5,
	"theta" : 1,
	"axiom" : "F90-F90-F90-F",
	"rules" : 	{
				"F":"F-F++F-F"
	}
}
	for(var i=0;i<=90;i+=1)
	{
		fractal.rules.F = "F"+i+"-F"+2*i+"+F"+i+"-F";
		execIn(drawFractal,fractal,i/10,canvas)
	}
}



function animateHilbert(canvas)
{
	var fractal =	{
	"n":7,
	"theta":90,
	"axiom":".",
	"rules":{
		".":"+,|-.|.-|,+",
		",":"-.|+,|,+|.-"
	}

}
	for(var i=0;i<=90;i+=1)
	{
		var j = Math.sqrt(i/90)*90;
		fractal.theta = j;
		execIn(drawFractal,fractal,i/10,canvas)
	}
}

fractalKoch = 
{
	"n":6,
	"theta" : 60,
	"axiom" : "F",
	"rules" : {
	"F":"F+F--F+F",
	}
};

fractalH = 
{
	"n":10,
	"theta" : 90,
	"axiom" : "[+F]-F",
	"rules" : {
		"F":"|*[-F]+F",
	},
	"scale" : 13/20
};

fractalY = 
{
	"n":10,
	"theta" : 45,
	"axiom" : "[++F]--F",
	"rules" : {
		"F":"|*[-F]+F",
	},
	"scale" : 13/20
};

fractalLake = 
{
	"n":3,
	"theta" : 90,
	"axiom" : "F+F+F+F",
	"rules" : {
	"F":"F+f-FF+F+FF+Ff+FF-f+FF-F-FF-Ff-FFF",
	"f":"ffffff"
	}
};

fractalTriangle = {
	"n":8,
	"theta" : 60,
	"axiom" : "F",
	"rules" : {
	"F":"+G-F-G+",
	"G":"-F+G+F-"
	}
};

fractalDragon = {
	"n":12,
	"theta" : 45,
	"axiom" : "F",
	"rules" : {
	"F":"+F2-G+",
	"G":"-F2+G-"
	}
};

fractalWeed = 
{
	"n":7,
	"theta" : 20,
	"axiom" : "4+F",
	"rules" : 
	{
		"F":"F[-F]F[+F]F"
	},
	"scale" : 13/20

};

penrose = 
{
	"n":6,
	"theta" : 36,
	"axiom" : "[N]++[N]++[N]++[N]++[N]",
	"rules" : {
	"M":"OA2+PA4-NA[-OA4-MA]++",
	"N":"+OA2-PA[3-MA2-NA]+",
  	"O":"-MA2+NA[3+OA2+PA]-",
 	"P":"2-OA4+MA[+PA4+NA]2-NA",
  	"A":""
	}
};

