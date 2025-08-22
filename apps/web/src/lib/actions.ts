type ActionSuccess<T> = {
	success: true
	data: T
}

type ActionError = {
	success: false
	message: string
	code: string
}

type ActionResponse<T> = ActionSuccess<T> | ActionError

const actionSuccess = <T>(data: T): ActionSuccess<T> => ({
	success: true,
	data
})

const actionError = (message: string, code: string): ActionError => ({
	success: false,
	message,
	code
})

export { actionError, actionSuccess, type ActionError, type ActionResponse, type ActionSuccess }
