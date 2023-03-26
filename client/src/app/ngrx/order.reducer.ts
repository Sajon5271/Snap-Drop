import { createReducer, on } from '@ngrx/store';
import { ImageInterface } from '../interfaces/image.interface';
import * as States from './order.actions';
export const initialPassportPhoto: ImageInterface[] = [];
export const initialGalleryPhoto: ImageInterface[] = [];
export const initialCountry = '';

export const passportReducer = createReducer(
  initialPassportPhoto,
  on(States.addPassportImages, (state, image) => [...state, image]),
  on(States.removePassportImages, (state, image) => [
    ...state.filter((pic) => pic.orgFilename !== image.orgFilename),
  ])
);
export const galleryReducer = createReducer(
  initialGalleryPhoto,
  on(States.addGalleryImages, (state, image) => [...state, image]),
  on(States.removeGalleryImages, (state, image) => [
    ...state.filter((pic) => pic.orgFilename !== image.orgFilename),
  ])
);

export const countryReducer = createReducer(
  initialCountry,
  on(States.changeCountryForPassport, (state, { country }) => country)
);
