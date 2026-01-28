export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('dpg-d5stgdf18n1s73frvacg-a'),
      port: env.int('5432'),
      database: env('western_ventures_db'),
      user: env('western_ventures_db_user'),
      password: env('tsFDcnP465uvV2m1V8qzhgcLOwj0UoER'),
      ssl: { rejectUnauthorized: false },
    },
  },
});
