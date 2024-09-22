const text = document.getElementById("size");

// Screen
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
// Ball
const ball = document.getElementById("ball");
let ballRect = ball.getBoundingClientRect();
const funct = () => {
	let inflate = true;
	return () => {
		if (ballRect.height > screenHeight || ballRect.width > screenWidth) {
			inflate = false;
		}
		if (ballRect.height < 50) {
			inflate = true;
		}
		ball.style.height = (inflate ? 20 : -20) + ballRect.height + "px";
		ballRect = ball.getBoundingClientRect();
		ball.style.backgroundColor = `rgb(${Math.random() * 255},${
			Math.random() * 255
		},${Math.random() * 255})`;
	};
};

const changeSize = funct();

let ballPos = [Math.random() * screenWidth, ballRect.y];
let ballVerticalVelocity = 0;
let ballHorizontalVelocity = 0;

const gravity = 0;
const retention = 1;

setInterval(() => {
	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;
	ballVerticalVelocity += gravity;
	ballPos[0] += ballHorizontalVelocity;
	ballPos[1] += ballVerticalVelocity;

	// Collide X
	if (ballPos[0] + ballRect.width > screenWidth) {
		changeSize();
		ballPos[0] = screenWidth - ballRect.width;
		ballHorizontalVelocity *= -retention;
	} else if (ballPos[0] < 0) {
		changeSize();
		ballPos[0] = 0;
		ballHorizontalVelocity *= -retention;
	}
	// Collide Y
	if (ballPos[1] + ballRect.height >= screenHeight) {
		changeSize();
		ballPos[1] = screenHeight - ballRect.height;
		ballVerticalVelocity *= -retention;
	} else if (ballPos[1] < 0) {
		changeSize();
		ballPos[1] = 0;
		ballVerticalVelocity *= -retention;
	}
	// Rolling
	if (ballPos[1] == screenHeight - ballRect.height) {
		ballHorizontalVelocity *= 0.995;
		if (Math.abs(ballHorizontalVelocity) < 0.1) ballHorizontalVelocity = 0;
	}

	ball.style.transform =
		"translateX(" + ballPos[0] + "px) translateY(" + ballPos[1] + "px)";
}, 1000 / 60);

window.addEventListener("click", () => {
	const power = 30;
	ballVerticalVelocity =
		Math.floor(Math.random() * 2) == 0
			? Math.random() * power
			: Math.random() * -power;
	ballHorizontalVelocity =
		Math.floor(Math.random() * 2) == 0
			? Math.random() * power
			: Math.random() * -power;
});
