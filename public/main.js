const form = document.getElementById('vote-book');
var socket = io();
var totalVotes = 0;
var votes = [];
var event;


socket.on("getVote", (data) => {
    votes.push(data.vote);
    totalVotes = votes.length;
    updateChart(votes, totalVotes);
});

function updateChart(votes, totalVotes) {
    document.querySelector('#chartTitle').textContent = `Total Votes: ${totalVotes}`;

    let voteCounts = {
        Alice: 0,
        TheSilmarillion: 0,
        Simyacı: 0,
        PlatonDevlet: 0,
        TheLittlePrince: 0,
        Sucveceza: 0
    
    };
   
   
    voteCounts = votes.reduce((acc, vote) => (
        (acc[vote.live] = (acc[vote.live] || 0) + parseInt(vote.points)), acc),
        {}
    );

    let dataPoints = [
        { label: 'Alice', y: voteCounts.Alice },
        { label: 'TheSilmarillion', y: voteCounts.TheSilmarillion },
        { label: 'Simyacı', y: voteCounts.Simyacı },
        { label: 'PlatonDevlet', y: voteCounts.PlatonDevlet },
        { label: 'TheLittlePrince', y: voteCounts.TheLittlePrince },
        { label: 'Sucveceza', y: voteCounts.Sucveceza }
    ];

    const chartContainer = document.querySelector('#chartContainer');

    if (chartContainer) {
        document.addEventListener('votesAdded', function (e) {
            document.querySelector('#chartTitle').textContent = `Total Votes: ${e.detail.totalVotes}`;
        })
        
        const chart = new CanvasJS.Chart('chartContainer', {
            animationEnabled: true,
            theme: 'theme1',
            backgroundColor: "#000",
            tittle: {
                text: 'Total Votes ${totalVotes}'
                
            },
            data: [
                {
                    type: 'column',
                    dataPoints: dataPoints
                        
                }
            ]
        
        });
        chart.render();

        Pusher.logToConsole = true;

        var pusher = new Pusher('355bbcc1238451dd1d93', {
            cluster: 'ap2',
            encrypted: true
        });
        var channel = pusher.subscribe('live-poll');

        channel.bind('live-vote', function (data) {
            dataPoints.forEach((point) => {
                if (point.label == data.live) {
                    point.y += data.points;
                    totalVotes += data.points;
                    evet = new CustomEvent('votesAdded', { detail: { totalVotes: totalVotes } });
                    // buraya bak
                    document.dispatchEvent(evet);
                }
            });

            chart.render();


        });
    }
}

form.addEventListener('submit', e => {
    const choice = document.querySelector('input[name=live]:checked').value;
    const data = { live: choice };

    fetch('http://localhost:3000/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(res => res.json())
        .then(data => {
            votes.push(data.vote);
            totalVotes = votes.length;
            socket.emit("sendVote", data);
            updateChart(votes, totalVotes);
        })
        .catch(err => console.log(err));
    e.preventDefault();
});

fetch("http://localhost:3000/poll")
    .then(res => res.json())
    .then(data => {
        votes = data.votes;
        totalVotes = votes.length;
        updateChart(votes, totalVotes);
    })
    .catch(err => {
        console.log(err);
    });