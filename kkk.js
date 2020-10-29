$(function () {});
  
let presentday = moment().format("MMMM Do YYYY, h:mm:ss a");

let later = moment().format("H A");

/* planWorkday entries for each hour of the workday */
var organizer = [
  { clock: "9 AM", event: "" },
  { clock: "10 AM", event: "" },
  { clock: "11 AM", event: "" },
  { clock: "12 PM", event: "" },
  { clock: "1 PM", event: "" },
  { clock: "2 PM", event: "" },
  { clock: "3 PM", event: "" },
  { clock: "4 PM", event: "" },
  { clock: "5 PM", event: "" },
];

/* Local Storage check */
var keyevent = JSON.parse(localStorage.getItem("workDay"));
if (keyevent) {
  organizer = keyevent;
}

/* Current Day */
$("#presentday").text(presentday);

/* Create rows */
organizer.forEach(function(duration, symbol) {
	var timing = duration.time;
	var timingcolor = rowcolor(timing);
	var row =
		'<div class="newtime" id="' +
		symbol +
		'"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		timing +
		'</div><textarea class="form-control ' +
		timingcolor +
		'">' +
		duration.event +
		'</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

	/* Adding rows to container div */
	$(".container").append(row);
});

/* Color rows based on current time */
function rowcolor(clock) {
	var newplan = moment(later, "H A");
	var newentry = moment(clock, "H A");
	if (newplan.isBefore(newentry)) {
		return "front";
	} else if (newplan.isAfter(newentry) ) {
		return "back";
	} else {
		return "now";
	}
}

/* Save Events */
$(".saveBtn").on("click", function() {
	var blocktime = parseInt(
		$(this)
			.closest(".newtime")
			.attr("id")
	);
	var userEntry = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);
	organizer[blocktime].event = userEntry;

	/* Set local storage */
	localStorage.setItem("workDay", JSON.stringify(organizer));
});