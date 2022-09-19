import { getDateBagdeDisplayDate, getDaysDiff } from './timerHelper';

describe('getDateBagdeDisplayDate', () => {
  it('should return the short localized date', () => {
    const d = getDateBagdeDisplayDate(new Date('2021-12-10T07:37:22.838Z'));

    expect(d).toEqual('10 déc.');
  });
});

describe('getDaysDiff', () => {
  it('should return the diff in days until today', () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    const diff = getDaysDiff(date);

    expect(diff).toEqual(5);
  });

  it('should return the negative diff in days until today if date is in the past', () => {
    const date = new Date();
    date.setDate(date.getDate() - 5);
    const diff = getDaysDiff(date);

    expect(diff).toEqual(-5);
  });
});
