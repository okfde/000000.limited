import { defineCollection, z, type SchemaContext } from 'astro:content';
import { file } from 'astro/loaders';

const schema = ({image} : SchemaContext) => z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  year: z.number(),
  images: z.array(z.object({
    file: image(),
    alt: z.string()
  })).min(1),
  available: z.boolean(),
  pretixId: z.string().optional()
})

export type Edition = z.infer<ReturnType<typeof schema>>;

const editions = defineCollection({
  loader: file("./src/data/editions.yaml"),
  schema
})

export const collections = { editions };