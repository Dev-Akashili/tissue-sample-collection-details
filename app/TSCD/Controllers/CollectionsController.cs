using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using TSCD.Models;
using TSCD.Services;

namespace TSCD.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CollectionsController(CollectionService collectionService) : ControllerBase
{
    /// <summary>
    /// Retrieves a paginated list of collections
    /// </summary>
    /// <param name="filter">Optional search filter for collections</param>
    /// <param name="pageNumber">Page number for pagination</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <returns>A paginated list of collections</returns>
    [HttpGet]
    [SwaggerResponse(200, Description = "Returns the collections")]
    [SwaggerResponse(400, Description = "Error retrieving collections")]
    public async Task<ActionResult<PaginatedResponse<CollectionModel>>> List(
        [FromQuery] string? filter,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10
    )
    {
        var list = await collectionService.List(filter, pageNumber, pageSize);
        return Ok(list);
    }
    
    /// <summary>
    /// Retrieves a specific collection by Id
    /// </summary>
    /// <param name="id">The Id of the collection to be retrieved</param>
    /// <returns>The collection details</returns>
    [HttpGet("{id}")]
    [SwaggerResponse(200, Description = "Returns the collection")]
    [SwaggerResponse(404, Description = "Collection not found")]
    public async Task<ActionResult<CollectionModel>> Get(int id)
    {
        var collection = await collectionService.Get(id);
        
        if (collection == null)
            return NotFound();

        return Ok(collection);
    }
    
    /// <summary>
    /// Creates a new collection
    /// </summary>
    /// <param name="model">The collection details to create</param>
    /// <returns>The created collection</returns>
    [HttpPost]
    [SwaggerResponse(201, Description = "Collection created successfully")]
    [SwaggerResponse(400, Description = "Error creating collection")]
    public async Task<ActionResult<CollectionModel>> Create(CreateOrEditCollectionModel model)
    {
        try
        {
            var createdCollection = await collectionService.Create(model);
            return CreatedAtAction(nameof(Get), new { id = createdCollection.Id }, createdCollection);
        }
        catch (ArgumentException e)
        {
            return BadRequest(e.Message);
        }
    }
    
    /// <summary>
    /// Updates an existing collection
    /// </summary>
    /// <param name="id">The Id of the collection to be updated</param>
    /// <param name="model">The updated collection model</param>
    /// <returns>The updated collection</returns>
    [HttpPut("{id}")]
    [SwaggerResponse(200, Description = "Collection updated successfully")]
    [SwaggerResponse(400, Description = "Error updating collection")]
    [SwaggerResponse(404, Description = "Collection not found")]
    public async Task<ActionResult<CollectionModel>> Update(int id, CreateOrEditCollectionModel model)
    {
        try
        {
            var updatedCollection = await collectionService.Edit(id, model);
            return Ok(updatedCollection);
        }
        catch (ArgumentException e)
        {
            return BadRequest(e.Message);
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
    }
    
    /// <summary>
    /// Deletes a collection
    /// </summary>
    /// <param name="id">The Id of the collection to be deleted</param>
    /// <returns>No content if successful</returns>
    [HttpDelete("{id}")]
    [SwaggerResponse(204, Description = "Collection deleted successfully")]
    [SwaggerResponse(404, Description = "Collection not found")]
    public async Task<ActionResult> Delete(int id)
    {
        try
        {
            await collectionService.Delete(id);
            return NoContent();
        }
        catch (KeyNotFoundException e)
        {
            return NotFound(e.Message);
        }
    }
}