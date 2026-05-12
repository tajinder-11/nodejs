import express from 'express';
import { shortenPostRequestBodySchema } from '../validations/request.validation.js';
import { nanoid } from 'nanoid';
import { db } from '../db/index.js';
import { urlsTable, usersTable } from '../models/index.js';
import { ensureAuthenticated } from '../middlewares/auth.middleware.js';
import { createNewUrl } from '../services/urls.services.js';
import { eq, and } from 'drizzle-orm';

const router = express.Router();

router.post('/shorten', ensureAuthenticated, async (req, res) => {
  const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
    req.body,
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error });
  }

  const { url, code } = validationResult.data;
  console.log('code: ', code);

  const shortCode = code ? code : nanoid(6);
  const userId = req?.user?.id;

  const result = await createNewUrl({ shortCode, url, userId });

  return res.status(201).json({
    id: result.id,
    shortCode: result.shortCode,
    targetURL: result.targetURL,
  });
});

router.get('/codes', ensureAuthenticated, async function (req, res) {
  const codes = await db
    .select()
    .from(urlsTable)
    .where(eq(urlsTable.userId, req.user.id));

  return res.status(200).json({ codes });
});

router.delete('/:id', ensureAuthenticated, async function (req, res) {
  const id = req.params.id;
  await db
    .delete(urlsTable)
    .where(and(eq(urlsTable.id, id), eq(urlsTable.userId, req.user.id)));
  res.status(200).json({ deleted: true });
});

router.get('/:shortCode', async function (req, res) {
  const code = req.params.shortCode;
  const [result] = await db
    .select({
      targetUrl: urlsTable.targetURL,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, code));

  if (!result) {
    return res.status(404).json({ error: 'Invalid url' });
  }

  return res.redirect(result.targetUrl);
});

// updateUrl api

export default router;
