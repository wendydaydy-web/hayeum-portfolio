import { TofugStorePage } from '../../components/project';
import { getStorePage } from '../../data/tofug-stores';

export default function TofugAmoy() {
  const { store, prev, next } = getStorePage('tofug-amoy');
  return <TofugStorePage store={store} prev={prev} next={next} />;
}
