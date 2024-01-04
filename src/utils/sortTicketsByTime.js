import timeDifferent from "./timeDifferent"

const sortTicketsByTime = (tickets) =>
   tickets.sort((a, b) => timeDifferent(a.itineraries[0].duration, b.itineraries[0].duration))

export default sortTicketsByTime
