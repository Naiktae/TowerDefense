// Fonction jQuery : exécute le jeu une fois que le DOM est chargé
$(function() {

	/* ---------- ---------- */
	/* ----- SETTINGS ------ */
	/* ---------- ---------- */

	// Objet littéral qui stocke l'argent, les vies et la vitesse du jeu
	var	Player = {
			money: 600,
			life : 20,
			speed: 5, // 10 = fast; 50 = normal mode
			time : 5, // time (in sec) before monsters move
			level: 1,
		}; 

	/* ---------- ---------- */
	/* ------ PARCOURS ----- */
	/* ---------- ---------- */

	// Objet littéral qui stocke le parcours des monstres
	var	Parcours = {
			start: 600, 
			sizeCourse: 150,
			course: [
				['down' ,200],
				['left' ,400],
				['down' ,500],
			]
		};

	// On appelle la fonction qui crée le parcours (visuel)
	makeCourse(Parcours);

	/* ---------- ---------- */
	/* ------ TOWERS ------- */
	/* ---------- ---------- */

	var towers = [];  // Tableau qui stocke toutes les tours du jeu

	// On affiche les tours que l'on peut créer à l'écran
	displayTowers(Player, towers); 

	// On appelle la fonction qui permet de créer des tours
	makeTowers(towers, Player);

	/* ---------- ---------- */
	/* ----- MONSTERS ------ */
	/* ---------- ---------- */

	var	monsters = []; // Tableau qui stocke tous les monstres du jeu

	// On appelle la fonction qui permet de créer des monstres
	makeMonsters(monsters, Parcours);

	/* ---------- ---------- */
	/* ------- GAME -------- */
	/* ---------- ---------- */

	// On appelle la fonction qui lance le jeu
	startGame(Player, Parcours, monsters, towers);
})

// ------------------------------------------------------------------------- //
// ----------------------- ALL FUNCTIONS FOR THE GAME ---------------------- //
// ------------------------------------------------------------------------- //

// ----------------------
// --- FUNCTIONS GAME ---
// ----------------------

// Fonction qui déclare les monstres à créer et les stocke dans le tableau des monstres
function makeMonsters(monsters, Parcours) {
	var MonsterToCreate;

	// On crée l'ensemble des monstres que l'on stocke dans un tableau
	for (var i = 0, max = 5; i < max; i++) {
		// On crée un monstre
		MonsterToCreate = new Monster(-100*(i+1), Parcours.start, (i+1)*100, 'Pikachu', 20, 'https://cdn0.iconfinder.com/data/icons/Favorite_monsters/256/pink.png');
		monsters.push(MonsterToCreate);
	}
}

// Fonction qui lance le jeu
function startGame(Player, Parcours, monsters, towers) {
	// On affiche les informations du joueur (html)
	$('.infos span.time').text(Player.time);
	$('.infos span.life').text(Player.life);
	$('.infos span.money').text(Player.money);
	$('.infos span.level').text(Player.level);

	// On lance le décompte
	var timer = setInterval(function() {
		$('.infos span.time').text(Player.time); // On change chaque seconde le temps restant
		if (Player.time <= 0) {

			// On arrête le décompte
			clearInterval(timer);

			// On lance le timer pour déplacer les monstres et attaquer
			monsterMove(Player, Parcours, monsters, towers, Player.speed);
		}
		else {
			Player.time--;
		}
	}, 1000);
}

// ----------------------
// -- FUNCTIONS OTHERS --
// ----------------------

// Fonction qui calcule l'hypotenuse
function calcHypotenuse(a, b) {
  return(Math.sqrt((a * a) + (b * b)));
}

// Fonction qui retourne une valeur comprise en % d'un chiffre
function hpPourcent (hp, hpMax) {
	return parseInt(hp * 100 / hpMax);
}



