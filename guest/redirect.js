// Sends the visitor to the app root in guest placement, keeping the query string (for example ?unit=HR-M1-1204).
const params = new URLSearchParams(location.search);
params.set('placement', 'guest');
location.replace('../?' + params.toString());
