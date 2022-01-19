import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const users = [...Array(5)].map((_, index) => ({
  id: faker.datatype.uuid(),
  name: sample(['ExcelDoc', 'PersonalDoc', 'BankingDetails', 'AccountDetails']),
  type: sample(['word doc', 'excel doc']),
  ext: sample(['.docx', '.xlsm']),
  accessed: sample(['Not Accessed', 'Accessed']),
  date: sample(['12/02/2021', '19/01/2021', '14/03/2021', '12/02/2021'])
}));

export default users;
