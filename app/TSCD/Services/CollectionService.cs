using Microsoft.EntityFrameworkCore;
using TSCD.Data;
using TSCD.Data.Entities;
using TSCD.Models;

namespace TSCD.Services;

public class CollectionService(ApplicationDbContext db)
{
    /// <summary>
    /// Retrieves a paginated list of collections
    /// </summary>
    /// <param name="filter">Optional search filter</param>
    /// <param name="pageNumber">Page number for pagination</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <returns>Paginated list of collections</returns>
    public async Task<PaginatedResponse<CollectionModel>> List(
        string? filter,
        int pageNumber,
        int pageSize
    )
    {
        var list = db.Collections.AsNoTracking();
        
        // Filtering
        if (!string.IsNullOrWhiteSpace(filter))
        {
            filter = filter.Trim().ToLower();
            list = list.Where(x =>
                x.DiseaseTerm.Trim().ToLower().Contains(filter) ||
                x.Title.Trim().ToLower().Contains(filter)
            );
        }
        
        var totalRecords = await list.CountAsync();
        
        // Pagination
        var paginatedList = await list
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        var collections = paginatedList.Select(x => new CollectionModel
        {
            Id = x.Id,
            DiseaseTerm = x.DiseaseTerm,
            Title = x.Title
        });

        var result = new PaginatedResponse<CollectionModel>
        {
            Count = totalRecords,
            List = collections
        };

        return result;
    }
    
    /// <summary>
    /// Get a collection by Id
    /// </summary>
    /// <param name="id">The Id of the collection to be retrieved</param>
    /// <returns>The collection model or null if not found</returns>
    public async Task<CollectionModel?> Get(int id)
    {
        var collection = await db.Collections
            .Include(x => x.Samples)
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);

        if (collection == null)
            return null;

        return new CollectionModel
        {
            Id = collection.Id,
            DiseaseTerm = collection.DiseaseTerm,
            Title = collection.Title,
            Samples = collection.Samples.Select(s => new SampleModel
            {
                Id = s.Id,
                CollectionId = s.CollectionId,
                DonorCount = s.DonorCount,
                MaterialType = s.MaterialType,
                LastUpdated = s.LastUpdated
            }).ToList()
        };
    }
    
    /// <summary>
    /// Create a new collection
    /// </summary>
    /// <param name="model">The collection model to create</param>
    /// <returns>The created collection model</returns>
    public async Task<CollectionModel> Create(CreateOrEditCollectionModel model)
    { 
        var collection = new Collection
        {
            DiseaseTerm = model.DiseaseTerm,
            Title = model.Title
        };

        db.Collections.Add(collection);
        await db.SaveChangesAsync();

        // Return the created model with the new Id
        return new CollectionModel
        {
            Id = collection.Id,
            DiseaseTerm = collection.DiseaseTerm,
            Title = collection.Title
        };
    }
    
    /// <summary>
    /// Update an existing collection
    /// </summary>
    /// <param name="id">The Id of the collection to update</param>
    /// <param name="model">The update collection model</param>
    /// <returns>The updated collection model</returns>
    public async Task<CollectionModel> Edit(int id, CreateOrEditCollectionModel model)
    { 
        var collection = await db.Collections
            .Include(x => x.Samples)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (collection == null)
            throw new KeyNotFoundException($"Collection with Id {id} not found.");
        
        collection.DiseaseTerm = model.DiseaseTerm;
        collection.Title = model.Title;

        await db.SaveChangesAsync();

        return new CollectionModel
        {
            Id = collection.Id,
            DiseaseTerm = collection.DiseaseTerm,
            Title = collection.Title,
            Samples = collection.Samples.Select(s => new SampleModel
            {
                Id = s.Id,
                CollectionId = s.CollectionId,
                DonorCount = s.DonorCount,
                MaterialType = s.MaterialType,
                LastUpdated = s.LastUpdated
            }).ToList()
        };
    }
    
    /// <summary>
    /// Delete a collection
    /// </summary>
    /// <param name="id">The Id of the collection to delete</param>
    public async Task Delete(int id)
    {
        var collection = await db.Collections.FindAsync(id);
        
        if (collection == null)
            throw new KeyNotFoundException($"Collection with Id {id} not found.");

        db.Collections.Remove(collection);
        await db.SaveChangesAsync();
    }
}