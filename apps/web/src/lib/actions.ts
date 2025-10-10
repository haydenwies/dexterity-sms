type ActionSuccess<T = void> = { success: true; data: T }
type ActionError = { success: false; error: string }

type ActionResult<T = void> = ActionSuccess<T> | ActionError

function actionSuccess(): ActionSuccess<void>
function actionSuccess<T>(data: T): ActionSuccess<T>
function actionSuccess<T>(data?: T): ActionSuccess<T> | ActionSuccess<void> {
	return { success: true, data: data as T }
}

function actionError(): ActionError
function actionError(error: string): ActionError
function actionError(error?: string): ActionError {
	return { success: false, error: error || "An unknown error occurred" }
}

export { actionError, actionSuccess, type ActionError, type ActionResult, type ActionSuccess }
