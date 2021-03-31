const task = () =>{
	const input = document.querySelector(".find-name__input");
	const players = document.querySelectorAll(".task__player");
	const header = document.querySelector(".task__header");
	const fields = header.getElementsByTagName("section");
	const arrows = document.querySelectorAll(".task__arrow");

	let buffer;

	//creating new players

	let player1 = new Player("Julia Jim", getRandomHits(), getRandomRap());
	let player2 = new Player("Vanessa Hinz", getRandomHits(), getRandomRap());
	let player3 = new Player("Anna Eberg", getRandomHits(), getRandomRap());
	let player4 = new Player("Elena Kruchinkina", getRandomHits(), getRandomRap()); //my favourite

	const playersArr = [player1, player2, player3, player4];

	const generateData = () =>{ //Show newest data from array of players
		let playerProp;
		for(let i = 0; i<playersArr.length; i++){
			playerProp = players[i].getElementsByTagName("section");
			playerProp[0].textContent = playersArr[i].place;
			playerProp[1].textContent = playersArr[i].name;
			playerProp[2].textContent = playersArr[i].hit;
			playerProp[3].textContent = playersArr[i].rapidity;
		}
	};

	const firstSort = () =>{ //first sorting players by rapidity

		sortByRapidity(playersArr);

		for(let i = 0; i<playersArr.length; i++){
			playersArr[i].place = i+1;
		}
	};

	input.addEventListener("input", findByName);
	for(let field = 1; field<fields.length; field++){
		fields[field].addEventListener("click", ()=>{
			bufer = [...playersArr];
			arrows[field-1].style.transform = "translate(-50%,-75%) rotate(135deg)";

			if(field==1){  //1-field Name
				sortByName(playersArr);
			}
			else if(field==2){ //2-field Hit
				sortByHits(playersArr);
			}
			else{  //field Rapidity
				sortByRapidity(playersArr);
			}

			if(isEqual(bufer, playersArr)){ //if players were sorted already, they will be reversed;
				playersArr.reverse();

				arrows[field-1].style.transform = "translate(-50%,-25%) rotate(-45deg)";
			}

			generateData();
		});
	}




	function sortByName(arr){
		return arr.sort((a, b) => {
			return a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1;
		});
	}
	function sortByHits(arr){
		return arr.sort((a,b) => {return b.hitInt-a.hitInt});
	}
	function sortByRapidity(arr){
		return arr.sort((a,b) => {return a.rapidityInt-b.rapidityInt});
	}


	function Player(name, hit, rapidity){  //constructor of Player
		this.name = name;
		this.hit = hit;
		this.rapidity = rapidity;

		this.hitInt = hit.split("+").reduce((a,b) => parseInt(a,10) + parseInt(b,10));
		
		let rapidityArr = rapidity.split(":");
		let rapidityDate = new Date(0, 0, 0, 0, rapidityArr[0], rapidityArr[1], rapidityArr[2]);
		this.rapidityInt = Date.parse(rapidityDate);
	};

	function getRandomNum(min, max){  //Create random number from min to max
		return Math.floor(Math.random() * (max-min) + min);
	};

	function getRandomRap(){ //get a random number of rapidity
		return `${getRandomNum(30, 40)}:${getRandomNum(0, 60)}:${getRandomNum(0, 10)}`;
	}

	function getRandomHits(){ //get a random number of hits
		return `${getRandomNum(0, 5)}+${getRandomNum(0, 5)}+${getRandomNum(0, 5)}+${getRandomNum(0, 5)}`;
	}

	function isEqual(arr1, arr2){
		for(let i = 0; i<arr1.length; i++){
			if(arr1[i]!=arr2[i]){
				return false;
			}
		}
		return true;
	}

	function findByName(e){ //find players by symbols user wrote
		playersArr.forEach(player => {
			players[playersArr.indexOf(player)].style.background = "white";
			if(player.name.toLowerCase().includes(e.target.value.toLowerCase()) && e.target.value!=""){
				players[playersArr.indexOf(player)].style.background = "rgba(245, 108, 117, .3)";
			}
		});
	};
	firstSort();
	generateData();
};

task();