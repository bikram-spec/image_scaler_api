// chart data loader
labels=[]
completed=[]
rejected=[]
incompleted=[]

var label = document.getElementsByName('labels[]');  
for (var i = 0; i < label.length; i++) {
    var a = label[i].value;
    labels.push(a);
}

// Data for completed
var complete = document.getElementsByName('completed[]');  
for (var i = 0; i < complete.length; i++) {
    var a = complete[i].value;
    completed.push(a);
}

// data for the rejected
var rejecte = document.getElementsByName('rejected[]');  
for (var i = 0; i < rejecte.length; i++) {
    var a = rejecte[i].value;
    rejected.push(a);
}

// incomplete data
var incomplete = document.getElementsByName('incomplete[]');  
for (var i = 0; i < incomplete.length; i++) {
    var a = incomplete[i].value;
    incompleted.push(a);
}


function chartdrawer(ctx)
{
    var date= new Date()
    console.log(date)
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            // labels: ["first ","second","Third"],
            labels:labels,
            datasets: [{
                label: "completed",
                // data: [12,34,12],
                data:completed,
                fill:true,
                tension: 1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },{
                label: "Rejected",
                // data: [7,12,12],
                data:rejected,
                fill:true,
                tension: 1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },{
                label: "Incomplete",
                // data: [12,67,23],
                data:incompleted,
                fill:true,
                tension: 1,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


var ctx = document.getElementById('myChart').getContext('2d');
// var ctx1 = document.getElementById('myChart1').getContext('2d');
// var ctx1=$("#myChart1");
// var ctx2=$("#myChart2");

chartdrawer(ctx);
// chartdrawer(ctx1);
// chartdrawer(ctx2);


