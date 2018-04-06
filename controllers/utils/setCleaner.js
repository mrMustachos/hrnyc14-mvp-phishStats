const cleanData = (str) => {
	if (str.indexOf('<p class=\'setlist-footer\'>') === -1) {
		str += '</p>';
	} else {
		str = str.replace(/<p class='setlist-footer'>(.*?)<\/p>/g, '</p>');
	}
	return str;
};

const createSets = (str) => {
	var strData = cleanData(str);
	var sets = strData.match(/<p>(.|\n)*?<\/p>/g).map((val) => val.replace(/<\/?p>/g,''));
	return sets;
};

const cleanSetTitle = (str) => {
	var temp = str.split(': ');
	var formatted = temp[0].replace(/<span class='set-label'>/g, '').replace(/<\/span>/g, '').replace('Set ', '');
	if (formatted !== 'Encore') { formatted = parseInt(formatted); }
	return formatted;
};

const grabSong = (str) => {
	var temp = str.split(': ');
	var formatted = temp[1];
	return formatted;
};

const cleanSongs = (str) => {
	if (str.indexOf('</a><sup title=') !== -1) {
		str = str.replace(/<\/a><sup title=/g, '\' footNote=');
		str = str.replace(/">(.*?)<\/sup>/g, '"><\/sup><\/a>');
	}
	if (str.indexOf('></sup></a>, ') !== -1) { str = str.replace(/><\/sup><\/a>, /g, ' nextSong="next"></a>'); }
	if (str.indexOf('></sup></a> > ') !== -1) { str = str.replace(/><\/sup><\/a> > /g, ' nextSong="transition"></a>'); }
	if (str.indexOf('></sup>') !== -1) { str = str.replace(/><\/sup>/g, ''); }
	if (str.indexOf('</a>, ') !== -1) { str = str.replace(/<\/a>, /g, '\' nextSong="next"></a>'); }
	if (str.indexOf('</a> > ') !== -1) { str = str.replace(/<\/a> > /g, '\' nextSong="transition"></a>'); }
	if (str.indexOf('</a> -> ') !== -1) { str = str.replace(/<\/a> -> /g, '\' nextSong="transition"></a>'); }
	if (str.indexOf('title="') !== -1) { str = str.replace(/title="/g, 'description="'); }
	if (str.indexOf('<a href=') !== -1) { str = str.replace(/<a href=/g, '<a description="" href='); }
	if (str.indexOf('"') !== -1) { str = str.replace(/"/g, '\''); }
	if (str.indexOf('class=\'setlist-song\'>') !== -1) { str = str.replace(/class='setlist-song'>/g, 'songName=\''); }

	var cap = "'>";
	var output = [str.slice(0, -4), cap, str.slice(-4)].join('');

	if (output.indexOf('\'\'></a>') !== -1) { output = output.replace(/''><\/a>/g, '\'></a>'); }
	if (output.indexOf(' songName') !== -1) { output = output.replace(/' songName='/g, '•song_name='); }
	if (output.indexOf(' footNote') !== -1) { output = output.replace(/' footNote='/g, '•foot_note='); }
	if (output.indexOf(' nextSong') !== -1) { output = output.replace(/'' nextSong='/g, '•next_song='); }
	if (output.indexOf(' nextSong') !== -1) { output = output.replace(/' nextSong='/g, '•next_song='); }
	if (output.indexOf(' href') !== -1) { output = output.replace(/ href='http:\/\/phish.net/g, '•net_slug='); }

	return output;
};

const separateSongs = (str) => {
	var songs = str.match(/<a(.*?)>(.*?)<\/a>/g);
	for (var i = 0; i < songs.length; i++) {
		if (songs[i].indexOf('<a ') !== -1) { songs[i] = songs[i].replace(/<a /g, ''); }
		if (songs[i].indexOf('></a>') !== -1) { songs[i] = songs[i].replace(/'><\/a>/g, ''); }
	}
	return songs;
};

const splitInfo = (arr) => {
	var result = [];
	for (var j = 0; j< arr.length; j++) {
		var breaker = arr[j].split('•');
		result.push(keyValueBreaker(breaker));
	}
	return result;
};

const keyValueBreaker = (arr) => {
	var result = {};
	for (var k = 0; k< arr.length; k++) {
		var temp = arr[k].split('=');
		result[temp[0]] = temp[1];
	}
	if (result.description.length === 2) {
		result.description = undefined;
	} else {
		var descriptionClean = result.description.slice(1, result.description.length - 2).trim().replace(/&quot;/g, '"');
		result.description = descriptionClean;
	}
	// if (result.song_name.indexOf('\'') !== -1) {
	// 	var songNameClean = result.song_name.replace(/'/g, '&apos;');
	// 	result.song_name = songNameClean;
	// }
	return result;
};

const setlist = (rawData) => {
	var result = [];
	var track = 1;
	var sets = createSets(rawData);

	for (var i = 0; i < sets.length; i++) {
		var fart = splitInfo(separateSongs(cleanSongs(grabSong(sets[i]))));
		for (var j = 0; j < fart.length; j++) {
			var tracks = fart[j];
			var tracklLabel = `track${track}`;
			tracks.set = cleanSetTitle(sets[i]);
			tracks.track = track;
			result.push(tracks);
			track++
		}
	}

	// console.log(result)
	return result;
};

const makeSongList = (arr) => {
	var obj = {};
	for (var i = 0; i < arr.length; i++) {
		obj[arr[i].song_name] = arr[i].track;
	}
	return obj;
};

const getSongId = (jamData, songList, setData) => {
	var count = 1;
	for (var i = 0; i < jamData.length; i++) {
		var title = jamData[i].song;
		var setlistAdd = songList[title] - 1;

		if (title in songList && setlistAdd !== undefined) {
			setData[setlistAdd].song_id = jamData[i].songid;
		}
	}
	return setData;
};

const makeJamId = (arr) => {
	var result = [];
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].song_id !== undefined) {
			result.push(arr[i].song_id);
		}
	}
	return result;
};

const addJamInfo = (setObj, jamObj) => {
	var setData = setlist(setObj.setlistdata);
	var listSongs = makeSongList(setData);
	var repopulateSetlist = getSongId(jamObj, listSongs, setData);
	return repopulateSetlist;
}

module.exports = (setObj, jamObj) => {
	var cleanSetlist = addJamInfo(setObj, jamObj);
	var listJamId = makeJamId(cleanSetlist);

	setObj.jam_id = listJamId;
	setObj.setlisthtml = setObj.setlistdata;
	setObj.setlistdata = cleanSetlist;

	return setObj;
};

