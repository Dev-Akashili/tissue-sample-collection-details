using Microsoft.EntityFrameworkCore;
using TSCD.Data.Entities;

namespace TSCD.Data;

public class DataSeeder(ApplicationDbContext db)
{
    public async Task SeedCollection()
    {
        if (!await db.Collections.AsNoTracking().AnyAsync())
        {
            var collections = new List<Collection>()
            {
                new Collection()
                {
                    DiseaseTerm = "Cirrhosis of liver",
                    Title = "Mothers Pregnancy Samples"
                },
                new Collection()
                {
                    DiseaseTerm = "Malignant tumour of breast",
                    Title = "Phase II multicentre study"
                },
                new Collection()
                {
                    DiseaseTerm = "Fit and well",
                    Title = "Lymphoblastoid cell lines"
                },
                new Collection()
                {
                    DiseaseTerm = "Chronic fatigue syndrome",
                    Title = "Samples available include ME/CFS Cases"
                },
                new Collection()
                {
                    DiseaseTerm = "Malignant tumour of breast",
                    Title = "A randomised placebo-controlled trial"
                },
            };

            foreach (var collection in collections)
            {
                db.Collections.Add(collection);
            }

            await db.SaveChangesAsync();
        }
    }

    public async Task SeedSamples()
    {
        if (!await db.Samples.AsNoTracking().AnyAsync())
        {
            var samples = new List<Sample>()
            {
                new Sample()
                {
                    CollectionId = 4,
                    DonorCount = 90210,
                    MaterialType = "Cerebrospinal fluid"
                },
                new Sample()
                {
                    CollectionId = 2,
                    DonorCount = 512,
                    MaterialType = "Cerebrospinal fluid"
                },
                new Sample()
                {
                    CollectionId = 2,
                    DonorCount = 7777,
                    MaterialType = "Core biopsy"
                }
            };

            foreach (var sample in samples)
            {
                db.Samples.Add(sample);
            }

            await db.SaveChangesAsync();
        }
    }
}