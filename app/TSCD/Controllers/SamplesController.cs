using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using TSCD.Models;
using TSCD.Services;

namespace TSCD.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SamplesController(SampleService sampleService): ControllerBase
{
    /// <summary>
    /// Retrieves a paginated list of samples
    /// </summary>
    /// <param name="filter">Optional search filter for samples</param>
    /// <param name="pageNumber">Page number for pagination</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <returns>A paginated list of samples</returns>
    [HttpGet]
    [SwaggerResponse(200, Description = "Returns the list of samples")]
    public async Task<ActionResult<PaginatedResponse<SampleModel>>> List(
        [FromQuery] string? filter,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10
    )
    {
        var list = await sampleService.List(filter, pageNumber, pageSize);
        return Ok(list);
    }
    
    /// <summary>
    /// Retrieves a paginated list of samples for a specific collection
    /// </summary>
    /// <param name="collectionId">The Id of the collection to filter samples</param>
    /// <param name="filter">Optional search filter</param>
    /// <param name="pageNumber">Page number for pagination</param>
    /// <param name="pageSize">Number of items per page</param>
    /// <returns>Paginated list of samples from the specified collection</returns>
    [HttpGet("collection/{collectionId}")]
    [SwaggerResponse(200, Description = "Returns the list of samples for a specific collection")]
    public async Task<ActionResult<PaginatedResponse<SampleModel>>> ListByCollectionId(
        int collectionId,
        [FromQuery] string? filter,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10
    )
    {
        var list = await sampleService.ListByCollectionId(collectionId, filter, pageNumber, pageSize);
        return Ok(list);
    }
    
    /// <summary>
    /// Retrieves a specific sample by Id
    /// </summary>
    /// <param name="id">The Id of the sample to retrieve</param>
    /// <returns>The sample details</returns>
    [HttpGet("{id}")]
    [SwaggerResponse(200, Description = "Returns the sample")]
    [SwaggerResponse(404, Description = "Sample not found")]
    public async Task<ActionResult<SampleModel>> Get(int id)
    {
        var sample = await sampleService.Get(id);
        
        if (sample == null)
            return NotFound();

        return Ok(sample);
    }
    
    
    /// <summary>
    /// Creates a new sample
    /// </summary>
    /// <param name="model">The sample to create</param>
    /// <returns>The created sample</returns>
    [HttpPost]
    [SwaggerResponse(201, Description = "Sample created successfully")]
    [SwaggerResponse(400, Description = "Error creating sample")]
    public async Task<ActionResult<SampleModel>> Create(CreateOrEditSampleModel model)
    {
        try
        {
            var createdSample = await sampleService.Create(model);
            return CreatedAtAction(nameof(Get), new { id = createdSample.Id }, createdSample);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    /// <summary>
    /// Updates an existing sample
    /// </summary>
    /// <param name="id">The Id of the sample to be updated</param>
    /// <param name="model">The updated sample model</param>
    /// <returns>The updated sample model</returns>
    [HttpPut("{id}")]
    [SwaggerResponse(200, Description = "Sample updated successfully")]
    [SwaggerResponse(400, Description = "Error updating sample")]
    [SwaggerResponse(404, Description = "Sample not found")]
    public async Task<ActionResult<SampleModel>> Update(int id, CreateOrEditSampleModel model)
    {
        try
        {
            var updatedSample = await sampleService.Edit(id, model);
            return Ok(updatedSample);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }
    
    /// <summary>
    /// Deletes a sample
    /// </summary>
    /// <param name="id">The Id of the sample to be deleted</param>
    /// <returns>No content if successful</returns>
    [HttpDelete("{id}")]
    [SwaggerResponse(204, Description = "Sample deleted successfully")]
    [SwaggerResponse(404, Description = "Sample not found")]
    public async Task<ActionResult> Delete(int id)
    {
        try
        {
            await sampleService.Delete(id);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
    }
}