<?php
$referenceContrast = $_POST['referenceContrast'];
$targetContrast = $_POST['targetContrast'];
$totalTrials = $_POST['totalTrials'];
$correctAnswers = $_POST['correctAnswers'];

file_put_contents('results.txt', "Reference: $referenceContrast, Target: $targetContrast, Total Trials: $totalTrials, Correct Answers: $correctAnswers\n", FILE_APPEND);

echo "Thank you for your submission!";
?>