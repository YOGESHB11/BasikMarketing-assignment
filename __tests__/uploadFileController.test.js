const { uploadData } = require('../src/controllers/controller');
const util = require('../src/util/aws');
const cdn = require('../src/util/cloudfront');

jest.mock('../src/util/aws');
jest.mock('../src/util/cloudfront');

describe('uploadData', () => {
  const req = {
    files: [
      {
        img: 'file.txt',
        buffer: Buffer.from('This is a test file.'),
      },
    ],
    body: {
      directoryPath: 'newFolder',
    },
  };

  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  };

  beforeEach(() => {
    util.uploadFile.mockClear();
    cdn.invalidate.mockClear();
  });

  test('should return a successful response with valid form data', async () => {
    util.uploadFile.mockResolvedValueOnce('https://basik-marketing.s3.ap-south-1.amazonaws.com/newFolder/file.txt');
    cdn.invalidate.mockResolvedValueOnce('https://db7dyg412q1xf.cloudfront.net/newFolder/file.txt');

    await uploadData(req, res);

    expect(util.uploadFile).toHaveBeenCalledTimes(1);
    expect(util.uploadFile).toHaveBeenCalledWith(req.files[0], req.body.directoryPath);
    console.log(cdn.invalidate)
    expect(cdn.invalidate).toHaveBeenCalledTimes(1);
    expect(cdn.invalidate).toHaveBeenCalledWith(req.body.directoryPath);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: true,
      message: 'CDN Entry successfully created',
      s3_Bucket_Link: 'https://basik-marketing.s3.ap-south-1.amazonaws.com/newFolder/file.txt',
      CDN_distribution_link: 'https://db7dyg412q1xf.cloudfront.net/newFolder/file.txt',
    });
  });
}
)