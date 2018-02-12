var winner_e = '';
var winner_n = '';
var winner_value = 0;

function toggleDark() {
	$('body').removeClass('bg-dark text-light');
	$('.sticky-top').removeClass('bg-dark');
	$('.card').removeClass('bg-dark');
	$('.nav-link').removeClass('text-light');
	$('table').removeClass('table-dark');
	if($('#wolf').prop('checked') == true) {
		$('body').addClass('bg-dark text-light');
		$('.sticky-top').addClass('bg-dark');
		$('.card').addClass('bg-dark');
		$('.nav-link').addClass('text-light');
		$('table').addClass('table-dark');
		$('#btnwolf').removeClass('btn-dark').addClass('btn-danger');
		$('#btnlamb').removeClass('btn-info').addClass('btn-light');
		window.localStorage.setItem('dark', 1);
	} else {
		$('#btnwolf').removeClass('btn-danger').addClass('btn-dark');
		$('#btnlamb').removeClass('btn-light').addClass('btn-info');
		window.localStorage.setItem('dark', 0);
	}
}

function ocdOCD() {
	if($('#ocd').prop('checked') == true) {
		window.localStorage.setItem('ocd', 1);
	} else {
		window.localStorage.setItem('ocd', 0);
	}
}

function generateArtifacts() {
	$('#artifacts').empty();
	$.each(artifacts.data, function(k,v) {
		if(isNaN(v.level)) {
			v.level = 0;
		}
		var row = '<tr class="' + (1 == v.active ? '' : 'text-dark bg-secondary') + '" id="'+ k + 'row">';
			row += '<td>';
				row += '<input type="checkbox" aria-label="Checkbox to designate active status for ' + v.name + '" id="' + k + 'active"' + (v.active == 1 ? ' checked="checked"' : '') + ' onchange="updateActive(\'' + k + '\');" tabindex="-1">';
			row += '</td>';
			row += '<td>';
				row += '<label for="' + k + 'active" id="basic-addon' + k + '">';
					row += '<span class="d-block d-sm-none">' + v.nickname + '</span>';
					row += '<span class="d-none d-sm-block">' + v.name + '</span>';
				row += '</label>';
			row += '</td>';
			row += '<td>';
				row += '<input' + (1 == v.active ? '' : ' readonly="readonly"') + ' id="' + k + '" value="' + v.level + '" type="tel" class="form-control artlvl" placeholder="0" aria-label="Level of ' + v.name + '" aria-describedby="basic-addon' + k + '"onchange="updateArtifact(\'' + k + '\')">';
			row += '</td>';
			row += '<td>';
				row += '<span class="badge badge-' + v.color + '" id="' + k + 'expo">' + v.rating.toFixed(2).replace(/\.?0+$/, '') + '</span>';
			row += '</td>';
			row += '<td>';
				row += '<button class="badge badge-secondary" type="button" data-toggle="collapse" data-target="#' + k + 'info" aria-expanded="false" aria-controls="' + k + 'info" tabindex="-1">&#x00A0;i&#x00A0;</button>';
			row += '</td>';
		row += '</tr>';
		row += '<tr class="collapse" id="' + k + 'info">';
			row += '<td colspan="5">';
				row += '<dl class="row">';
					row += '<dt class="col-3 col-sm-6 text-right">Name</dt>';
					row += '<dd class="col-9 col-sm-6">' + v.name + '</dd>';
					row += '<dt class="col-3 col-sm-6 text-right">Effect</dt>';
					row += '<dd class="col-9 col-sm-6" id="' + k + 'effect"></dd>';
					row += '<dt class="col-3 col-sm-6 text-right">';
						row += '<span class="d-block d-sm-none">AD</span>';
						row += '<span class="d-none d-sm-block">Artifact Damage</span>';
					row += '</dt>';
					row += '<dd class="col-9 col-sm-6" id="' + k + 'ad"></dd>';
					row += '<dt class="col-3 col-sm-6 text-right">';
						row += '<span class="d-block d-sm-none">Cost</span>';
						row += '<span class="d-none d-sm-block">Cost to Upgrade</span>';
					row += '</dt>';
					row += '<dd class="col-9 col-sm-6" id="' + k + 'cost"></dd>';
					row += '<dt class="col-3 col-sm-6 text-right">';
						row += '<span class="d-block d-sm-none">Effc.</span>';
						row += '<span class="d-none d-sm-block">Efficiency</span>';
					row += '</dt>';
					row += '<dd class="col-9 col-sm-6" id="' + k + 'eff"></dd>';
				row += '</dl>';
			row += '</td>';
		row += '</tr>';
		$('#artifacts').append(row);
	});
	window.localStorage.setItem('artifacts', JSON.stringify(artifacts));
	window.localStorage.setItem('build', $('#build').val());
	window.localStorage.setItem('hero', $('#hero').val());
	window.localStorage.setItem('active', $('#active').val());
	window.localStorage.setItem('relic_factor', $('#relic_factor').val());
	window.localStorage.setItem('forcebos', $('#forcebos').val());
	window.localStorage.setItem('bos_type', $('#bos_type').val());
	if($('#ocd').prop('checked') == true) {
		window.localStorage.setItem('ocd', 1);
	} else {
		window.localStorage.setItem('ocd', 0);
	}
	adjustWeights();
}

function updateActive(k) {
	if($('#' + k + 'active').is(':checked')) {
		artifacts.data[k].active = 1;
		$('#' + k + 'row').removeClass('text-dark bg-secondary');
		$('#' + k).prop('readonly', false);
	} else {
		artifacts.data[k].active = 0;
		$('#' + k + 'row').addClass('text-dark bg-secondary');
		$('#' + k).prop('readonly', true);
	}
	artifacts = calculate(artifacts, k, true, true);
}

function checkAll() {
	$.each(artifacts.data, function(k,v) {
		$('#' + k + 'active').prop('checked', true);
		artifacts.data[k].active = 1;
		$('#' + k + 'div').removeClass('ignore');
	});
	artifacts = calculateAll(artifacts, true);
}

function regenerateArtifacts() {
	$.each(artifacts.data, function(k,v) {
		if(isNaN(v.level)) {
			v.level = 0;
		}
		$('#' + k).val(v.level);
		var value = '';
		if('' != v.current_effect) {
			value = displayEffect(v.current_effect, v.type);
		}
		value += v.bonus
		$('#' + k + 'effect').empty().append(value);
		value = '';
		if('' != v.current_ad) {
			value = displayPct(v.current_ad);
		}
		$('#' + k + 'ad').empty().append(value);
		value = '';
		if('' != v.displayCost) {
			value = v.displayCost + ' Relics';
		}
		$('#' + k + 'cost').empty().append(value);
		value = '';
		if(-1 != v.efficiency) {
			value = v.efficiency.toExponential(12);
		}
		$('#' + k + 'eff').empty().append(value);
		value = v.rating.toFixed(2).replace(/\.?0+$/, '');
		$('#' + k + 'expo').empty().append(value);
		$('#' + k + 'expo').removeClass().addClass('badge').addClass('badge-' + v.color);
	});
	window.localStorage.setItem('artifacts', JSON.stringify(artifacts));
	window.localStorage.setItem('build', $('#build').val());
	window.localStorage.setItem('hero', $('#hero').val());
	window.localStorage.setItem('active', $('#active').val());
	window.localStorage.setItem('relic_factor', $('#relic_factor').val());
	window.localStorage.setItem('forcebos', $('#forcebos').val());
	window.localStorage.setItem('bos_type', $('#bos_type').val());
	if($('#ocd').prop('checked') == true) {
		window.localStorage.setItem('ocd', 1);
	} else {
		window.localStorage.setItem('ocd', 0);
	}
}

function updateArtifact(k) {
	artifacts.data[k].level = parseInt($('#' + k).val());
	artifacts.totalAD = calculateTotalAD(artifacts.data, true);
	artifacts = calculate(artifacts, k, true, true);
}

function countArtifacts(data) {
	var i = 0;
	$.each(data, function(k,v) {
		if(v.level > 0) {
			i++;
		}
	});
	return(i);
}

function determineAverage(data) {
	var i = countArtifacts(data);
	var x = 0;
	var y = 0;
	$.each(data, function(k,v) {
		if(v.level > 0) {
			x += v.level;
		}
	});
	if(i > 0 && x > 0) {
		y = x / i;
	}
	return(y);
}

function optimize() {
	$('#progressBar').show();
	if(relics >= temp_artifacts.data[winner_e].cost) {
		if(undefined == upgrades[winner_e]) {
			upgrades[winner_e] = 1;
		} else {
			upgrades[winner_e]++;
		}
		relics -= temp_artifacts.data[winner_e].cost;
		temp_artifacts.data[winner_e].level++;
		temp_artifacts = calculate(temp_artifacts, winner_e, false, false);
		if(buffer-- < 0) {
			var progress = (1 - (relics > 0 ? relics / orelics : 0 / orelics)) * 100;
			$('#progress').width(progress + '%');
			$('#progress').prop('aria-valuenow', progress);
			buffer = obuffer;
			window.setTimeout(optimize, 1);
		} else {
			optimize();
		}
	} else {
		var progress = 100;
		$('#progress').width(progress + '%');
		$('#progress').prop('aria-valuenow', progress);
		$('#progress').removeClass('progress-bar-striped progress-bar-animated');
		renderSuggestions();
	}
}

function generateUpgrades() {
	$('#new_artifact').empty();
	$('#accept').empty();
	$('#suggestions').empty();
	$('#progressBar').hide();
	$('#progress').width('0%');
	$('#progress').prop('aria-valuenow', 0);
	$('#progress').addClass('progress-bar-striped progress-bar-animated');
	$('#sugg-tab').tab('show');
	window.localStorage.setItem('relic_factor', $('#relic_factor').val())
	window.localStorage.setItem('forcebos', $('#forcebos').val());
	window.localStorage.setItem('bos_type', $('#bos_type').val());
	if($('#ocd').prop('checked') == true) {
		window.localStorage.setItem('ocd', 1);
	} else {
		window.localStorage.setItem('ocd', 0);
	}
	if(winner_n != '' || 1 > artifacts.data.bos.level) {
		$('#new_artifact').empty().append('<em>NOTE: You would be better off saving up for a new artifact.</em>');
	}
	var forceBOS = parseInt($('#forcebos').val());
	relics = new Decimal(('' == $('#relics').val() ? 0 : $('#relics').val()) + '.' + ('' == $('#relics_decimal').val() ? 0 : $('#relics_decimal').val()));
	buffer = 0;
	switch($('#relic_factor').val()) {
		case '_':
			relics = relics.toNumber();
			buffer = 100;
			break;
		case 'K':
			relics = relics.mul(1000).toNumber();
			buffer = 100;
			break;
		case 'M':
			relics = relics.mul(1000000).toNumber();
			buffer = 100;
			break;
		case 'B':
			relics = relics.mul(1000000000).toNumber();
			buffer = 250;
			break;
		case 'T':
			relics = relics.mul(1000000000000).toNumber();
			buffer = 250;
			break;
		case 'e13':
			relics = relics.mul(10000000000000).toNumber();
			buffer = 300;
			break;
		case 'e14':
			relics = relics.mul(100000000000000).toNumber();
			buffer = 400;
			break;
		case 'e15':
			relics = relics.mul(1000000000000000).toNumber();
			buffer = 500;
			break;
		case 'e16':
			relics = relics.mul(10000000000000000).toNumber();
			buffer = 600;
			break;
		case 'e17':
			relics = relics.mul(100000000000000000).toNumber();
			buffer = 800;
			break;
		case 'e18':
			relics = relics.mul(1000000000000000000).toNumber();
			buffer = 1000;
			break;
		case 'e19':
			relics = relics.mul(10000000000000000000).toNumber();
			buffer = 1200;
			break;
		case 'e20':
			relics = relics.mul(100000000000000000000).toNumber();
			buffer = 1400;
			break;
		case 'e21':
			relics = relics.mul(1000000000000000000000).toNumber();
			buffer = 1750;
			break;
	}
	orelics = relics;
	obuffer = buffer;
	upgrades = {};
	temp_artifacts = $.extend(true, {}, artifacts);
	var litmus = false;
	$.each(temp_artifacts.data, function(k,v) {
		if(v.level > 0) { litmus = true; }
	});
	if(false == litmus) {
		$('#suggestions').empty().append('<p>You must have at least 1 artifact enabled to use this.</p>');
		return
	}
	/*
	while(forceBOS > 0 && $('#ocd').prop('checked') == false) {
		if($('#bos_type').val() == 'level') {
			if(relics >= temp_artifacts.data['bos'].cost) {
				forceBOS--;
				if(undefined == upgrades['bos']) {
					upgrades['bos'] = 1;
				} else {
					upgrades['bos']++;
				}
				relics -= temp_artifacts.data['bos'].cost;
				temp_artifacts.data['bos'].level++;
				temp_artifacts = calculate(temp_artifacts, 'bos', false, false);
			} else {
				forceBOS = 0;
			}
		} else {
			var bos_pct = forceBOS/100;
			var bos_relics = relics * bos_pct;
			while(true) {
				if(bos_relics >= temp_artifacts.data['bos'].cost) {
					bos_relics -= temp_artifacts.data['bos'].cost;
					if(undefined == upgrades['bos']) {
						upgrades['bos'] = 1;
					} else {
						upgrades['bos']++;
					}
					relics -= temp_artifacts.data['bos'].cost;
					temp_artifacts.data['bos'].level++;
					temp_artifacts = calculate(temp_artifacts, 'bos', false, false);
				} else if(relics >= temp_artifacts.data['bos'].cost) {
					if(undefined == upgrades['bos']) {
						upgrades['bos'] = 1;
					} else {
						upgrades['bos']++;
					}
					relics -= temp_artifacts.data['bos'].cost;
					temp_artifacts.data['bos'].level++;
					temp_artifacts = calculate(temp_artifacts, 'bos', false, false);
					break;
				} else {
					break;
				}
			}
			break;
		}
	}
	*/
	optimize();
}

function renderSuggestions() {
	if($('#ocd').prop('checked')) {
		$.each(artifacts.data, function(k,v) {
			if(k in upgrades) {
				var x = Math.floor(temp_artifacts.data[k].level/100) * 100;
				if(x > artifacts.data[k].level) {
					temp_artifacts.data[k].level = x;
					temp_artifacts = calculate(temp_artifacts, k, false, false);
					upgrades[k] = x - artifacts.data[k].level;
				} else if(-1 == artifacts.data[k].max) {
					delete upgrades[k];
				}
			}
		});
	}
	var suggestions = '';
	var litmus = false;
	$.each(upgrades, function(k,v) {
		litmus = true;
	});
	if(false == litmus) {
		$('#suggestions').empty().append('<p>You cannot afford to make the next best upgrade(s). Please try again when you have more relics. Also, if you have the OCD mode on, you might need to shut it off to see results.</p>');
		relics = 0;
		return;
	}
	$.each(artifacts.data, function(k,v) {
		if(k in upgrades) {
			suggestions += '<div class="card border border-secondary ' + ($('#wolf').prop('checked') == true ? 'bg-dark' : '') + '">';
				suggestions += '<div class="card-header d-flex justify-content-between align-items-center" id="' + k + 'deetsh">';
					suggestions += '<span>';
						suggestions += v.name;
						suggestions += '<span class="badge badge-' + v.color + ' ml-3">+' + upgrades[k] + '</span>';
					suggestions += '</span>';
					suggestions += '<button class="badge badge-secondary" type="button" data-toggle="collapse" data-target="#' + k + 'deets" aria-expanded="false" aria-controls="' + k + 'deets">&#x00A0;i&#x00A0;</button>';
				suggestions += '</div>';
				suggestions += '<div class="collapse" id="' + k + 'deets" aria-labelledby="' + k + 'deetsh" data-parent="#suggestions">';
					suggestions += '<div class="card-body">';
						suggestions += '<dl class="row">';
							suggestions += '<dt class="col-3 col-sm-6 text-right">Levels</dt>';
							suggestions += '<dd class="col-9 col-sm-6">' + v.level + ' => ' + temp_artifacts.data[k].level + '</dd>';
							suggestions += '<dt class="col-3 col-sm-6 text-right">Effect</dt>';
							suggestions += '<dd class="col-9 col-sm-6">' + displayEffect(artifacts.data[k].current_effect, artifacts.data[k].type) + ' => ' + displayEffect(temp_artifacts.data[k].current_effect, artifacts.data[k].type) + '</dd>';
							suggestions += '<dt class="col-3 col-sm-6 text-right">';
								suggestions += '<span class="d-block d-sm-none">AD</span>';
								suggestions += '<span class="d-none d-sm-block">Artifact Damage</span>';
							suggestions += '</dt>';
							suggestions += '<dd class="col-9 col-sm-6">' + displayPct(artifacts.data[k].current_ad) + ' => ' + displayPct(temp_artifacts.data[k].current_ad) + '</dd>';
						suggestions += '</dl>';
					suggestions += '</div>';
				suggestions += '</div>';
			suggestions += '</div>';

		}
	});
	$('#suggestions').empty().append(suggestions);
	$('#accept').empty().append('<button type="button" class="btn btn-primary" onclick="acceptSuggestions();">Complete</button>');
}

function acceptSuggestions() {
	gtag('event', 'Upgrades', {
		'event_category': 'Upgrades',
		'event_action': 'Accept',
		'event_label': 'List',
	});
	$.each(upgrades, function(k,v) {
		artifacts.data[k].level += v;
	});
	artifacts.totalAD = calculateTotalAD(artifacts.data, true);
	$('#new_artifact').empty();
	$('#accept').empty();
	$('#suggestions').empty();
	$('#relics').val('');
	$('#relics_decimal').val('');
	artifacts = calculateAll(artifacts, true);
	$('#reccs-tab').tab('show');
}

function oldEff(data, k, v) {
	var current_ad = v.level * v.ad;
	var current_effect = 1 + v.effect * Math.pow(v.level, Math.pow((1 + (v.cexpo - 1) * Math.min(v.grate * v.level, v.gmax)), v.gexpo));
	data.data[k].current_ad = current_ad;
	data.data[k].current_effect = current_effect
	if(v.max == -1 || v.max > v.level) {
		var cost = Math.pow(v.level + 1, v.cexpo) * v.ccoef;
		data.data[k].cost= cost;
		data.data[k].displayCost = displayTruncated(cost);
		var next_effect = 1 + v.effect * Math.pow(v.level + 1, Math.pow((1 + (v.cexpo - 1) * Math.min(v.grate * (v.level + 1), v.gmax)), v.gexpo));
		var effect_diff = next_effect/current_effect;
		var effect_eff = Math.pow(effect_diff, v.rating);
		var ad_change = (((v.level + 1) * v.ad) - current_ad);
		var ad_eff = 1 + (ad_change/data.totalAD);
		var eff = Math.abs(((effect_eff * ad_eff) - 1)/cost);
		data.data[k].efficiency = eff;
	}
	return(data);
}

function newEff(data, k, v, avglvl, cost, remainingArtifacts) {
	data.data[k].current_ad = '';
	data.data[k].current_effect = '';
	var i = 1;
	var j = (v.max == -1 || v.max > avglvl ? avglvl : v.max);
	while(i <= j) {
		cost += Math.pow(i++, v.cexpo) * v.ccoef;
	}
	if(v.max == -1 || v.max > avglvl) {
		var next_effect = 1 + v.effect * Math.pow(avglvl, Math.pow((1 + (v.cexpo - 1) * Math.min(v.grate * avglvl, v.gmax)), v.gexpo));
	} else  {
		var next_effect = 1 + v.effect * Math.pow(v.max, Math.pow((1 + (v.cexpo - 1) * Math.min(v.grate * v.max, v.gmax)), v.gexpo));
	}
	var effect_eff = Math.pow(next_effect, v.rating);
	var ad_eff = 1 + ((avglvl * v.ad)/data.totalAD);
	var eff = Math.abs(((effect_eff * ad_eff) - 1)/cost/remainingArtifacts);
	data.data[k].efficiency = eff;
	return(data)
}

function calculateTotalAD(data, update) {
	var total = 0;
	$.each(data, function(k,v) {
		total += v.level * v.ad;
	});
	if(true == update) {
		$('#adsanity').text(displayPct(total * artifacts.data.hsw.current_effect));
	}
	return(total);
}

function calculate(data, k, regenerate, pinch) {
	var next_artifact = countArtifacts(artifacts.data) + 1;
	var next_artifact_cost = artifact_costs[next_artifact];
	var average_level = determineAverage(artifacts.data);
	var v = data.data[k];
	data.data[k].efficiency = -1;
	data.data[k].cost = '';
	data.data[k].displayCost = '';
	if(v.level > 0 && v.active == 1) {
		var prior_ad = v.current_ad;
		data = oldEff(data, k, v);
		var new_ad = data.data[k].current_ad;
	} else if(v.level == 0 && next_artifact_cost != -1 && v.active == 1 && true === pinch) {
		data = newEff(data, k, v, average_level, next_artifact_cost, Object.keys(artifact_costs).length - 3 - next_artifact);
	} else {
		data.data[k].current_ad = '';
		data.data[k].current_effect = '';
	}
	winner_e = ''
	var temp_winner_n = ''
	winner_value = 0;
	$.each(data.data, function(k,v) {
		if(-1 != v.efficiency && v.efficiency > winner_value) {
			if(v.level > 0 && v.active == 1) {
				winner_e = k;
				winner_value = v.efficiency;
			} else if(v.level == 0 && next_artifact_cost != -1 && v.active == 1 && true === pinch) {
				temp_winner_n = k;
			}
		}
	});
	if(true === regenerate) {
		regenerateArtifacts();
		winner_n = temp_winner_n;
	}
	data.totalAD = calculateTotalAD(data.data, regenerate);
	return(data);
}

function calculateAll(data, regenerate) {
	winner_e = ''
	var temp_winner_n = ''
	winner_value = 0;
	var next_artifact = countArtifacts(artifacts.data) + 1;
	var next_artifact_cost = artifact_costs[next_artifact];
	var average_level = determineAverage(artifacts.data);
	$.each(data.data, function(k,v) {
		data.data[k].efficiency = -1;
		data.data[k].cost = '';
		data.data[k].displayCost = '';
		if(v.level > 0 && v.active == 1) {
			data = oldEff(data, k, v);
			if(-1 != data.data[k].efficiency && data.data[k].efficiency > winner_value) {
				winner_e = k;
				temp_winner_n = '';
				winner_value = data.data[k].efficiency;
			}
		} else if(v.level == 0 && next_artifact_cost != -1 && v.active == 1) {
			data = newEff(data, k, v, average_level, next_artifact_cost, Object.keys(artifact_costs).length - 3 - next_artifact);
			if(-1 != data.data[k].efficiency && data.data[k].efficiency > winner_value) {
				temp_winner_n = k;
			}
		} else {
			data.data[k].current_ad = '';
			data.data[k].current_effect = '';
		}
	});
	if(true === regenerate) {
		regenerateArtifacts();
		winner_n = temp_winner_n;
	}
	data.totalAD = calculateTotalAD(data.data, regenerate);
	return(data)
}

function displayPct(value) {
	value = displayTruncated(value * 100);
	return(value + '%');
}

function displayTruncated(value) {
	if(value > 999999999999999999999) {
		value = (value / 1000000000000000000000).toFixed(3).replace(/\.?0+$/, '');
		value += 'e21/ac';
	} else if(value > 99999999999999999999) {
		value = (value / 100000000000000000000).toFixed(3).replace(/\.?0+$/, '');
		value += 'e20';
	} else if(value > 9999999999999999999) {
		value = (value / 10000000000000000000).toFixed(3).replace(/\.?0+$/, '');
		value += 'e19';
	} else if(value > 999999999999999999) {
		value = (value / 1000000000000000000).toFixed(3).replace(/\.?0+$/, '');
		value += 'e18/ab';
	} else if(value > 99999999999999999) {
		value = (value / 100000000000000000).toFixed(3).replace(/\.?0+$/, '');
		value += 'e17';
	} else if(value > 9999999999999999) {
		value = (value / 10000000000000000).toFixed(3).replace(/\.?0+$/, '');
		value += 'e16';
	} else if(value > 999999999999999) {
		value = (value / 1000000000000000).toFixed(3).replace(/\.?0+$/, '');
		value += 'e15/aa';
	} else if(value > 99999999999999) {
		value = (value / 100000000000000).toFixed(3).replace(/\.?0+$/, '');
		value += 'e14';
	} else if(value > 9999999999999) {
		value = (value / 10000000000000).toFixed(3).replace(/\.?0+$/, '');
		value += 'e13';
	} else if(value > 999999999999) {
		value = (value / 1000000000000).toFixed(3).replace(/\.?0+$/, '');
		value += 'T';
	} else if(value > 999999999) {
		value = (value / 1000000000).toFixed(3).replace(/\.?0+$/, '');
		value += 'B';
	} else if(value > 999999) {
		value = (value / 1000000).toFixed(3).replace(/\.?0+$/, '');
		value += 'M';
	} else if(value > 999) {
		value = (value / 1000).toFixed(3).replace(/\.?0+$/, '');
		value += 'K';
	} else {
		value = (value * 1).toFixed(3).replace(/\.?0+$/, '');
	}
	return(value);
}

function displayEffect(value, type) {
	switch(type) {
		case 'multiply':
			return 'x' + displayTruncated(value);

		case 'add':
			value = value -1
			if(value > 0) {
				return '+' + displayTruncated(value);
			} else {
				return displayTruncated(value);
			}

		case 'multiply_pct':
			return 'x' + displayPct(value);

		case 'pct':
			value = value -1
			if(value > 0) {
				return '+' + displayPct(value);
			} else {
				return displayPct(value);
			}
	}
}

function storageAvailable(type) {
	try {
		var storage = window[type],
		x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return e instanceof DOMException && (
		// everything except Firefox
		e.code === 22 ||
		// Firefox
		e.code === 1014 ||
		// test name field too, because code might not be present
		// everything except Firefox
		e.name === 'QuotaExceededError' ||
		// Firefox
		e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
		// acknowledge QuotaExceededError only if there's something already stored
		storage.length !== 0;
	}
}

if (storageAvailable('localStorage')) {
	var localArtifacts = JSON.parse(window.localStorage.getItem('artifacts'));
	if(null != localArtifacts && 'undefined' == typeof localArtifacts.data) {
		localArtifacts.data = jQuery.extend(true, {}, localArtifacts);
	}
	if(null != localArtifacts && 'undefined' != typeof localArtifacts.data) {
		$.each(localArtifacts.data, function(k, v) {
			if(undefined != artifacts.data[k]) {
				artifacts.data[k].level = v.level;
				artifacts.data[k].active = v.active;
			}
		});
	}
	artifacts.totalAD = calculateTotalAD(artifacts.data);
	$('#build').val(window.localStorage.getItem('build'));
	$('#hero').val(window.localStorage.getItem('hero'));
	$('#active').val(window.localStorage.getItem('active'));
	$('#relic_factor').val(window.localStorage.getItem('relic_factor'));
	$('#forcebos').val(window.localStorage.getItem('forcebos'));
	$('#bos_type').val(window.localStorage.getItem('bos_type'));
	if(window.localStorage.getItem('dark') == "1") {
		$('#wolf').prop('checked', true);
		$('#lamb').prop('checked', false);
	} else {
		$('#wolf').prop('checked', false);
		$('#lamb').prop('checked', true);
	}
	if(window.localStorage.getItem('ocd') == "1") {
		$('#ocd').prop('checked', true);
	}
	toggleDark();
}

$('input[type="tel"]').on('focus', function(){
  $(this).data('fontSize', $(this).css('font-size')).css('font-size', '16px');
}).on('blur', function(){
  $(this).css('font-size', $(this).data('fontSize'));
});

var origWeights = jQuery.extend(true, {}, artifacts.data);
generateArtifacts();
