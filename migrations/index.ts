import * as migration_20260512_151231 from './20260512_151231';
import * as migration_20260513_085933 from './20260513_085933';

export const migrations = [
  {
    up: migration_20260512_151231.up,
    down: migration_20260512_151231.down,
    name: '20260512_151231',
  },
  {
    up: migration_20260513_085933.up,
    down: migration_20260513_085933.down,
    name: '20260513_085933'
  },
];
