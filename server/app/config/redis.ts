import {createClient} from "redis";

const redis = createClient();

(async () => {
  await redis.connect();
})();

export default redis;

/*

In case not working use redis-cli > SHUTDOWN > exit > redis-server

*/