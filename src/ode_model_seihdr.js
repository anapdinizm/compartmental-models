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

function seihdr(dydt_seihdr, y, t) {
    dydt_seihdr[0] = -transmission_rate*y[0]*y[2]; //S
    dydt_seihdr[1] = transmission_rate*y[0]*y[2] - incubation_period*y[1];//E
    dydt_seihdr[2] = incubation_period*y[1] - nu*y[2] - alpha*y[2] - mu*y[2];//I
    dydt_seihdr[3] = alpha*y[2] - sigma*y[3] - rho*y[3];//H
    dydt_seihdr[4] = mu*y[2] + rho*y[3];//D
    dydt_seihdr[5] = nu*y[2] + sigma*y[3];//R
}

function calculateODE_SEIHDR() { 
    var sir_sol_seihdr = simulate(seihdr,0,[1.0-I0,0.0,I0,0.0,0.0,0.0],step,tmax);
    config_seihdr.data.labels = sir_sol_seihdr.t; //t
    config_seihdr.data.datasets[0].data = sir_sol_seihdr.y.map((x)=>{return Math.round(x[0] * initialPopulation)});//S
    config_seihdr.data.datasets[1].data = sir_sol_seihdr.y.map((x)=>{return Math.round(x[1] * initialPopulation)});//E
    config_seihdr.data.datasets[2].data = sir_sol_seihdr.y.map((x)=>{return Math.round(x[2] * initialPopulation)});//I
    config_seihdr.data.datasets[3].data = sir_sol_seihdr.y.map((x)=>{return Math.round(x[3] * initialPopulation)});//H
    config_seihdr.data.datasets[4].data = sir_sol_seihdr.y.map((x)=>{return Math.round(x[4] * initialPopulation)});//D
    config_seihdr.data.datasets[5].data = sir_sol_seihdr.y.map((x)=>{return Math.round(x[5] * initialPopulation)});//R
}


MAX_INITIAL_POPULATION = 1800000000; /*World population ~ 7800000000 -- China ~ 1800000000*/
/* Population */
initialPopulation = 200000;
Hospital_beds = Math.round(initialPopulation/20);//Math.round((initialPopulation / 1000)*3.2); 

transmission_rate=0.5; //transmission rate
incubation_period=0.2;//incubation period 

infeccious_period=0.066; //recovery rate of infected people[1/15] 
hospitalization_rate=0.2;//hospitalization rate 
hospitalization_period=0.1; //hospitalization_periodecovery rate from hospitalization 
infected_death_period=0.04; //time that a infected person can die [1/25]
infected_hospital_period=0.2;// time from end of incubation to hospitalization [1/5]
mortality_rate = 0.02; //

nu = infeccious_period * (1-(mortality_rate + hospitalization_rate));//infectious_period[1/15] * 1-(mortality rate + hospitalization rate)[0.78]
sigma = (1-mortality_rate)*hospitalization_period;
rho = mortality_rate*hospitalization_period;
alpha = hospitalization_rate*infected_hospital_period;
mu = mortality_rate*infected_death_period;


I0=1/initialPopulation; //initial infected 
step=1; //step time
tmax=180.0;//maximum time
MAX_INFECCIOUS_PERIOD = Math.round(tmax / 2);
MAX_INCUBATION_PERIOD = Math.round(tmax / 2);
MAX_HOSPITAL_PERIOD = Math.round(tmax / 3);
MAX_InfectedtoDeath_PERIOD = Math.round(tmax / 6);
MAX_timeHospitalize_PERIOD = Math.round(tmax / 6);
r_naught=transmission_rate/(nu+mu+alpha);

var sir_sol_seihdr = simulate(seihdr,0,[1.0-I0,0.0,I0,0.0,0.0,0.0],step,tmax);

var t_SEIHDR = sir_sol_seihdr.t; //t
var S_SEIHDR = sir_sol_seihdr.y.map((x)=>{return Math.round(x[0] * initialPopulation)});//S
var E_SEIHDR = sir_sol_seihdr.y.map((x)=>{return Math.round(x[1] * initialPopulation)});//E
var I_SEIHDR = sir_sol_seihdr.y.map((x)=>{return Math.round(x[2] * initialPopulation)});//I
var H_SEIHDR = sir_sol_seihdr.y.map((x)=>{return Math.round(x[3] * initialPopulation)});//H
var D_SEIHDR = sir_sol_seihdr.y.map((x)=>{return Math.round(x[4] * initialPopulation)});//D
var R_SEIHDR = sir_sol_seihdr.y.map((x)=>{return Math.round(x[5] * initialPopulation)});//R

var peak_day = I_SEIHDR.indexOf(Math.max.apply(null, I_SEIHDR)) + 1;
var maxinfected_people = Math.max.apply(null, I_SEIHDR);

/* Chart with daily statistics*/
var lineGraph_SEIHDR;

