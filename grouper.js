"use strict"

var elPersonsList = document.getElementById("persons_list");
var elGroupsList = document.getElementById("groups-ul");
var elGroupCount = document.getElementById("group-count");
var elBtnAssign = document.getElementById("btn-assign");
var elContainerPool = document.getElementById("container-pool");
var elInputName = document.getElementById("input-name");
var preAssigned = [
    "rioko",
    "yuho", "yuuho", "遊帆", "ゆうほ",
    "maiko", "毎子", "まいこ",
    "alex", "アレクス", "アレックス", "あれくす"
];
// var pre_assigned = [];

function addPerson() {
    var newPerson = elInputName.value;
    if (newPerson) {
        var newPersonListItem = document.createElement("li");
        newPersonListItem.setAttribute("id", newPerson);
        newPersonListItem.setAttribute("class", "list-group-item");
        newPersonListItem.appendChild(document.createTextNode(newPerson));
        elPersonsList.appendChild(newPersonListItem);
        elInputName.value = "";
    }
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function getPersons() {
    var personsListItems = elPersonsList.querySelectorAll("li");
    var persons = [];
    for(var i = 0; i < personsListItems.length; i++) {
        persons.push(personsListItems[i].innerText)
    }
    return persons
}

var intervall = null;
function assignGroupsAnimated() {
    if (getPersons().length <= 0 || elGroupCount.value < 2) {
        alert("Not enough persons assigned");
        return;
    }
    elBtnAssign.remove();
    elContainerPool.style = "display: none;";
    if (intervall === null) {
        intervall = setInterval(assignGroups, 50);
        setTimeout(() => {
            clearInterval(intervall);
            intervall = null;
        }, 3000);
    }
}

function assignGroups() {
    var persons = shuffle(getPersons());
    var groupCount = parseInt(elGroupCount.value - 1);
    var personsPerGroup = Math.ceil(persons.length / groupCount);
    var groups = Array(groupCount);
    for (var i = 0; i < groupCount; i++) {
        groups[i] = Array();
    }
    var i = 0;
    var cheatedGroup = [];
    while (persons.length > 0) {
        var person = persons.pop();
        if (preAssigned.includes(person.toLowerCase())) {
            // console.log("CHEAT! " + person);
            cheatedGroup.push(person);
        } else {
            groups[i].push(person);
            i = (i + 1) % groupCount;
        }
    }
    groups.push(cheatedGroup);
    groups = shuffle(groups);
    createGroupElements(groups);
}

function createGroupElements(groups) {
    var elGroupsListItems = elGroupsList.querySelectorAll("div")
    for(var i = 0; i < elGroupsListItems.length; i++) {
        // groups_li[i].parentElement.removeChild(groups_li[i]);
        elGroupsListItems[i].remove();
    }
    for(var i = 0; i < groups.length; i++) {
        var group = groups[i];
        var groupNumber = i + 1;

        var elNewGroup = document.createElement("div");
        elNewGroup.setAttribute("class", "col");
        elGroupsList.appendChild(elNewGroup);

        var elGroupHeader = document.createElement("h3");
        elGroupHeader.innerHTML = "Group " + groupNumber.toString();
        elNewGroup.appendChild(elGroupHeader);

        var elNewPersonsList = document.createElement("ul");
        elNewPersonsList.setAttribute("class", "list-group");
        elNewGroup.appendChild(elNewPersonsList);
        for(var n = 0; n < group.length; n++) {
            var person = group[n];
            var elPersonListItem = document.createElement("li");
            elPersonListItem.appendChild(document.createTextNode(person));
            elPersonListItem.setAttribute("class", "list-group-item");
            elNewPersonsList.appendChild(elPersonListItem);
        }
    }
}
