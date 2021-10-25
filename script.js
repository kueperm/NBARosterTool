//CS361 Roster Tool MVP script.js by Matt Kueper

//Load NBA teams data JSON via REST request
var reqNBA = new XMLHttpRequest();
reqNBA.open('GET', 'http://localhost:3000/teams', false);
reqNBA.send(null);
var NBAdata = JSON.parse(reqNBA.responseText);
console.log(NBAdata);

document.getElementById("selbut").addEventListener("click", event => {

    var teamname = document.getElementById("teamsList").value;

    if(teamname == "none"){
        modal.style.display = "block";
        modalbackdrop.style.display = "block";
    }else{
        document.getElementById("roster-disp").className = "shown";

        //add players from requested to to table and display 
        for (row=1; row <= 20; row++){
            var currow = "r" + row;
            //document.getElementById(currow).className = "shown";

            if (row -1 < NBAdata[teamname].roster.length) {
                if (document.getElementById(currow).className == "hidden"){
                    document.getElementById(currow).classList.remove("hidden");
                }

                document.getElementById(currow).cells[0].innerHTML = NBAdata[teamname].roster[row-1].firstName;
                document.getElementById(currow).cells[1].innerHTML = NBAdata[teamname].roster[row-1].lastName;

                //insert player image into table
                //concepts based on: https://stackoverflow.com/questions/39221062/how-to-set-image-tag-to-the-html-table-with-javascript
                //accessed 10/24/2021
                var playerpic = document.createElement("img");
                //using https://picsum.photos/200 to generate "fake" players images currently for UI/UX example
                playerpic.setAttribute('src', 'https://picsum.photos/200');
                playerpic.setAttribute('alt', 'na');
                playerpic.width = '200';
                playerpic.height = '200';

                if (document.getElementById(currow).cells[2].firstChild) {
                    document.getElementById(currow).cells[2].removeChild(document.getElementById(currow).cells[2].firstChild);
                    document.getElementById(currow).cells[2].appendChild(playerpic);
                } else {
                    document.getElementById(currow).cells[2].appendChild(playerpic);
                }

            } else {
                document.getElementById(currow).className = "hidden";
            }
        }
    }
});

//Modal behavior based on concepts from: https://medium.com/@nerdplusdog/a-how-to-guide-for-modal-boxes-with-javascript-html-and-css-6a49d063987e
//Accessed on 10/23/2021

var modalbackdrop = document.getElementById("modal-backdrop");

// ---   Project Modal Behavior
var modal = document.getElementById("modal");
var xbut = document.getElementById("x-button");

document.getElementById("x-button").addEventListener("click", event => {
    modal.style.display = "none";
    modalbackdrop.style.display = "none";
});