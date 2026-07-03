using Ticketing.DTOs.Requests;
using Ticketing.DTOs.Responses;

namespace Ticketing.Services.Interfaces
{
    public interface ICommentService
    {
        Task<List<CommentResponse>> GetCommentsByTicketIdAsync(int ticketId);
        Task<CommentResponse> CreateCommentAsync(CreateCommentRequest request);

    }
}
