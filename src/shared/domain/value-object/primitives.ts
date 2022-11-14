export type Methods<T> = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];

export type MethodsAndProperties<T> = {
  [key in keyof T]: T[key];
};

export type Properties<T> = Omit<MethodsAndProperties<T>, Methods<T>>;

export type ValueObjectValue<T> = {
  [key in keyof T]: T[key] extends { value: unknown }
    ? Pick<T[key], 'value'>['value']
    : T[key] extends Object
    ? Primitives<T[key]>
    : T[key];
};

export type Primitives<T> = ValueObjectValue<Properties<T>>;

export interface Newable<T> extends Function {
  new (...args: any[]): T;
}
