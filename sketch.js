//I used chatGPT to assist with creating this effect.  I also used it for general assistance, and as an education tool throughout my coding process.
let particles = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
  clear();

}


function draw() {
	fill(245, 5); 
	noStroke();

	if (mouseIsPressed) {
    let speed = sqrt(pow(mouseX - pmouseX, 2) + pow(mouseY - pmouseY, 2));
    let amount = floor(map(speed, 0, 50, 1, 10));
    for (let i = 0; i < amount; i++) {
        let x = lerp(mouseX, pmouseX, random());
        let y = lerp(mouseY, pmouseY, random());
        particles.push(new Ink(x, y, 1.5, 80));
    }
}

	for (let i = particles.length - 1; i >= 0; i--) {
		particles[i].update();
		particles[i].show();
		if (particles[i].alpha <= 1) {
			particles.splice(i, 1); 
		}
	}
}


class Ink {
	constructor(x, y, rate, alphaStart) {
		this.location = createVector(x, y);
		this.velocity = p5.Vector.random2D().mult(random(0.2, 0.8));
		this.acceleration = createVector();
		this.alpha = this.palpha = alphaStart;
		this.rate = rate;
		this.maxSize = random(1, 5); 
	}

	update() {
		let noiseForce = createVector(noise(this.location.y * 0.005) - 0.5, noise(this.location.x * 0.005) - 0.5);
		this.acceleration.add(noiseForce.mult(0.1));
		this.velocity.add(this.acceleration);
		this.acceleration.mult(0);
		this.location.add(this.velocity);
		this.alpha -= this.rate;
	}

	show() {
		noStroke();
		let gray = map(this.alpha, 0, this.palpha, 255, 20);
		for (let r = this.maxSize; r > 0; r -= 2) {
			let a = map(r, 0, this.maxSize, 0, this.alpha);
			fill(gray, a);
			ellipse(this.location.x + random(-0.5, 0.5), this.location.y + random(-0.5, 0.5), r);
		}
	}
}
