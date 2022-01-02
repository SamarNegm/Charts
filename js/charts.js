var calculateBtn = document.getElementById('calculate')
var totla = 0;
var mathRatio;
var scienceRatio;
var arabicRatio;
var chemstryRatio;
var physicsRatio;
var subjects;
var colors = ["#D77FA1", "#BAABDA", "#889db9", "#FF5959", "#FFBC97"];
var coulumChart = document.getElementById("coulumChart");
var ctx = coulumChart.getContext("2d");
var dataColors = document.getElementById("dataColors");
calculateBtn.addEventListener("click", function (e) {

    var chemstry = parseInt(document.getElementById("chemstry").value);
    var math = parseInt(document.getElementById("math").value);
    var science = parseInt(document.getElementById("science").value);
    var arabic = parseInt(document.getElementById("arabic").value);
    var phsics = parseInt(document.getElementById("phsics").value);
    totla = chemstry + math + science + arabic + phsics;
    chemstryRatio = calculateRatio(chemstry);
    mathRatio = calculateRatio(math);
    scienceRatio = calculateRatio(science);
    arabicRatio = calculateRatio(arabic);
    physicsRatio = calculateRatio(phsics);
    subjects = [chemstryRatio, mathRatio, physicsRatio, scienceRatio, arabicRatio];
    if (Valid(subjects)) {

        DrawCoulumChart();
        DrawLineChart();
        DrawPaiChart(ctx3);
        DrawDountChart();
        dataColors.style.display = "inline";
        dataColors.style.borderBlockColor = "#FFBCBC";
        coulumChart.style.display = "inline";
        lineChart.style.display = "inline";
        paiChart1.style.display = "inline";
        paiChart2.style.display = "inline";
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
}
)
function Valid(subjects) {
    if (totla == 0) return 0;
    for (let i = 0; i < subjects.length; i++) {
        if (isNaN(subjects[i]))
            return 0;
    }
    return 1;
}

function calculateRatio(sub) {
    return (100 * sub) / totla;
}

function DrawCoulumChart(e) {
    ctx.clearRect(0, 0, coulumChart.width, coulumChart.height);
    for (var i = 0; i < subjects.length; i++) {

        drawRecBar(i + (i * 50), i);
    }

}

function drawRecBar(start, curr) {
    var x = 0
    requestAnimationFrame(function loop() {
        ctx.beginPath();
        ctx.rect(start, coulumChart.height, 40, -x);
        ctx.fillStyle = colors[curr];
        ctx.fill();
        ctx.closePath();

        x++;
        if (x > subjects[curr]) {
            Drawtext(ctx, curr, start, (coulumChart.height - subjects[curr] - 4));
            return;
        }
        requestAnimationFrame(loop)
    });

}

var lineChart = document.getElementById("lineChart");
var ctx2 = lineChart.getContext("2d");
function DrawLineChart() {
    ctx2.clearRect(0, 0, lineChart.width, lineChart.height);

    for (let i = 0; i < subjects.length; i++) {
        ctx2.strokeStyle = colors[i];
        ctx2.beginPath();
        ctx2.lineWidth = 5;
        ctx2.moveTo(i + (i * 50), lineChart.height - subjects[i]);
        ctx2.lineTo(i + (i * 50) + 50, lineChart.height - subjects[i + 1]);
        ctx2.stroke();
        ctx2.closePath();
        Drawtext(ctx2, i, (i + (i * 50)), (lineChart.height - subjects[i] - 10));

    }


}
var paiChart1 = document.getElementById("paiChart1");
var ctx3 = paiChart1.getContext("2d");

function DrawPaiChart(ctx3, donat = 0) {
    ctx3.clearRect(0, 0, paiChart1.width, paiChart1.height);

    var startAngle = 0;
    var endAngle;
    for (let i = 0; i < subjects.length; i++) {

        endAngle = startAngle + (2 * Math.PI * subjects[i]) / 100;
        drawPieSlice(ctx3, paiChart1, 70, startAngle, endAngle, i, donat);
        startAngle = endAngle;

    }
}
var paiChart2 = document.getElementById("paiChart2");
var ctx4 = paiChart2.getContext("2d")
function DrawDountChart() {
    ctx4.clearRect(0, 0, paiChart1.width, paiChart1.height);

    DrawPaiChart(ctx4, 1);
    drawPieSlice(ctx4, paiChart1, 40, 0, 2 * Math.PI, -1, 1);

}
function drawPieSlice(ctx, chart, radius, startAngle, endAngle, i, donat) {
    var color = (i == -1) ?
        color = "white" : colors[i];
    var centerX = chart.width / 2, centerY = chart.height / 2;
    var x = startAngle
    requestAnimationFrame(function loop() {
        if (donat) {
            drawArc(ctx, paiChart1, 40, 0, 2 * Math.PI, "white");
        }

        drawArc(ctx, chart, radius, startAngle, x, color);

        x += .07;
        if (x > endAngle) {
            drawArc(ctx, chart, radius, startAngle, endAngle, color);
            if (subjects[i] > 7) {
                var textX = paiChart1.width / 2 + (Math.cos(startAngle + (endAngle - startAngle) / 2) * (radius)) / 1.31;
                var textY = paiChart1.height / 2 + (Math.sin(startAngle + (endAngle - startAngle) / 2) * (radius)) / 1.31;
                Drawtext(ctx, i, textX, textY, "white")

            }
            return;
        }
        requestAnimationFrame(loop)
    });
}
function drawArc(ctx, chart, radius, startAngle, endAngle, color) {
    var centerX = chart.width / 2, centerY = chart.height / 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function Drawtext(ctx, curr, x, y, color = null) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.font = "10px ";
    ctx.strokeStyle = (color ?? colors[curr]);
    ctx.strokeText((subjects[curr].toFixed(0) + "%"), x, y);
    ctx.closePath();
}