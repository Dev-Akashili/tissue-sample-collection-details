namespace TSCD.Models;

public class CreateOrEditSampleModel
{
    public int CollectionId { get; set; }
    public int DonorCount { get; set; }
    public required string MaterialType { get; set; }
}