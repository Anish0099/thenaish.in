import type { SchemaTypeDefinition } from "sanity";
import { blockContent } from "./block-content";
import { post } from "./post";
import { project } from "./project";

export const schemaTypes: SchemaTypeDefinition[] = [post, project, blockContent];
