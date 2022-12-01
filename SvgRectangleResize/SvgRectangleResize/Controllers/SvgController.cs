using Microsoft.AspNetCore.Mvc;
using SvgRectangleResize.Models;
using SvgRectangleResize.Services;

namespace SvgRectangleResize.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SvgController : ControllerBase
    {
        private readonly ISvgService _svgService;

        public SvgController(ISvgService svgService)
        {
            _svgService = svgService;
        }

        [HttpGet]
        public async Task<ActionResult<SvgRectangleDimensions>> GetDimensions()
        {
            try
            {
                var dimensions = await _svgService.GetDimensions();
                return Ok(dimensions);
            }
            catch (Exception)
            {
                return BadRequest("Can not get dimensions");
            }
        }

        [HttpPut]
        public async Task<ActionResult<SvgRectangleDimensions>> UpdateDimensions(SvgRectangleDimensions dimensions)
        {
            try
            {
                await _svgService.UpdateDimensions(dimensions);
                return Ok();
            }
            catch (Exception)
            {
                return BadRequest("Can not update dimensions");
            }
        }
    }
}
