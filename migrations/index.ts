import * as migration_20260512_151231 from './20260512_151231';

export const migrations = [
  {
    up: migration_20260512_151231.up,
    down: migration_20260512_151231.down,
    name: '20260512_151231'
  },
];
