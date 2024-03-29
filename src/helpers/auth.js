export const makeHeaders = () => {
  const headers = new Headers()
  headers.set("content-type", "application/json")
  const token = sessionStorage.getItem("token")
  if (token) {
    headers.set("Authorization", "Bearer " + token)
  }
  return headers
}

export const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token")

  if (!token) {
    console.log("no token")
  }

  return (
    children
  )
}
