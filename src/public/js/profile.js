console.log("profile.js");

const form = document.getElementById("profile-form");

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	const formData = new FormData(form);
	const obj = {};
	formData.forEach((value, key) => (obj[key] = value));
	console.log(obj);

	try {
		let response = await fetch("/api/sessions/login", {
			method: "POST",
			body: JSON.stringify(obj),
			header: {
				"Content-Type": "application/json",
			},
		});

		let result = await response.json();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
});
