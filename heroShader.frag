precision highp float;
uniform vec2 resolution;
uniform float time;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec2 p = uv * 2.0 - 1.0; // Normalize to [-1, 1]
    p.x *= resolution.x / resolution.y; // Aspect ratio correction

    // Grid parameters
    float gridSize = 20.0;
    vec2 gridUV = fract(p * gridSize + vec2(0.0, time * 2.0)); // Animate grid by shifting in y
    vec2 gridID = floor(p * gridSize + vec2(0.0, time * 2.0));

    // Grid lines
    float gridLineWidth = 0.03;
    float grid = smoothstep(gridLineWidth, 0.0, abs(gridUV.x - 0.5)) +
                 smoothstep(gridLineWidth, 0.0, abs(gridUV.y - 0.5));
    grid *= smoothstep(0.0, 0.3, uv.y); // Fade grid towards horizon

    // Perspective lines (lasers) converging at horizon
    float lineCount = 15.0;
    float perspective = 1.0 - uv.y; // Simulate perspective by scaling with y
    float lineID = floor(p.x * lineCount * perspective + 0.5);
    float lineX = fract(p.x * lineCount * perspective + 0.5);
    float lineStrength = smoothstep(0.02 / perspective, 0.0, abs(lineX - 0.5));
    float lineZ = fract(time * 0.8 + lineID * 0.1); // Animate lines
    lineStrength *= smoothstep(0.0, 0.3, lineZ) * smoothstep(1.0, 0.7, lineZ); // Fade in/out
    lineStrength *= smoothstep(0.0, 0.3, uv.y); // Fade towards horizon

    // Lights on lines
    float lightY = fract(gridID.y * 0.2 + time * 2.0);
    float light = smoothstep(0.05 / perspective, 0.0, length(vec2(lineX - 0.5, lightY - 0.5)));
    light *= step(abs(lineX - 0.5), 0.02 / perspective); // Only on lines
    light *= smoothstep(0.0, 0.3, uv.y); // Fade towards horizon

    // Horizon glow
    float horizonGlow = exp(-abs(uv.y - 0.2) * 40.0) * 1.5; // Brighter and sharper glow

    // Sky gradient
    vec3 skyColor = mix(vec3(0.0, 0.0, 0.1), vec3(0.0), smoothstep(0.2, 1.0, uv.y));

    // Combine colors
    vec3 gridColor = vec3(0.0, 0.5, 1.0) * grid * 0.5;
    vec3 lineColor = vec3(0.2, 0.8, 1.0) * lineStrength * 1.5;
    vec3 lightColor = vec3(1.0, 0.8, 0.5) * light * 3.0;
    vec3 horizonColor = vec3(0.5, 0.8, 1.0) * horizonGlow;

    vec3 color = gridColor + lineColor + lightColor + horizonColor;
    color += skyColor; // Add sky gradient

    gl_FragColor = vec4(color, 1.0);
}