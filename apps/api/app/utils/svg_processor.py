import re
import os


def process_svg(svg_path: str) -> str:
    """Read and process Kerykeion SVG for web display.

    - Adds viewBox if missing
    - Removes hardcoded width/height for responsiveness
    - Returns SVG string
    """
    if not os.path.exists(svg_path):
        return ""

    with open(svg_path, "r", encoding="utf-8") as f:
        svg_content = f.read()

    # Remove hardcoded width and height, keep viewBox
    svg_content = re.sub(r'\s+width="[^"]*"', "", svg_content)
    svg_content = re.sub(r'\s+height="[^"]*"', "", svg_content)

    # Add viewBox if not present
    if "viewBox" not in svg_content:
        svg_content = svg_content.replace(
            "<svg", '<svg viewBox="0 0 800 800"', 1
        )

    # Clean up the temporary file
    try:
        os.remove(svg_path)
    except OSError:
        pass

    return svg_content
