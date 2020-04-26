import { fetchProjections } from '../utils/model';

export const stateId = 'NV';
export const getProjections = async () => fetchProjections(stateId);
