import { defineStore } from "pinia"
import axios from "axios"

const basisUrl = (out_city, in_city, date) =>
   `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${out_city}&` +
   `destinationLocationCode=${in_city}&departureDate=${date}&adults=1`
const token = "Bearer 5a9mdJnmepFxBQ0GnrNAaAXICAy7"

export const useStore = defineStore("tickets", {
   state: () => ({
      tickets: [],
   }),
   actions: {
      async getTickets(out_city, in_city, date) {
         this.tickets = await axios
            .get(basisUrl(out_city, in_city, date), { headers: { Authorization: token } })
            .then((result) => result.data.data)
      },
   },
})
