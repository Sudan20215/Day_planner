$(function(){});
let presentday=moment().format('MMMM Do YYYY, h:mm:ss a');
let present = moment().format("H A");
let workday=[
    {time:"8 AM",event:""},
    {time:"9 AM",event:""},
    {time:"10 AM",event:""},
    {time:"11 AM",event:""},
    {time:"12 PM",event:""},
    {time:"1 PM",event:""},
    {time:"2 PM",event:""},
    {time:"3 PM",event:""},
    {time:"4 PM",event:""},
    {time:"5 PM",event:""},
    {time:"6 PM",event:""},
    {time:"7 PM",event:""},
    {time:"8 PM",event:""},
    
];
let todoevents=JSON.parse(localStorage.getItem("officeday"));
if (todoevents){
    officeday=todoevents;
}
$("#today").text(presentday);
workday.forEach(function(timeSeto,index){
    let timeset=timeSeto.time;
    let eventcolor=colorR(timeset);
    let row =
    '<div class="blocktime"id="'+index+'"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input=group-prepend hour justify-content sm-end pr-3 pt-3">'+timeset+'</div><textarea class="form-control'+eventcolor+'">'+timeSeto.event+
    '</textarea><div class ="com-sm col-lg-1 input-group-append"><button class="SaveBtn btn-success"type ="submit"><i class ="fas fa-save"></i></button></div></div></div>';
    $(".container").append(row);

});
function colorR(time){
    let newplan=moment(present, "H A");
    let newentry=moment(time,"H A");
    if(newplan.isBefore(newentry)){
        return "later";
    }else if (newplan.isAfter(newentry)){
        return "previous";
    }else{
        return "now";
    }
}
$(".SaveBtn").on("click",function(){
    let successID=parseInt(
        $(this)
        .closest(".blocktime")
        .attr("id")
    );
 let userinput=$.trim(
     $(this)
     .parent()
     .siblings("textarea")
            .val(),
 );
 workday[successID].event=userinput;
 localStorage.setItem("officeday", JSON.stringify(workday)); 
 
})