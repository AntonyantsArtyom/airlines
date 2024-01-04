import { defineStore } from "pinia"
import axios from "axios"
import timeDifferent from "./src/utils/timeDifferent"

const basisUrl = (out_city, in_city, date) =>
   `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${out_city}&` +
   `destinationLocationCode=${in_city}&departureDate=${date}&adults=1`
const token = "Bearer IFfsigms1tFPFP1HoGG7RKycvCdk"

export const useStore = defineStore("tickets", {
   state: () => ({
      tickets: [],
   }),
   getters: {
      tickets_light() {
         const tickets = []
         for (let ticket of this.tickets) {
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
      async sortTickets(type) {
         timeDifferent
         if (type == "price") this.tickets = this.tickets.sort((a, b) => a.price.total - b.price.total)
         if (type == "time")
            this.tickets = this.tickets.sort((a, b) =>
               timeDifferent(a.itineraries[0].duration, b.itineraries[0].duration)
            )
      },
   },
})
