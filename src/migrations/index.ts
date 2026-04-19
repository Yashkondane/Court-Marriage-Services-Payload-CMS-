import * as migration_20260419_110902 from './20260419_110902';
import * as migration_20260419_173000 from './20260419_173000';

export const migrations = [
  {
    up: migration_20260419_110902.up,
    down: migration_20260419_110902.down,
    name: '20260419_110902'
  },
  {
    up: migration_20260419_173000.up,
    down: migration_20260419_173000.down,
    name: '20260419_173000'
  },
];
