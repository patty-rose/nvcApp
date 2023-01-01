namespace VenterApi.Models
{
    public class Conflict
    {
        public int ConflictId { get; set; }
        public string Title { get; set; }
        public string ConflictDate { get; set; }
        public string Description { get; set; }

        public string Feeling { get; set; }

        public string Need { get; set; }

        public string NeedsStatement { get; set; }

        public string ApologyStatement { get; set; }
        public string UserId { get; set; }
    }
}