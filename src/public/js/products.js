console.log("products.js: loaded");

const cartId = "643e1a3bcd4d41b659f78f79";
const forms = document.querySelectorAll(".add-form");
const products = document.querySelectorAll(".product-item-full");
const logOutBtn = document.querySelector(".profile-logout");

forms.forEach((form) => {
	form.addEventListener("click", (e) => {
		e.preventDefault();
		const productId = e.target.closest(".add-form").id;
		try {
			fetch(`/api/carts/${cartId}/product/${productId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
				});
			showAlert("Product added to cart", "success");
		} catch (error) {
			console.log(error);
		}
	});
});

products.forEach((product) => {
	product.addEventListener("click", (e) => {
		e.preventDefault();
		const target = e.target;
		if (target.classList.contains("add-btn")) return;
		const productId = target.querySelector(".add-form").id;
		if (!productId) return;
		try {
			window.location.href = `/product/${productId}`;
		} catch (error) {
			console.log(error);
		}
	});
});

logOutBtn.addEventListener("click", async (e) => {
	e.preventDefault();
	const email = logOutBtn.id;
	console.log(email);
	try {
		await fetch("/api/sessions/logout", {
			method: "POST",
			body: JSON.stringify({ username: email }),
			header: {
				"Content-Type": "application/json",
			},
		}).then((res) => {
			if (res.status === 200) {
				window.location.href = "/login";
			} else {
				const error = new Error(res.error);
				throw error;
			}
		});
	} catch (error) {
		console.error(error);
	}
});

const showAlert = (message, icon) => {
	Swal.fire({
		html: message,
		target: "#custom-target",
		customClass: {
			container: "position-absolute",
		},
		toast: true,
		position: "bottom-right",
		showConfirmButton: false,
		timer: 1500,
		icon: icon,
	});
};
