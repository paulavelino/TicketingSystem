using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ticketing.DTOs.Requests;
using Ticketing.Services.Interfaces;

namespace Ticketing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService _ticketService;

        public TicketController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTickets()
        {
            var tickets = await _ticketService.GetAllTicketsAsync();

            return Ok(tickets);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTicketById(int id)
        {
            var ticket = await _ticketService.GetTicketByIdAsync(id);

            if (ticket == null)
            {
                return NotFound();
            }

            return Ok(ticket);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTicket(CreateTicketRequest request)
        {
            var ticket = await _ticketService.CreateTicketAsync(request);

            return CreatedAtAction(
                nameof(GetTicketById),
                new { id = ticket.TicketId },
                ticket);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTicket(int id, UpdateTicketRequest request)
        {
            var updated = await _ticketService.UpdateTicketAsync(id, request);

            if (!updated)
            {
                return NotFound();
            }

            return NoContent();
        }

    }
}
