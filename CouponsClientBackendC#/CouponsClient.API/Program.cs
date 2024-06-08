using CouponsClient.BC.Constant;
using CouponsClient.BW.Interfaces.BW;
using CouponsClient.BW.Interfaces.SG;
using CouponsClient.BW.UseCases;
using CouponsClient.SG;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register a single HttpClient instance for multiple services
builder.Services.AddHttpClient("CouponsAPI", client =>
{
    client.BaseAddress = new Uri(URLCoupons_API.URL);
    client.DefaultRequestHeaders.Add("Accept", "application/json");
});

// Services that use HttpClient
builder.Services.AddTransient<IManageCouponSG, ManageCouponSG>(sp =>
{
    var httpClientFactory = sp.GetRequiredService<IHttpClientFactory>();
    return new ManageCouponSG(httpClientFactory.CreateClient("CouponsAPI"));
});

builder.Services.AddTransient<IManageCategorySG, ManageCategorySG>(sp =>
{
    var httpClientFactory = sp.GetRequiredService<IHttpClientFactory>();
    return new ManageCategorySG(httpClientFactory.CreateClient("CouponsAPI"));
});

//Dependency injection
builder.Services.AddTransient<IManageCouponBW, ManageCouponBW>();
builder.Services.AddTransient<IManageCategoryBW, ManageCategoryBW>();

//builder.Services.AddTransient<IManageUserDA, ManageUserDA>();
//builder.Services.AddTransient<IManageConcertDA, ManageConcertDA>();
//builder.Services.AddTransient<IManageZoneDA, ManageZoneDA>();

////Conexión a BD
//builder.Services.AddDbContext<Context>(options =>
//{
//    // Usar la cadena de conexión desde la configuración
//    var connectionString = builder.Configuration.GetConnectionString("ConcertTicketsDB");
//    options.UseSqlServer(connectionString);
//    // Otros ajustes del contexto de base de datos pueden ser configurados aquí, si es necesario
//});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
{
    builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
