import AK from './Alaska';
import AL from './Alabama';
import AZ from './Arizona';
import AR from './Arkansas';
import CA from './California';
import CO from './Colorado';
import CT from './Connecitcut';
import DE from './Delaware';
import DC from './DC';
import FL from './Florida';
import GA from './Georgia';
import HI from './Hawaii';
import ID from './Idaho';
import IL from './Illinois';
import IN from './Indiana';
import IA from './Iowa';
import KS from './Kansas';
import KY from './Kentucky';
import LA from './Louisiana';
import ME from './Maine';
import MD from './Maryland';
import MA from './Massachusetts';
import MI from './Michigan';
import MN from './Minnesota';
import MP from './NorthernMarianaIslands';
import MS from './Mississippi';
import MO from './Missouri';
import MT from './Montana';
import NE from './Nebraska';
import NV from './Nevada';
import NH from './NewHampshire';
import NJ from './NewJersey';
import NM from './NewMexico';
import NY from './NewYork';
import NC from './NorthCarolina';
import ND from './NorthDakota';
import OH from './Ohio';
import OK from './Oklahoma';
import OR from './Oregon';
import PA from './Pennsylvania';
import PR from './PuertoRico';
import RI from './RhodeIsland';
import SC from './SouthCarolina';
import SD from './SouthDakota';
import TN from './Tennessee';
import TX from './Texas';
import UT from './Utah';
import VT from './Vermont';
import VA from './Virginia';
import WA from './Washington';
import WV from './WestVirginia';
import WI from './Wisconsin';
import WY from './Wyoming';

const states: { [index: string]: () => JSX.Element } = {
  AK,
  AL,
  AZ,
  AR,
  CA,
  CO,
  CT,
  DE,
  DC,
  FL,
  GA,
  HI,
  ID,
  IL,
  IN,
  IA,
  KS,
  KY,
  LA,
  ME,
  MD,
  MA,
  MI,
  MN,
  MP,
  MS,
  MO,
  MT,
  NE,
  NV,
  NH,
  NJ,
  NM,
  NY,
  NC,
  ND,
  OH,
  OK,
  OR,
  PA,
  PR,
  RI,
  SC,
  SD,
  TN,
  TX,
  UT,
  VT,
  VA,
  WA,
  WV,
  WI,
  WY,
};

export default states;
