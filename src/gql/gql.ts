/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query GetBasicData($where: TopicWhereInput!, $subjectsWhere2: SubjectWhereInput!) {\n  subjects(where: $subjectsWhere2) {\n    id\n    name\n    color\n  }\n  topics(where: $where) {\n    id\n    name\n    Doc {\n      title\n      title\n      id\n    }\n  }\n}\n\nquery GetSubjects($where: SubjectWhereInput!) {\n  subjects(where: $where) {\n    name\n  }\n}\n\nquery GetUserByEmail($email: String!) {\n  userByEmail(email: $email) {\n    email\n    gradeId\n    id\n    name\n    role\n  }\n}\n\nquery LoginUser($user: LoginUserInput!) {\n  login(user: $user) {\n    name\n    email\n    id\n    gradeId\n    role\n  }\n}\n\nquery GetSubjectsIds($where: SubjectWhereInput!) {\n  subjects(where: $where) {\n    id\n  }\n}\n\nquery GetDoc($docId: Int!) {\n  doc(id: $docId) {\n    content\n  }\n}\n\nmutation CreateDoc($createDocInput: DocCreateInput!) {\n  createDoc(createDocInput: $createDocInput) {\n    id\n  }\n}": types.GetBasicDataDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetBasicData($where: TopicWhereInput!, $subjectsWhere2: SubjectWhereInput!) {\n  subjects(where: $subjectsWhere2) {\n    id\n    name\n    color\n  }\n  topics(where: $where) {\n    id\n    name\n    Doc {\n      title\n      title\n      id\n    }\n  }\n}\n\nquery GetSubjects($where: SubjectWhereInput!) {\n  subjects(where: $where) {\n    name\n  }\n}\n\nquery GetUserByEmail($email: String!) {\n  userByEmail(email: $email) {\n    email\n    gradeId\n    id\n    name\n    role\n  }\n}\n\nquery LoginUser($user: LoginUserInput!) {\n  login(user: $user) {\n    name\n    email\n    id\n    gradeId\n    role\n  }\n}\n\nquery GetSubjectsIds($where: SubjectWhereInput!) {\n  subjects(where: $where) {\n    id\n  }\n}\n\nquery GetDoc($docId: Int!) {\n  doc(id: $docId) {\n    content\n  }\n}\n\nmutation CreateDoc($createDocInput: DocCreateInput!) {\n  createDoc(createDocInput: $createDocInput) {\n    id\n  }\n}"): (typeof documents)["query GetBasicData($where: TopicWhereInput!, $subjectsWhere2: SubjectWhereInput!) {\n  subjects(where: $subjectsWhere2) {\n    id\n    name\n    color\n  }\n  topics(where: $where) {\n    id\n    name\n    Doc {\n      title\n      title\n      id\n    }\n  }\n}\n\nquery GetSubjects($where: SubjectWhereInput!) {\n  subjects(where: $where) {\n    name\n  }\n}\n\nquery GetUserByEmail($email: String!) {\n  userByEmail(email: $email) {\n    email\n    gradeId\n    id\n    name\n    role\n  }\n}\n\nquery LoginUser($user: LoginUserInput!) {\n  login(user: $user) {\n    name\n    email\n    id\n    gradeId\n    role\n  }\n}\n\nquery GetSubjectsIds($where: SubjectWhereInput!) {\n  subjects(where: $where) {\n    id\n  }\n}\n\nquery GetDoc($docId: Int!) {\n  doc(id: $docId) {\n    content\n  }\n}\n\nmutation CreateDoc($createDocInput: DocCreateInput!) {\n  createDoc(createDocInput: $createDocInput) {\n    id\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;