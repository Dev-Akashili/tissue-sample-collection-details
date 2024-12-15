using Microsoft.EntityFrameworkCore;
using TSCD.Data;
using TSCD.Data.Entities;
using TSCD.Models;

namespace TSCD.Services;

public class SampleService(ApplicationDbContext db)
{
    /// <summary>
    /// Retrieves a paginated list of samples
    /// </summary>
    /// <param name="filter">Optional search filter</param>
    /// <param name="pageNumber">Page number for pagination</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <returns>Paginated list of samples</returns>
    public async Task<PaginatedResponse<SampleModel>> List(
        string? filter,
        int pageNumber,
        int pageSize
    )
    {
        var list = db.Samples.AsNoTracking();
        
        // Filtering
        if (!string.IsNullOrWhiteSpace(filter))
        {
            filter = filter.Trim().ToLower();
            list = list.Where(x =>
                x.DonorCount.ToString().Trim().ToLower().Contains(filter) ||
                x.MaterialType.Trim().ToLower().Contains(filter)
            );
        }
        
        var totalRecords = await list.CountAsync();
        
        // Pagination
        var paginatedList = await list
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var samples = paginatedList.Select(x => new SampleModel
        {
            Id = x.Id,
            CollectionId = x.CollectionId,
            DonorCount = x.DonorCount,
            MaterialType = x.MaterialType,
            LastUpdated = x.LastUpdated
        });

        var result = new PaginatedResponse<SampleModel>
        {
            Count = totalRecords,
            List = samples
        };

        return result;
    }
    
    /// <summary>
    /// Retrieves a paginated list of samples for a specific collection
    /// </summary>
    /// <param name="collectionId">The Id of the collection to filter samples</param>
    /// <param name="filter">Optional search filter</param>
    /// <param name="pageNumber">Page number for pagination</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <returns>Paginated list of samples from the specified collection</returns>
    public async Task<PaginatedResponse<SampleModel>> ListByCollectionId(
        int collectionId,
        string? filter,
        int pageNumber,
        int pageSize
    )
    {
        var list = db.Samples
            .Where(x => x.CollectionId == collectionId)
            .AsNoTracking();
        
        // Filtering
        if (!string.IsNullOrWhiteSpace(filter))
        {
            filter = filter.Trim().ToLower();
            list = list.Where(x =>
                x.DonorCount.ToString().Trim().ToLower().Contains(filter) ||
                x.MaterialType.Trim().ToLower().Contains(filter)
            );
        }
        
        var totalRecords = await list.CountAsync();
        
        // Pagination
        var paginatedList = await list
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var samples = paginatedList.Select(x => new SampleModel
        {
            Id = x.Id,
            CollectionId = x.CollectionId,
            DonorCount = x.DonorCount,
            MaterialType = x.MaterialType,
            LastUpdated = x.LastUpdated
        });

        var result = new PaginatedResponse<SampleModel>
        {
            Count = totalRecords,
            List = samples
        };

        return result;
    }
    
    /// <summary>
    /// Get a specific sample by Id
    /// </summary>
    /// <param name="id">The Id of the sample to retrieve</param>
    /// <returns>The sample model or null if not found</returns>
    public async Task<SampleModel?> Get(int id)
    {
        var sample = await db.Samples
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);

        if (sample == null)
            return null;

        return new SampleModel
        {
            Id = sample.Id,
            CollectionId = sample.CollectionId,
            DonorCount = sample.DonorCount,
            MaterialType = sample.MaterialType,
            LastUpdated = sample.LastUpdated
        };
    }
    
    /// <summary>
    /// Create a new sample
    /// </summary>
    /// <param name="model">The sample model to create</param>
    /// <returns>The created sample model</returns>
    public async Task<SampleModel> Create(CreateOrEditSampleModel model)
    {
        // Check if collection exists
        var collectionExists = await db.Collections.AnyAsync(c => c.Id == model.CollectionId);
        if (!collectionExists)
            throw new ArgumentException($"Collection with ID {model.CollectionId} does not exist.");

        var sample = new Sample
        {
            CollectionId = model.CollectionId,
            DonorCount = model.DonorCount,
            MaterialType = model.MaterialType,
        };

        db.Samples.Add(sample);
        await db.SaveChangesAsync();

        return new SampleModel
        {
            Id = sample.Id,
            CollectionId = sample.CollectionId,
            DonorCount = sample.DonorCount,
            MaterialType = sample.MaterialType,
            LastUpdated = sample.LastUpdated
        };
    }
    
    /// <summary>
    /// Update an existing sample
    /// </summary>
    /// <param name="id">The Id of the sample to update</param>
    /// <param name="model">The updated sample model</param>
    /// <returns>The updated sample model</returns>
    public async Task<SampleModel> Edit(int id, CreateOrEditSampleModel model)
    {
        // Check if collection exists
        var collectionExists = await db.Collections.AnyAsync(c => c.Id == model.CollectionId);
        if (!collectionExists)
            throw new ArgumentException($"Collection with ID {model.CollectionId} does not exist.");

        var existingSample = await db.Samples.FindAsync(id);

        if (existingSample == null)
            throw new KeyNotFoundException($"Sample with ID {id} not found.");

        // Update sample properties
        existingSample.DonorCount = model.DonorCount;
        existingSample.MaterialType = model.MaterialType;
        existingSample.LastUpdated = DateTimeOffset.UtcNow;

        await db.SaveChangesAsync();

        return new SampleModel
        {
            Id = existingSample.Id,
            CollectionId = existingSample.CollectionId,
            DonorCount = existingSample.DonorCount,
            MaterialType = existingSample.MaterialType,
            LastUpdated = existingSample.LastUpdated
        };
    }
    
    /// <summary>
    /// Delete a sample
    /// </summary>
    /// <param name="id">The Id of the sample to be deleted</param>
    public async Task Delete(int id)
    {
        var sample = await db.Samples.FindAsync(id);
        
        if (sample == null)
            throw new KeyNotFoundException($"Sample with ID {id} not found.");

        db.Samples.Remove(sample);
        await db.SaveChangesAsync();
    }
}
