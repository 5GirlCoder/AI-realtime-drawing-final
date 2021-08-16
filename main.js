function preload(){}

noseX = 0;
noseY = 0;
rightWristX = 0;
leftWristX = 0;
difference = 0;

function setup()
{
    video = createCapture(VIDEO);
    video.size(450, 400);

    canvas = createCanvas(500, 500); 
    canvas.position(550, 130);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    background("#e6dede");

    fill(116, 203, 238);
    stroke(116, 203, 238);
    square(noseX, noseY, difference);

    document.getElementById("Width-Height_H3").innerHTML = "The approximate height and width of the square is = " + difference + "px";
}

function modelLoaded()
{
    console.log("PoseNet is initialized!");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("NoseX = " + noseX + " & NoseY = " + noseY);

        rightWristX = results[0].pose.rightWrist.x;
        leftWristX = results[0].pose.leftWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log("rightWristX = " + rightWristX + " & leftWristX = " + leftWristX + " & Difference = " + difference);
    }
}