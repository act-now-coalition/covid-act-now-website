import { RegionType, State, RegionObject, StateObject } from './types';
import { MetroArea, MetroAreaObject } from './MetroArea';
import { County, CountyObject } from './County';

export function deserializeRegion<T extends RegionObject>(obj: T) {
  switch (obj.t) {
    case RegionType.STATE:
      return State.fromObject((obj as unknown) as StateObject);
    case RegionType.COUNTY:
      return County.fromObject((obj as unknown) as CountyObject);
    case RegionType.MSA:
      return MetroArea.fromObject((obj as unknown) as MetroAreaObject);
  }
}
