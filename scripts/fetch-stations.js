#!/usr/bin/env node

/**
 * Fetches MTA GTFS static data and generates stops.json and lines.json
 * for the mta-css project.
 *
 * Data source: MTA GTFS Static Feed
 * https://www.mta.info/developers
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const GTFS_URL = 'http://web.mta.info/developers/data/nyct/subway/google_transit.zip';
const TMP_DIR = path.join(__dirname, '..', '.gtfs-tmp');
const DATA_DIR = path.join(__dirname, '..', 'src', 'data');

// Route colors matching MTA official branding
// These are manually maintained to match the project's existing visual style
const LINE_COLORS = {
  '1': { color: '#EC2C2E', letter: '#ffffff' },
  '2': { color: '#EC2C2E', letter: '#ffffff' },
  '3': { color: '#EC2C2E', letter: '#ffffff' },
  '4': { color: '#009442', letter: '#ffffff' },
  '5': { color: '#009442', letter: '#ffffff' },
  '6': { color: '#009442', letter: '#ffffff' },
  '7': { color: '#da0cc4', letter: '#ffffff' },
  'A': { color: '#064494', letter: '#ffffff' },
  'C': { color: '#064494', letter: '#ffffff' },
  'E': { color: '#064494', letter: '#ffffff' },
  'B': { color: '#ff6217', letter: '#ffffff' },
  'D': { color: '#ff6217', letter: '#ffffff' },
  'F': { color: '#ff6217', letter: '#ffffff' },
  'M': { color: '#ff6217', letter: '#ffffff' },
  'G': { color: '#67d044', letter: '#ffffff' },
  'J': { color: '#b35b0a', letter: '#ffffff' },
  'Z': { color: '#b35b0a', letter: '#ffffff' },
  'L': { color: '#A7A9AC', letter: '#ffffff' },
  'S': { color: '#808183', letter: '#ffffff' },
  'N': { color: '#ffe52e', letter: '#000000' },
  'Q': { color: '#ffe52e', letter: '#000000' },
  'R': { color: '#ffe52e', letter: '#000000' },
  'W': { color: '#ffe52e', letter: '#000000' },
};

function download(url) {
  return new Promise((resolve, reject) => {
    const dest = path.join(TMP_DIR, 'gtfs.zip');
    const proto = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    proto.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlinkSync(dest);
        return resolve(download(res.headers.location));
      }
      if (res.statusCode !== 200) {
        file.close();
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(dest); });
    }).on('error', reject);
  });
}

function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = parseCSVLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const obj = {};
    headers.forEach((h, i) => { obj[h] = values[i] || ''; });
    return obj;
  });
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') { current += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else { current += ch; }
    } else {
      if (ch === '"') { inQuotes = true; }
      else if (ch === ',') { result.push(current.trim()); current = ''; }
      else { current += ch; }
    }
  }
  result.push(current.trim());
  return result;
}

// Normalize route_id to the display line letter/number
// e.g. "GS" -> "S", "FS" -> "S", "H" -> "S", "FX" -> "F", "6X" -> "6", "7X" -> "7"
function normalizeRouteId(routeId) {
  if (['GS', 'FS', 'H'].includes(routeId)) return 'S';
  if (routeId === 'FX') return 'F';
  if (routeId === '6X') return '6';
  if (routeId === '7X') return '7';
  if (routeId === 'SI') return null; // Skip Staten Island Railway
  return routeId;
}

async function main() {
  console.log('Fetching MTA GTFS data...');

  // Setup tmp dir
  if (fs.existsSync(TMP_DIR)) fs.rmSync(TMP_DIR, { recursive: true });
  fs.mkdirSync(TMP_DIR, { recursive: true });

  // Download and extract
  const zipPath = await download(GTFS_URL);
  console.log('Extracting...');
  execSync(`unzip -o "${zipPath}" stops.txt routes.txt trips.txt stop_times.txt -d "${TMP_DIR}"`);

  // Parse files
  const stops = parseCSV(fs.readFileSync(path.join(TMP_DIR, 'stops.txt'), 'utf8'));
  const trips = parseCSV(fs.readFileSync(path.join(TMP_DIR, 'trips.txt'), 'utf8'));
  const stopTimes = parseCSV(fs.readFileSync(path.join(TMP_DIR, 'stop_times.txt'), 'utf8'));

  // Build parent station map: stop_id -> stop_name (only location_type=1)
  const parentStations = {};
  stops.forEach(s => {
    if (s.location_type === '1') {
      parentStations[s.stop_id] = s.stop_name;
    }
  });

  // Build child-to-parent map
  const childToParent = {};
  stops.forEach(s => {
    if (s.parent_station) {
      childToParent[s.stop_id] = s.parent_station;
    }
  });

  // Build trip_id -> route_id map
  const tripRoute = {};
  trips.forEach(t => { tripRoute[t.trip_id] = t.route_id; });

  // Build station -> lines mapping
  console.log('Building station-line mappings...');
  const stationLines = {}; // parent_stop_id -> Set of line letters
  stopTimes.forEach(st => {
    const routeId = tripRoute[st.trip_id];
    if (!routeId) return;
    const line = normalizeRouteId(routeId);
    if (!line) return;
    if (!LINE_COLORS[line]) return; // skip unknown lines

    const parentId = childToParent[st.stop_id] || st.stop_id;
    if (!parentStations[parentId]) return;

    if (!stationLines[parentId]) stationLines[parentId] = new Set();
    stationLines[parentId].add(line);
  });

  // Build stops.json
  const stopsJson = Object.entries(stationLines)
    .map(([id, lines]) => ({
      name: parentStations[id],
      line: Array.from(lines).sort(),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Build lines.json (preserve existing order and colors)
  const lineOrder = ['1','2','3','4','5','6','7','A','C','E','B','D','F','M','G','J','Z','L','S','N','Q','R','W'];
  const linesJson = lineOrder
    .filter(l => LINE_COLORS[l])
    .map(l => ({
      line: l,
      color: LINE_COLORS[l].color,
      letter: LINE_COLORS[l].letter,
    }));

  // Write output
  fs.writeFileSync(
    path.join(DATA_DIR, 'stops.json'),
    JSON.stringify(stopsJson, null, 2) + '\n'
  );
  fs.writeFileSync(
    path.join(DATA_DIR, 'lines.json'),
    JSON.stringify(linesJson, null, 2) + '\n'
  );

  // Cleanup
  fs.rmSync(TMP_DIR, { recursive: true });

  console.log(`Done! Generated ${stopsJson.length} stations and ${linesJson.length} lines.`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
