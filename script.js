var referenceContrast = getRandomContrast();
var targetContrast = getRandomContrast();
var totalTrials = 0;
var correctAnswers = 0;
var threshold = 0.1;

function getRandomContrast() {
    return Math.random();
}

function setContrast() {
    var referenceStripeColor = `rgba(0, 0, 0, ${referenceContrast})`;
    var targetStripeColor = `rgba(0, 0, 0, ${targetContrast})`;
    var stripeSize = 10; // size of each stripe

    // Adding a blurred edge to the stripes
    var referenceBackground = `repeating-linear-gradient(
        45deg,
        ${referenceStripeColor},
        ${referenceStripeColor} ${stripeSize}px,
        rgba(255, 255, 255, 0.5) ${stripeSize}px,
        #fff ${stripeSize * 2}px
    )`;
    var targetBackground = `repeating-linear-gradient(
        45deg,
        ${targetStripeColor},
        ${targetStripeColor} ${stripeSize}px,
        rgba(255, 255, 255, 0.5) ${stripeSize}px,
        #fff ${stripeSize * 2}px
    )`;

    document.getElementById('reference').style.backgroundImage = referenceBackground;
    document.getElementById('target').style.backgroundImage = targetBackground;
}

function checkCorrectness() {
    if (Math.abs(referenceContrast - targetContrast) <= threshold) {
        correctAnswers++;
    }
}

function nextCircles() {
    checkCorrectness();
    referenceContrast = getRandomContrast();
    targetContrast = getRandomContrast();
    setContrast();
    totalTrials++;
}

function endTask() {
    checkCorrectness();
    var percentage = (correctAnswers / totalTrials) * 100;
    document.getElementById('results').innerText = `You got ${percentage.toFixed(2)}% right answers!`;

    // Send results to the server
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'submit.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(`referenceContrast=${referenceContrast}&targetContrast=${targetContrast}&totalTrials=${totalTrials}&correctAnswers=${correctAnswers}`);
}

document.addEventListener('keydown', adjustContrast);
setContrast();

function adjustContrast(event) {
    if (event.key === 'ArrowLeft' && targetContrast > 0) {
        targetContrast -= 0.1;
    } else if (event.key === 'ArrowRight' && targetContrast < 1) {
        targetContrast += 0.1;
    }
    setContrast();
}

document.getElementById('target').addEventListener('touchstart', handleTouch);

function handleTouch(e) {
    // Calculate the relative touch X position within the circle
    let touchXRelativeToCircle = e.touches[0].clientX - e.target.getBoundingClientRect().left;

    if (touchXRelativeToCircle < e.target.offsetWidth / 2 && targetContrast > 0) {
        // Touch on the left half of the circle
        targetContrast -= 0.1;
    } else if (touchXRelativeToCircle > e.target.offsetWidth / 2 && targetContrast < 1) {
        // Touch on the right half of the circle
        targetContrast += 0.1;
    }
    setContrast();
}
