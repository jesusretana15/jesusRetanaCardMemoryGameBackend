"use strict";
 
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4000;
const app = express();
app.use(bodyParser.json());

app.use(cors());

const faces = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '🥲', '🥹', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳', '🙂‍↕️', '😏', '😒', '🙂‍↔️', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😮‍💨', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🫣', '🤗', '🫡', '🤔', '🫢', '🤭', '🤫', '🤥', '😶', '😶‍🌫️', '😐', '😑', '😬', '🫨', '🫠', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '😵‍💫', '🫥', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];
const clothes = ['🧳', '🌂', '☂️', '🧵', '🪡', '🪢', '🪭', '🧶', '👓', '🕶', '🥽', '🥼', '🦺', '👔', '👕', '👖', '🧣', '🧤', '🧥', '🧦', '👗', '👘', '🥻', '🩴', '🩱', '🩲', '🩳', '👙', '👚', '👛', '👜', '👝', '🎒', '👞', '👟', '🥾', '🥿', '👠', '👡', '🩰', '👢', '👑', '👒', '🎩', '🎓', '🧢', '⛑', '🪖', '💄', '💍', '💼'];
const flowers = ['🌵', '🎄', '🌲', '🌳', '🌴', '🪹', '🪺', '🪵', '🌱', '🌿', '☘️', '🍀', '🎍', '🪴', '🎋', '🍃', '🍂', '🍁', '🍄', '🍄‍🟫', '🐚', '🪨', '🌾', '💐', '🌷', '🪷', '🌹', '🥀', '🌺', '🌸', '🪻', '🌼', '🌻'];
const foods = ['🍏', '🍎', '🍐', '🍊', '🍋', '🍋‍🟩', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🫛', '🥬', '🥒', '🌶', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🫚', '🥔', '🍠', '🫘', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟', '🍕', '🫓', '🥪', '🥙', '🧆', '🌮', '🌯', '🫔', '🥗', '🥘', '🫕', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯']

// GET
app.get("/cards/:difficulty/:theme", (req, res) => {
	console.log("cards requested", req)
	let data = {cards:[]};

	if(req.params !== null && req.params.difficulty !== null && req.params.theme !== null){
		let difficulty = req.params.difficulty;
		let theme = req.params.theme
		let themeData = null;

		switch (theme) {
			case 'faces':
				themeData = faces
				break;
			case 'clothes':
				themeData = clothes
				break;
		
			case 'flowers':
				themeData = flowers
				break;
		
			case 'foods':
				themeData = foods
				break;
		
			default:
				break;
		}


		for (let i = 0; i <difficulty; i++) {
			let emojiID =  getRandomInclusive(0,(themeData.length -1));
			let emojiIDRepetido = true			 
			 data.cards.push({
				id: emojiID,
				emoji:themeData[emojiID],
				isDisconvered: false,
				isSelected: false
			 })
			
		}

		let cardCopu = data.cards.slice(0, (data.cards.length));
		data.cards = data.cards.concat(cardCopu)

		shuffleArray(data.cards);

		res.send(JSON.stringify(data));

	}else {
		res.send(JSON.stringify({error: 'error from server'}))
	}

	
});


// POST
app.post("/", (req, res) => {
	const user = req.body;
	const userID = Date.now();
	const userWithID = { ...user, id: userID };
	users.push(userWithID);
	res.send("Added Successfully");
});


app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}/`);
});


function getRandomInclusive(min,max) {
	 min = Math.ceil(min)
	 max = Math.floor(max)
	return Math.floor(Math.random()*(max - min + 1) + min)

}

function shuffleArray(array) {
	for(var i = array.length -1 ; i >0;  i--){
		var j = Math.floor(Math.random()*(i+1));
		var temp = array[i]
		array[i] = array[j]
		array[j] = temp;
	}
}