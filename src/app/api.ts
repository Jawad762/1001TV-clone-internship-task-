import axios from "axios"

export const getMovies = async () => {
    try {
        const { data } = await axios.get('https://mangopulse.net/1001-data.json')
        return data
      } catch (error) {
        console.error(error)
      }
}