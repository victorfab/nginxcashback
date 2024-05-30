import { FlameIconModule } from '@ngx-mxflame/atoms/icon';
import { FlameCardModule } from '@ngx-mxflame/atoms/card';
import { FlameButtonModule } from '@ngx-mxflame/atoms/button';
import {
  FlameLoaderModule,
  FlameLoaderService
} from '@ngx-mxflame/atoms/loader-overlay';
import { FlameSpinnerModule } from '@ngx-mxflame/atoms/spinner';

export const FLAME_ATOMS = [
  FlameIconModule,
  FlameCardModule,
  FlameButtonModule,
  FlameLoaderModule,
  FlameSpinnerModule
];

export const FLAME_SERVICES = [FlameLoaderService];
