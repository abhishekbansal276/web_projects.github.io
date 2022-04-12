var menuIcon = document.querySelector(".menu_icon");
var sidebar = document.querySelector(".sidebar");
var container = document.querySelector(".container");


menuIcon.onclick = function(){
	sidebar.classList.toggle("small_sidebar");
	container.classList.toggle("large_container")
}

$(".myInput").on('keyup', function (event) {
	if (event.keyCode === 13) {
		var value1 = $(this).val();
	   	console.log("Enter key pressed");
		if (value1 !== ''){
			console.log("Field not empty");
			window.location.href = "search.html";
		} 
		else{
			console.log("Field empty");
		}
	}
 });