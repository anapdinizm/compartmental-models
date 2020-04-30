document.getElementById('control_initial_population').addEventListener('change', function (e) {
    this.value = parseInt(this.value);
    inputInitialPopulation = this.value;
    if (inputInitialPopulation > MAX_INITIAL_POPULATION) {
        this.value = initialPopulation;
        alert('O número é muito alto. Valor máximo para a população inicial é ' + MAX_INITIAL_POPULATION);
    } else {
        initialPopulation = inputInitialPopulation;
    
        lineGraph_SEIR.options.scales.yAxes[0].ticks.max = parseFloat(initialPopulation);
        calculateODE_SEIR();
        lineGraph_SEIR.update();
    }
});

/* Initial infected */
document.getElementById('control_initial_infected').addEventListener('change', function (e) {
    inputInitialInfected = parseInt(this.value);
    if (inputInitialInfected > initialPopulation) {
        alert('O número de infectados deve ser menor que o número total de pessoas');
        this.value = Math.round(I0 * initialPopulation);
    } else {
        I0 = inputInitialInfected / initialPopulation;
        calculateODE_SEIR();
        lineGraph_SEIR.update();
    }
});

document.getElementById('control_infection_rate').addEventListener('change', function (e) {
    let input_b = this.value;
    transmission_rate=input_b / 100;
    document.getElementById('control_infection_rate').value = input_b;
    document.getElementById('control_infection_rate_text').innerHTML = transmission_rate;

    r_naught=transmission_rate/infeccious_period;
    document.getElementById('output_R0_text').innerHTML = r_naught.toFixed(2);
    calculateODE_SEIR();
    lineGraph_SEIR.update();
});

document.getElementById('control_infeccious_period').addEventListener('change', function (e) {
    this.value = parseInt(this.value);
    let input_infected_period = this.value;
    if (input_infected_period > MAX_INFECCIOUS_PERIOD) {
        this.value = Math.round(1/infeccious_period);
        alert('O número é muito alto. Valor máximo para o período infeccioso são ' + MAX_INFECCIOUS_PERIOD + ' dias');
    } else if (input_infected_period == 0) {
        this.value = Math.round(1/infeccious_period);
        alert('O valor para o período infeccioso precisar ser maior que 0 ');
    } else {
        infeccious_period = 1/input_infected_period;
        r_naught=transmission_rate/infeccious_period;
        document.getElementById('output_R0_text').innerHTML = r_naught.toFixed(2);
    
        calculateODE_SEIR();
        lineGraph_SEIR.update();
    }
});

document.getElementById('control_incubation_period').addEventListener('change', function (e) {
    this.value = parseInt(this.value);
    let input_incubation_period = this.value;
    if (input_incubation_period > MAX_INCUBATION_PERIOD) {
        this.value = Math.round(1/incubation_period);
        alert('O número é muito alto. Valor máximo para o período infeccioso são ' + MAX_INCUBATION_PERIOD + ' dias');
    } else if (input_incubation_period == 0) {
        this.value = Math.round(1/incubation_period);
        alert('O valor para o período infeccioso precisar ser maior que 0 ');
    } else {
        incubation_period = 1/input_incubation_period;
        r_naught=transmission_rate/infeccious_period;
        document.getElementById('output_R0_text').innerHTML = r_naught.toFixed(2);
    
        calculateODE_SEIR();
        lineGraph_SEIR.update();
    }
});


//SEIR
document.getElementById('check-healthy-seir').addEventListener('change', function (e) {
    if(this.checked) {
    // Checkbox is checked..
    lineGraph_SEIR.getDatasetMeta(0).hidden=false;
} else {
    // Checkbox is not checked..
    lineGraph_SEIR.getDatasetMeta(0).hidden=true;
}
lineGraph_SEIR.update();
});

document.getElementById('check-exposed-seir').addEventListener('change', function (e) {
    if(this.checked) {
    // Checkbox is checked..
    lineGraph_SEIR.getDatasetMeta(1).hidden=false;
} else {
    // Checkbox is not checked..
    lineGraph_SEIR.getDatasetMeta(1).hidden=true;
}
lineGraph_SEIR.update();
});

document.getElementById('check-infected-seir').addEventListener('change', function (e) {
    if(this.checked) {
    // Checkbox is checked..
    lineGraph_SEIR.getDatasetMeta(2).hidden=false;
} else {
    // Checkbox is not checked..
    lineGraph_SEIR.getDatasetMeta(2).hidden=true;
}
lineGraph_SEIR.update();
});

document.getElementById('check-recovered-seir').addEventListener('change', function (e) {
    if(this.checked) {
    // Checkbox is checked..
    lineGraph_SEIR.getDatasetMeta(3).hidden=false;
} else {
    // Checkbox is not checked..
    lineGraph_SEIR.getDatasetMeta(3).hidden=true;
}
lineGraph_SEIR.update();
});


/* Set input of the form to the initial values */
document.getElementById('control_initial_population').value = initialPopulation;

document.getElementById('control_initial_infected').value = Math.round(I0 * initialPopulation);

document.getElementById('control_infection_rate').value = transmission_rate * 100;
document.getElementById('control_infection_rate_text').innerHTML = transmission_rate;

document.getElementById('control_infeccious_period').value = Math.round(1/infeccious_period);

document.getElementById('control_incubation_period').value = Math.round(1/incubation_period);

document.getElementById('output_R0_text').innerHTML = r_naught.toFixed(2);

/* Button: calculate ode for SEIR model */
document.getElementById('calculate_ode_seir').addEventListener('click', function (e) {
    calculateODE_SEIR();
    lineGraph_SEIR.update();
});    
