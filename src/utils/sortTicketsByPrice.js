const sortTicketsByPrice = (tickets) => tickets.sort((a, b) => a.price.total - b.price.total)

export default sortTicketsByPrice
