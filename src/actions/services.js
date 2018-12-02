export const SAVE_SERVICE = 'save-service';
export const UNSAVE_SERVICE = 'unsave-service';

export const saveService = data => ({
  type: SAVE_SERVICE,
  payload: data,
});

export const unsaveService = data => ({
  type: UNSAVE_SERVICE,
  payload: data,
});
