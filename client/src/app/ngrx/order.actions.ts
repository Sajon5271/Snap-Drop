import { createAction, props } from '@ngrx/store';
import { ImageInterface } from '../interfaces/image.interface';

export const addPassportImages = createAction(
  '[order] addPassportImages',
  props<ImageInterface>()
);
export const removePassportImages = createAction(
  '[order] removePassportImages',
  props<ImageInterface>()
);
export const addGalleryImages = createAction(
  '[order] addGalleryImages',
  props<ImageInterface>()
);
export const removeGalleryImages = createAction(
  '[order] removeGalleryImages',
  props<ImageInterface>()
);
export const changeCountryForPassport = createAction(
  '[order] changeCountryForPassport',
  props<{ country: string }>()
);
