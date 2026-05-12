import express from 'express';
import { shortenPostRequestBodySchema } from '../validations/request.validation.js';
import { nanoid } from 'nanoid';
import { db } from '../db/index.js';
import { urlsTable } from '../models/index.js';

const router = express.Router();

router.post('/shorten', async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    res
      .status(401)
      .json({ error: 'You must be logged in to access this resource' });
  }

  const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
    req.body,
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error });
  }

  const { url, code } = validationResult.data;
  console.log('code: ', code);

  const shortCode = code ? code : nanoid(6);

  const [result] = await db
    .insert(urlsTable)
    .values({
      shortCode,
      targetURL: url,
      userId,
    })
    .returning({
      id: urlsTable.id,
      shortCode: urlsTable.shortCode,
      targetURL: urlsTable.targetURL,
    });

  return res.status(201).json({
    id: result.id,
    shortCode: result.shortCode,
    targetURL: result.targetURL,
  });
});

export default router;
