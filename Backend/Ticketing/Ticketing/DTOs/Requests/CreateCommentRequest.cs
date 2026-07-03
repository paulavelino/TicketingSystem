namespace Ticketing.DTOs.Requests
{
    public class CreateCommentRequest
    {
        public int TicketId { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}
