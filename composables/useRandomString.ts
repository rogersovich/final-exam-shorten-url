export const generateRandomShortenString = ({
  minLength,
}: {
  minLength: number
}) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let randomString = ""

  for (let i = 0; i < minLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomString += characters.charAt(randomIndex)
  }

  return `/${randomString}`
}
