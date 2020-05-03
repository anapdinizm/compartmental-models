var rk4 = IntegratorFactory
   
function copy(x) {
     return Object.assign({},x)
}
   
function simulate(f,t0,y0,step,tmax) {
    var integrator = rk4(y0, f, t0, step)
    var t = t0
    var y = y0
    var ta = []
    var ya = []
    ta.push(t0)
    ya.push(copy(y))
    while(true){
      t = t+step
      if(t>tmax) break
      integrator=integrator.step()
      ya.push(copy(integrator.y))
      ta.push(t)
    }
    return {t:ta,y:ya};
}

function sir(dydt, y, t) {
     dydt[0] = -transmission_rate*y[0]*y[1];//S
     dydt[1] = transmission_rate*y[0]*y[1] - infeccious_period*y[1];//I
     dydt[2] = infeccious_period*y[1];//R
}

function calculateODE() { 
    var sir_sol = simulate(sir,0,[1.0-I0,I0,0.0],step,tmax);
    config.data.labels = sir_sol.t; //t
    config.data.datasets[0].data = sir_sol.y.map((x)=>{return Math.round(x[0] * initialPopulation)});//S
    config.data.datasets[1].data = sir_sol.y.map((x)=>{return Math.round(x[1] * initialPopulation)});//I
    config.data.datasets[2].data = sir_sol.y.map((x)=>{return Math.round(x[2] * initialPopulation)});//R
}

MAX_INITIAL_POPULATION = 1800000000; /*World population ~ 7800000000 -- China ~ 1800000000*/
 //Days
/* Population */
initialPopulation = 200000;
transmission_rate=0.5; //transmission rate b
infeccious_period=0.066; //recovery rate of infected people g
I0=1/initialPopulation; //initial infected 
step=1; //step time
tmax=180.0;//maximum time
MAX_INFECCIOUS_PERIOD = Math.round(tmax / 2);
r_naught=transmission_rate/infeccious_period;

var sir_sol = simulate(sir,0,[1.0-I0,I0,0.0],step,tmax);

var t = sir_sol.t;
var S = sir_sol.y.map((x)=>{return Math.round(x[0] * initialPopulation)});
var I = sir_sol.y.map((x)=>{return Math.round(x[1] * initialPopulation)});
var R = sir_sol.y.map((x)=>{return Math.round(x[2] * initialPopulation)});

/* Chart with daily statistics*/
var lineGraph;
