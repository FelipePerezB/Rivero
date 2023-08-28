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
    "query GetSubjects {\n  subjects {\n    color\n    name\n    id\n    _count {\n      Docs\n    }\n    Topics {\n      name\n    }\n  }\n}\n\nquery GetSubjectsPaths {\n  subjects {\n    id\n  }\n}\n\nquery GetSubject($subjectId: Int!) {\n  subject(id: $subjectId) {\n    name\n    color\n    Topics {\n      id\n      name\n      _count {\n        Docs\n      }\n      Subtopics {\n        name\n        Docs {\n          externalId\n          title\n        }\n      }\n    }\n  }\n}\n\nquery GetUserByEmail($email: String!) {\n  userByEmail(email: $email) {\n    email\n    gradeId\n    id\n    username\n    role\n  }\n}\n\nmutation UpdateDoc($updateDocId: Float!, $updateDocInput: DocUpdateInput!) {\n  updateDoc(id: $updateDocId, updateDocInput: $updateDocInput) {\n    id\n  }\n}\n\nmutation createUser($createUserInput: UserCreateInput!) {\n  createUser(createUserInput: $createUserInput) {\n    id\n    email\n  }\n}\n\nmutation RemoveUser($where: UserWhereUniqueInput!) {\n  removeUser(where: $where) {\n    id\n  }\n}\n\nquery GetDoc($where: DocWhereUniqueInput!) {\n  doc(where: $where) {\n    content\n    title\n    privacity\n    externalId\n    id\n    type\n    Subject {\n      name\n    }\n    Topic {\n      name\n    }\n    Subtopic {\n      name\n    }\n  }\n}\n\nmutation CreateDoc($createDocInput: DocCreateInput!) {\n  createDoc(createDocInput: $createDocInput) {\n    id\n  }\n}": types.GetSubjectsDocument,
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
export function graphql(source: "query GetSubjects {\n  subjects {\n    color\n    name\n    id\n    _count {\n      Docs\n    }\n    Topics {\n      name\n    }\n  }\n}\n\nquery GetSubjectsPaths {\n  subjects {\n    id\n  }\n}\n\nquery GetSubject($subjectId: Int!) {\n  subject(id: $subjectId) {\n    name\n    color\n    Topics {\n      id\n      name\n      _count {\n        Docs\n      }\n      Subtopics {\n        name\n        Docs {\n          externalId\n          title\n        }\n      }\n    }\n  }\n}\n\nquery GetUserByEmail($email: String!) {\n  userByEmail(email: $email) {\n    email\n    gradeId\n    id\n    username\n    role\n  }\n}\n\nmutation UpdateDoc($updateDocId: Float!, $updateDocInput: DocUpdateInput!) {\n  updateDoc(id: $updateDocId, updateDocInput: $updateDocInput) {\n    id\n  }\n}\n\nmutation createUser($createUserInput: UserCreateInput!) {\n  createUser(createUserInput: $createUserInput) {\n    id\n    email\n  }\n}\n\nmutation RemoveUser($where: UserWhereUniqueInput!) {\n  removeUser(where: $where) {\n    id\n  }\n}\n\nquery GetDoc($where: DocWhereUniqueInput!) {\n  doc(where: $where) {\n    content\n    title\n    privacity\n    externalId\n    id\n    type\n    Subject {\n      name\n    }\n    Topic {\n      name\n    }\n    Subtopic {\n      name\n    }\n  }\n}\n\nmutation CreateDoc($createDocInput: DocCreateInput!) {\n  createDoc(createDocInput: $createDocInput) {\n    id\n  }\n}"): (typeof documents)["query GetSubjects {\n  subjects {\n    color\n    name\n    id\n    _count {\n      Docs\n    }\n    Topics {\n      name\n    }\n  }\n}\n\nquery GetSubjectsPaths {\n  subjects {\n    id\n  }\n}\n\nquery GetSubject($subjectId: Int!) {\n  subject(id: $subjectId) {\n    name\n    color\n    Topics {\n      id\n      name\n      _count {\n        Docs\n      }\n      Subtopics {\n        name\n        Docs {\n          externalId\n          title\n        }\n      }\n    }\n  }\n}\n\nquery GetUserByEmail($email: String!) {\n  userByEmail(email: $email) {\n    email\n    gradeId\n    id\n    username\n    role\n  }\n}\n\nmutation UpdateDoc($updateDocId: Float!, $updateDocInput: DocUpdateInput!) {\n  updateDoc(id: $updateDocId, updateDocInput: $updateDocInput) {\n    id\n  }\n}\n\nmutation createUser($createUserInput: UserCreateInput!) {\n  createUser(createUserInput: $createUserInput) {\n    id\n    email\n  }\n}\n\nmutation RemoveUser($where: UserWhereUniqueInput!) {\n  removeUser(where: $where) {\n    id\n  }\n}\n\nquery GetDoc($where: DocWhereUniqueInput!) {\n  doc(where: $where) {\n    content\n    title\n    privacity\n    externalId\n    id\n    type\n    Subject {\n      name\n    }\n    Topic {\n      name\n    }\n    Subtopic {\n      name\n    }\n  }\n}\n\nmutation CreateDoc($createDocInput: DocCreateInput!) {\n  createDoc(createDocInput: $createDocInput) {\n    id\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;