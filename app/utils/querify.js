export default function querify(params) {
  return Object
      .keys(params)
      .filter(k => {
        return params[k] !== null && params[k] !== undefined && params[k] !== '';
      })
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&');
}