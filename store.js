import { defineStore } from "pinia"
import axios from "axios"

const basisUrl =
   "https://test.api.amadeus.com/v2/shopping/flight-offers?" +
   "originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2024-01-06&adults=1"
const token = "Bearer GgGTiF59sQ5GNfXKOmccM3Lj9XRE"

export const useStore = defineStore("tickets", {
   state: () => ({
      tickets: [],
   }),
   actions: {
      async getTickets() {
         this.tickets = await axios.get(basisUrl, { headers: { Authorization: token } }).then((result) => result.data)
      },
   },
})
