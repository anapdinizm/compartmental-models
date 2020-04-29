var config = {
    type: 'line',
    data: {
        labels: t,
        datasets: [{
            label: 'Suscetíveis',
            fill: true,
            backgroundColor: 'rgba(176,224,230,0.4)',
            borderColor: 'rgba(176,224,230,0.7)',
            data: S,
        }, {
            label: 'Infectados',
            backgroundColor: 'rgba(250,128,114,0.4)',
            borderColor: 'rgba(250,128,114,0.7)',
            data: I,
            fill: true,
        }, {
            label: 'Recuperados',
            backgroundColor: 'rgba(106,90,205,0.4)',
            borderColor: 'rgba(106,90,205,0.7)',
            data: R,
            fill: true,
        }]
    },
    options: {
        responsive: true,
        legend: {
            display: false,
        },
        title: {
            display: true,
            text: 'Modelo SIR'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Dias'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Número de pessoas'
                },
                ticks: {
                    suggestedMin: initialPopulation,
                },
            }]
        }
    }
};

window.onload = function() {
    var ctx = document.getElementById('sir_chart').getContext('2d');
    lineGraph = new Chart(ctx, config);
};
