var persons_list = document.getElementById("persons_list");
var groups_ul = document.getElementById("groups-ul")
// var pre_assigned = [
//     "rioko",
//     "yuho", "yuuho", "遊帆", "ゆうほ",
//     "maiko", "毎子", "まいこ",
//     "alex", "アレクス", "アレックス", "あれくす"
// ];
var pre_assigned = [];

function addPerson() {
    var person = prompt("Name", "Test person");
    if (person != null) {
        var new_person_li = document.createElement("li");
        new_person_li.setAttribute("id", person);
        new_person_li.setAttribute("class", "list-group-item");
        new_person_li.appendChild(document.createTextNode(person));
        persons_list.appendChild(new_person_li);
    }
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function getPersons() {
    var persons_li = persons_list.querySelectorAll("li");
    var persons = [];
    for(i=0; i<persons_li.length; i++) {
        persons.push(persons_li[i].innerText)
    }
    return persons
}

function splitGroups() {
    var persons = shuffle(getPersons());
    // var persons_ = getPersons();
    // console.log(persons_);
    var no_groups = parseInt(document.getElementById("no_groups").value);
    var persons_per_group = Math.ceil(persons.length / no_groups);
    var groups = Array(no_groups);
    console.log(groups);
    for (i=0; i<no_groups; i++) {
        groups[i] = Array();
    }
    var i = 0;
    while (persons.length > 0) {
        var person = persons.pop();
        if (pre_assigned.includes(person.toLowerCase())) {
            console.log("PRE: " + person + " => 0");
            groups[0].push(person);
        } else {
            console.log("RANDOM: " + person + " => " + parseInt(i));
            groups[i].push(person);
            i = (i + 1) % no_groups;
        }
    }
    groups = shuffle(groups);
    createGroupElements(groups);
}

function createGroupElements(groups) {
    var groups_li = groups_ul.querySelectorAll("li")
    for(i=0; i<groups_li.length; i++) {
        // groups_li[i].parentElement.removeChild(groups_li[i]);
        groups_li[i].remove();
    }
    for(i=0; i<groups.length; i++) {
        var group = groups[i];
        var number = i + 1;
        var new_group = document.createElement("li");
        var new_persons_list = document.createElement("ul");
        new_persons_list.setAttribute("class", "list-group");
        new_group.setAttribute("id", "groups-ul-li-" + number.toString());
        new_group.setAttribute("class", "list-group-item");
        var header = document.createElement("h3");
        header.innerHTML = "Group " + number.toString();
        new_group.appendChild(header);
        groups_ul.appendChild(new_group);
        new_group.appendChild(new_persons_list);
        for(n=0; n<group.length; n++) {
            var person = group[n];
            person_li = document.createElement("li");
            person_li.appendChild(document.createTextNode(person));
            person_li.setAttribute("class", "list-group-item");
            new_persons_list.appendChild(person_li);
        }
    }
}
