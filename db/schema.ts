import { pgTable, text, timestamp, integer, index } from 'drizzle-orm/pg-core';

export const links = pgTable(
  'links',
  {
    // ✅ Modern IDENTITY column (replaces SERIAL)
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    userId: text('user_id').notNull(),
    shortCode: text('short_code').notNull().unique(),
    url: text('url').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index('user_id_idx').on(table.userId),
  })
);
