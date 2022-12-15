export const getUserFromSessionId = (sessionId) => (dispatch) => {
    dispatch({
        type: 'GET USER INFO FROM SESSION ID',
        payload: sessionId
    })
}