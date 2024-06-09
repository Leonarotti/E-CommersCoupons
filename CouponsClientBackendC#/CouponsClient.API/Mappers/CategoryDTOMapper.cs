using CouponsClient.API.DTOs;
using CouponsClient.BC.Models;

namespace CouponsClient.API.Mappers
{
    public class CategoryDTOMapper
    {
        public static CategoryDTO CategoryMapToCategoryDTO(Category category)
        {
            return new CategoryDTO
            {
                categoryId = category.id_category,
                name = category.name
            };
        }

        public static IEnumerable<CategoryDTO> CategoriesMapToCategoriesDTO(IEnumerable<Category> categories)
        {
            List<CategoryDTO> categoriesDTO = new List<CategoryDTO>();
            foreach (Category category in categories)
            {
                categoriesDTO.Add(CategoryMapToCategoryDTO(category));
            }
            return categoriesDTO;
        }
    }
}
