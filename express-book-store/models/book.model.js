const {
  integer,
  pgTable,
  varchar,
  uuid,
  text,
  index,
} = require('drizzle-orm/pg-core');
const { authorsTable } = require('./author.model');
const { sql } = require('drizzle-orm');

const booksTable = pgTable(
  'books',
  {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 100 }).notNull(),
    description: text(),
    authorId: uuid()
      .references(() => authorsTable.id)
      .notNull(),
    authorName: varchar({ length: 256 }),
  },
  (table) => ({
    searchTableOnTitle: index('title_index').using(
      'gin',
      sql`to_tsvector('english, ${table.title})`,
    ),
  }),
);

module.exports = {
  booksTable,
};
