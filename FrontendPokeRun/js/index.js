const url = 'http://localhost:3000/record';
const ash = document.querySelector('.ash');
const clefairy = new Image();
var scorePoint = 0;
var stopGame = true;

window.onload = function () {
    getRecord();
    
}


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

function createClefary(){
    clefairy.src = '../image/Clefairy.gif';
    clefairy.classList.add("clefairy");
    clefairy.classList.add("clefairyAnimation");
    document.querySelector('.scenery').appendChild(clefairy);
}

function play() {

    const name = document.getElementById('name').value;
    if (name != "") {
        createClefary();
        document.getElementById("name").style.borderColor = "black";
        stopGame = false;
        ash.style.bottom = "40px";
        scorePoint = 0;
        getRecord();
        loop();
    }
    else {
        document.getElementById("name").style.borderColor = "red";
    }
}


function loop() {
    var loopInterval = setInterval(() => {

        var ashX = ash.offsetLeft;
        var ashY = ash.offsetTop;
        var ashW = ash.offsetWidth;
        var ashH = ash.offsetHeight;

        var clefairyX = clefairy.offsetLeft;
        var oclefairyY = clefairy.offsetTop;
        var clefairyW = clefairy.offsetWidth;
        var clefairyH = clefairy.offsetHeight;

        //parte logica da colisão
        colisao1 = (clefairyX + clefairyW >= ashX) && (ashX + ashW >= clefairyX);
        colisao2 = (oclefairyY + clefairyH >= ashY) && (ashY + ashH >= oclefairyY);

        if ((colisao1 && colisao2)) {
            const name = document.getElementById('name').value;
            const score = document.getElementById('score').innerText;

            clefairy.classList.remove('clefairyAnimation');
            ash.classList.remove('up');
            ash.classList.remove('down');
            ash.style.bottom = ashY;
            clefairy.style.left = '15px';
            stopGame = true;
            postRecord(name, score);
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

            while (tbody.hasChildNodes()) {
                tbody.removeChild(tbody.firstChild);
            }

            for (let i = 0; i < data.length; i++) {

                let tr = tbody.insertRow();
                let tdNome = tr.insertCell();
                let tdScore = tr.insertCell();

                tdNome.innerText = data[i].Name;
                tdScore.innerText = data[i].score;;
            }

        }).catch(function (err) {
            console.error('Erro:', err);
        });
    })
}

function postRecord(nome, score) {
    const data = JSON.stringify({ Name: nome, score: score });
    console.log(data)

    fetch(url, {
        method: "POST",
        headers: {

            "Content-Type": "application/json",
        },
        body: data,
    })
        .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.log("Error:", error);
        });
}