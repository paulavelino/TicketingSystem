using System.ComponentModel.DataAnnotations;

namespace Ticketing.DTOs.Requests
{
    public class UpdateTicketRequest
    {
        [Required]
        public string? AssignedTo { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
