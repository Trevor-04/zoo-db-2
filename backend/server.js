const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const { url, port } = require("../src/config.json");
const config = require("../src/config.json");
const environment = process.env.NODE_ENV || 'development';
const { url, port } = config[process.env.NODE_ENV];


// Routes
const animalRoutes = require("./routes/animals");
const eventsRoutes = require("./routes/events");
const loginRoutes = require("./routes/login");
const exhibitsRoutes = require("./routes/exhibits");
const membersRoutes = require("./routes/members");
const reportsRoutes = require("./routes/reports");
const ticketsRoutes = require("./routes/tickets");
const inventoryRoutes = require("./routes/inventory");
const donationRoutes = require("./routes/donations");
const employeeRoutes = require('./routes/employeeRoutes');
const notificationsRoutes = require('./routes/notifications');

// Initialize express
const app = express();

// Middleware
//app.use(cors()); // Handle CORS

app.use(cors({ 
	origin: [config.development.url, config.production.url, `http://localhost:${Number(config.development.port)+1}`],
	credentials: true
}));

app.use(express.json()); // Handle JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Handle URL-encoded payloads


// Stripe Payment Route
app.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Zoo Donation",
			payment_method: id,
			confirm: true,
			automatic_payment_methods: {
				enabled: true,
				allow_redirects: "never"
			},
			return_url:`${url}/donations`
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

// Email notifications

// Grab functions
const notifications = require('./functions/notifications');

// Start polling for unsent notifications every 5 minutes
setInterval(notifications.sendNotifications, 60000); // 1 minute

// Routes
app.use("/animals", animalRoutes);
app.use("/events", eventsRoutes);
app.use("/exhibits", exhibitsRoutes);
app.use("/login", loginRoutes);
app.use('/employees', employeeRoutes);
app.use("/members", membersRoutes);
app.use("/reports", reportsRoutes);
app.use("/tickets", ticketsRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/donations", donationRoutes);
app.use('/notifications', notificationsRoutes);


const serverPort = environment === 'production' ? process.env.PORT : port;
app.listen(serverPort, async () => {
  console.log(`Server is running on ${url} and port ${serverPort}`);
});

// // Start the server
// app.listen(port, async () => {
//   console.log(`Server is running on ${url}`);
// });
