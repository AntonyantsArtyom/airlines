//curl "https://test.api.amadeus.com/v1/security/oauth2/token" \ -H "Content-Type: application/x-www-form-urlencoded" \ -d "grant_type=client_credentials&client_id=sTAkmqrvylnjHOzmmeA1Fk8aAkH8P9Vu&client_secret=vFVwJaVTxfJ7uLpU"
//выше консольная команда обновления токена - из ответа взять поле access_token и вставить после Bearer
const token = "Bearer ztxoJovVYeWTRgHMcwrrfudI8tHR"

import { defineStore } from "pinia"
import axios from "axios"

const basisUrl = (out_city_iata, in_city_iata, date) =>
   `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${out_city_iata}&` +
   `destinationLocationCode=${in_city_iata}&departureDate=${date}&adults=1`
const basisIataUrl = (out_city, in_city) =>
   `https://www.travelpayouts.com/widgets_suggest_params?q=из ${out_city} в ${in_city}`

export const useStore = defineStore("tickets", {
   state: () => ({
      tickets: [],
   }),
   getters: {
      tickets_light() {
         return (sorting, filter) => {
            console.log(filter)
            let full_info = JSON.parse(JSON.stringify(this.tickets))
            const tickets = []

            full_info = full_info.filter((a) => a.itineraries[0].segments.length - 1 <= filter)
            if (!!sorting) full_info = sorting(full_info)

            for (let ticket of full_info) {
               tickets.push({
                  id: ticket?.id,
                  company: ticket?.itineraries[0]?.segments[0]?.operating?.carrierCode,
                  start: ticket?.itineraries[0]?.segments[0]?.departure?.at?.replace("T", " "),
                  end: ticket?.itineraries[0]?.segments[
                     ticket?.itineraries[0]?.segments?.length - 1
                  ]?.arrival?.at?.replace("T", " "),
                  duration: ticket?.itineraries[0]?.duration?.replace(/PT/g, ""),
                  price: ticket?.price?.total,
                  currency: ticket?.price?.currency,
                  transplants: ticket?.itineraries[0]?.segments?.length - 1,
               })
            }
            return tickets
         }
      },
   },
   actions: {
      async getTickets({ out_city, in_city, date }) {
         const citiesIata = await axios.get(basisIataUrl(out_city, in_city)).then((data) => data.data)
         console.log(basisUrl(citiesIata.origin.iata, citiesIata.destination.iata, date))
         this.tickets = []
         this.tickets = await axios
            .get(basisUrl(citiesIata.origin.iata, citiesIata.destination.iata, date), {
               headers: { Authorization: token },
            })
            .then((result) => result.data.data)

         console.log(JSON.stringify(this.tickets[0], null, 3))
      },
      getTicketInfo(id) {
         const ticket = this.tickets.find((ticket) => ticket.id == id)

         return {
            id: ticket?.id,
            company: ticket?.itineraries[0]?.segments[0]?.operating?.carrierCode,
            start: ticket?.itineraries[0]?.segments[0]?.departure?.at?.replace("T", " "),
            end: ticket?.itineraries[0]?.segments[ticket?.itineraries[0]?.segments?.length - 1]?.arrival?.at?.replace(
               "T",
               " "
            ),
            duration: ticket?.itineraries[0]?.duration?.replace(/PT/g, ""),
            price: ticket?.price?.total,
            currency: ticket?.price?.currency,
            transplants: ticket?.itineraries[0]?.segments?.length - 1,
            seats: ticket?.numberOfBookableSeats,
            fare: ticket?.pricingOptions?.fareType[0],
            source: ticket?.source,
            steps: ticket?.itineraries[0]?.segments?.map(
               (step) => step?.departure?.at?.replace("T", " ") + "\n" + step?.arrival?.at?.replace("T", " ")
            ),
         }
      },
   },
})
