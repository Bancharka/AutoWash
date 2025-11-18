const bcrypt = require("bcrypt");

const password = "gittekinkykælder";
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function (err, hash) {
	if (err) {
		console.error(err);
		return;
	}
	console.log(hash);
});

const hashedPass =
	"$2b$10$zmZWOgZQpqUYS0H1oC9NdeFoGmDwkmSPyqndYFaEpurJlCIb6FCc2";
const plainPassword = "gittekinkykælder";

bcrypt.compare(plainPassword, hashedPass, function (err, result) {
	if (err) {
		console.error(err);
		return;
	}

	if (result) {
		console.log("Password ith cowwect");
	} else {
		console.log("Pathword ith not cowwect");
	}
});
