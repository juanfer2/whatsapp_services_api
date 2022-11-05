export interface DatabaseFactory<T> {
  createConfig(): T
};
