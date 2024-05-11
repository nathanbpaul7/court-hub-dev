// This file contains placeholder data that will be used to test and debug initial development versions of CourtHUB

const courts = [
  {
    name: 'Poplar Park Tennis Courts',
    index: 0,
    shortname: 'Poplar',
    address: '880 N 8th St, Philadelphia, PA 19123',
    courts: 3,
    lights: true,
    type: 'hard-court',
    water: false,
    bathrooms: false,
    parking: 'street',
    active_players: '25',
    entrance: 'both sides of court',
    notes:
      'Info about current availability, condition, or other relevent items related to this court.',
    description:
      'Poplar Park Tennis Courts are located in the heart of the Callowhill neighborhood in Philadelphia on the corner of N. 8th st. and Poplar. Renovated recently by Bodine High School and Parks and Rec, these courts are well maintained and have lights for night play, though their timing can be subject to change. The courts are open to the public and are free to use. Nearby is a basketball court, skate park, playground, and a public swimming pool.',
    value: 'poplar',
  },
  {
    name: 'Fairmount Park Tennis Courts',
    index: 1,
    shortname: 'Fairmount',
    address: '3300 Ridge Ave, Philadelphia, PA 19132',
    courts: 10,
    lights: false,
    type: 'hard-court',
    water: false,
    bathrooms: true,
    parking: 'street',
    active_players: '25',
    entrance: 'both sides of court',
    notes:
      'Info about current availability, condition, or other relevent items related to this court.',
    description:
      ' Surroudned by fields and trees, beautfiul these courts are located in Strawberry Mansion area of Fairmount Park in Philadelphia. The court surfaces are older but well-maintained, with outhouses surrounding the courts that generally are open to the public. The courts are free to use, but sometimes schools have practice or matches there. The Strawberry Mansion Tennis Association reserves a certain amount of courts to use, often on the weekend.',
    value: 'fairmount',
  },
  {
    name: 'FDR Park Tennis Courts',
    index: 2,
    shortname: 'FDR',
    address: '1500 Pattison Ave, Philadelphia, PA 19145',
    courts: 12,
    lights: false,
    type: 'hard-court',
    water: true,
    bathrooms: false,
    active_players: '25',
    parking: 'street',
    entrance: 'both sides of court',
    notes:
      'Info about current availability, condition, or other relevent items related to this court.',
    description:
      'FDR Park Tennis Courts are the largest group of courts in the south Philly area. They are located within the portion of the park closest to the stadiums. The court surface is older and boasts some cracks and wear, but otherwise the nets and lines are well maintained.  The courts are free to use and open to the public. Lots of organizations and schools use these courts so availability can vary and be limited at times.',
    value: 'fdr',
  },
];
module.exports = {
  courts,
};
