namespace TSCD.Data.Entities;

public class Sample
{
    /// <summary>
    /// Sample Id.
    /// </summary>
    public int Id { get; set; }
    
    /// <summary>
    /// Id of the collection to which this sample belongs
    /// </summary>
    public int CollectionId { get; set; }
    
    /// <summary>
    /// Total number of donors contributing to this sample.
    /// </summary>
    public int DonorCount { get; set; }
    
    /// <summary>
    /// Type of biological material contained in the sample.
    /// </summary>
    public required string MaterialType { get; set; }
    
    /// <summary>
    /// Date of the sample's most recent update.
    /// </summary>
    public DateTimeOffset LastUpdated { get; set; } = DateTimeOffset.UtcNow;
}