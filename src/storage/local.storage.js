export const storage = {
  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
  get(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  },
};