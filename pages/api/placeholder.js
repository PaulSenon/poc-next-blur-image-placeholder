// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getBase64 } from '../../src/shared/placeholderGenerator';

export default async (req, res) => {
  const base64 = await getBase64(req.query.src);
  res.status(200).json({ base64 });
};
