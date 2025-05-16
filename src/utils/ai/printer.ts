export const printUpdate = (update: Record<string, any>) => {
	console.log(Object.keys(update))
	Object.keys(update).forEach((key) => {
		const value = update[key]

		if ('messages' in value && Array.isArray(value.messages)) {
			value.messages.forEach((msg: any) => {
				console.log(
					`\n================================ ${msg._getType()} Message =================================`
				)
				console.log(msg.content)
			})
		}
		if ('summary' in value && value.summary) {
			console.log(value.summary)
		}
	})
}
