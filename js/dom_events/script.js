var enterButton = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var lis = document.querySelectorAll("li");

function inputLength() {
	var inputStr = input.value;

	// Check to see if a user enter an empty string
	if (inputStr.trim().length != 0) {
        return inputStr.length;
    }
}

function createListElement() {
	var li = document.createElement("li");
	li.appendChild(document.createTextNode(input.value));
	ul.appendChild(li);

    liEvent(li);
    deleteButton(li);
}

function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}

function liEvent(li) {
    li.addEventListener('click', function () {
        li.classList.toggle('done');
    });
}

// add delete button
function deleteButton(li) {
    var btn = document.createElement("span");
    btn.appendChild(document.createTextNode("Delete"));
    li.appendChild(btn);

    buttonEvent();
}

// Add event listener to delete buttons
function buttonEvent() {
	var spans = document.querySelectorAll('span');

	spans.forEach(function (span) {
		span.addEventListener('click', function () {
			this.parentNode.remove();
        })
	});

}

enterButton.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

// init
lis.forEach(function (li) {
    liEvent(li);
    deleteButton(li);
});



