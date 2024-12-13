namespace TSCD.Data.Entities;

public class Collection
{
    /// <summary>
    /// Collection Id.
    /// </summary>
    public int Id { get; set; }
    
    /// <summary>
    /// Medical condition or disease associated with this collection of samples.
    /// </summary>
    public required string DiseaseTerm { get; set; }
    
    /// <summary>
    /// Descriptive title of the sample collection..
    /// </summary>
    public required string Title { get; set; }
    
    /// <summary>
    /// Collection of samples associated with this collection.
    /// </summary>
    public ICollection<Sample> Samples { get; set; } = new List<Sample>();
}