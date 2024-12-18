using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using TSCD.Data;
using TSCD.Services;

var builder = WebApplication.CreateBuilder(args);

// MVC
builder.Services
    .AddControllersWithViews();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo() 
    { 
        Title = "Tissue Sample Collection Details", 
        Version = "v1",
        Description = "API documentation for your tissue sample collection details (TSCD)"
    });

    // Enable XML documentation
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFilename);
    
    // Add XML comments
    if (File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }
});

// Configure the EF Core context
builder.Services
    .AddDbContext<ApplicationDbContext>(options =>
    {
        var connectionString = builder.Configuration.GetConnectionString("Default");
        if (string.IsNullOrWhiteSpace(connectionString))
            options.UseNpgsql();
        else
            options.UseNpgsql(connectionString,
                o => o.EnableRetryOnFailure());
    });

// Configure Cors
builder.Services.AddCors(options =>
{
    var frontendAppUrl = builder.Configuration["FrontendAppUrl"];
    
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins(frontendAppUrl)
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials(); 
        }); 
});

// Register services
builder.Services
    .AddTransient<CollectionService>()
    .AddTransient<SampleService>();

var app = builder.Build();

// Seed data
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider
        .GetRequiredService<ApplicationDbContext>();
    
    var seeder = new DataSeeder(db);

    await seeder.SeedCollection();
    await seeder.SeedSamples();
}

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "TSCD API V1");
    c.RoutePrefix = "docs";
});

app.UseHttpsRedirection();

// Use Cors
app.UseCors("AllowSpecificOrigin");

app.MapControllers();

app.Run();
