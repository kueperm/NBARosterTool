//CS361 Roster Tool MVP script.js by Matt Kueper

//Load NBA teams data JSON via REST request
var reqNBA = new XMLHttpRequest();
reqNBA.open('GET', 'https://teamservice.herokuapp.com/', false);
reqNBA.send(null);
var NBAdata = JSON.parse(reqNBA.responseText);
//drill down 1 layer in JSON to teams
NBAdata = NBAdata.teams;

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

                var apiKey = "eb93af8d2dfa4c718d73c5e57c8a7865";
                var imgSearch = 'NBA+' + NBAdata[teamname].roster[row-1].firstName + '+' + NBAdata[teamname].roster[row-1].lastName + '+' + teamname;
                var imgURL =`https://api-test-10065.herokuapp.com/api_img?key=${apiKey}&search=${imgSearch}`;

                var reqImglink = new XMLHttpRequest();
                reqImglink.open('GET', imgURL, false);
                reqImglink.send(null);
                var imglink = JSON.parse(reqImglink.responseText);

                playerpic.setAttribute('src', imglink.image)
                playerpic.setAttribute('alt', 'na');
                playerpic.height = '200';

                if (document.getElementById(currow).cells[2].firstChild) {
                    document.getElementById(currow).cells[2].removeChild(document.getElementById(currow).cells[2].firstChild);
                    document.getElementById(currow).cells[2].appendChild(playerpic);
                    document.getElementById(currow).cells[2].align="center";
                } else {
                    document.getElementById(currow).cells[2].appendChild(playerpic);
                    document.getElementById(currow).cells[2].align="center";
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