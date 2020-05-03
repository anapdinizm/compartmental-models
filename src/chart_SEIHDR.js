var config_seihdr = {
    type: 'line',
    data: {
        labels: t_SEIHDR,
        datasets: [{
            label: 'Suscetíveis',
            fill: true,
            backgroundColor: 'rgba(176,224,230,0.4)',
            borderColor: 'rgba(176,224,230,0.7)',
            data: S_SEIHDR,
        }, {
            label: 'Expostos',
            backgroundColor: 'rgba(0,139,139,0.4)',//#008B8B
            borderColor: 'rgba(0,139,139,0.7)',
            data: E_SEIHDR,
            fill: true,
        }, {
            label: 'Infectados',
            backgroundColor: 'rgba(250,128,114,0.4)',
            borderColor: 'rgba(250,128,114,0.7)',
            data: I_SEIHDR,
            fill: true,
        },{
            label: 'Hospitalizados',
            backgroundColor: 'rgba(218,112,214,0.4)',//#DA70D6
            borderColor: 'rgba(218,112,214,0.7)',
            data: H_SEIHDR,
            fill: true,
        },{
            label: 'Mortos',
            backgroundColor: 'rgba(0,0,0,0.4)',//#000000
            borderColor: 'rgba(0,0,0,0.7)',
            data: D_SEIHDR,
            fill: true,
        }, {
            label: 'Recuperados',
            backgroundColor: 'rgba(106,90,205,0.4)',
            borderColor: 'rgba(106,90,205,0.7)',
            data: R_SEIHDR,
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
            text: 'Modelo SEIHDR'
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
        },
        annotation: {
            annotations: [{
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: Hospital_beds,
              borderColor: 'rgb(255,0,0)',
              borderWidth: 2,
              label: {
                backgroundColor: "rgba(255,255,255,0.1)",
                fontColor: "rgba(255,0,0)",
                fontFamily: "sans-serif",
                fontsize: 5,
                xAdjust: 200,
                yAdjust: -20,
                enabled: true,
                content: 'Capacidade de leitos hospitalares'
              }
            }]
          }
    }
};
window.onload = function() {
    var ctx_seihdr = document.getElementById('seihdr_chart').getContext('2d');
    lineGraph_SEIHDR = new Chart(ctx_seihdr, config_seihdr);
};
