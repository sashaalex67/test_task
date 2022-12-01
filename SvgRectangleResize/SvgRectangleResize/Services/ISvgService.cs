using SvgRectangleResize.Models;

namespace SvgRectangleResize.Services
{
    public interface ISvgService
    {
        Task<SvgRectangleDimensions> GetDimensions();
        Task<SvgRectangleDimensions> UpdateDimensions(SvgRectangleDimensions dimensions);
    }
}
