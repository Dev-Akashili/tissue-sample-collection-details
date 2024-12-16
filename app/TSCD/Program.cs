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

app.MapControllers();

app.Run();
