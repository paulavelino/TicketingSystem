using System.ComponentModel.DataAnnotations;

namespace Ticketing.DTOs.Requests
{
    public class CreateCommentRequest
    {
        [Required]
        public int TicketId { get; set; }

        [Required]
        [StringLength(1000)]
        public string Message { get; set; } = string.Empty;
    }
}
