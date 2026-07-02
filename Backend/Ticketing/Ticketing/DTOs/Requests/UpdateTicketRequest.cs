namespace Ticketing.DTOs.Requests
{
    public class UpdateTicketRequest
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string RequesterName { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
        public string? AssignedTo { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
