stripePayment: {
	type: GraphQLBoolean,
	args: {
		token: { type: GraphQLString },
		amount: { type: GraphQLInt }
	},
	resolve: (parent, args) => {
	
	console.log("CONSOLE LOG")
	stripe.charges
		.create({
			source: args.token,
			amount: args.amount,
			currency: "PHP"
		})
		.then(res => {
			console.log("RES", res)
			return true
		})
		.catch(err => {
			console.log("ERR", err)
			return false
		})
	}
},

const STRIPE_PAYMENT = gql`
	mutation(
		$token: String,
		$amount: Int
	){
		stripePayment(
			token: $token
			amount: $amount
		)
	}
`