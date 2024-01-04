import { defineStore } from "pinia"
import axios from "axios"

const basisUrl = (out_city, in_city, date) =>
   `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${out_city}&` +
   `destinationLocationCode=${in_city}&departureDate=${date}&adults=1`
const token = "Bearer Lvebd5dYAaFWLrpUsIQ01tulNPxs"

export const useStore = defineStore("tickets", {
   state: () => ({
      tickets: [],
   }),
   getters: {
      tickets_light() {
         return (sorting, filter) => {
            let full_info = JSON.parse(JSON.stringify(this.tickets))
            const tickets = []

            if (!!sorting) full_info = sorting(full_info)
            if (!!filter) full_info = filter(full_info)

            for (let ticket of full_info) {
               tickets.push({
                  company: ticket.itineraries[0].segments[0].operating.carrierCode,
                  start: ticket.itineraries[0].segments[0].departure.at.replace("T", " "),
                  end: ticket.itineraries[0].segments[ticket.itineraries[0].segments.length - 1].arrival.at.replace(
                     "T",
                     " "
                  ),
                  duration: ticket.itineraries[0].duration.replace(/PT/g, ""),
                  price: ticket.price.total,
                  currency: ticket.price.currency,
                  transplants: ticket.itineraries[0].segments.length,
               })
            }
            return tickets
         }
      },
   },
   actions: {
      async getTickets({ out_city, in_city, date }) {
         console.log(out_city, in_city, date)
         this.tickets = []
         this.tickets = await axios
            .get(basisUrl(out_city, in_city, date), { headers: { Authorization: token } })
            .then((result) => result.data.data)
         console.log(JSON.stringify(this.tickets[0], null, 3))
      },
   },
})
