document.getElementById('control_initial_population').addEventListener('change', function (e) {
    this.value = parseInt(this.value);
    inputInitialPopulation = this.value;
    if (inputInitialPopulation > MAX_INITIAL_POPULATION) {
        this.value = initialPopulation;
        alert('O número é muito alto. Valor máximo para a população inicial é ' + MAX_INITIAL_POPULATION);
    } else {
        initialPopulation = inputInitialPopulation;
        /* Proportion of hospital beds per 1000 people
        let beds_proportion = (document.getElementById('control_hospital_beds_text').value * 15)/ 100;
        config_seihdr.options.annotation.annotations[0].value = Math.round((initialPopulation / 1000)*beds_proportion); 
        document.getElementById('total_hospital_beds_text').innerHTML = Math.round((initialPopulation / 1000)*beds_proportion);*/
   
    
        lineGraph_SEIHDR.options.scales.yAxes[0].ticks.suggestedMin = parseFloat(initialPopulation);
        calculateODE_SEIHDR();
        lineGraph_SEIHDR.update();

        peak_day = config_seihdr.data.datasets[2].data.indexOf(Math.max.apply(null, config_seihdr.data.datasets[2].data)) + 1;
        document.getElementById('output_peakday_text').innerHTML = peak_day;

        maxinfected_people = Math.max.apply(null, config_seihdr.data.datasets[2].data);
        document.getElementById('output_maxinfected_text').innerHTML = maxinfected_people;
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
        calculateODE_SEIHDR();
        lineGraph_SEIHDR.update();

        peak_day = config_seihdr.data.datasets[2].data.indexOf(Math.max.apply(null, config_seihdr.data.datasets[2].data)) + 1;
        document.getElementById('output_peakday_text').innerHTML = peak_day;

        maxinfected_people = Math.max.apply(null, config_seihdr.data.datasets[2].data);
        document.getElementById('output_maxinfected_text').innerHTML = maxinfected_people;
    }
});

document.getElementById('control_infection_rate').addEventListener('change', function (e) {
    let input_b = this.value;
    transmission_rate=input_b / 100;
    document.getElementById('control_infection_rate').value = input_b;
    document.getElementById('control_infection_rate_text').innerHTML = transmission_rate;
   
    r_naught=transmission_rate/(nu+alpha+mu);
    document.getElementById('output_R0_text').innerHTML = r_naught.toFixed(2);
    calculateODE_SEIHDR();
    lineGraph_SEIHDR.update();

    peak_day = config_seihdr.data.datasets[2].data.indexOf(Math.max.apply(null, config_seihdr.data.datasets[2].data)) + 1;
    document.getElementById('output_peakday_text').innerHTML = peak_day;

    maxinfected_people = Math.max.apply(null, config_seihdr.data.datasets[2].data);
    document.getElementById('output_maxinfected_text').innerHTML = maxinfected_people;
});

document.getElementById('control_infeccious_period').addEventListener('change', function (e) {
    this.value = parseInt(this.value);
    let input_infected_period = this.value;
    if (input_infected_period > MAX_INFECCIOUS_PERIOD) {
        this.value = Math.round(1/infeccious_period);
        alert('O número é muito alto. Valor máximo para o período infeccioso e ' + MAX_INFECCIOUS_PERIOD + ' dias');
    } else if (input_infected_period == 0) {
        this.value = Math.round(1/infeccious_period);
        alert('O valor para o período infeccioso precisar ser maior que 0 ');
    } else {
        infeccious_period = 1/input_infected_period;
        
        nu = infeccious_period * (1-(mortality_rate + hospitalization_rate));

        r_naught=transmission_rate/(nu+alpha+mu);
        document.getElementById('output_R0_text').innerHTML = r_naught.toFixed(2);
    
        calculateODE_SEIHDR();
        lineGraph_SEIHDR.update();

        peak_day = config_seihdr.data.datasets[2].data.indexOf(Math.max.apply(null, config_seihdr.data.datasets[2].data)) + 1;
        document.getElementById('output_peakday_text').innerHTML = peak_day;

        maxinfected_people = Math.max.apply(null, config_seihdr.data.datasets[2].data);
        document.getElementById('output_maxinfected_text').innerHTML = maxinfected_people;
    }
});

document.getElementById('control_incubation_period').addEventListener('change', function (e) {
    this.value = parseInt(this.value);
    let input_incubation_period = this.value;
    if (input_incubation_period > MAX_INCUBATION_PERIOD) {
        this.value = Math.round(1/incubation_period);
        alert('O número é muito alto. Valor máximo para o período de incubação é ' + MAX_INCUBATION_PERIOD + ' dias');
    } else if (input_incubation_period == 0) {
        this.value = Math.round(1/incubation_period);
        alert('O valor para o período de incubação precisar ser maior que 0 ');
    } else {
        incubation_period = 1/input_incubation_period;
        r_naught=transmission_rate/(nu+alpha+mu);
        document.getElementById('output_R0_text').innerHTML = r_naught.toFixed(2);
    
        calculateODE_SEIHDR();
        lineGraph_SEIHDR.update();

        peak_day = config_seihdr.data.datasets[2].data.indexOf(Math.max.apply(null, config_seihdr.data.datasets[2].data)) + 1;
        document.getElementById('output_peakday_text').innerHTML = peak_day;

        maxinfected_people = Math.max.apply(null, config_seihdr.data.datasets[2].data);
        document.getElementById('output_maxinfected_text').innerHTML = maxinfected_people;
    }
});

document.getElementById('control_hospital_beds').addEventListener('change', function (e) {
    this.value = parseInt(this.value);
    let input_beds = this.value;
    if (input_beds > MAX_INITIAL_POPULATION) {
        this.value = Hospital_beds;
        alert('O número é muito alto. Valor precisa ser menor que ' + MAX_INITIAL_POPULATION);
    } else if (input_beds == 0) {
        this.value = Hospital_beds;
        alert('O valor precisa ser maior que 0 ');
    } else {
        config_seihdr.options.annotation.annotations[0].value = input_beds; 
        document.getElementById('control_hospital_beds').value = input_beds;
    
        lineGraph_SEIHDR.update();

    /*Proportion of beds per 1000 people
    let input_beds = this.value;
    let beds_proportion = (input_beds * 15)/ 100;
    config_seihdr.options.annotation.annotations[0].value = Math.round((initialPopulation / 1000)*beds_proportion); 
    document.getElementById('control_hospital_beds').value = input_beds;
    document.getElementById('control_hospital_beds_text').innerHTML = beds_proportion;
    document.getElementById('total_hospital_beds_text').innerHTML = Math.round((initialPopulation / 1000)*beds_proportion);
   
    lineGraph_SEIHDR.update();*/
    }
});

document.getElementById('control_hospitalization_period').addEventListener('change', function (e) {
    this.value = parseInt(this.value);
    let input_hospitalization_period = this.value;
    if (input_hospitalization_period > MAX_HOSPITAL_PERIOD) {
        this.value = Math.round(1/hospitalization_period);
        alert('O número é muito alto. Valor máximo para o período de internação é ' + MAX_HOSPITAL_PERIOD + ' dias');
    } else if (input_hospitalization_period == 0) {
        this.value = Math.round(1/hospitalization_period);
        alert('O valor para o período de internação precisar ser maior que 0 ');
    } else {
        hospitalization_period = 1/input_hospitalization_period;

        sigma = (1-mortality_rate)*hospitalization_period;
        rho = mortality_rate*hospitalization_period;
    
        calculateODE_SEIHDR();
        lineGraph_SEIHDR.update();

        peak_day = config_seihdr.data.datasets[2].data.indexOf(Math.max.apply(null, config_seihdr.data.datasets[2].data)) + 1;
        document.getElementById('output_peakday_text').innerHTML = peak_day;

        maxinfected_people = Math.max.apply(null, config_seihdr.data.datasets[2].data);
        document.getElementById('output_maxinfected_text').innerHTML = maxinfected_people;
    }
});

document.getElementById('control_hospitalization_rate').addEventListener('change', function (e) {
    let input_alpha = this.value;
    hospitalization_rate=input_alpha / 100;
    document.getElementById('control_hospitalization_rate').value = input_alpha;
    document.getElementById('control_hospitalization_rate_text').innerHTML = hospitalization_rate;

    nu = infeccious_period * (1-(mortality_rate + hospitalization_rate));
    alpha = hospitalization_rate*infected_hospital_period;
   
    r_naught=transmission_rate/(nu+alpha+mu);
    document.getElementById('output_R0_text').innerHTML = r_naught.toFixed(2);
    calculateODE_SEIHDR();
    lineGraph_SEIHDR.update();

    peak_day = config_seihdr.data.datasets[2].data.indexOf(Math.max.apply(null, config_seihdr.data.datasets[2].data)) + 1;
    document.getElementById('output_peakday_text').innerHTML = peak_day;

    maxinfected_people = Math.max.apply(null, config_seihdr.data.datasets[2].data);
    document.getElementById('output_maxinfected_text').innerHTML = maxinfected_people;
});

document.getElementById('control_InfectedtoDeath_period').addEventListener('change', function (e) {
    this.value = parseInt(this.value);
    let input_InfectedtoDeath_period = this.value;
    if (input_InfectedtoDeath_period > MAX_InfectedtoDeath_PERIOD) {
        this.value = Math.round(1/infected_death_period);
        alert('O número é muito alto. Valor máximo para o tempo até o falecimento é ' + MAX_InfectedtoDeath_PERIOD + ' dias');
    } else if (input_InfectedtoDeath_period == 0) {
        this.value = Math.round(1/infected_death_period);
        alert('O valor precisa ser maior que 0 ');
    } else {
        infected_death_period = Math.round(1/input_InfectedtoDeath_period);

        mu = mortality_rate*infected_death_period;

        r_naught=transmission_rate/(nu+alpha+mu);
        document.getElementById('output_R0_text').innerHTML = r_naught.toFixed(2);
    
        calculateODE_SEIHDR();
        lineGraph_SEIHDR.update();

        peak_day = config_seihdr.data.datasets[2].data.indexOf(Math.max.apply(null, config_seihdr.data.datasets[2].data)) + 1;
        document.getElementById('output_peakday_text').innerHTML = peak_day;

        maxinfected_people = Math.max.apply(null, config_seihdr.data.datasets[2].data);
        document.getElementById('output_maxinfected_text').innerHTML = maxinfected_people;  
    }  
});

document.getElementById('control_timeHospitalize_period').addEventListener('change', function (e) {
    this.value = parseInt(this.value);
    let input_timeHospitalize_period = this.value;
    if (input_timeHospitalize_period > MAX_timeHospitalize_PERIOD) {
        this.value = Math.round(1/infected_hospital_period);
        alert('O número é muito alto. Valor máximo para o tempo até a internação são ' + MAX_timeHospitalize_PERIOD + ' dias');
    } else if (input_timeHospitalize_period == 0) {
        this.value = Math.round(1/infected_hospital_period);
        alert('O valor precisar ser maior que 0 ');
    } else {
        infected_hospital_period = Math.round(1/input_timeHospitalize_period);

        alpha = hospitalization_rate*infected_hospital_period;

        r_naught=transmission_rate/(nu+alpha+mu);
        document.getElementById('output_R0_text').innerHTML = r_naught.toFixed(2);
    
        calculateODE_SEIHDR();
        lineGraph_SEIHDR.update();

        peak_day = config_seihdr.data.datasets[2].data.indexOf(Math.max.apply(null, config_seihdr.data.datasets[2].data)) + 1;
        document.getElementById('output_peakday_text').innerHTML = peak_day;

        maxinfected_people = Math.max.apply(null, config_seihdr.data.datasets[2].data);
        document.getElementById('output_maxinfected_text').innerHTML = maxinfected_people; 
    }   
});

document.getElementById('control_mortality_rate').addEventListener('change', function (e) {
    let input_mu = this.value;
    mortality_rate=input_mu / 100;
    document.getElementById('control_mortality_rate').value = input_mu;
    document.getElementById('control_mortality_rate_text').innerHTML = mortality_rate;

    nu = infeccious_period * (1-(mortality_rate + hospitalization_rate));//infectious_period[1/15] * 1-(mortality rate + hospitalization rate)[0.78]
    sigma = (1-mortality_rate)*hospitalization_period;
    rho = mortality_rate*hospitalization_period;
    mu = mortality_rate*infected_death_period;
   
    r_naught=transmission_rate/(nu+alpha+mu);
    document.getElementById('output_R0_text').innerHTML = r_naught.toFixed(2);
    calculateODE_SEIHDR();
    lineGraph_SEIHDR.update();

    peak_day = config_seihdr.data.datasets[2].data.indexOf(Math.max.apply(null, config_seihdr.data.datasets[2].data)) + 1;
    document.getElementById('output_peakday_text').innerHTML = peak_day;

    maxinfected_people = Math.max.apply(null, config_seihdr.data.datasets[2].data);
    document.getElementById('output_maxinfected_text').innerHTML = maxinfected_people;
});

//SEIHDR
document.getElementById('check-healthy-seihdr').addEventListener('change', function (e) {
    if(this.checked) {
    // Checkbox is checked..
    lineGraph_SEIHDR.getDatasetMeta(0).hidden=false;
} else {
    // Checkbox is not checked..
    lineGraph_SEIHDR.getDatasetMeta(0).hidden=true;
}
lineGraph_SEIHDR.update();
});

document.getElementById('check-exposed-seihdr').addEventListener('change', function (e) {
    if(this.checked) {
    // Checkbox is checked..
    lineGraph_SEIHDR.getDatasetMeta(1).hidden=false;
} else {
    // Checkbox is not checked..
    lineGraph_SEIHDR.getDatasetMeta(1).hidden=true;
}
lineGraph_SEIHDR.update();
});

document.getElementById('check-infected-seihdr').addEventListener('change', function (e) {
    if(this.checked) {
    // Checkbox is checked..
    lineGraph_SEIHDR.getDatasetMeta(2).hidden=false;
} else {
    // Checkbox is not checked..
    lineGraph_SEIHDR.getDatasetMeta(2).hidden=true;
}
lineGraph_SEIHDR.update();
});

document.getElementById('check-hospitalized-seihdr').addEventListener('change', function (e) {
    if(this.checked) {
    // Checkbox is checked..
    lineGraph_SEIHDR.getDatasetMeta(3).hidden=false;
} else {
    // Checkbox is not checked..
    lineGraph_SEIHDR.getDatasetMeta(3).hidden=true;
}
lineGraph_SEIHDR.update();
});

document.getElementById('check-death-seihdr').addEventListener('change', function (e) {
    if(this.checked) {
    // Checkbox is checked..
    lineGraph_SEIHDR.getDatasetMeta(4).hidden=false;
} else {
    // Checkbox is not checked..
    lineGraph_SEIHDR.getDatasetMeta(4).hidden=true;
}
lineGraph_SEIHDR.update();
});

document.getElementById('check-recovered-seihdr').addEventListener('change', function (e) {
    if(this.checked) {
    // Checkbox is checked..
    lineGraph_SEIHDR.getDatasetMeta(5).hidden=false;
} else {
    // Checkbox is not checked..
    lineGraph_SEIHDR.getDatasetMeta(5).hidden=true;
}
lineGraph_SEIHDR.update();
});


/* Set input of the form to the initial values */
document.getElementById('control_initial_population').value = initialPopulation;

document.getElementById('control_initial_infected').value = Math.round(I0 * initialPopulation);

document.getElementById('control_infection_rate').value = transmission_rate * 100;
document.getElementById('control_infection_rate_text').innerHTML = transmission_rate;

document.getElementById('control_infeccious_period').value = Math.round(1/infeccious_period);

document.getElementById('control_incubation_period').value = Math.round(1/incubation_period);

document.getElementById('output_R0_text').innerHTML = r_naught.toFixed(2);

document.getElementById('output_peakday_text').innerHTML = peak_day;

document.getElementById('output_maxinfected_text').innerHTML = maxinfected_people;

/* Proportion of hospital_beds per 1000 people
let beds_proportion = (Hospital_beds * 1000) / initialPopulation;
document.getElementById('control_hospital_beds_text').innerHTML = beds_proportion.toFixed(1);
document.getElementById('control_hospital_beds').value = (beds_proportion * 100)/15;
document.getElementById('total_hospital_beds_text').innerHTML = Hospital_beds;*/
document.getElementById('control_hospital_beds').value = Hospital_beds;

document.getElementById('control_hospitalization_period').value = Math.round(1/hospitalization_period);

document.getElementById('control_hospitalization_rate').value = hospitalization_rate * 100;
document.getElementById('control_hospitalization_rate_text').innerHTML = hospitalization_rate;

document.getElementById('control_InfectedtoDeath_period').value = Math.round(1/infected_death_period);

document.getElementById('control_timeHospitalize_period').value = Math.round(1/infected_hospital_period);

document.getElementById('control_mortality_rate').value =  mortality_rate * 100;
document.getElementById('control_mortality_rate_text').innerHTML =  mortality_rate;

/* Button: calculate ode for SEIHDR model */
document.getElementById('calculate_ode_seihdr').addEventListener('click', function (e) {
    calculateODE_SEIHDR();
    lineGraph_SEIHDR.update();
});