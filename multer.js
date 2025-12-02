const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "kitten/");
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(null, "cover-" + uniqueSuffix + path.extname(file.originalname));
	},
});

const filefilter = (req, file, cb) => {
	if (file.mimetype.startWith("image/")) {
		cb(null, true);
	} else {
	}
	cb(new Error("Error, not an image!"));
};
