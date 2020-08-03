let random = (min, max) => min.plus((Math.random()*(max.minus(min))))

function generate(){
	let rnd_num = random(save.min_rand, save.max_rand);
	rnd_num = rnd_num.mul(save.multiplier);
	save.balance = save.balance.add(rnd_num);
}

function init(){
	load();
	mainInterval = setInterval(() => {
		draw();
		logic();
	}, 50);
	saveInterval = setInterval(saveFunction, 1000);
	console.log('CLOSE THE CONSOLE, CHEATER!');
}

function format(n, places, placesUnder1000){
	if(typeof n == "number")
		n = new Decimal(n);
	if(n.e < 3)
		return n.toNumber().toFixed(places);
	return n.m.toFixed(placesUnder1000)+"e"+n.e;
}

function draw(){
	balance.innerText = format(save.balance, 0, 2);
	min_rand.innerText = format(save.min_rand, 0, 2);
	max_rand.innerText = format(save.max_rand, 0, 2);
	min_rand_upgrade_cost.innerText = format(save.min_rand_upgrade_cost, 0, 2);
	max_rand_upgrade_cost.innerText = format(save.max_rand_upgrade_cost, 0, 2);
	if(save.autoGenerator.isBuy == true){
		buyag.style.display = 'none';
		upag.style.display = 'inline';
		agOnOff.style.display = 'inline';
		gpsBtn.style.display = 'inline';
		upagcost.innerText = format(save.autoGenerator.upCost, 0, 2);
		agOnOff.innerText = `Auto Generator ${save.autoGenerator.isOn == true ? 'Off' : 'On'}`;
		gpscost.innerText = format(save.autoGenerator.generatesPerSecCost, 0, 2);
		gps.innerText = format(save.autoGenerator.generatesPerSec, 0, 2);
	}else{
		buyag.style.display = 'inline';
		upag.style.display = 'none';
		agOnOff.style.display = 'none';
		gpsBtn.style.display = 'none';
	}
	mulcost.innerText = format(save.multiplier_cost, 0, 2);
	currmul.innerText = format(save.multiplier, 0, 2);
}

function logic(){
	if(save.autoGenerator.isBuy == true && save.autoGenerator.isOn == true){
		let rnd_num = random(save.min_rand, save.max_rand).divide(20);
		rnd_num = rnd_num.mul(save.multiplier);
		save.balance = save.balance.add(rnd_num.mul(save.autoGenerator.generatesPerSec));
	}
}

function upMin(){
	if(save.min_rand.plus(1).gte(save.max_rand))
		return;
	if(save.balance.lt(save.min_rand_upgrade_cost))
		return;
	save.balance = save.balance.minus(save.min_rand_upgrade_cost);
	save.min_rand_upgrade_cost = save.min_rand_upgrade_cost.mul(1.5);
	save.min_rand = save.min_rand.add(1);
}

function upMax(){
	if(save.balance.lt(save.max_rand_upgrade_cost))
		return;
	save.balance = save.balance.minus(save.max_rand_upgrade_cost);
	save.max_rand_upgrade_cost = save.max_rand_upgrade_cost.mul(1.5);
	save.max_rand = save.max_rand.add(1);
}

function buyAg(){
	if(save.autoGenerator.isBuy == true)
		return;
	if(save.balance.lt(10000))
		return;
	save.balance = save.balance.minus(10000);
	save.autoGenerator.isBuy = true;
}

function upAg(){
	if(save.autoGenerator.isBuy == false)
		return;
	if(save.balance.lt(save.autoGenerator.upCost))
		return;
	save.balance = save.balance.minus(save.autoGenerator.upCost);
	save.autoGenerator.upCost = save.autoGenerator.upCost.mul(1.5);
	save.autoGenerator.generatesPerSec = save.autoGenerator.generatesPerSec.add(1);
}

function upMul(){
	if(save.balance.lt(save.multiplier_cost))
		return;
	save.balance = save.balance.minus(save.multiplier_cost);
	save.multiplier = save.multiplier.mul(2);
	save.multiplier_cost = save.multiplier_cost.mul(3);
}

function gpsUp(){
	if(save.autoGenerator.isBuy == false)
		return;
	if(save.balance.lt(save.autoGenerator.generatesPerSecCost))
		return;
	save.balance = save.balance.minus(save.autoGenerator.generatesPerSecCost);
	save.autoGenerator.generatesPerSec = save.autoGenerator.generatesPerSec.mul(2);
	save.autoGenerator.generatesPerSecCost = save.autoGenerator.generatesPerSecCost.mul(3);
}

let switchAutoGenerator = () => save.autoGenerator.isOn = !save.autoGenerator.isOn;

document.body.onload = init();