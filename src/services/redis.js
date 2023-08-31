const redis = require("redis");
const util = require("util");

const client = redis.createClient({
  url: "redis://default:orU66A7C0z9Y8EsgZNvRPxSzRFa6SlVC@redis-13393.c295.ap-southeast-1-1.ec2.cloud.redislabs.com:13393",
});
// client.connect();

// client.set = util.promisify(client.set);
// client.get = util.promisify(client.get);

const clientSet = (key, value) => {
  try {
    client.set(key, value);
  } catch (error) {}
};

const clientGet = async (key) => {
  try {
    const value = await client.get(key);
    return value;
  } catch (error) {}
};

module.exports = {
  clientSet,
  clientGet,
};
