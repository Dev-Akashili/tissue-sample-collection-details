namespace TSCD.Models;

public class SampleModel
{
    public int Id { get; set; }
    public int CollectionId { get; set; }
    public int DonorCount { get; set; }
    public required string MaterialType { get; set; }
    public DateTimeOffset LastUpdated { get; set; }
};