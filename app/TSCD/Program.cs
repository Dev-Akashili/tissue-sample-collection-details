using Microsoft.EntityFrameworkCore;
using TSCD.Data;
using TSCD.Services;

var builder = WebApplication.CreateBuilder(args);

// MVC
builder.Services
    .AddControllersWithViews();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use Cors
app.UseCors("AllowSpecificOrigin");

app.MapControllers();

app.Run();
