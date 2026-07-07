import { TofugStorePage } from '../../components/project';
import { getStorePage } from '../../data/tofug-stores';

export default function TofugUeSquare() {
  const { store, prev, next } = getStorePage('tofug-ue-square');
  return <TofugStorePage store={store} prev={prev} next={next} />;
}
