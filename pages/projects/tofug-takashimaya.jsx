import { TofugStorePage } from '../../components/project';
import { getStorePage } from '../../data/tofug-stores';

export default function TofugTakashimaya() {
  const { store, prev, next } = getStorePage('tofug-takashimaya');
  return <TofugStorePage store={store} prev={prev} next={next} />;
}
