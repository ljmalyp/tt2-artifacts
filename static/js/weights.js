function adjustWeights() {
	gtag('event', 'Dark Mode', {
		'event_category': 'Dark Mode',
		'event_action': 'Setting',
		'event_label': ($('#dark').prop('checked') ? 'Dark' : 'Light' )
	});
	if($('#build').val()) {
		gtag('event', 'Build', {
			'event_category': 'Build',
			'event_action': 'Value',
			'event_label': $('#build').val()
		});
	}
	if($('#hero').val()) {
		gtag('event', 'Hero', {
			'event_category': 'Hero',
			'event_action': 'Set',
			'event_label': $('#hero').val()
		});
	}
	if($('#gold').val()) {
		gtag('event', 'Gold', {
			'event_category': 'Gold',
			'event_action': 'Set',
			'event_label': $('#gold').val()
		});
	}
	if($('#active').val()) {
		gtag('event', 'Active', {
			'event_category': 'Active',
			'event_action': 'Set',
			'event_label': $('#active').val()
		});
	}
	$.each(origWeights, function(k,v) {
		artifacts.data[k].rating = v.rating;
		artifacts.data[k].color = v.color;
	});
	var hreduct = 0;
	switch($('#build').val()) {
		case 'hero':
			artifacts.data.foe.rating += .25;
			artifacts.data.hb.rating += 1;
			artifacts.data.ie.rating += .5;
			artifacts.data.orc.rating += .5;
			artifacts.data.sor.rating += 1;
			artifacts.data.hos2.rating += 6;
			artifacts.data.ig.rating += 1.82;
			artifacts.data.pof.rating += 1;
			artifacts.data.a.rating += 1;
			artifacts.data.tac.rating += 1;
			artifacts.data.hom.rating += 1;
			artifacts.data.roc.rating += 2.82;
			artifacts.data.dh.color = 'danger';
			artifacts.data.tms.color = 'danger';
			artifacts.data.ss.color = 'danger';
			artifacts.data.tr.color = 'danger';
			artifacts.data.aom.color = 'danger';
			artifacts.data.hb.color = 'success';
			artifacts.data.sor.color = 'success';
			artifacts.data.tm.color = 'danger';
			artifacts.data.ip.color = 'danger';
			artifacts.data.pof.color = 'success';
			artifacts.data.a.color = 'success';
			artifacts.data.tac.color = 'success';
			artifacts.data.rt.color = 'danger';
			artifacts.data.fs.color = 'danger';
			artifacts.data.gok.color = 'danger';
			artifacts.data.bor.color = 'danger';
			artifacts.data.ga.color = 'danger';
			artifacts.data.os.color = 'danger';
			artifacts.data.eoe.color = 'danger';
			artifacts.data.sg.color = 'danger';
			artifacts.data.ho.color = 'danger';
			hreduct = 1;
			break;
		case 'tap':
			artifacts.data.foe.rating += .5;
			artifacts.data.orc.rating += .5;
			artifacts.data.dh.rating += 1;
			artifacts.data.foe.rating += .5;
			artifacts.data.tms.rating += 1;
			artifacts.data.ss.rating += 1;
			artifacts.data.tr.rating += 1;
			artifacts.data.aom.rating += 1;
			artifacts.data.hb.rating += .5;
			artifacts.data.sor.rating += .5;
			artifacts.data.ie.rating += .25;
			artifacts.data.hos2.rating += 6;
			artifacts.data.ig.rating += 3.32;
			artifacts.data.rt.rating += 1;
			artifacts.data.fs.rating += 1;
			artifacts.data.gok.rating += 1;
			artifacts.data.bor.rating += 1;
			artifacts.data.ga.rating += 1;
			artifacts.data.os.rating += 1;
			artifacts.data.pof.rating += .5;
			artifacts.data.a.rating += .5;
			artifacts.data.tac.rating += .5;
			artifacts.data.hom.rating += 1;
			artifacts.data.roc.rating += 2.82;
			artifacts.data.dh.color = 'success';
			artifacts.data.tms.color = 'success';
			artifacts.data.ss.color = 'success';
			artifacts.data.tr.color = 'success';
			artifacts.data.aom.color = 'success';
			artifacts.data.tm.color = 'danger';
			artifacts.data.ip.color = 'danger';
			artifacts.data.rt.color = 'success';
			artifacts.data.fs.color = 'success';
			artifacts.data.gok.color = 'success';
			artifacts.data.bor.color = 'success';
			artifacts.data.ga.color = 'success';
			artifacts.data.os.color = 'success';
			artifacts.data.eoe.color = 'danger';
			artifacts.data.sg.color = 'danger';
			artifacts.data.ho.color = 'danger';
			hreduct = .5;
			break;
		case 'pet':
			artifacts.data.foe.rating += 1;
			artifacts.data.coe.rating += .41;
			artifacts.data.dh.rating += 1;
			artifacts.data.tms.rating += 1;
			artifacts.data.tr.rating += 1;
			artifacts.data.aom.rating += 1;
			artifacts.data.hb.rating += .5;
			artifacts.data.sor.rating += .5;
			artifacts.data.ie.rating += .25;
			artifacts.data.orc.rating += .5;
			artifacts.data.hos2.rating += 7;
			artifacts.data.hos.rating += .5;
			artifacts.data.ig.rating += 2.32;
			artifacts.data.pof.rating += 1;
			artifacts.data.a.rating += 1;
			artifacts.data.tac.rating += 1;
			artifacts.data.rt.rating += .5;
			artifacts.data.fs.rating += .5;
			artifacts.data.gok.rating += .5;
			artifacts.data.as.rating += 1;
			artifacts.data.hom.rating += .5;
			artifacts.data.roc.rating += 3.32;
			artifacts.data.dh.color = 'success';
			artifacts.data.tms.color = 'success';
			artifacts.data.ss.color = 'danger';
			artifacts.data.tr.color = 'success';
			artifacts.data.aom.color = 'success';
			artifacts.data.foe.color = 'success';
			artifacts.data.orc.color = 'success';
			artifacts.data.hos.color = 'success';
			artifacts.data.coe.color = 'warning';
			artifacts.data.tm.color = 'danger';
			artifacts.data.ip.color = 'danger';
			artifacts.data.pof.color = 'success';
			artifacts.data.a.color = 'success';
			artifacts.data.tac.color = 'success';
			artifacts.data.bor.color = 'danger';
			artifacts.data.ga.color = 'danger';
			artifacts.data.os.color = 'danger';
			artifacts.data.eoe.color = 'danger';
			artifacts.data.sg.color = 'danger';
			artifacts.data.ho.color = 'danger';
			hreduct = .5;
			break;
		case 'sc':
			artifacts.data.foe.rating += .33;
			artifacts.data.coe.rating += .41;
			artifacts.data.dh.rating += .67;
			artifacts.data.tms.rating += .67;
			artifacts.data.ss.rating += .67;
			artifacts.data.tr.rating += 1;
			artifacts.data.aom.rating += 1;
			artifacts.data.hb.rating += .67;
			artifacts.data.sor.rating += .67;
			artifacts.data.ie.rating += .33;
			artifacts.data.orc.rating += .5;
			artifacts.data.hos2.rating += 7.02;
			artifacts.data.hos.rating += .5;
			artifacts.data.ig.rating += 3.49;
			artifacts.data.rt.rating += .5;
			artifacts.data.fs.rating += .5;
			artifacts.data.gok.rating += .5;
			artifacts.data.bor.rating += .5;
			artifacts.data.ga.rating += .5;
			artifacts.data.os.rating += .5;
			artifacts.data.pof.rating += .67;
			artifacts.data.a.rating += .67;
			artifacts.data.tac.rating += .67;
			artifacts.data.eoe.rating += 1;
			artifacts.data.sg.rating += 1;
			artifacts.data.ho.rating += 1;
			artifacts.data.as.rating += 1;
			artifacts.data.hom.rating += .67;
			artifacts.data.roc.rating += 3.49;
			artifacts.data.tr.color = 'success';
			artifacts.data.aom.color = 'success';
			artifacts.data.orc.color = 'success';
			artifacts.data.hos.color = 'success';
			artifacts.data.coe.color = 'warning';
			artifacts.data.tm.color = 'danger';
			artifacts.data.ip.color = 'danger';
			artifacts.data.eoe.color = 'success';
			artifacts.data.sg.color = 'success';
			artifacts.data.ho.color = 'success';
			hreduct = .67;
			break;
		case 'hs':
			artifacts.data.foe.rating += .5;
			artifacts.data.coe.rating += .41;
			artifacts.data.dh.rating += 1;
			artifacts.data.tms.rating += 1;
			artifacts.data.ss.rating += .67;
			artifacts.data.tr.rating += 1;
			artifacts.data.aom.rating += 1;
			artifacts.data.hb.rating += .5;
			artifacts.data.sor.rating += .5;
			artifacts.data.ie.rating += .25;
			artifacts.data.hos2.rating += 7;
			artifacts.data.hos.rating += .5;
			artifacts.data.ig.rating += 3.99;
			artifacts.data.tm.rating += 1;
			artifacts.data.ip.rating += 1;
			artifacts.data.rt.rating += .5;
			artifacts.data.fs.rating += .5;
			artifacts.data.gok.rating += .5;
			artifacts.data.bor.rating += 1;
			artifacts.data.ga.rating += 1;
			artifacts.data.os.rating += 1;
			artifacts.data.pof.rating += .5;
			artifacts.data.a.rating += .5;
			artifacts.data.tac.rating += .5;
			artifacts.data.hom.rating += .67;
			artifacts.data.roc.rating += 2.49;
			artifacts.data.dh.color = 'success';
			artifacts.data.tms.color = 'success';
			artifacts.data.tr.color = 'success';
			artifacts.data.aom.color = 'success';
			artifacts.data.hos.color = 'success';
			artifacts.data.coe.color = 'warning';
			artifacts.data.tm.color = 'success';
			artifacts.data.ip.color = 'success';
			artifacts.data.bor.color = 'success';
			artifacts.data.ga.color = 'success';
			artifacts.data.os.color = 'success';
			artifacts.data.eoe.color = 'danger';
			artifacts.data.sg.color = 'danger';
			artifacts.data.ho.color = 'danger';
			hreduct = .5;
			break;
		case 'cs':
			artifacts.data.foe.rating += .25;
			artifacts.data.coe.rating += .41;
			artifacts.data.tr.rating += 1;
			artifacts.data.aom.rating += 1;
			artifacts.data.hb.rating += 1;
			artifacts.data.sor.rating += 1;
			artifacts.data.ie.rating += 1;
			artifacts.data.orc.rating += .5;
			artifacts.data.hos2.rating += 7;
			artifacts.data.hos.rating += .5;
			artifacts.data.ig.rating += 2.32;
			artifacts.data.rt.rating += .5;
			artifacts.data.fs.rating += .5;
			artifacts.data.gok.rating += .5;
			artifacts.data.pof.rating += 1;
			artifacts.data.a.rating += 1;
			artifacts.data.tac.rating += 1;
			artifacts.data.as.rating += 1;
			artifacts.data.hom.rating += 1;
			artifacts.data.roc.rating += 3.82;
			artifacts.data.dh.color = 'danger';
			artifacts.data.tms.color = 'danger';
			artifacts.data.ss.color = 'danger';
			artifacts.data.tr.color = 'success';
			artifacts.data.aom.color = 'success';
			artifacts.data.hb.color = 'success';
			artifacts.data.sor.color = 'success';
			artifacts.data.ie.color = 'success';
			artifacts.data.orc.color = 'success';
			artifacts.data.hos.color = 'success';
			artifacts.data.coe.color = 'warning';
			artifacts.data.tm.color = 'danger';
			artifacts.data.ip.color = 'danger';
			artifacts.data.pof.color = 'success';
			artifacts.data.a.color = 'success';
			artifacts.data.tac.color = 'success';
			artifacts.data.bor.color = 'danger';
			artifacts.data.ga.color = 'danger';
			artifacts.data.os.color = 'danger';
			artifacts.data.eoe.color = 'danger';
			artifacts.data.sg.color = 'danger';
			artifacts.data.ho.color = 'danger';
			hreduct = 1;
			break;
	}
	switch($('#hero').val()) {
		// spell ground
		case 'maya':
		case 'kronus':
		case 'kiki':
		case 'beany':
		case 'ursa':
		case 'wally':
		case 'pharaoh':
		case 'cass':
		case 'lucy':
		case 'jazz':
		case 'mina':
			artifacts.data.cota.rating += hreduct;
			artifacts.data.cota.color = ('hero' == $('#build').val() || 'cs' == $('#build').val() ? 'success' : 'secondary');
			artifacts.data.ttt.rating += hreduct;
			artifacts.data.ttt.color = ('hero' == $('#build').val() || 'cs' == $('#build').val() ? 'success' : 'secondary');;
			artifacts.data.tsos.color = 'danger';
			artifacts.data.fb.color = 'danger';
			artifacts.data.hh.color = 'danger';
			break;

		// melee ground
		case 'zato':
		case 'sophia':
		case 'lance':
		case 'gulbrand':
		case 'rhys':
		case 'cosette':
		case 'jayce':
		case 'boomoh':
		case 'aya':
		case 'yzafa':
		case 'finn':
			artifacts.data.tsos.rating += hreduct;
			artifacts.data.tsos.color = ('hero' == $('#build').val() || 'cs' == $('#build').val() ? 'success' : 'secondary');;
			artifacts.data.ttt.rating += hreduct;
			artifacts.data.ttt.color = ('hero' == $('#build').val() || 'cs' == $('#build').val() ? 'success' : 'secondary');;
			artifacts.data.cota.color = 'danger';
			artifacts.data.fb.color = 'danger';
			artifacts.data.hh.color = 'danger';
			break;

		// ranged ground
		case 'pingo':
		case 'rosabella':
		case 'davey':
		case 'maddie':
		case 'sawyer':
		case 'saje':
		case 'dex':
		case 'lala':
		case 'miki':
			artifacts.data.fb.rating += hreduct;
			artifacts.data.fb.color = ('hero' == $('#build').val() || 'cs' == $('#build').val() ? 'success' : 'secondary');;
			artifacts.data.ttt.rating += hreduct;
			artifacts.data.ttt.color = ('hero' == $('#build').val() || 'cs' == $('#build').val() ? 'success' : 'secondary');;
			artifacts.data.cota.color = 'danger';
			artifacts.data.tsos.color = 'danger';
			artifacts.data.hh.color = 'danger';
			break;

		// melee flying
		case 'maple':
		case 'nohni':
			artifacts.data.tsos.rating += hreduct;
			artifacts.data.tsos.color = ('hero' == $('#build').val() || 'cs' == $('#build').val() ? 'success' : 'secondary');;
			artifacts.data.hh.rating += hreduct;
			artifacts.data.hh.color = 'success';
			artifacts.data.cota.color = ('hero' == $('#build').val() || 'cs' == $('#build').val() ? 'success' : 'secondary');;
			artifacts.data.fb.color = 'danger';
			artifacts.data.ttt.color = 'danger';
		break;

		// ranged flying
		case 'kin':
		case 'zolom':
			artifacts.data.fb.rating += hreduct;
			artifacts.data.fb.color = ('hero' == $('#build').val() || 'cs' == $('#build').val() ? 'success' : 'secondary');;
			artifacts.data.hh.rating += hreduct;
			artifacts.data.hh.color = ('hero' == $('#build').val() || 'cs' == $('#build').val() ? 'success' : 'secondary');;
			artifacts.data.cota.color = 'danger';
			artifacts.data.tsos.color = 'danger';
			artifacts.data.ttt.color = 'danger';
			break;

		// spell flying
		case 'titania':
		case 'damon':
			artifacts.data.cota.rating += hreduct;
			artifacts.data.cota.color = ('hero' == $('#build').val() || 'cs' == $('#build').val() ? 'success' : 'secondary');;
			artifacts.data.hh.rating += hreduct;
			artifacts.data.hh.color = ('hero' == $('#build').val() || 'cs' == $('#build').val() ? 'success' : 'secondary');;
			artifacts.data.tsos.color = 'danger';
			artifacts.data.fb.color = 'danger';
			artifacts.data.ttt.color = 'danger';
			break;

	}
	switch($('#active').val()) {
		case 'offline':
			artifacts.data.zc.rating += .82;
			artifacts.data.zc.color = 'warning';
			artifacts.data.af.rating += 1;
			artifacts.data.af.color = 'success';
			break;
		case 'online':
			artifacts.data.zc.color = 'danger';
			artifacts.data.af.color = 'danger';
			artifacts.data.dc.rating += .41;
			artifacts.data.dc.color = 'warning';
			break;
	}
	switch($('#gold').val()) {
		case 'all':
			artifacts.data.coc.rating += .41;
			artifacts.data.coc.color = 'warning';
			artifacts.data.eof.rating += .41;
			artifacts.data.eof.color = 'warning';
			artifacts.data.is.rating += .5;
			artifacts.data.is.color = 'warning';
			artifacts.data.gfa.rating += .41;
			artifacts.data.gfa.color = 'warning';
			artifacts.data.hs.rating += .41;
			artifacts.data.hs.color = 'warning';
			artifacts.data.sov.rating += .21;
			artifacts.data.sov.color = 'warning';
			break;
		case 'coc':
			artifacts.data.coc.rating += .41;
			artifacts.data.coc.color = 'warning';
			artifacts.data.eof.rating += .41;
			artifacts.data.eof.color = 'warning';
			break;
		case 'fairy':
			artifacts.data.is.rating += .5;
			artifacts.data.is.color = 'warning';
			artifacts.data.gfa.rating += .41;
			artifacts.data.gfa.color = 'warning';
			break;
		case 'boss':
			artifacts.data.hs.rating += .41;
			artifacts.data.hs.color = 'warning';
			break;
		case 'sov':
			artifacts.data.sov.rating += .62;
			artifacts.data.sov.color = 'warning';
			alert('What are you doing.')
			alert('What.')
			alert('What.')
			alert('What are you doing.')
			alert('Look at your life. Look at your choices.')
			break;
	}
	var i = 40;
	$.each(artifacts.data, function(k,v) {
		if(v.sort <= i && k != 'bos') {
			artifacts.data.bos.rating += v.rating;
		}
	});
	artifacts = calculateAll(artifacts, true);
}
