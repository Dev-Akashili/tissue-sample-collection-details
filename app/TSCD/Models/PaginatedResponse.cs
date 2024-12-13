namespace TSCD.Models;

public record PaginatedResponse<T>
{
    public int Count { get; set; }
    public IEnumerable<T>? List { get; set; }
}