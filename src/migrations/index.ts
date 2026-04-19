import * as migration_20260419_110902 from './20260419_110902';

export const migrations = [
  {
    up: migration_20260419_110902.up,
    down: migration_20260419_110902.down,
    name: '20260419_110902'
  },
];
