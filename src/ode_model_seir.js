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
   
function seir(dydt_seir, y, t) {
    dydt_seir[0] = -transmission_rate*y[0]*y[2];//S
    dydt_seir[1] = transmission_rate*y[0]*y[2] - incubation_period*y[1];//E
    dydt_seir[2] = incubation_period*y[1] - infeccious_period*y[2];//I
    dydt_seir[3] = infeccious_period*y[2];//R
}

function calculateODE_SEIR() { 
    var sir_sol_seir = simulate(seir,0,[1.0-I0,0.0,I0,0.0],step,tmax);
    config_seir.data.labels = sir_sol_seir.t; //t
    config_seir.data.datasets[0].data = sir_sol_seir.y.map((x)=>{return Math.round(x[0] * initialPopulation)});//S
    config_seir.data.datasets[1].data = sir_sol_seir.y.map((x)=>{return Math.round(x[1] * initialPopulation)});//E
    config_seir.data.datasets[2].data = sir_sol_seir.y.map((x)=>{return Math.round(x[2] * initialPopulation)});//I
    config_seir.data.datasets[3].data = sir_sol_seir.y.map((x)=>{return Math.round(x[3] * initialPopulation)});//R
}


MAX_INITIAL_POPULATION = 1800000000; /*World population ~ 7800000000 -- China ~ 1800000000*/
/* Population */
initialPopulation = 200000;

transmission_rate=0.5; //transmission rate b
incubation_period=0.2;//incubation period f
infeccious_period=0.066; //recovery rate of infected people g
I0=0.01; //initial infected 
step=1; //step time
tmax=180.0;//maximum time
MAX_INFECCIOUS_PERIOD = Math.round(tmax / 2);
MAX_INCUBATION_PERIOD = Math.round(tmax / 2);
r_naught=transmission_rate/infeccious_period;

var sir_sol_seir = simulate(seir,0,[1.0-I0,0.0,I0,0.0],step,tmax);

var t_SEIR = sir_sol_seir.t;
var S_SEIR = sir_sol_seir.y.map((x)=>{return Math.round(x[0] * initialPopulation)});
var E_SEIR = sir_sol_seir.y.map((x)=>{return Math.round(x[1] * initialPopulation)});
var I_SEIR = sir_sol_seir.y.map((x)=>{return Math.round(x[2] * initialPopulation)});
var R_SEIR = sir_sol_seir.y.map((x)=>{return Math.round(x[3] * initialPopulation)});

/* Chart with daily statistics*/
var lineGraph_SEIR;

