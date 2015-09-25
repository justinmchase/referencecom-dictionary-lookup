
var currentSelection = '';

function Navigate(tabIndex, selection) {
	chrome.tabs.create({
		"index": tabIndex + 1,
		"url": "http://dictionary.reference.com/browse/" + selection
	});
}

chrome.extension.onRequest.addListener(function (selection, sender, complete) {
	var id = sender.tab.id;
	currentSelection = selection + "";

	if (selection)
		chrome.pageAction.show(id);
	else
		chrome.pageAction.hide(id);

	chrome.pageAction.setTitle({
		tabId: id,
		title: "Lookup '" + selection + "' @ reference.com"
	});

	complete();
});

// When first run, this gets the current tab.
chrome.tabs.getSelected(null, function (tab) {
	chrome.pageAction.setIcon({
		path: "book_open.png",
		tabId: tab.id
	});
});

// Called when the user clicks on the page action.
chrome.pageAction.onClicked.addListener(function (tab) {
	if (currentSelection) {
		Navigate(tab.index, currentSelection);
	}
});

var contextMenuId = chrome.contextMenus.create({
	"title": "Lookup @ reference.com",
	"contexts": ["selection"],
	"onclick": function (info, tab) {
		if (info.selectionText) {
			Navigate(tab.index, info.selectionText);
		}
	}
});
