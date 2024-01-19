export const adminQuery = (url, method, body) => {

    const token = localStorage.getItem("admin_access_token")
    return {
        url,
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body
    }
}
