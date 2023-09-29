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
    "query GetSubjects {\n  subjects {\n    color\n    name\n    id\n    Topics {\n      name\n    }\n  }\n}\n\nquery GetUser($where: UserWhereUniqueInput!) {\n  user(where: $where) {\n    name\n    lastname\n    role\n    organizationId\n    email\n    externalId\n    id\n  }\n}\n\nquery GetSubjectsPaths {\n  subjects {\n    id\n  }\n}\n\nquery GetSubject($subjectId: Int!, $topicId: Int!) {\n  subject(id: $subjectId) {\n    id\n    name\n    color\n    Topics {\n      name\n      id\n    }\n  }\n  topicAndSubtopic(id: $topicId) {\n    name\n    id\n    Subtopics {\n      _count {\n        Notes\n      }\n      id\n      name\n      Notes {\n        type\n        File {\n          title\n          externalId\n          id\n        }\n      }\n    }\n  }\n}\n\nquery GetNotes($where: NoteWhereInput) {\n  notes(where: $where) {\n    File {\n      id\n      title\n    }\n  }\n}\n\nquery GetUserByEmail($email: String!) {\n  userByEmail(email: $email) {\n    email\n    id\n    lastname\n    name\n    role\n  }\n}\n\nquery GetUsers($where: UserWhereInput) {\n  users(where: $where) {\n    lastname\n    name\n    role\n    email\n  }\n}\n\nquery GetOrganization {\n  organizations {\n    id\n    name\n  }\n}\n\nquery GetGroups($where: GroupWhereInput) {\n  groups(where: $where) {\n    id\n    name\n  }\n}\n\nmutation CreateGroup($createGroupInput: GroupCreateInput!) {\n  createGroup(createGroupInput: $createGroupInput) {\n    name\n  }\n}\n\nmutation CreateTopic($createTopicInput: TopicCreateInput!) {\n  createTopic(createTopicInput: $createTopicInput) {\n    name\n    id\n  }\n}\n\nmutation CreateSubtopic($createSubtopicInput: SubtopicCreateInput!) {\n  createSubtopic(createSubtopicInput: $createSubtopicInput) {\n    id\n    name\n  }\n}\n\nmutation UpdateTopic($updateTopicId: Float!, $updateTopicInput: TopicUpdateInput!) {\n  updateTopic(id: $updateTopicId, updateTopicInput: $updateTopicInput) {\n    name\n    id\n  }\n}\n\nmutation UpdateSubtopic($updateSubtopicId: Float!, $updateSubtopicInput: SubtopicUpdateInput!) {\n  updateSubtopic(id: $updateSubtopicId, updateSubtopicInput: $updateSubtopicInput) {\n    id\n  }\n}\n\nmutation UpdateGroup($updateGroupId: Float!, $updateGroupInput: GroupUpdateInput!) {\n  updateGroup(id: $updateGroupId, updateGroupInput: $updateGroupInput) {\n    id\n    name\n  }\n}\n\nmutation UpdateSubject($updateSubjectId: Float!, $updateSubjectInput: SubjectUpdateInput!) {\n  updateSubject(id: $updateSubjectId, updateSubjectInput: $updateSubjectInput) {\n    name\n    id\n  }\n}\n\nmutation CreateSubject($createSubjectInput: SubjectCreateInput!) {\n  createSubject(createSubjectInput: $createSubjectInput) {\n    id\n    name\n  }\n}\n\nmutation createUser($createUserInput: UserCreateInput!) {\n  createUser(createUserInput: $createUserInput) {\n    id\n    email\n  }\n}\n\nmutation RemoveUser($where: UserWhereUniqueInput!) {\n  removeUser(where: $where) {\n    id\n    name\n    lastname\n  }\n}\n\nmutation RemoveSubject($removeSubjectId: Int!) {\n  removeSubject(id: $removeSubjectId) {\n    id\n    name\n  }\n}\n\nmutation RemoveGroup($removeGroupId: Int!) {\n  removeGroup(id: $removeGroupId) {\n    id\n    name\n  }\n}\n\nmutation UpdateUser($where: UserWhereUniqueInput!, $updateUserInput: UserUpdateInput!) {\n  updateUser(where: $where, updateUserInput: $updateUserInput) {\n    id\n  }\n}\n\nmutation RemoveTopic($removeTopicId: Int!) {\n  removeTopic(id: $removeTopicId) {\n    id\n    name\n  }\n}\n\nmutation removeSubtopic($removeSubtopicId: Int!) {\n  removeSubtopic(id: $removeSubtopicId) {\n    name\n    id\n  }\n}": types.GetSubjectsDocument,
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
export function graphql(source: "query GetSubjects {\n  subjects {\n    color\n    name\n    id\n    Topics {\n      name\n    }\n  }\n}\n\nquery GetUser($where: UserWhereUniqueInput!) {\n  user(where: $where) {\n    name\n    lastname\n    role\n    organizationId\n    email\n    externalId\n    id\n  }\n}\n\nquery GetSubjectsPaths {\n  subjects {\n    id\n  }\n}\n\nquery GetSubject($subjectId: Int!, $topicId: Int!) {\n  subject(id: $subjectId) {\n    id\n    name\n    color\n    Topics {\n      name\n      id\n    }\n  }\n  topicAndSubtopic(id: $topicId) {\n    name\n    id\n    Subtopics {\n      _count {\n        Notes\n      }\n      id\n      name\n      Notes {\n        type\n        File {\n          title\n          externalId\n          id\n        }\n      }\n    }\n  }\n}\n\nquery GetNotes($where: NoteWhereInput) {\n  notes(where: $where) {\n    File {\n      id\n      title\n    }\n  }\n}\n\nquery GetUserByEmail($email: String!) {\n  userByEmail(email: $email) {\n    email\n    id\n    lastname\n    name\n    role\n  }\n}\n\nquery GetUsers($where: UserWhereInput) {\n  users(where: $where) {\n    lastname\n    name\n    role\n    email\n  }\n}\n\nquery GetOrganization {\n  organizations {\n    id\n    name\n  }\n}\n\nquery GetGroups($where: GroupWhereInput) {\n  groups(where: $where) {\n    id\n    name\n  }\n}\n\nmutation CreateGroup($createGroupInput: GroupCreateInput!) {\n  createGroup(createGroupInput: $createGroupInput) {\n    name\n  }\n}\n\nmutation CreateTopic($createTopicInput: TopicCreateInput!) {\n  createTopic(createTopicInput: $createTopicInput) {\n    name\n    id\n  }\n}\n\nmutation CreateSubtopic($createSubtopicInput: SubtopicCreateInput!) {\n  createSubtopic(createSubtopicInput: $createSubtopicInput) {\n    id\n    name\n  }\n}\n\nmutation UpdateTopic($updateTopicId: Float!, $updateTopicInput: TopicUpdateInput!) {\n  updateTopic(id: $updateTopicId, updateTopicInput: $updateTopicInput) {\n    name\n    id\n  }\n}\n\nmutation UpdateSubtopic($updateSubtopicId: Float!, $updateSubtopicInput: SubtopicUpdateInput!) {\n  updateSubtopic(id: $updateSubtopicId, updateSubtopicInput: $updateSubtopicInput) {\n    id\n  }\n}\n\nmutation UpdateGroup($updateGroupId: Float!, $updateGroupInput: GroupUpdateInput!) {\n  updateGroup(id: $updateGroupId, updateGroupInput: $updateGroupInput) {\n    id\n    name\n  }\n}\n\nmutation UpdateSubject($updateSubjectId: Float!, $updateSubjectInput: SubjectUpdateInput!) {\n  updateSubject(id: $updateSubjectId, updateSubjectInput: $updateSubjectInput) {\n    name\n    id\n  }\n}\n\nmutation CreateSubject($createSubjectInput: SubjectCreateInput!) {\n  createSubject(createSubjectInput: $createSubjectInput) {\n    id\n    name\n  }\n}\n\nmutation createUser($createUserInput: UserCreateInput!) {\n  createUser(createUserInput: $createUserInput) {\n    id\n    email\n  }\n}\n\nmutation RemoveUser($where: UserWhereUniqueInput!) {\n  removeUser(where: $where) {\n    id\n    name\n    lastname\n  }\n}\n\nmutation RemoveSubject($removeSubjectId: Int!) {\n  removeSubject(id: $removeSubjectId) {\n    id\n    name\n  }\n}\n\nmutation RemoveGroup($removeGroupId: Int!) {\n  removeGroup(id: $removeGroupId) {\n    id\n    name\n  }\n}\n\nmutation UpdateUser($where: UserWhereUniqueInput!, $updateUserInput: UserUpdateInput!) {\n  updateUser(where: $where, updateUserInput: $updateUserInput) {\n    id\n  }\n}\n\nmutation RemoveTopic($removeTopicId: Int!) {\n  removeTopic(id: $removeTopicId) {\n    id\n    name\n  }\n}\n\nmutation removeSubtopic($removeSubtopicId: Int!) {\n  removeSubtopic(id: $removeSubtopicId) {\n    name\n    id\n  }\n}"): (typeof documents)["query GetSubjects {\n  subjects {\n    color\n    name\n    id\n    Topics {\n      name\n    }\n  }\n}\n\nquery GetUser($where: UserWhereUniqueInput!) {\n  user(where: $where) {\n    name\n    lastname\n    role\n    organizationId\n    email\n    externalId\n    id\n  }\n}\n\nquery GetSubjectsPaths {\n  subjects {\n    id\n  }\n}\n\nquery GetSubject($subjectId: Int!, $topicId: Int!) {\n  subject(id: $subjectId) {\n    id\n    name\n    color\n    Topics {\n      name\n      id\n    }\n  }\n  topicAndSubtopic(id: $topicId) {\n    name\n    id\n    Subtopics {\n      _count {\n        Notes\n      }\n      id\n      name\n      Notes {\n        type\n        File {\n          title\n          externalId\n          id\n        }\n      }\n    }\n  }\n}\n\nquery GetNotes($where: NoteWhereInput) {\n  notes(where: $where) {\n    File {\n      id\n      title\n    }\n  }\n}\n\nquery GetUserByEmail($email: String!) {\n  userByEmail(email: $email) {\n    email\n    id\n    lastname\n    name\n    role\n  }\n}\n\nquery GetUsers($where: UserWhereInput) {\n  users(where: $where) {\n    lastname\n    name\n    role\n    email\n  }\n}\n\nquery GetOrganization {\n  organizations {\n    id\n    name\n  }\n}\n\nquery GetGroups($where: GroupWhereInput) {\n  groups(where: $where) {\n    id\n    name\n  }\n}\n\nmutation CreateGroup($createGroupInput: GroupCreateInput!) {\n  createGroup(createGroupInput: $createGroupInput) {\n    name\n  }\n}\n\nmutation CreateTopic($createTopicInput: TopicCreateInput!) {\n  createTopic(createTopicInput: $createTopicInput) {\n    name\n    id\n  }\n}\n\nmutation CreateSubtopic($createSubtopicInput: SubtopicCreateInput!) {\n  createSubtopic(createSubtopicInput: $createSubtopicInput) {\n    id\n    name\n  }\n}\n\nmutation UpdateTopic($updateTopicId: Float!, $updateTopicInput: TopicUpdateInput!) {\n  updateTopic(id: $updateTopicId, updateTopicInput: $updateTopicInput) {\n    name\n    id\n  }\n}\n\nmutation UpdateSubtopic($updateSubtopicId: Float!, $updateSubtopicInput: SubtopicUpdateInput!) {\n  updateSubtopic(id: $updateSubtopicId, updateSubtopicInput: $updateSubtopicInput) {\n    id\n  }\n}\n\nmutation UpdateGroup($updateGroupId: Float!, $updateGroupInput: GroupUpdateInput!) {\n  updateGroup(id: $updateGroupId, updateGroupInput: $updateGroupInput) {\n    id\n    name\n  }\n}\n\nmutation UpdateSubject($updateSubjectId: Float!, $updateSubjectInput: SubjectUpdateInput!) {\n  updateSubject(id: $updateSubjectId, updateSubjectInput: $updateSubjectInput) {\n    name\n    id\n  }\n}\n\nmutation CreateSubject($createSubjectInput: SubjectCreateInput!) {\n  createSubject(createSubjectInput: $createSubjectInput) {\n    id\n    name\n  }\n}\n\nmutation createUser($createUserInput: UserCreateInput!) {\n  createUser(createUserInput: $createUserInput) {\n    id\n    email\n  }\n}\n\nmutation RemoveUser($where: UserWhereUniqueInput!) {\n  removeUser(where: $where) {\n    id\n    name\n    lastname\n  }\n}\n\nmutation RemoveSubject($removeSubjectId: Int!) {\n  removeSubject(id: $removeSubjectId) {\n    id\n    name\n  }\n}\n\nmutation RemoveGroup($removeGroupId: Int!) {\n  removeGroup(id: $removeGroupId) {\n    id\n    name\n  }\n}\n\nmutation UpdateUser($where: UserWhereUniqueInput!, $updateUserInput: UserUpdateInput!) {\n  updateUser(where: $where, updateUserInput: $updateUserInput) {\n    id\n  }\n}\n\nmutation RemoveTopic($removeTopicId: Int!) {\n  removeTopic(id: $removeTopicId) {\n    id\n    name\n  }\n}\n\nmutation removeSubtopic($removeSubtopicId: Int!) {\n  removeSubtopic(id: $removeSubtopicId) {\n    name\n    id\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;