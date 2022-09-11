const fs = require('fs')

const countries = require('./countries.json');
const players = require('./players.json');
const ids = require('./ids.json');

//suport functions
function renameKey ( obj, oldKey, newKey ) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }

function randBool () {
    return Math.random() < 0.5
}

// data storage
var countryList = []
var playerList = []
var _id = []
var teamList = ["OakenShield", "Thorfinn", "D.D.D", "Sedated", "RiskyBoots", "Gandalves", "Griffindor", "Cthulhu", "RottyTop", "Sherlock", "Ritcher", "ShieldKnight"]

// list of countries
for (i in countries){
    countryList.push(countries[i]["countryCode"])
}

// list of players
for (i in players){
    playerList.push(players[i]["name"])
}

// list of ids
for (i in ids){
    _id.push(ids[i]["_id"])
}

//packaging into one single JSON file
var playerNumber = 0
var count = 0
var countryCount = 0
var teamCount = 0 
var consumerID = 0
var producerID = 0

exportobj = []

for (_id of _id){
    // console.log(_id)
    if (playerNumber == 13) {
        playerNumber = 0
        teamCount += 1
        if (countryCount%2==0){
            producerID += 1
        }
        if (countryCount%3==0){
            consumerID += 1
        }
        // console.log("COUNTRY COUNT: "+countryCount)
        countryCount += 1
    }
    else {
        let isOUT = randBool()
        var isPlaying = isOUT ? false : randBool()
        
        exportobj.push({
            "_id":_id,
            "packetID": count,
            "consumerID":consumerID,
            "producerID":producerID,
            "playerName": playerList[count],
            "playerNumber": playerNumber,
            "team": teamList[teamCount],
            "country": countryList[countryCount],
            "individualScore": Math.floor(Math.random() * 40),
            "playerStatus": {
                "isOut": isOUT,
                "isPlaying": isPlaying
            }
        })
        playerNumber += 1
        count += 1
    }
}

//test
console.log(exportobj)
// console.log(playerList)

//write to file
fs.writeFile('StreamDataSample.json', JSON.stringify(exportobj), (err) => {
      
    // In case of a error throw err.
    if (err) throw err;
})
