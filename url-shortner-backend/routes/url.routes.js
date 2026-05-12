import express from 'express';
import { shortenPostRequestBodySchema } from '../validations/request.validation.js';
import { nanoid } from 'nanoid';
import { db } from '../db/index.js';
import { urlsTable } from '../models/index.js';
import { ensureAuthenticated } from '../middlewares/auth.middleware.js';
import { createNewUrl } from '../services/urls.services.js';

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

export default router;
