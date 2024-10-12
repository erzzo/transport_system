
import { Pool } from 'pg';

const db = new Pool({
  host: 'localhost',
  database: 'swida_transport',
  user: 'root',
  password: 'root',
  port: 5432,
});

export default db;