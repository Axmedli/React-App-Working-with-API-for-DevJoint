const listeners = new Set();

export const errorBus = {
  emit(message) {
    listeners.forEach((cb) => cb(message));
  },
  subscribe(cb) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
};