using Microsoft.EntityFrameworkCore;
using Ticketing.Data;
using Ticketing.DTOs.Requests;
using Ticketing.DTOs.Responses;
using Ticketing.Models;
using Ticketing.Services.Interfaces;

namespace Ticketing.Services
{
    public class TicketService : ITicketService
    {
        private readonly AppDbContext _context;

        public TicketService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TicketResponse>> GetAllTicketsAsync()
        {
            var tickets = await _context.Tickets.Select(t => new TicketResponse
                {
                    TicketId = t.TicketId,
                    Title = t.Title,
                    Description = t.Description,
                    RequesterName = t.RequesterName,
                    Category = t.Category,
                    Priority = t.Priority,
                    AssignedTo = t.AssignedTo,
                    Status = t.Status,
                    CreatedDate = t.CreatedDate,
                    UpdatedDate = t.UpdatedDate
                })
                .ToListAsync();

            return tickets;
        }

        public async Task<TicketResponse?> GetTicketByIdAsync(int id)
        {
            var ticket = await _context.Tickets
            .Where(t => t.TicketId == id)
            .Select(t => new TicketResponse
            {
                TicketId = t.TicketId,
                Title = t.Title,
                Description = t.Description,
                RequesterName = t.RequesterName,
                Category = t.Category,
                Priority = t.Priority,
                AssignedTo = t.AssignedTo,
                Status = t.Status,
                CreatedDate = t.CreatedDate,
                UpdatedDate = t.UpdatedDate
            })
            .FirstOrDefaultAsync();

            return ticket;
        }

        public async Task<TicketResponse> CreateTicketAsync(CreateTicketRequest request)
        {
            var ticket = new Ticket
            {
                Title = request.Title,
                Description = request.Description,
                RequesterName = request.RequesterName,
                Category = request.Category,
                Priority = request.Priority,
                Status = "Open",
                CreatedDate = DateTime.Now
            };

            _context.Tickets.Add(ticket);

            await _context.SaveChangesAsync();

            return new TicketResponse
            {
                TicketId = ticket.TicketId,
                Title = ticket.Title,
                Description = ticket.Description,
                RequesterName = ticket.RequesterName,
                Category = ticket.Category,
                Priority = ticket.Priority,
                AssignedTo = ticket.AssignedTo,
                Status = ticket.Status,
                CreatedDate = ticket.CreatedDate,
                UpdatedDate = ticket.UpdatedDate
            };
        }

        public async Task<bool> UpdateTicketAsync(int id, UpdateTicketRequest request)
        {
            var ticket = await _context.Tickets.FindAsync(id);

            if (ticket == null)
            {
                return false;
            }

            ticket.Title = request.Title;
            ticket.Description = request.Description;
            ticket.RequesterName = request.RequesterName;
            ticket.Category = request.Category;
            ticket.Priority = request.Priority;
            ticket.AssignedTo = request.AssignedTo;
            ticket.Status = request.Status;
            ticket.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> AssignTicketAsync(int id, AssignTicketRequest request)
        {
            var ticket = await _context.Tickets.FindAsync(id);

            if (ticket == null)
            {
                return false;
            }

            ticket.AssignedTo = request.AssignedTo;
            ticket.UpdatedDate = DateTime.Now;

            await _context.SaveChangesAsync();

            return true;
        }

       
    }
}
