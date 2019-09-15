const fetch = require('node-fetch');

const getNikeData = async () => {
	const buildNikeURL = anchor => {
		return `https://www.nike.com/product_feed/rollup_threads/v2?filter=marketplace%28US%29&filter=language%28en%29&filter=employeePrice%28true%29&filter=attributeIds%280f64ecc7-d624-4e91-b171-b83a03dd8550%2C16633190-45e5-4830-a068-232ac7aea82c%2C5b21a62a-0503-400c-8336-3ccfbff2a684%29&anchor=${anchor}&count=24&consumerChannelId=d9a5bc42-4b9c-4976-858a-f159cf99c647&sort=productInfo.merchPrice.currentPriceDesc`;
	};

	const getJSON = async url => {
		let res = await fetch(url);
		let data = await res.json();
		return data;
	};

	const getItemsAndTotalPages = async url => {
		let data = await getJSON(url);
		let shoes = data.objects;

		shoes.map(shoe => {
			let fullPrice = shoe.productInfo[0].merchPrice.fullPrice;
			let currentPrice = shoe.productInfo[0].merchPrice.currentPrice;
			let totalDiscount = fullPrice - currentPrice;
			let id = shoe.id;
			let title = shoe.publishedContent.properties.title;
			let subtitle = shoe.publishedContent.properties.subtitle;
			let slug = shoe.publishedContent.properties.seo.slug;
			let styleColor = shoe.publishedContent.properties.products[0].styleColor;
			let link = `https://www.nike.com/t/${slug}/${styleColor}`;
			let img = shoe.productInfo[0].imageUrls.productImageUrl;

			let newShoe = {
				fullPrice,
				currentPrice,
				totalDiscount,
				id,
				title,
				subtitle,
				link,
				img
			};

			shoeArray.push(newShoe);
		});

		totalPages = data.pages.totalPages;
		return;
    };
    
	const initialPageURL = buildNikeURL(0);
	let shoeArray = [],
        totalPages;
        
	await getItemsAndTotalPages(initialPageURL);

	let promises = [];
	for (let i = 1; i < totalPages; i++) {
		let url = buildNikeURL(i * 24);
		promises.push(getItemsAndTotalPages(url));
	}

	await Promise.all(promises);

	return shoeArray.sort((e1, e2) => e2.totalDiscount - e1.totalDiscount);
};

module.exports = getNikeData;
