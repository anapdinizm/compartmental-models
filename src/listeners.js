document.getElementById('control_initial_population').addEventListener('change', function (e) {
    this.value = parseInt(this.value);
    inputInitialPopulation = this.value;
    if (inputInitialPopulation > MAX_INITIAL_POPULATION) {
        this.value = initialPopulation;
        alert('O número é muito alto. Valor máximo para a população inicial é ' + MAX_INITIAL_POPULATION);
    } else {
        initialPopulation = inputInitialPopulation;
    
        lineGraph.options.scales.yAxes[0].ticks.max = parseFloat(initialPopulation);
        calculateODE();
        lineGraph.update();
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
        calculateODE();
        lineGraph.update();
    }
});

document.getElementById('control_infection_rate').addEventListener('change', function (e) {
    let input_b = this.value;
    transmission_rate=input_b / 100;
    document.getElementById('control_infection_rate').value = input_b;
    document.getElementById('control_infection_rate_text').innerHTML = transmission_rate;

    r_naught=transmission_rate/infeccious_period;
    document.getElementById('output_R0_text').innerHTML = r_naught.toFixed(2);
    calculateODE();
    lineGraph.update();
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
    
        calculateODE();
        lineGraph.update();
    }
});

document.getElementById('check-healthy').addEventListener('change', function (e) {
    if(this.checked) {
    // Checkbox is checked..
    lineGraph.getDatasetMeta(0).hidden=false;
} else {
    // Checkbox is not checked..
    lineGraph.getDatasetMeta(0).hidden=true;
}
lineGraph.update();
});

document.getElementById('check-infected').addEventListener('change', function (e) {
    if(this.checked) {
    // Checkbox is checked..
    lineGraph.getDatasetMeta(1).hidden=false;
} else {
    // Checkbox is not checked..
    lineGraph.getDatasetMeta(1).hidden=true;
}
lineGraph.update();
});

document.getElementById('check-recovered').addEventListener('change', function (e) {
    if(this.checked) {
    // Checkbox is checked..
    lineGraph.getDatasetMeta(2).hidden=false;
} else {
    // Checkbox is not checked..
    lineGraph.getDatasetMeta(2).hidden=true;
}
lineGraph.update();
});


/* Set input of the form to the initial values */
document.getElementById('control_initial_population').value = initialPopulation;

document.getElementById('control_initial_infected').value = Math.round(I0 * initialPopulation);

document.getElementById('control_infection_rate').value = transmission_rate * 100;
document.getElementById('control_infection_rate_text').innerHTML = transmission_rate;

document.getElementById('control_infeccious_period').value = Math.round(1/infeccious_period);

document.getElementById('output_R0_text').innerHTML = r_naught.toFixed(2);

/* Button: calculate ode for SIR model */
document.getElementById('calculate_ode').addEventListener('click', function (e) {
    calculateODE();
    lineGraph.update();
});    
