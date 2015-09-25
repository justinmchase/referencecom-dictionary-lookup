
document.onmouseup = function () {
	var selection = document.getSelection();

	// add the "" to convert the selection into a string
	// for message serialization.
	chrome.extension.sendRequest((selection + "").replace(/^\s+|\s+$/g, ""));
};