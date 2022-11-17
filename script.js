const loadProducts = () => {
fetch('https://api.escuelajs.co/api/v1/products')
	.then(response => response.json())
	.then(response => displayProducts(response))
	.catch(err => console.error(err));
};

const displayProducts = (data) => {
	let furniture = [];
	const allProducts = data.map(object => {
		if (object.category.name === "Furniture") {
			furniture.push(object);
		}
	});
	console.log(furniture);
};

loadProducts();