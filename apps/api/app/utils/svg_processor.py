import re


def process_svg(svg_content: str) -> str:
    """Process Kerykeion SVG string for web display.

    - Adds viewBox if missing
    - Removes hardcoded width/height for responsiveness
    - Returns SVG string
    """
    if not svg_content:
        return ""

    # Remove hardcoded width and height, keep viewBox
    svg_content = re.sub(r'\s+width="[^"]*"', "", svg_content)
    svg_content = re.sub(r'\s+height="[^"]*"', "", svg_content)

    # Add viewBox if not present
    if "viewBox" not in svg_content:
        svg_content = svg_content.replace(
            "<svg", '<svg viewBox="0 0 800 800"', 1
        )

    return svg_content
