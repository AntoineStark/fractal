var SIZE;

var image = function(instruction, rules)
{
	if(rules.hasOwnProperty(instruction))
	{
		return rules[instruction];
	}
	return [instruction];
}
var iteration = function(n, axiom,rules)
{
	var path = axiom;
	for(var i = 0; i != n; i++)
	{
		var newpath = "";
		for(var j = 0; j!= path.length;j++)
		{
			ins = image(path[j],rules);
			for(var k=0;k!=ins.length;k++)
				newpath+=ins[k];
		}
		path = newpath;
		
	}
	return path;
}



function pathFractal(fractal)
{
	var path = [];
	var saves = [];
	var place = [0,0]
	var angle = 0;
	var multiplier = '';
	var save = [];
	var baseangle = fractal.theta;
	var scale = fractal.scale;
	var boundaries = [[0,0],[0,0]];
	var size = 1;
	for(var i=0;i!=fractal.draw.length;i++)
	{
		var c = fractal.draw[i];
		if(c === '+')
		{
			if(multiplier !== '')
			{
				angle += baseangle*multiplier;
				multiplier = '';
			}
			else
				angle += baseangle;
		}
		else if(c === '-')
		{
			if(multiplier !== '')
			{
				angle -= baseangle*multiplier;
				multiplier = '';
			}
			else
				angle -= baseangle;
		}
		else if(c === '/')
		{
			size /= scale;
		}
		else if(c === '*')
		{
			size *= scale;
		}
		else if(c>='0' && c <='9')
			multiplier += c;
		else if(c === '[')
		{
			newplace = place.slice(0);
			newplace.push(angle);
			newplace.push(size);
			saves.push(newplace);
		}
		else if(c === ']')
		{
			newplace = saves.splice(save.length-1,1)[0];
			size = newplace.splice(3,1)[0];
			angle = newplace.splice(2,1)[0];
			place = newplace;
		}
		else if((c>='A' && c <='z')|| c==='|')
		{
			var newplace = [];
			newplace[0] = place[0] + Math.cos(angle/180*Math.PI)*size;
			newplace[1] = place[1] + Math.sin(angle/180*Math.PI)*size;

			if(c === c.toUpperCase())
				path.push([place,newplace,c]);
			boundaries[0][0]=Math.min(newplace[0],boundaries[0][0]);
			boundaries[0][1]=Math.min(newplace[1],boundaries[0][1]);
			boundaries[1][0]=Math.max(newplace[0],boundaries[1][0]);
			boundaries[1][1]=Math.max(newplace[1],boundaries[1][1]);
			place = newplace;
		}
	}
	fractal.path = path;
	fractal.boundaries = boundaries;
	return fractal;
}

function findborders(boundaries)
{
	offset = Math.max(boundaries[1][0]-boundaries[0][0],boundaries[1][1]-boundaries[0][1])*6/10;
	var border = [];
	border[0] = (boundaries[0][0]+boundaries[1][0])/2-offset;
	border[1] = (boundaries[0][1]+boundaries[1][1])/2-offset;
	border[2] = offset*2;
	return border;
}

function line(pA, pB, border, ctx)
{
		offset = border[2];
   		ctx.moveTo(Math.floor((pA[0]-border[0])/offset*SIZE),Math.floor(SIZE-(pA[1]-border[1])/offset*SIZE));
   		ctx.lineTo(Math.floor((pB[0]-border[0])/offset*SIZE),Math.floor(SIZE-(pB[1]-border[1])/offset*SIZE));
}

function drawpath(fractal, ctx)
{

	ctx.beginPath();
	var border = findborders(fractal.boundaries);
	for( var i=0;i!=fractal.path.length;i++)
		line(fractal.path[i][0],fractal.path[i][1],border, ctx)
	//line(fractal.path[0][0],fractal.path[fractal.path.length-1][1],border)
}

function drawFractal(fractal,canvas)
{
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "rgba(0,0,0,1)";
	var text = document.getElementById("testbox");
	SIZE = canvas.height;
	ctx.clearRect(0,0,canvas.width,canvas.height);

	fractal.draw = iteration(fractal.n,fractal.axiom,fractal.rules);
	fractal = pathFractal(fractal);
	drawpath(fractal, ctx);
	ctx.stroke();
	//console.log(fractal)
}

function execIn(f,fractal,time, canvas)
{
	var fractalTemp = copy(fractal);
	setTimeout(function(){ f(fractalTemp, canvas); }, time*1000);

}

function copy(obj)
{
	if(typeof obj == "object")
	{
		var newObj = {};
		for(var i in obj)
			if(obj.hasOwnProperty(i))
				newObj[i]=copy(obj[i]);
		return newObj;
	}
	return obj;
}
