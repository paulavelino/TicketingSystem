using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ticketing.DTOs.Requests;
using Ticketing.Services.Interfaces;

namespace Ticketing.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }


        [HttpGet("ticket/{ticketId}")]
        public async Task<IActionResult> GetCommentsByTicketId(int ticketId)
        {
            var comments = await _commentService.GetCommentsByTicketIdAsync(ticketId);

            return Ok(comments);
        }

        [HttpPost]
        public async Task<IActionResult> CreateComment(CreateCommentRequest request)
        {
            var comment = await _commentService.CreateCommentAsync(request);

            return Ok(comment);
        }

    }
}
