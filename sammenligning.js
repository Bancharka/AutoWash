app.post(
	"/new-cleaning",
	upload.fields([
		{ name: "beforeImages", maxCount: 8 },
		{ name: "afterImages", maxCount: 8 },
	]),
	async (req, res) => {
		try {
			const userId = req.session.user.id;
			const viewToken = crypto.randomBytes(32).toString("hex");

			const newLog = await db.Logs.create({
				stationId: req.body.stationId,
				comment: req.body.comment,
				userId: userId,
				viewToken: viewToken,
				tokenUsed: false,
			});

			// henter info til emailen:

			const station = await db.Stations.findByPk(req.body.stationId, {
				include: [
					{
						model: db.Companies,
						as: "companies",
					},
				],
				raw: false,
			});

			const user = await db.Users.findByPk(userId, { raw: true });

			const plainStation = station.toJSON();

			const imagePaths = [];

			const uploadImages = async (files, isBefore) => {
				if (!files) return;

				for (const file of files) {
					const resizedFilename = resized-${file.filename};
					const resizedPath = path.join(
						__dirname,
						"image-uploads",
						resizedFilename
					);

					await sharp(file.path)
						.resize(800, 600, { fit: "inside" })
						.jpeg({ quality: 80 })
						.toFile(resizedPath);

					fs.unlinkSync(file.path);

					await db.Images.create({
						logId: newLog.id,
						path: image-uploads/${resizedFilename},
						isBefore: isBefore,
					});

					imagePaths.push({
						filename: resizedFilename,
						path: resizedPath,
						cid: resizedFilename,
					});
				}
			};

			await uploadImages(req.files.beforeImages, true);
			await uploadImages(req.files.afterImages, false);

			const nodemailer = require("nodemailer");

			// Create a test account or replace with real credentials.
			const transporter = nodemailer.createTransport({
				host: "smtp.gmail.com",
				port: 587,
				secure: false, // true for 465, false for other ports
				auth: {
					user: "op7486684@gmail.com",
					pass: process.env.EMAIL_PASS_SECRET,
				},
			});

			//Her laver vi en const med alt infoen som skal være i emailen

			const viewLink = http://localhost:3000/view-cleaning/${viewToken};

			const emailHTML = `
			<h2>Station rengjort </h2> <br>
			<p> <a href="${viewLink}"> Tryk her for at se rengøringsrapport </a>  </p>
			`;

			await transporter.sendMail({
				from: '"AutoWash System" <op7486684@gmail.com>',
				to: "olipet101@gmail.com",
				subject: Station rengjort: ${plainStation.address},
				html: emailHTML,
			});

			console.log(" <br Email sendt <br>");

			res.redirect(/dashboard);
		} catch (error) {
			console.error("Upload fejl:", error);
			res.status(500).send("Fejl ved upload af billeder");
		}
	}
);