import { ticketManager } from "../../public/dao/ticketManager.js"


class TicketsService {
    
  async crearTicket(ticket) {
    const creado = await ticketManager.createTicket(ticket)
    return creado
  }

  async buscarTickets(){
    const tickets = await ticketManager.getTickets()
    return tickets
    
  }
  async buscarTicketPorId(id){
    const ticket = await ticketManager.getTicketById(id)
    return ticket
    
  }
  async buscarTicketPorEmail(userName){
    const ticket = await ticketManager.getTicketByUserName(userName) 
    return ticket
    
  }

  async eliminarTicket(id){
    const ticket = await ticketManager.deleteTicket(id) 
    return "ticket eliminado"
    
  }
  async modificarTicket(id,ticketModificado){
    const ticketNuevo = await ticketManager.updateTicket(id,ticketModificado)
    return ticketNuevo
        
  }
}
export const ticketsService = new TicketsService()