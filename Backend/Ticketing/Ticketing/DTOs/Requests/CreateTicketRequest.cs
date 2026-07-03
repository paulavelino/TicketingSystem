using System.ComponentModel.DataAnnotations;

namespace Ticketing.DTOs.Requests
{
    public class CreateTicketRequest
    {
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(100, ErrorMessage = "Title cannot exceed 100 characters.")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Description is required.")]
        [StringLength(1000, ErrorMessage = "Description cannot exceed 1000 characters.")]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "Requester name is required.")]
        [StringLength(100, ErrorMessage = "Requester name cannot exceed 100 characters.")]
        public string RequesterName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Please select a category.")]
        public string Category { get; set; } = string.Empty;

        [Required(ErrorMessage = "Please select a priority.")]
        public string Priority { get; set; } = string.Empty;
    }
}
