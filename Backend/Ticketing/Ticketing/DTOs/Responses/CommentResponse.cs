namespace Ticketing.DTOs.Responses
{
    public class CommentResponse
    {
        public int CommentId { get; set; }

        public int TicketId { get; set; }

        public string Message { get; set; } = string.Empty;

        public DateTime CreatedDate { get; set; }
    }
}
