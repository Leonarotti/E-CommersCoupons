using CouponsClient.BC.Models;
using CouponsClient.DA.DataModels;
using Microsoft.EntityFrameworkCore;

namespace CouponsClient.DA.Context
{
    public class CouponsClientBDContext : DbContext
    {
        public CouponsClientBDContext(DbContextOptions<CouponsClientBDContext> options) : base(options) { }

        public DbSet<ClientDA> Clients { get; set; }
        public DbSet<SaleDA> Sales { get; set; }
        public DbSet<SaleDetailDA> SaleDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ClientDA>(entity =>
            {
                entity.HasKey(e => e.id_client);

                entity.Property(e => e.dni)
                    .IsRequired()
                    .HasMaxLength(12);

                entity.Property(e => e.name)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.Property(e => e.lastname)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.Property(e => e.birth_date)
                    .IsRequired();

                entity.Property(e => e.email)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.password)
                    .IsRequired();
            });

            modelBuilder.Entity<SaleDA>(entity =>
            {
                entity.HasKey(e => e.id_sale);

                entity.Property(e => e.id_client)
                    .IsRequired();

                entity.Property(e => e.sale_date)
                    .IsRequired();

                entity.Property(e => e.total)
                    .IsRequired()
                    .HasPrecision(10,2);

                entity.HasOne(e => e.Client)
                    .WithMany()
                    .HasForeignKey(e => e.id_client);
            });

            modelBuilder.Entity<SaleDetailDA>(entity =>
            {

                entity.HasKey(e => e.id_sale_detail);

                entity.Property(e => e.id_sale)
                    .IsRequired();

                entity.Property(e => e.id_coupon)
                    .IsRequired();

                entity.Property(e => e.regular_price)
                    .IsRequired()
                    .HasPrecision(10,2);

                entity.Property(e => e.percentage)
                    .IsRequired();

                entity.Property(e => e.quantity)
                    .IsRequired();

                entity.Property(e => e.subtotal)
                    .IsRequired()
                    .HasPrecision(10,2);

                entity.HasOne(e => e.Sale)
                    .WithMany()
                    .HasForeignKey(e => e.id_sale);
            });

        }
    }
}
