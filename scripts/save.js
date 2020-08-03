const initialSave = {
	balance : new Decimal(0),
	min_rand : new Decimal(1),
	max_rand : new Decimal(5),
	multiplier : new Decimal(1),
	autoGenerator : {
		isBuy : false,
		isOn : false,
		generatesPerSec : new Decimal(1),
		upCost : new Decimal(15000),
		generatesPerSecCost : new Decimal(2e4)
	},
	min_rand_upgrade_cost : new Decimal(10000),
	max_rand_upgrade_cost : new Decimal(50000),
	multiplier_cost : new Decimal(100)
}

let save = Object.assign({}, initialSave);

function saveFunction(){
	localStorage.setItem('random-incremental-save', JSON.stringify(save));
}

function load(){
	let _save = JSON.parse(localStorage.getItem('random-incremental-save')) || {};
	_save.balance = new Decimal(_save.balance);
	_save.max_rand = new Decimal(_save.max_rand);
	_save.min_rand = new Decimal(_save.min_rand);
	_save.min_rand_upgrade_cost = new Decimal(_save.min_rand_upgrade_cost);
	_save.max_rand_upgrade_cost = new Decimal(_save.max_rand_upgrade_cost);
	_save.autoGenerator.generatesPerSec = new Decimal(_save.autoGenerator.generatesPerSec);
	_save.autoGenerator.upCost = new Decimal(_save.autoGenerator.upCost);
	_save.multiplier = new Decimal(_save.multiplier);
	_save.multiplier_cost = new Decimal(_save.multiplier_cost);
	_save.autoGenerator.generatesPerSecCost = new Decimal(_save.autoGenerator.generatesPerSecCost);
	save = Object.assign({}, save, _save);
}

function hardReset(){
	save = initialSave;
	saveFunction();
}

function exportSave(){
	prompt("Copy this text", JSON.stringify(localStorage.getItem('random-incremental-save')));
}

function importSave(){
	let _save = prompt('Paste the text');
	_save = JSON.parse(_save);
	_save.balance = new Decimal(_save.balance);
	_save.max_rand = new Decimal(_save.max_rand);
	_save.min_rand = new Decimal(_save.min_rand);
	_save.min_rand_upgrade_cost = new Decimal(_save.min_rand_upgrade_cost);
	_save.max_rand_upgrade_cost = new Decimal(_save.max_rand_upgrade_cost);
	_save.autoGenerator.generatesPerSec = new Decimal(_save.autoGenerator.generatesPerSec);
	_save.autoGenerator.upCost = new Decimal(_save.autoGenerator.upCost);
	_save.multiplier = new Decimal(_save.multiplier);
	_save.multiplier_cost = new Decimal(_save.multiplier_cost);
	_save.autoGenerator.generatesPerSecCost = new Decimal(_save.autoGenerator.generatesPerSecCost);
	save = Object.assign({}, save, _save);
}