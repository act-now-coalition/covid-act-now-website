import { fetchProjections } from '../utils/model';

export const stateId = 'MD';
export const getProjections = async () => fetchProjections(stateId);
