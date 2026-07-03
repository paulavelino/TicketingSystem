using Ticketing.DTOs.Requests;
using Ticketing.DTOs.Responses;

namespace Ticketing.Services.Interfaces
{
    public interface ITicketService
    {
        Task<List<TicketResponse>> GetAllTicketsAsync();
        Task<TicketResponse?> GetTicketByIdAsync(int id);
        Task<TicketResponse> CreateTicketAsync(CreateTicketRequest request);
        Task<bool> UpdateTicketAsync(int id, UpdateTicketRequest request);

    }
}
