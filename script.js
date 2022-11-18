let furniture = [];
const loadFurniture = async () => {
	try {
		const response = await fetch('./furniture.json');
		furniture = await response.json();
		console.log(furniture);
	} catch (err) {
		console.log(err);
	}
};

loadFurniture();