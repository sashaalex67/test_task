using Newtonsoft.Json;
using SvgRectangleResize.Models;

namespace SvgRectangleResize.Services
{
    public class SvgService : ISvgService
    {
        public async Task<SvgRectangleDimensions> GetDimensions()
        {
            var jsonText = await File.ReadAllTextAsync("dimensions.json");
            var dimensions = JsonConvert.DeserializeObject<SvgRectangleDimensions>(jsonText);
            return dimensions;
        }

        public async Task<SvgRectangleDimensions> UpdateDimensions(SvgRectangleDimensions dimensions)
        {
            string json = JsonConvert.SerializeObject(dimensions);
            await File.WriteAllTextAsync("dimensions.json", json);
            return dimensions;
        }
    }
}
