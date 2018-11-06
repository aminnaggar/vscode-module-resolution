import parser from '@lib/parser';
import mainLib from '@lib';

export default () => {
  console.log(`routes-> ${parser()}`);
  console.log(`routes-> ${mainLib()}`);
  return 'in routes'
};