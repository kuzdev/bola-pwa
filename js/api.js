const base_url = "https://api.football-data.org/v2/";
const teams_endpoint = 'competitions/2001/teams'
const team_endpoint = 'teams/'
const token = "7314a808927e4c4d83b101ee6e3f8b45"

var fetchApi = function (url) {
  return fetch(url, {
    'headers': {
      'X-Auth-Token': token
    }
  })
    .then(status)
    .then(json)
    .then(https)
}

const status = function (response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

const json = function (response) {
  return response.json();
}

const error = function (error) {
  console.log("Error : " + error);
}

const https = function (response) {
  var str = JSON.stringify(response).replace(/http:/g, 'https:');
  return JSON.parse(str);
}

function getTeams() {
  fetchApi(base_url + teams_endpoint)
    .then(function (data) {
      var cardTeam = ''
      data.teams.forEach(team => {
        cardTeam += `
        <div class='col s12 m6'>
          <div class='card'>
            <div class='card-content center'>
            <a href="teamdetail.html#${team.id}">
              <img src='${team.crestUrl || '/images/champion-logo.svg'}' height='92' width='92'>
              <h5>${team.name}</h5>
            </a>
            <p><i class='material-icons tiny'>contact_mail</i> ${team.address}, ${team.area.name}</p>
            <p><i class='material-icons tiny'>sports_soccer</i> ${team.venue}</p>
            <p><i class='material-icons tiny'>language</i> <a src='${team.website}' target='_blank'>${team.website}</a></p>
            <a class="btn-floating waves-effect waves-light green" onclick="saveTeam(this);" data-team='${JSON.stringify(team)}'><i class="material-icons">favorite</i></a>
            </div>
          </div>
        </div>
        `
      });
      document.getElementById('teams').innerHTML = cardTeam
    })
    .catch(error);
}

function getTeamById(id) {
  fetchApi(base_url + team_endpoint + id)
    .then(function (team) {
      console.log(team)
      cardTeam = `
        <div class='col s12 m6'>
          <div class='card'>
            <div class='card-content center'>
            <a href="teamdetail.html#${team.id}">
              <img src='${team.crestUrl || '/images/champion-logo.svg'}' height='92' width='92'>
              <h5>${team.name}</h5>
            </a>
            <p><i class='material-icons tiny'>contact_mail</i> ${team.address}, ${team.area.name}</p>
            <p><i class='material-icons tiny'>sports_soccer</i> ${team.venue}</p>
            <p><i class='material-icons tiny'>language</i> <a src='${team.website}' target='_blank'>${team.website}</a></p>
            <a class="btn-floating waves-effect waves-light green" onclick="saveTeam(this);" data-team='${JSON.stringify(team)}'><i class="material-icons">favorite</i></a>
            </div>
          </div>
        </div>
        `
      squadHeader = `<ul class="collection with-header">
        <li class="collection-header"><h4>Squad</h4></li>`
      squadList = '';
      squadFooter = '</ul>'
      team.squad.forEach(function (player) {
        squadList += `
            <li class="collection-item">
            ${player.name} (${player.shirtNumber})<br/>${player.countryOfBirth}
            <span class='secondary-content'>${player.position}</span>
            </li>`
      });
      document.getElementById('body-content').innerHTML = cardTeam
      document.getElementById('squad').innerHTML = squadHeader.concat(squadList).concat(squadFooter)
    })
    .catch(error);
}

function loadFavTeams() {
  getFavTeams()
    .then(function (data) {
      var cardTeam = ''
      data.forEach(team => {
        cardTeam += `
        <div class='col s12 m6'>
          <div class='card'>
            <div class='card-content center'>
            <a href="teamdetail.html#${team.id}">
              <img src='${team.crestUrl || '/images/champion-logo.svg'}' height='92' width='92'>
              <h5>${team.name}</h5>
            </a>
            <p><i class='material-icons tiny'>contact_mail</i> ${team.address}, ${team.area.name}</p>
            <p><i class='material-icons tiny'>sports_soccer</i> ${team.venue}</p>
            <p><i class='material-icons tiny'>language</i> <a src='${team.website}' target='_blank'>${team.website}</a></p>
            <a class="btn-floating waves-effect waves-light red" onclick="deleteTeam(this);" data-team='${JSON.stringify(team)}'><i class="material-icons">delete</i></a>
            </div>
          </div>
        </div>
        `
      });
      document.getElementById('favorite').innerHTML = cardTeam
    })
}

function saveTeam(data) {
  var team = JSON.parse(data.getAttribute('data-team'))
  addFavTeam(team);
}

function deleteTeam(data) {
  var team = JSON.parse(data.getAttribute('data-team'))
  deleteFavTeam(team);
}