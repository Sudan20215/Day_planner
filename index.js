$(function () {});
  

let presentday = moment().format('MMMM Do YYYY h:mm:ss a');;

let show = moment().format("H A");


let dayscheduler = [
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
let officeevents = JSON.parse(localStorage.getItem("officeday"));
if (officeevents) {
  dayscheduler = officeevents;
}

/* Current Day */
$("#present").text(presentday);

/* Create rows */
dayscheduler.forEach(function(timeinterval, index) {
	let timeLabel = timeinterval.clock;
	let blockstyle = colorRow(timeLabel);
	let row =
		'<div class="notetime" id="' +
		index +
		'"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		timeLabel +
		'</div><textarea class="form-control ' +
		blockstyle +
		'">' +
		timeinterval.event +
		'</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-danger" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

	/* Adding rows to container div */
	$(".container").append(row);
});

/* Color rows based on current time */
function colorRow(clock) {
	let planNow = moment(show, "H A");
	let planEntry = moment(clock, "H A");
	if (planNow.isAfter(planEntry)) {
		return "past";
	} else if (planNow.isBefore(planEntry)) {
		return "future";
	} else {
		return "present";
	}
}

/* Save Events */
$(".saveBtn").on("click", function() {
	let saveonclick = parseInt(
		$(this)
			.closest(".notetime")
			.attr("id")
	);
	let inputuser = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);
	dayscheduler[saveonclick].event = inputuser;

	/* Set local storage */
	localStorage.setItem("officeday", JSON.stringify(dayscheduler));
});