import { IExecuteFunctions } from 'n8n-workflow';

type ParamConfig<T> = {
  [K in keyof T]: {
    default?: T[K];
  };
};

export function getParams<T>(
  ctx: IExecuteFunctions,
  itemIndex: number,
  config: ParamConfig<T>,
): T {
  const result = {} as T;

  for (const key in config) {
    result[key] = ctx.getNodeParameter(
      key,
      itemIndex,
      config[key].default,
    ) as T[typeof key];
  }

  return result;
}
