const url = 'http://localhost:3000/record';
const ash = document.querySelector('.ash');
const clefairy = document.querySelector('.clefairy');
var scorePoint = 0;
var stopGame = true;
var Records = [];


document.addEventListener('keypress', function (event) {

    if (event.key === 'w') {
        up();
    }
});

function up() {

    const ashPosition = +window.getComputedStyle(ash).bottom.replace('px', '');

    if (ashPosition == 40) {


        ash.classList.add('up');

        setTimeout(() => {

            ash.classList.remove('up');
            if (stopGame == false) {

                ash.style.bottom = "60px"

            }
        }, 950);

    }

}


document.addEventListener('keypress', function (event) {

    if (event.key === 's') {
        Down();
    }
});

function Down() {

    const ashPosition = +window.getComputedStyle(ash).bottom.replace('px', '');

    if (ashPosition == 60) {



        ash.classList.add('down');

        setTimeout(() => {

            ash.classList.remove('down');
            if (stopGame == false) {

                ash.style.bottom = "40px"

            }
        }, 950);

    }

}

function play() {

    const name = document.getElementById('name').value;
    if (name != "") {

        document.getElementById("name").style.borderColor = "black";
        stopGame = false;
        ash.style.bottom = "40px";
        clefairy.style.left = 'unset';
        clefairy.classList.add("clefairyAnimation");
        scorePoint = 0;
        loop();
    }
    else {
        document.getElementById("name").style.borderColor = "red";
    }
}

function loop() {
    var loopInterval = setInterval(() => {

        const clefairyPosition = clefairy.offsetLeft;
        const ashPosition = +window.getComputedStyle(ash).bottom.replace('px', '');

        if (clefairyPosition <= 15 && ashPosition <= 54) {
            clefairy.classList.remove('clefairyAnimation');
            ash.classList.remove('up');
            ash.classList.remove('down');
            ash.style.bottom = `${ashPosition}px`;
            clefairy.style.left = '15px';
            stopGame = true;
            Records.push(scorePoint);
            clearInterval(loopInterval);
        }
    }, 10);
}

const score = setInterval(() => {

    if (stopGame == false) {

        scorePoint = scorePoint + 1;
        document.getElementById("score").innerText = scorePoint;
    }
}, 100);


function getRecord() {

    fetch(url).then(function (res) {
        res.json().then(function (data) {

            let tbody = document.getElementById('tbody');

            for (let i = 0; i < data.length; i++) {

                let tr = tbody.insertRow();
                let tdNome = tr.insertCell();
                let tdScore = tr.insertCell();

                tdNome.innerText = data[i].Name;
                tdScore.innerText = data[i].score;;
            }

        }).catch(function (err) {
            console.error('Failed retrieving information', err);
        });
    })
}

function postRecord() {
    const data = JSON.stringify({ Name: "Rogerio3", score: 45 });
    console.log(data)

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: data,
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.log("Error:", error);
        });
}