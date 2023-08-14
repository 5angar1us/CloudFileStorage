namespace CloudFileStorage.DTOs
{
    public class FileDto
    {
        public ulong Size { get; set; }

        public DateTime? DateTime { get; set; }

        public required string Path { get;  set; }
        public bool IsDir { get; set; }
    }
}
