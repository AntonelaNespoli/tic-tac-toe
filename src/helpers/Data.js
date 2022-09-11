export const getLocalData = (name, val, set) => {
  const data = JSON.parse(localStorage.getItem(name));
  if (data) {
    set(data);
  } else {
    localStorage.setItem(name, JSON.stringify(val));
  }
};

export const setLocalData = (name, val, set) => {
  set(val);
  localStorage.setItem(name, JSON.stringify(val));
};
