import fs from 'fs';
import zlib from 'zlib';

// Let's create an SVG that renders the earth globe circular with glowing emerald border,
// and also we have favicon.svg!
// Let's check public/favicon.svg
const svg = fs.readFileSync('d:/Green project/greenpoints/public/favicon.svg', 'utf8');
console.log('Favicon SVG length:', svg.length);
