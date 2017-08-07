// @flow
import { schema } from 'normalizr';

export const item = new schema.Entity('items', {}, {
  processStrategy: (value) => ({
    name: value.name,
  }),
});

export const items = new schema.Array(item);
