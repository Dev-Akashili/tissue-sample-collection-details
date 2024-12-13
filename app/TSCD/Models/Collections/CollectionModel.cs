using TSCD.Data.Entities;

namespace TSCD.Models;

public class CollectionModel
{   
    public int Id { get; set; }
    public required string DiseaseTerm { get; set; }
    public required string Title { get; set; }
    public IEnumerable<SampleModel> Samples { get; set; } = new List<SampleModel>();
}