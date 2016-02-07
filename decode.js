$.getJSON('music/metadata.json', function(data) {
	var audio = "";
	function printAudio(element, index, array) {
		audio += "<div class=''><audio controls loops><source src='" + element.replace(/^\/srv\/http/,'') + "'></audio></div>";
	}
    data['files'].forEach(printAudio);
	$('#content').html(audio);
});
