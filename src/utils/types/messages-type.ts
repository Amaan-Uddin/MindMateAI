export type Message = {
	id: number
	content: string
	created_at?: string
	role: string
	thread_id?: number
	user_id?: string
}
