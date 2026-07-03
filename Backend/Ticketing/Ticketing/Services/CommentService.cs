using Microsoft.EntityFrameworkCore;
using Ticketing.Data;
using Ticketing.DTOs.Requests;
using Ticketing.DTOs.Responses;
using Ticketing.Models;
using Ticketing.Services.Interfaces;

namespace Ticketing.Services
{
    public class CommentService : ICommentService
    {
        private readonly AppDbContext _context;
        public CommentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<CommentResponse>> GetCommentsByTicketIdAsync(int ticketId)
        {
            return await _context.Comments
                .Where(c => c.TicketId == ticketId)
                .OrderBy(c => c.CreatedDate)
                .Select(c => new CommentResponse
                {
                    CommentId = c.CommentId,
                    TicketId = c.TicketId,
                    Message = c.Message,
                    CreatedDate = c.CreatedDate
                })
                .ToListAsync();
        }

        public async Task<CommentResponse> CreateCommentAsync(CreateCommentRequest request)
        {
            var comment = new Comment
            {
                TicketId = request.TicketId,
                Message = request.Message
            };

            _context.Comments.Add(comment);

            await _context.SaveChangesAsync();

            return new CommentResponse
            {
                CommentId = comment.CommentId,
                TicketId = comment.TicketId,
                Message = comment.Message,
                CreatedDate = comment.CreatedDate
            };
        }

    }
}
