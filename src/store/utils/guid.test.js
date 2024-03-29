import newGuid from './guid';

it('should return a new guid', () => {

    const regEx = RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    const testGuid = newGuid();

    expect(regEx.test(testGuid)).toEqual(true);
});
