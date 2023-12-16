const { app } = require('@azure/functions');

app.http('most_wanted_list', {
	methods: ['GET'],
	authLevel: 'anonymous',
	handler: async (request, context) => {
		context.log(`Requesting data from api`);

		try {

			const url = new URL(process.env.URL_MOST_WANTED_LIST);

			const response = await fetch(url, {
				method: "GET",
				headers: {
					'Accept': 'application/json'
				},
			});

			if (response.ok) {

				console.log(`data receieved okay v2`);

				const data = await response.json();

				console.dir(data.data);

				return {
					body: data.data
				};
			} else {
				console.error(response.status);
				console.error(response.message);

				return {
					status: response.status,
					body: "Call failed",
				};
			}
		} catch (error) {

			console.error(error);

			return {
				status: 501,
				body: error,
			};
		}
	}
});
