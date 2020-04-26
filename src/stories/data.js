import { fetchProjections } from '../utils/model';

export const NV = {
  stateId: 'NV',
  getProjections: async () => fetchProjections('NV'),
};

export const MD = {
  stateId: 'MD',
  getProjections: async () => fetchProjections('MD'),
};
