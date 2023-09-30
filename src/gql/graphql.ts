/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type EnumPrivacityFieldUpdateOperationsInput = {
  set?: InputMaybe<Privacity>;
};

export type EnumPrivacityFilter = {
  equals?: InputMaybe<Privacity>;
  in?: InputMaybe<Array<Privacity>>;
  not?: InputMaybe<NestedEnumPrivacityFilter>;
  notIn?: InputMaybe<Array<Privacity>>;
};

export type EnumRoleFieldUpdateOperationsInput = {
  set?: InputMaybe<Role>;
};

export type EnumRoleFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<NestedEnumRoleFilter>;
  notIn?: InputMaybe<Array<Role>>;
};

export type EnumTypesFieldUpdateOperationsInput = {
  set?: InputMaybe<Types>;
};

export type EnumTypesFilter = {
  equals?: InputMaybe<Types>;
  in?: InputMaybe<Array<Types>>;
  not?: InputMaybe<NestedEnumTypesFilter>;
  notIn?: InputMaybe<Array<Types>>;
};

export type File = {
  __typename?: 'File';
  Author: User;
  Note?: Maybe<Note>;
  authorId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  externalId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  noteId?: Maybe<Scalars['Int']['output']>;
  privacity: Privacity;
  title: Scalars['String']['output'];
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type FileCreateManyAuthorInput = {
  content: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  externalId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  noteId?: InputMaybe<Scalars['Int']['input']>;
  privacity: Privacity;
  title: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FileCreateManyAuthorInputEnvelope = {
  data: Array<FileCreateManyAuthorInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type FileCreateNestedManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<FileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<FileCreateOrConnectWithoutAuthorInput>>;
  create?: InputMaybe<Array<FileCreateWithoutAuthorInput>>;
  createMany?: InputMaybe<FileCreateManyAuthorInputEnvelope>;
};

export type FileCreateNestedOneWithoutNoteInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutNoteInput>;
  create?: InputMaybe<FileCreateWithoutNoteInput>;
};

export type FileCreateOrConnectWithoutAuthorInput = {
  create: FileCreateWithoutAuthorInput;
  where: FileWhereUniqueInput;
};

export type FileCreateOrConnectWithoutNoteInput = {
  create: FileCreateWithoutNoteInput;
  where: FileWhereUniqueInput;
};

export type FileCreateWithoutAuthorInput = {
  Note?: InputMaybe<NoteCreateNestedOneWithoutFileInput>;
  content: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  externalId: Scalars['String']['input'];
  privacity: Privacity;
  title: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FileCreateWithoutNoteInput = {
  Author: UserCreateNestedOneWithoutFileInput;
  content: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  externalId: Scalars['String']['input'];
  privacity: Privacity;
  title: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type FileListRelationFilter = {
  every?: InputMaybe<FileWhereInput>;
  none?: InputMaybe<FileWhereInput>;
  some?: InputMaybe<FileWhereInput>;
};

export type FileNullableRelationFilter = {
  is?: InputMaybe<FileWhereInput>;
  isNot?: InputMaybe<FileWhereInput>;
};

export type FileScalarWhereInput = {
  AND?: InputMaybe<Array<FileScalarWhereInput>>;
  NOT?: InputMaybe<Array<FileScalarWhereInput>>;
  OR?: InputMaybe<Array<FileScalarWhereInput>>;
  authorId?: InputMaybe<IntFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  externalId?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  noteId?: InputMaybe<IntNullableFilter>;
  privacity?: InputMaybe<EnumPrivacityFilter>;
  title?: InputMaybe<StringFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type FileUpdateManyMutationInput = {
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  privacity?: InputMaybe<EnumPrivacityFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type FileUpdateManyWithWhereWithoutAuthorInput = {
  data: FileUpdateManyMutationInput;
  where: FileScalarWhereInput;
};

export type FileUpdateManyWithoutAuthorNestedInput = {
  connect?: InputMaybe<Array<FileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<FileCreateOrConnectWithoutAuthorInput>>;
  create?: InputMaybe<Array<FileCreateWithoutAuthorInput>>;
  createMany?: InputMaybe<FileCreateManyAuthorInputEnvelope>;
  delete?: InputMaybe<Array<FileWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<FileScalarWhereInput>>;
  disconnect?: InputMaybe<Array<FileWhereUniqueInput>>;
  set?: InputMaybe<Array<FileWhereUniqueInput>>;
  update?: InputMaybe<Array<FileUpdateWithWhereUniqueWithoutAuthorInput>>;
  updateMany?: InputMaybe<Array<FileUpdateManyWithWhereWithoutAuthorInput>>;
  upsert?: InputMaybe<Array<FileUpsertWithWhereUniqueWithoutAuthorInput>>;
};

export type FileUpdateOneWithoutNoteNestedInput = {
  connect?: InputMaybe<FileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<FileCreateOrConnectWithoutNoteInput>;
  create?: InputMaybe<FileCreateWithoutNoteInput>;
  delete?: InputMaybe<FileWhereInput>;
  disconnect?: InputMaybe<FileWhereInput>;
  update?: InputMaybe<FileUpdateToOneWithWhereWithoutNoteInput>;
  upsert?: InputMaybe<FileUpsertWithoutNoteInput>;
};

export type FileUpdateToOneWithWhereWithoutNoteInput = {
  data: FileUpdateWithoutNoteInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileUpdateWithWhereUniqueWithoutAuthorInput = {
  data: FileUpdateWithoutAuthorInput;
  where: FileWhereUniqueInput;
};

export type FileUpdateWithoutAuthorInput = {
  Note?: InputMaybe<NoteUpdateOneWithoutFileNestedInput>;
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  privacity?: InputMaybe<EnumPrivacityFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type FileUpdateWithoutNoteInput = {
  Author?: InputMaybe<UserUpdateOneRequiredWithoutFileNestedInput>;
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  privacity?: InputMaybe<EnumPrivacityFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type FileUpsertWithWhereUniqueWithoutAuthorInput = {
  create: FileCreateWithoutAuthorInput;
  update: FileUpdateWithoutAuthorInput;
  where: FileWhereUniqueInput;
};

export type FileUpsertWithoutNoteInput = {
  create: FileCreateWithoutNoteInput;
  update: FileUpdateWithoutNoteInput;
  where?: InputMaybe<FileWhereInput>;
};

export type FileWhereInput = {
  AND?: InputMaybe<Array<FileWhereInput>>;
  Author?: InputMaybe<UserRelationFilter>;
  NOT?: InputMaybe<Array<FileWhereInput>>;
  Note?: InputMaybe<NoteNullableRelationFilter>;
  OR?: InputMaybe<Array<FileWhereInput>>;
  authorId?: InputMaybe<IntFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  externalId?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  noteId?: InputMaybe<IntNullableFilter>;
  privacity?: InputMaybe<EnumPrivacityFilter>;
  title?: InputMaybe<StringFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type FileWhereUniqueInput = {
  AND?: InputMaybe<Array<FileWhereInput>>;
  Author?: InputMaybe<UserRelationFilter>;
  NOT?: InputMaybe<Array<FileWhereInput>>;
  Note?: InputMaybe<NoteNullableRelationFilter>;
  OR?: InputMaybe<Array<FileWhereInput>>;
  authorId?: InputMaybe<IntFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  noteId?: InputMaybe<Scalars['Int']['input']>;
  privacity?: InputMaybe<EnumPrivacityFilter>;
  title?: InputMaybe<StringFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type Group = {
  __typename?: 'Group';
  Organization: Organization;
  Users?: Maybe<Array<User>>;
  _count: GroupCount;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organizationId: Scalars['Int']['output'];
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type GroupCount = {
  __typename?: 'GroupCount';
  Users: Scalars['Int']['output'];
};

export type GroupCreateInput = {
  Organization: OrganizationCreateNestedOneWithoutGroupsInput;
  Users?: InputMaybe<UserCreateNestedManyWithoutGroupInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GroupCreateManyOrganizationInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GroupCreateManyOrganizationInputEnvelope = {
  data: Array<GroupCreateManyOrganizationInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GroupCreateNestedManyWithoutOrganizationInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GroupCreateOrConnectWithoutOrganizationInput>>;
  create?: InputMaybe<Array<GroupCreateWithoutOrganizationInput>>;
  createMany?: InputMaybe<GroupCreateManyOrganizationInputEnvelope>;
};

export type GroupCreateNestedManyWithoutUsersInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GroupCreateOrConnectWithoutUsersInput>>;
  create?: InputMaybe<Array<GroupCreateWithoutUsersInput>>;
};

export type GroupCreateOrConnectWithoutOrganizationInput = {
  create: GroupCreateWithoutOrganizationInput;
  where: GroupWhereUniqueInput;
};

export type GroupCreateOrConnectWithoutUsersInput = {
  create: GroupCreateWithoutUsersInput;
  where: GroupWhereUniqueInput;
};

export type GroupCreateWithoutOrganizationInput = {
  Users?: InputMaybe<UserCreateNestedManyWithoutGroupInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GroupCreateWithoutUsersInput = {
  Organization: OrganizationCreateNestedOneWithoutGroupsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GroupListRelationFilter = {
  every?: InputMaybe<GroupWhereInput>;
  none?: InputMaybe<GroupWhereInput>;
  some?: InputMaybe<GroupWhereInput>;
};

export type GroupScalarWhereInput = {
  AND?: InputMaybe<Array<GroupScalarWhereInput>>;
  NOT?: InputMaybe<Array<GroupScalarWhereInput>>;
  OR?: InputMaybe<Array<GroupScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  organizationId?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type GroupUpdateInput = {
  Organization?: InputMaybe<OrganizationUpdateOneRequiredWithoutGroupsNestedInput>;
  Users?: InputMaybe<UserUpdateManyWithoutGroupNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type GroupUpdateManyMutationInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type GroupUpdateManyWithWhereWithoutOrganizationInput = {
  data: GroupUpdateManyMutationInput;
  where: GroupScalarWhereInput;
};

export type GroupUpdateManyWithWhereWithoutUsersInput = {
  data: GroupUpdateManyMutationInput;
  where: GroupScalarWhereInput;
};

export type GroupUpdateManyWithoutOrganizationNestedInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GroupCreateOrConnectWithoutOrganizationInput>>;
  create?: InputMaybe<Array<GroupCreateWithoutOrganizationInput>>;
  createMany?: InputMaybe<GroupCreateManyOrganizationInputEnvelope>;
  delete?: InputMaybe<Array<GroupWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<GroupScalarWhereInput>>;
  disconnect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  set?: InputMaybe<Array<GroupWhereUniqueInput>>;
  update?: InputMaybe<Array<GroupUpdateWithWhereUniqueWithoutOrganizationInput>>;
  updateMany?: InputMaybe<Array<GroupUpdateManyWithWhereWithoutOrganizationInput>>;
  upsert?: InputMaybe<Array<GroupUpsertWithWhereUniqueWithoutOrganizationInput>>;
};

export type GroupUpdateManyWithoutUsersNestedInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GroupCreateOrConnectWithoutUsersInput>>;
  create?: InputMaybe<Array<GroupCreateWithoutUsersInput>>;
  delete?: InputMaybe<Array<GroupWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<GroupScalarWhereInput>>;
  disconnect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  set?: InputMaybe<Array<GroupWhereUniqueInput>>;
  update?: InputMaybe<Array<GroupUpdateWithWhereUniqueWithoutUsersInput>>;
  updateMany?: InputMaybe<Array<GroupUpdateManyWithWhereWithoutUsersInput>>;
  upsert?: InputMaybe<Array<GroupUpsertWithWhereUniqueWithoutUsersInput>>;
};

export type GroupUpdateWithWhereUniqueWithoutOrganizationInput = {
  data: GroupUpdateWithoutOrganizationInput;
  where: GroupWhereUniqueInput;
};

export type GroupUpdateWithWhereUniqueWithoutUsersInput = {
  data: GroupUpdateWithoutUsersInput;
  where: GroupWhereUniqueInput;
};

export type GroupUpdateWithoutOrganizationInput = {
  Users?: InputMaybe<UserUpdateManyWithoutGroupNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type GroupUpdateWithoutUsersInput = {
  Organization?: InputMaybe<OrganizationUpdateOneRequiredWithoutGroupsNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type GroupUpsertWithWhereUniqueWithoutOrganizationInput = {
  create: GroupCreateWithoutOrganizationInput;
  update: GroupUpdateWithoutOrganizationInput;
  where: GroupWhereUniqueInput;
};

export type GroupUpsertWithWhereUniqueWithoutUsersInput = {
  create: GroupCreateWithoutUsersInput;
  update: GroupUpdateWithoutUsersInput;
  where: GroupWhereUniqueInput;
};

export type GroupWhereInput = {
  AND?: InputMaybe<Array<GroupWhereInput>>;
  NOT?: InputMaybe<Array<GroupWhereInput>>;
  OR?: InputMaybe<Array<GroupWhereInput>>;
  Organization?: InputMaybe<OrganizationRelationFilter>;
  Users?: InputMaybe<UserListRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  organizationId?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type GroupWhereUniqueInput = {
  AND?: InputMaybe<Array<GroupWhereInput>>;
  NOT?: InputMaybe<Array<GroupWhereInput>>;
  OR?: InputMaybe<Array<GroupWhereInput>>;
  Organization?: InputMaybe<OrganizationRelationFilter>;
  Users?: InputMaybe<UserListRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<StringFilter>;
  organizationId?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type IntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']['input']>;
  divide?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  multiply?: InputMaybe<Scalars['Int']['input']>;
  set?: InputMaybe<Scalars['Int']['input']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createGroup: Group;
  createNote: Note;
  createOrganization: Organization;
  createScore: Score;
  createSubject: Subject;
  createSubtopic: Subtopic;
  createTopic: Topic;
  createUser: User;
  removeGroup: Group;
  removeNote: Note;
  removeOrganization: Organization;
  removeScore: Score;
  removeSubject: Subject;
  removeSubtopic: Subtopic;
  removeTopic: Topic;
  removeUser: User;
  updateGroup: Group;
  updateNote: Note;
  updateOrganization: Organization;
  updateScore: Score;
  updateSubject: Subject;
  updateSubtopic: Subtopic;
  updateTopic: Topic;
  updateUser: User;
};


export type MutationCreateGroupArgs = {
  createGroupInput: GroupCreateInput;
};


export type MutationCreateNoteArgs = {
  createNoteInput: NoteCreateInput;
};


export type MutationCreateOrganizationArgs = {
  createOrganizationInput: OrganizationCreateInput;
};


export type MutationCreateScoreArgs = {
  createScoreInput: ScoreCreateInput;
};


export type MutationCreateSubjectArgs = {
  createSubjectInput: SubjectCreateInput;
};


export type MutationCreateSubtopicArgs = {
  createSubtopicInput: SubtopicCreateInput;
};


export type MutationCreateTopicArgs = {
  createTopicInput: TopicCreateInput;
};


export type MutationCreateUserArgs = {
  createUserInput: UserCreateInput;
};


export type MutationRemoveGroupArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveNoteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveOrganizationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveScoreArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveSubjectArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveSubtopicArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTopicArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationUpdateGroupArgs = {
  id: Scalars['Float']['input'];
  updateGroupInput: GroupUpdateInput;
};


export type MutationUpdateNoteArgs = {
  id: Scalars['Float']['input'];
  updateNoteInput: NoteUpdateInput;
};


export type MutationUpdateOrganizationArgs = {
  id: Scalars['Float']['input'];
  updateOrganizationInput: OrganizationUpdateInput;
};


export type MutationUpdateScoreArgs = {
  id: Scalars['Float']['input'];
  updateScoreInput: ScoreUpdateInput;
};


export type MutationUpdateSubjectArgs = {
  id: Scalars['Float']['input'];
  updateSubjectInput: SubjectUpdateInput;
};


export type MutationUpdateSubtopicArgs = {
  id: Scalars['Float']['input'];
  updateSubtopicInput: SubtopicUpdateInput;
};


export type MutationUpdateTopicArgs = {
  id: Scalars['Float']['input'];
  updateTopicInput: TopicUpdateInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedEnumPrivacityFilter = {
  equals?: InputMaybe<Privacity>;
  in?: InputMaybe<Array<Privacity>>;
  not?: InputMaybe<NestedEnumPrivacityFilter>;
  notIn?: InputMaybe<Array<Privacity>>;
};

export type NestedEnumRoleFilter = {
  equals?: InputMaybe<Role>;
  in?: InputMaybe<Array<Role>>;
  not?: InputMaybe<NestedEnumRoleFilter>;
  notIn?: InputMaybe<Array<Role>>;
};

export type NestedEnumTypesFilter = {
  equals?: InputMaybe<Types>;
  in?: InputMaybe<Array<Types>>;
  not?: InputMaybe<NestedEnumTypesFilter>;
  notIn?: InputMaybe<Array<Types>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Note = {
  __typename?: 'Note';
  File?: Maybe<File>;
  Scores?: Maybe<Array<Score>>;
  Subject?: Maybe<Subject>;
  Subtopic?: Maybe<Subtopic>;
  Topic?: Maybe<Topic>;
  _count: NoteCount;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  fileId?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  subjectId?: Maybe<Scalars['Int']['output']>;
  subtopicId?: Maybe<Scalars['Int']['output']>;
  topicId?: Maybe<Scalars['Int']['output']>;
  type: Types;
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type NoteCount = {
  __typename?: 'NoteCount';
  Scores: Scalars['Int']['output'];
};

export type NoteCreateInput = {
  File?: InputMaybe<FileCreateNestedOneWithoutNoteInput>;
  Scores?: InputMaybe<ScoreCreateNestedManyWithoutNoteInput>;
  Subject?: InputMaybe<SubjectCreateNestedOneWithoutNotesInput>;
  Subtopic?: InputMaybe<SubtopicCreateNestedOneWithoutNotesInput>;
  Topic?: InputMaybe<TopicCreateNestedOneWithoutNotesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['Int']['input']>;
  type: Types;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type NoteCreateManySubjectInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  subtopicId?: InputMaybe<Scalars['Int']['input']>;
  topicId?: InputMaybe<Scalars['Int']['input']>;
  type: Types;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type NoteCreateManySubjectInputEnvelope = {
  data: Array<NoteCreateManySubjectInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type NoteCreateManySubtopicInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  subjectId?: InputMaybe<Scalars['Int']['input']>;
  topicId?: InputMaybe<Scalars['Int']['input']>;
  type: Types;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type NoteCreateManySubtopicInputEnvelope = {
  data: Array<NoteCreateManySubtopicInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type NoteCreateManyTopicInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  subjectId?: InputMaybe<Scalars['Int']['input']>;
  subtopicId?: InputMaybe<Scalars['Int']['input']>;
  type: Types;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type NoteCreateManyTopicInputEnvelope = {
  data: Array<NoteCreateManyTopicInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type NoteCreateNestedManyWithoutSubjectInput = {
  connect?: InputMaybe<Array<NoteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NoteCreateOrConnectWithoutSubjectInput>>;
  create?: InputMaybe<Array<NoteCreateWithoutSubjectInput>>;
  createMany?: InputMaybe<NoteCreateManySubjectInputEnvelope>;
};

export type NoteCreateNestedManyWithoutSubtopicInput = {
  connect?: InputMaybe<Array<NoteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NoteCreateOrConnectWithoutSubtopicInput>>;
  create?: InputMaybe<Array<NoteCreateWithoutSubtopicInput>>;
  createMany?: InputMaybe<NoteCreateManySubtopicInputEnvelope>;
};

export type NoteCreateNestedManyWithoutTopicInput = {
  connect?: InputMaybe<Array<NoteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NoteCreateOrConnectWithoutTopicInput>>;
  create?: InputMaybe<Array<NoteCreateWithoutTopicInput>>;
  createMany?: InputMaybe<NoteCreateManyTopicInputEnvelope>;
};

export type NoteCreateNestedOneWithoutFileInput = {
  connect?: InputMaybe<NoteWhereUniqueInput>;
  connectOrCreate?: InputMaybe<NoteCreateOrConnectWithoutFileInput>;
  create?: InputMaybe<NoteCreateWithoutFileInput>;
};

export type NoteCreateNestedOneWithoutScoresInput = {
  connect?: InputMaybe<NoteWhereUniqueInput>;
  connectOrCreate?: InputMaybe<NoteCreateOrConnectWithoutScoresInput>;
  create?: InputMaybe<NoteCreateWithoutScoresInput>;
};

export type NoteCreateOrConnectWithoutFileInput = {
  create: NoteCreateWithoutFileInput;
  where: NoteWhereUniqueInput;
};

export type NoteCreateOrConnectWithoutScoresInput = {
  create: NoteCreateWithoutScoresInput;
  where: NoteWhereUniqueInput;
};

export type NoteCreateOrConnectWithoutSubjectInput = {
  create: NoteCreateWithoutSubjectInput;
  where: NoteWhereUniqueInput;
};

export type NoteCreateOrConnectWithoutSubtopicInput = {
  create: NoteCreateWithoutSubtopicInput;
  where: NoteWhereUniqueInput;
};

export type NoteCreateOrConnectWithoutTopicInput = {
  create: NoteCreateWithoutTopicInput;
  where: NoteWhereUniqueInput;
};

export type NoteCreateWithoutFileInput = {
  Scores?: InputMaybe<ScoreCreateNestedManyWithoutNoteInput>;
  Subject?: InputMaybe<SubjectCreateNestedOneWithoutNotesInput>;
  Subtopic?: InputMaybe<SubtopicCreateNestedOneWithoutNotesInput>;
  Topic?: InputMaybe<TopicCreateNestedOneWithoutNotesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['Int']['input']>;
  type: Types;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type NoteCreateWithoutScoresInput = {
  File?: InputMaybe<FileCreateNestedOneWithoutNoteInput>;
  Subject?: InputMaybe<SubjectCreateNestedOneWithoutNotesInput>;
  Subtopic?: InputMaybe<SubtopicCreateNestedOneWithoutNotesInput>;
  Topic?: InputMaybe<TopicCreateNestedOneWithoutNotesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['Int']['input']>;
  type: Types;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type NoteCreateWithoutSubjectInput = {
  File?: InputMaybe<FileCreateNestedOneWithoutNoteInput>;
  Scores?: InputMaybe<ScoreCreateNestedManyWithoutNoteInput>;
  Subtopic?: InputMaybe<SubtopicCreateNestedOneWithoutNotesInput>;
  Topic?: InputMaybe<TopicCreateNestedOneWithoutNotesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['Int']['input']>;
  type: Types;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type NoteCreateWithoutSubtopicInput = {
  File?: InputMaybe<FileCreateNestedOneWithoutNoteInput>;
  Scores?: InputMaybe<ScoreCreateNestedManyWithoutNoteInput>;
  Subject?: InputMaybe<SubjectCreateNestedOneWithoutNotesInput>;
  Topic?: InputMaybe<TopicCreateNestedOneWithoutNotesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['Int']['input']>;
  type: Types;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type NoteCreateWithoutTopicInput = {
  File?: InputMaybe<FileCreateNestedOneWithoutNoteInput>;
  Scores?: InputMaybe<ScoreCreateNestedManyWithoutNoteInput>;
  Subject?: InputMaybe<SubjectCreateNestedOneWithoutNotesInput>;
  Subtopic?: InputMaybe<SubtopicCreateNestedOneWithoutNotesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  fileId?: InputMaybe<Scalars['Int']['input']>;
  type: Types;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type NoteListRelationFilter = {
  every?: InputMaybe<NoteWhereInput>;
  none?: InputMaybe<NoteWhereInput>;
  some?: InputMaybe<NoteWhereInput>;
};

export type NoteNullableRelationFilter = {
  is?: InputMaybe<NoteWhereInput>;
  isNot?: InputMaybe<NoteWhereInput>;
};

export type NoteScalarWhereInput = {
  AND?: InputMaybe<Array<NoteScalarWhereInput>>;
  NOT?: InputMaybe<Array<NoteScalarWhereInput>>;
  OR?: InputMaybe<Array<NoteScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  fileId?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IntFilter>;
  subjectId?: InputMaybe<IntNullableFilter>;
  subtopicId?: InputMaybe<IntNullableFilter>;
  topicId?: InputMaybe<IntNullableFilter>;
  type?: InputMaybe<EnumTypesFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type NoteUpdateInput = {
  File?: InputMaybe<FileUpdateOneWithoutNoteNestedInput>;
  Scores?: InputMaybe<ScoreUpdateManyWithoutNoteNestedInput>;
  Subject?: InputMaybe<SubjectUpdateOneWithoutNotesNestedInput>;
  Subtopic?: InputMaybe<SubtopicUpdateOneWithoutNotesNestedInput>;
  Topic?: InputMaybe<TopicUpdateOneWithoutNotesNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  fileId?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumTypesFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type NoteUpdateManyMutationInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  fileId?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumTypesFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type NoteUpdateManyWithWhereWithoutSubjectInput = {
  data: NoteUpdateManyMutationInput;
  where: NoteScalarWhereInput;
};

export type NoteUpdateManyWithWhereWithoutSubtopicInput = {
  data: NoteUpdateManyMutationInput;
  where: NoteScalarWhereInput;
};

export type NoteUpdateManyWithWhereWithoutTopicInput = {
  data: NoteUpdateManyMutationInput;
  where: NoteScalarWhereInput;
};

export type NoteUpdateManyWithoutSubjectNestedInput = {
  connect?: InputMaybe<Array<NoteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NoteCreateOrConnectWithoutSubjectInput>>;
  create?: InputMaybe<Array<NoteCreateWithoutSubjectInput>>;
  createMany?: InputMaybe<NoteCreateManySubjectInputEnvelope>;
  delete?: InputMaybe<Array<NoteWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<NoteScalarWhereInput>>;
  disconnect?: InputMaybe<Array<NoteWhereUniqueInput>>;
  set?: InputMaybe<Array<NoteWhereUniqueInput>>;
  update?: InputMaybe<Array<NoteUpdateWithWhereUniqueWithoutSubjectInput>>;
  updateMany?: InputMaybe<Array<NoteUpdateManyWithWhereWithoutSubjectInput>>;
  upsert?: InputMaybe<Array<NoteUpsertWithWhereUniqueWithoutSubjectInput>>;
};

export type NoteUpdateManyWithoutSubtopicNestedInput = {
  connect?: InputMaybe<Array<NoteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NoteCreateOrConnectWithoutSubtopicInput>>;
  create?: InputMaybe<Array<NoteCreateWithoutSubtopicInput>>;
  createMany?: InputMaybe<NoteCreateManySubtopicInputEnvelope>;
  delete?: InputMaybe<Array<NoteWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<NoteScalarWhereInput>>;
  disconnect?: InputMaybe<Array<NoteWhereUniqueInput>>;
  set?: InputMaybe<Array<NoteWhereUniqueInput>>;
  update?: InputMaybe<Array<NoteUpdateWithWhereUniqueWithoutSubtopicInput>>;
  updateMany?: InputMaybe<Array<NoteUpdateManyWithWhereWithoutSubtopicInput>>;
  upsert?: InputMaybe<Array<NoteUpsertWithWhereUniqueWithoutSubtopicInput>>;
};

export type NoteUpdateManyWithoutTopicNestedInput = {
  connect?: InputMaybe<Array<NoteWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<NoteCreateOrConnectWithoutTopicInput>>;
  create?: InputMaybe<Array<NoteCreateWithoutTopicInput>>;
  createMany?: InputMaybe<NoteCreateManyTopicInputEnvelope>;
  delete?: InputMaybe<Array<NoteWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<NoteScalarWhereInput>>;
  disconnect?: InputMaybe<Array<NoteWhereUniqueInput>>;
  set?: InputMaybe<Array<NoteWhereUniqueInput>>;
  update?: InputMaybe<Array<NoteUpdateWithWhereUniqueWithoutTopicInput>>;
  updateMany?: InputMaybe<Array<NoteUpdateManyWithWhereWithoutTopicInput>>;
  upsert?: InputMaybe<Array<NoteUpsertWithWhereUniqueWithoutTopicInput>>;
};

export type NoteUpdateOneWithoutFileNestedInput = {
  connect?: InputMaybe<NoteWhereUniqueInput>;
  connectOrCreate?: InputMaybe<NoteCreateOrConnectWithoutFileInput>;
  create?: InputMaybe<NoteCreateWithoutFileInput>;
  delete?: InputMaybe<NoteWhereInput>;
  disconnect?: InputMaybe<NoteWhereInput>;
  update?: InputMaybe<NoteUpdateToOneWithWhereWithoutFileInput>;
  upsert?: InputMaybe<NoteUpsertWithoutFileInput>;
};

export type NoteUpdateOneWithoutScoresNestedInput = {
  connect?: InputMaybe<NoteWhereUniqueInput>;
  connectOrCreate?: InputMaybe<NoteCreateOrConnectWithoutScoresInput>;
  create?: InputMaybe<NoteCreateWithoutScoresInput>;
  delete?: InputMaybe<NoteWhereInput>;
  disconnect?: InputMaybe<NoteWhereInput>;
  update?: InputMaybe<NoteUpdateToOneWithWhereWithoutScoresInput>;
  upsert?: InputMaybe<NoteUpsertWithoutScoresInput>;
};

export type NoteUpdateToOneWithWhereWithoutFileInput = {
  data: NoteUpdateWithoutFileInput;
  where?: InputMaybe<NoteWhereInput>;
};

export type NoteUpdateToOneWithWhereWithoutScoresInput = {
  data: NoteUpdateWithoutScoresInput;
  where?: InputMaybe<NoteWhereInput>;
};

export type NoteUpdateWithWhereUniqueWithoutSubjectInput = {
  data: NoteUpdateWithoutSubjectInput;
  where: NoteWhereUniqueInput;
};

export type NoteUpdateWithWhereUniqueWithoutSubtopicInput = {
  data: NoteUpdateWithoutSubtopicInput;
  where: NoteWhereUniqueInput;
};

export type NoteUpdateWithWhereUniqueWithoutTopicInput = {
  data: NoteUpdateWithoutTopicInput;
  where: NoteWhereUniqueInput;
};

export type NoteUpdateWithoutFileInput = {
  Scores?: InputMaybe<ScoreUpdateManyWithoutNoteNestedInput>;
  Subject?: InputMaybe<SubjectUpdateOneWithoutNotesNestedInput>;
  Subtopic?: InputMaybe<SubtopicUpdateOneWithoutNotesNestedInput>;
  Topic?: InputMaybe<TopicUpdateOneWithoutNotesNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  fileId?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumTypesFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type NoteUpdateWithoutScoresInput = {
  File?: InputMaybe<FileUpdateOneWithoutNoteNestedInput>;
  Subject?: InputMaybe<SubjectUpdateOneWithoutNotesNestedInput>;
  Subtopic?: InputMaybe<SubtopicUpdateOneWithoutNotesNestedInput>;
  Topic?: InputMaybe<TopicUpdateOneWithoutNotesNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  fileId?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumTypesFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type NoteUpdateWithoutSubjectInput = {
  File?: InputMaybe<FileUpdateOneWithoutNoteNestedInput>;
  Scores?: InputMaybe<ScoreUpdateManyWithoutNoteNestedInput>;
  Subtopic?: InputMaybe<SubtopicUpdateOneWithoutNotesNestedInput>;
  Topic?: InputMaybe<TopicUpdateOneWithoutNotesNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  fileId?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumTypesFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type NoteUpdateWithoutSubtopicInput = {
  File?: InputMaybe<FileUpdateOneWithoutNoteNestedInput>;
  Scores?: InputMaybe<ScoreUpdateManyWithoutNoteNestedInput>;
  Subject?: InputMaybe<SubjectUpdateOneWithoutNotesNestedInput>;
  Topic?: InputMaybe<TopicUpdateOneWithoutNotesNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  fileId?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumTypesFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type NoteUpdateWithoutTopicInput = {
  File?: InputMaybe<FileUpdateOneWithoutNoteNestedInput>;
  Scores?: InputMaybe<ScoreUpdateManyWithoutNoteNestedInput>;
  Subject?: InputMaybe<SubjectUpdateOneWithoutNotesNestedInput>;
  Subtopic?: InputMaybe<SubtopicUpdateOneWithoutNotesNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  fileId?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumTypesFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type NoteUpsertWithWhereUniqueWithoutSubjectInput = {
  create: NoteCreateWithoutSubjectInput;
  update: NoteUpdateWithoutSubjectInput;
  where: NoteWhereUniqueInput;
};

export type NoteUpsertWithWhereUniqueWithoutSubtopicInput = {
  create: NoteCreateWithoutSubtopicInput;
  update: NoteUpdateWithoutSubtopicInput;
  where: NoteWhereUniqueInput;
};

export type NoteUpsertWithWhereUniqueWithoutTopicInput = {
  create: NoteCreateWithoutTopicInput;
  update: NoteUpdateWithoutTopicInput;
  where: NoteWhereUniqueInput;
};

export type NoteUpsertWithoutFileInput = {
  create: NoteCreateWithoutFileInput;
  update: NoteUpdateWithoutFileInput;
  where?: InputMaybe<NoteWhereInput>;
};

export type NoteUpsertWithoutScoresInput = {
  create: NoteCreateWithoutScoresInput;
  update: NoteUpdateWithoutScoresInput;
  where?: InputMaybe<NoteWhereInput>;
};

export type NoteWhereInput = {
  AND?: InputMaybe<Array<NoteWhereInput>>;
  File?: InputMaybe<FileNullableRelationFilter>;
  NOT?: InputMaybe<Array<NoteWhereInput>>;
  OR?: InputMaybe<Array<NoteWhereInput>>;
  Scores?: InputMaybe<ScoreListRelationFilter>;
  Subject?: InputMaybe<SubjectNullableRelationFilter>;
  Subtopic?: InputMaybe<SubtopicNullableRelationFilter>;
  Topic?: InputMaybe<TopicNullableRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  fileId?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IntFilter>;
  subjectId?: InputMaybe<IntNullableFilter>;
  subtopicId?: InputMaybe<IntNullableFilter>;
  topicId?: InputMaybe<IntNullableFilter>;
  type?: InputMaybe<EnumTypesFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type NoteWhereUniqueInput = {
  AND?: InputMaybe<Array<NoteWhereInput>>;
  File?: InputMaybe<FileNullableRelationFilter>;
  NOT?: InputMaybe<Array<NoteWhereInput>>;
  OR?: InputMaybe<Array<NoteWhereInput>>;
  Scores?: InputMaybe<ScoreListRelationFilter>;
  Subject?: InputMaybe<SubjectNullableRelationFilter>;
  Subtopic?: InputMaybe<SubtopicNullableRelationFilter>;
  Topic?: InputMaybe<TopicNullableRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  fileId?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  subjectId?: InputMaybe<IntNullableFilter>;
  subtopicId?: InputMaybe<IntNullableFilter>;
  topicId?: InputMaybe<IntNullableFilter>;
  type?: InputMaybe<EnumTypesFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']['input']>;
};

export type NullableIntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']['input']>;
  divide?: InputMaybe<Scalars['Int']['input']>;
  increment?: InputMaybe<Scalars['Int']['input']>;
  multiply?: InputMaybe<Scalars['Int']['input']>;
  set?: InputMaybe<Scalars['Int']['input']>;
};

export type Organization = {
  __typename?: 'Organization';
  Groups?: Maybe<Array<Group>>;
  Users?: Maybe<Array<User>>;
  _count: OrganizationCount;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type OrganizationCount = {
  __typename?: 'OrganizationCount';
  Groups: Scalars['Int']['output'];
  Users: Scalars['Int']['output'];
};

export type OrganizationCreateInput = {
  Groups?: InputMaybe<GroupCreateNestedManyWithoutOrganizationInput>;
  Users?: InputMaybe<UserCreateNestedManyWithoutOrganizationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type OrganizationCreateNestedOneWithoutGroupsInput = {
  connect?: InputMaybe<OrganizationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OrganizationCreateOrConnectWithoutGroupsInput>;
  create?: InputMaybe<OrganizationCreateWithoutGroupsInput>;
};

export type OrganizationCreateNestedOneWithoutUsersInput = {
  connect?: InputMaybe<OrganizationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OrganizationCreateOrConnectWithoutUsersInput>;
  create?: InputMaybe<OrganizationCreateWithoutUsersInput>;
};

export type OrganizationCreateOrConnectWithoutGroupsInput = {
  create: OrganizationCreateWithoutGroupsInput;
  where: OrganizationWhereUniqueInput;
};

export type OrganizationCreateOrConnectWithoutUsersInput = {
  create: OrganizationCreateWithoutUsersInput;
  where: OrganizationWhereUniqueInput;
};

export type OrganizationCreateWithoutGroupsInput = {
  Users?: InputMaybe<UserCreateNestedManyWithoutOrganizationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type OrganizationCreateWithoutUsersInput = {
  Groups?: InputMaybe<GroupCreateNestedManyWithoutOrganizationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type OrganizationRelationFilter = {
  is?: InputMaybe<OrganizationWhereInput>;
  isNot?: InputMaybe<OrganizationWhereInput>;
};

export type OrganizationUpdateInput = {
  Groups?: InputMaybe<GroupUpdateManyWithoutOrganizationNestedInput>;
  Users?: InputMaybe<UserUpdateManyWithoutOrganizationNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type OrganizationUpdateOneRequiredWithoutGroupsNestedInput = {
  connect?: InputMaybe<OrganizationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OrganizationCreateOrConnectWithoutGroupsInput>;
  create?: InputMaybe<OrganizationCreateWithoutGroupsInput>;
  update?: InputMaybe<OrganizationUpdateToOneWithWhereWithoutGroupsInput>;
  upsert?: InputMaybe<OrganizationUpsertWithoutGroupsInput>;
};

export type OrganizationUpdateOneRequiredWithoutUsersNestedInput = {
  connect?: InputMaybe<OrganizationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<OrganizationCreateOrConnectWithoutUsersInput>;
  create?: InputMaybe<OrganizationCreateWithoutUsersInput>;
  update?: InputMaybe<OrganizationUpdateToOneWithWhereWithoutUsersInput>;
  upsert?: InputMaybe<OrganizationUpsertWithoutUsersInput>;
};

export type OrganizationUpdateToOneWithWhereWithoutGroupsInput = {
  data: OrganizationUpdateWithoutGroupsInput;
  where?: InputMaybe<OrganizationWhereInput>;
};

export type OrganizationUpdateToOneWithWhereWithoutUsersInput = {
  data: OrganizationUpdateWithoutUsersInput;
  where?: InputMaybe<OrganizationWhereInput>;
};

export type OrganizationUpdateWithoutGroupsInput = {
  Users?: InputMaybe<UserUpdateManyWithoutOrganizationNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type OrganizationUpdateWithoutUsersInput = {
  Groups?: InputMaybe<GroupUpdateManyWithoutOrganizationNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type OrganizationUpsertWithoutGroupsInput = {
  create: OrganizationCreateWithoutGroupsInput;
  update: OrganizationUpdateWithoutGroupsInput;
  where?: InputMaybe<OrganizationWhereInput>;
};

export type OrganizationUpsertWithoutUsersInput = {
  create: OrganizationCreateWithoutUsersInput;
  update: OrganizationUpdateWithoutUsersInput;
  where?: InputMaybe<OrganizationWhereInput>;
};

export type OrganizationWhereInput = {
  AND?: InputMaybe<Array<OrganizationWhereInput>>;
  Groups?: InputMaybe<GroupListRelationFilter>;
  NOT?: InputMaybe<Array<OrganizationWhereInput>>;
  OR?: InputMaybe<Array<OrganizationWhereInput>>;
  Users?: InputMaybe<UserListRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type OrganizationWhereUniqueInput = {
  AND?: InputMaybe<Array<OrganizationWhereInput>>;
  Groups?: InputMaybe<GroupListRelationFilter>;
  NOT?: InputMaybe<Array<OrganizationWhereInput>>;
  OR?: InputMaybe<Array<OrganizationWhereInput>>;
  Users?: InputMaybe<UserListRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export enum Privacity {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Query = {
  __typename?: 'Query';
  group: Group;
  groups: Array<Group>;
  note: Note;
  notes: Array<Note>;
  organization: Organization;
  organizations: Array<Organization>;
  score: Score;
  scores: Array<Score>;
  subject: Subject;
  subjects: Array<Subject>;
  subtopic: Subtopic;
  subtopics: Array<Subtopic>;
  topic: Topic;
  topicAndSubtopic: Topic;
  topics: Array<Topic>;
  user: User;
  userByEmail: User;
  users: Array<User>;
};


export type QueryGroupArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGroupsArgs = {
  where?: InputMaybe<GroupWhereInput>;
};


export type QueryNoteArgs = {
  where: NoteWhereUniqueInput;
};


export type QueryNotesArgs = {
  where?: InputMaybe<NoteWhereInput>;
};


export type QueryOrganizationArgs = {
  id: Scalars['Int']['input'];
};


export type QueryScoreArgs = {
  id: Scalars['Int']['input'];
};


export type QueryScoresArgs = {
  where: ScoreWhereInput;
};


export type QuerySubjectArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySubtopicArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySubtopicsArgs = {
  where: SubtopicWhereInput;
};


export type QueryTopicArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTopicAndSubtopicArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTopicsArgs = {
  where: TopicWhereInput;
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  where?: InputMaybe<UserWhereInput>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export enum Role {
  Admin = 'ADMIN',
  Director = 'DIRECTOR',
  Student = 'STUDENT',
  Teacher = 'TEACHER'
}

export type Score = {
  __typename?: 'Score';
  Note?: Maybe<Note>;
  User: User;
  alternatives: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  noteId?: Maybe<Scalars['Int']['output']>;
  score: Scalars['Int']['output'];
  updateAt?: Maybe<Scalars['DateTime']['output']>;
  userId: Scalars['Int']['output'];
};

export type ScoreCreateInput = {
  Note?: InputMaybe<NoteCreateNestedOneWithoutScoresInput>;
  User: UserCreateNestedOneWithoutScoreInput;
  alternatives: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  score: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ScoreCreateManyNoteInput = {
  alternatives: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  score: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['Int']['input'];
};

export type ScoreCreateManyNoteInputEnvelope = {
  data: Array<ScoreCreateManyNoteInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ScoreCreateManyUserInput = {
  alternatives: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  noteId?: InputMaybe<Scalars['Int']['input']>;
  score: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ScoreCreateManyUserInputEnvelope = {
  data: Array<ScoreCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ScoreCreateNestedManyWithoutNoteInput = {
  connect?: InputMaybe<Array<ScoreWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ScoreCreateOrConnectWithoutNoteInput>>;
  create?: InputMaybe<Array<ScoreCreateWithoutNoteInput>>;
  createMany?: InputMaybe<ScoreCreateManyNoteInputEnvelope>;
};

export type ScoreCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ScoreWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ScoreCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ScoreCreateWithoutUserInput>>;
  createMany?: InputMaybe<ScoreCreateManyUserInputEnvelope>;
};

export type ScoreCreateOrConnectWithoutNoteInput = {
  create: ScoreCreateWithoutNoteInput;
  where: ScoreWhereUniqueInput;
};

export type ScoreCreateOrConnectWithoutUserInput = {
  create: ScoreCreateWithoutUserInput;
  where: ScoreWhereUniqueInput;
};

export type ScoreCreateWithoutNoteInput = {
  User: UserCreateNestedOneWithoutScoreInput;
  alternatives: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  score: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ScoreCreateWithoutUserInput = {
  Note?: InputMaybe<NoteCreateNestedOneWithoutScoresInput>;
  alternatives: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  score: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ScoreListRelationFilter = {
  every?: InputMaybe<ScoreWhereInput>;
  none?: InputMaybe<ScoreWhereInput>;
  some?: InputMaybe<ScoreWhereInput>;
};

export type ScoreScalarWhereInput = {
  AND?: InputMaybe<Array<ScoreScalarWhereInput>>;
  NOT?: InputMaybe<Array<ScoreScalarWhereInput>>;
  OR?: InputMaybe<Array<ScoreScalarWhereInput>>;
  alternatives?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IntFilter>;
  noteId?: InputMaybe<IntNullableFilter>;
  score?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type ScoreUpdateInput = {
  Note?: InputMaybe<NoteUpdateOneWithoutScoresNestedInput>;
  User?: InputMaybe<UserUpdateOneRequiredWithoutScoreNestedInput>;
  alternatives?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  score?: InputMaybe<IntFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type ScoreUpdateManyMutationInput = {
  alternatives?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  score?: InputMaybe<IntFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type ScoreUpdateManyWithWhereWithoutNoteInput = {
  data: ScoreUpdateManyMutationInput;
  where: ScoreScalarWhereInput;
};

export type ScoreUpdateManyWithWhereWithoutUserInput = {
  data: ScoreUpdateManyMutationInput;
  where: ScoreScalarWhereInput;
};

export type ScoreUpdateManyWithoutNoteNestedInput = {
  connect?: InputMaybe<Array<ScoreWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ScoreCreateOrConnectWithoutNoteInput>>;
  create?: InputMaybe<Array<ScoreCreateWithoutNoteInput>>;
  createMany?: InputMaybe<ScoreCreateManyNoteInputEnvelope>;
  delete?: InputMaybe<Array<ScoreWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ScoreScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ScoreWhereUniqueInput>>;
  set?: InputMaybe<Array<ScoreWhereUniqueInput>>;
  update?: InputMaybe<Array<ScoreUpdateWithWhereUniqueWithoutNoteInput>>;
  updateMany?: InputMaybe<Array<ScoreUpdateManyWithWhereWithoutNoteInput>>;
  upsert?: InputMaybe<Array<ScoreUpsertWithWhereUniqueWithoutNoteInput>>;
};

export type ScoreUpdateManyWithoutUserNestedInput = {
  connect?: InputMaybe<Array<ScoreWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ScoreCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ScoreCreateWithoutUserInput>>;
  createMany?: InputMaybe<ScoreCreateManyUserInputEnvelope>;
  delete?: InputMaybe<Array<ScoreWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ScoreScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ScoreWhereUniqueInput>>;
  set?: InputMaybe<Array<ScoreWhereUniqueInput>>;
  update?: InputMaybe<Array<ScoreUpdateWithWhereUniqueWithoutUserInput>>;
  updateMany?: InputMaybe<Array<ScoreUpdateManyWithWhereWithoutUserInput>>;
  upsert?: InputMaybe<Array<ScoreUpsertWithWhereUniqueWithoutUserInput>>;
};

export type ScoreUpdateWithWhereUniqueWithoutNoteInput = {
  data: ScoreUpdateWithoutNoteInput;
  where: ScoreWhereUniqueInput;
};

export type ScoreUpdateWithWhereUniqueWithoutUserInput = {
  data: ScoreUpdateWithoutUserInput;
  where: ScoreWhereUniqueInput;
};

export type ScoreUpdateWithoutNoteInput = {
  User?: InputMaybe<UserUpdateOneRequiredWithoutScoreNestedInput>;
  alternatives?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  score?: InputMaybe<IntFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type ScoreUpdateWithoutUserInput = {
  Note?: InputMaybe<NoteUpdateOneWithoutScoresNestedInput>;
  alternatives?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  score?: InputMaybe<IntFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type ScoreUpsertWithWhereUniqueWithoutNoteInput = {
  create: ScoreCreateWithoutNoteInput;
  update: ScoreUpdateWithoutNoteInput;
  where: ScoreWhereUniqueInput;
};

export type ScoreUpsertWithWhereUniqueWithoutUserInput = {
  create: ScoreCreateWithoutUserInput;
  update: ScoreUpdateWithoutUserInput;
  where: ScoreWhereUniqueInput;
};

export type ScoreWhereInput = {
  AND?: InputMaybe<Array<ScoreWhereInput>>;
  NOT?: InputMaybe<Array<ScoreWhereInput>>;
  Note?: InputMaybe<NoteNullableRelationFilter>;
  OR?: InputMaybe<Array<ScoreWhereInput>>;
  User?: InputMaybe<UserRelationFilter>;
  alternatives?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IntFilter>;
  noteId?: InputMaybe<IntNullableFilter>;
  score?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type ScoreWhereUniqueInput = {
  AND?: InputMaybe<Array<ScoreWhereInput>>;
  NOT?: InputMaybe<Array<ScoreWhereInput>>;
  Note?: InputMaybe<NoteNullableRelationFilter>;
  OR?: InputMaybe<Array<ScoreWhereInput>>;
  User?: InputMaybe<UserRelationFilter>;
  alternatives?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  noteId?: InputMaybe<IntNullableFilter>;
  score?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']['input']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type Subject = {
  __typename?: 'Subject';
  Notes?: Maybe<Array<Note>>;
  Subtopic?: Maybe<Array<Subtopic>>;
  Topics?: Maybe<Array<Topic>>;
  _count: SubjectCount;
  color: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SubjectCount = {
  __typename?: 'SubjectCount';
  Notes: Scalars['Int']['output'];
  Subtopic: Scalars['Int']['output'];
  Topics: Scalars['Int']['output'];
};

export type SubjectCreateInput = {
  Notes?: InputMaybe<NoteCreateNestedManyWithoutSubjectInput>;
  Subtopic?: InputMaybe<SubtopicCreateNestedManyWithoutSubjectInput>;
  Topics?: InputMaybe<TopicCreateNestedManyWithoutSubjectInput>;
  color: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubjectCreateNestedOneWithoutNotesInput = {
  connect?: InputMaybe<SubjectWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SubjectCreateOrConnectWithoutNotesInput>;
  create?: InputMaybe<SubjectCreateWithoutNotesInput>;
};

export type SubjectCreateNestedOneWithoutSubtopicInput = {
  connect?: InputMaybe<SubjectWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SubjectCreateOrConnectWithoutSubtopicInput>;
  create?: InputMaybe<SubjectCreateWithoutSubtopicInput>;
};

export type SubjectCreateNestedOneWithoutTopicsInput = {
  connect?: InputMaybe<SubjectWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SubjectCreateOrConnectWithoutTopicsInput>;
  create?: InputMaybe<SubjectCreateWithoutTopicsInput>;
};

export type SubjectCreateOrConnectWithoutNotesInput = {
  create: SubjectCreateWithoutNotesInput;
  where: SubjectWhereUniqueInput;
};

export type SubjectCreateOrConnectWithoutSubtopicInput = {
  create: SubjectCreateWithoutSubtopicInput;
  where: SubjectWhereUniqueInput;
};

export type SubjectCreateOrConnectWithoutTopicsInput = {
  create: SubjectCreateWithoutTopicsInput;
  where: SubjectWhereUniqueInput;
};

export type SubjectCreateWithoutNotesInput = {
  Subtopic?: InputMaybe<SubtopicCreateNestedManyWithoutSubjectInput>;
  Topics?: InputMaybe<TopicCreateNestedManyWithoutSubjectInput>;
  color: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubjectCreateWithoutSubtopicInput = {
  Notes?: InputMaybe<NoteCreateNestedManyWithoutSubjectInput>;
  Topics?: InputMaybe<TopicCreateNestedManyWithoutSubjectInput>;
  color: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubjectCreateWithoutTopicsInput = {
  Notes?: InputMaybe<NoteCreateNestedManyWithoutSubjectInput>;
  Subtopic?: InputMaybe<SubtopicCreateNestedManyWithoutSubjectInput>;
  color: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubjectNullableRelationFilter = {
  is?: InputMaybe<SubjectWhereInput>;
  isNot?: InputMaybe<SubjectWhereInput>;
};

export type SubjectUpdateInput = {
  Notes?: InputMaybe<NoteUpdateManyWithoutSubjectNestedInput>;
  Subtopic?: InputMaybe<SubtopicUpdateManyWithoutSubjectNestedInput>;
  Topics?: InputMaybe<TopicUpdateManyWithoutSubjectNestedInput>;
  color?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubjectUpdateOneWithoutNotesNestedInput = {
  connect?: InputMaybe<SubjectWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SubjectCreateOrConnectWithoutNotesInput>;
  create?: InputMaybe<SubjectCreateWithoutNotesInput>;
  delete?: InputMaybe<SubjectWhereInput>;
  disconnect?: InputMaybe<SubjectWhereInput>;
  update?: InputMaybe<SubjectUpdateToOneWithWhereWithoutNotesInput>;
  upsert?: InputMaybe<SubjectUpsertWithoutNotesInput>;
};

export type SubjectUpdateOneWithoutSubtopicNestedInput = {
  connect?: InputMaybe<SubjectWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SubjectCreateOrConnectWithoutSubtopicInput>;
  create?: InputMaybe<SubjectCreateWithoutSubtopicInput>;
  delete?: InputMaybe<SubjectWhereInput>;
  disconnect?: InputMaybe<SubjectWhereInput>;
  update?: InputMaybe<SubjectUpdateToOneWithWhereWithoutSubtopicInput>;
  upsert?: InputMaybe<SubjectUpsertWithoutSubtopicInput>;
};

export type SubjectUpdateOneWithoutTopicsNestedInput = {
  connect?: InputMaybe<SubjectWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SubjectCreateOrConnectWithoutTopicsInput>;
  create?: InputMaybe<SubjectCreateWithoutTopicsInput>;
  delete?: InputMaybe<SubjectWhereInput>;
  disconnect?: InputMaybe<SubjectWhereInput>;
  update?: InputMaybe<SubjectUpdateToOneWithWhereWithoutTopicsInput>;
  upsert?: InputMaybe<SubjectUpsertWithoutTopicsInput>;
};

export type SubjectUpdateToOneWithWhereWithoutNotesInput = {
  data: SubjectUpdateWithoutNotesInput;
  where?: InputMaybe<SubjectWhereInput>;
};

export type SubjectUpdateToOneWithWhereWithoutSubtopicInput = {
  data: SubjectUpdateWithoutSubtopicInput;
  where?: InputMaybe<SubjectWhereInput>;
};

export type SubjectUpdateToOneWithWhereWithoutTopicsInput = {
  data: SubjectUpdateWithoutTopicsInput;
  where?: InputMaybe<SubjectWhereInput>;
};

export type SubjectUpdateWithoutNotesInput = {
  Subtopic?: InputMaybe<SubtopicUpdateManyWithoutSubjectNestedInput>;
  Topics?: InputMaybe<TopicUpdateManyWithoutSubjectNestedInput>;
  color?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubjectUpdateWithoutSubtopicInput = {
  Notes?: InputMaybe<NoteUpdateManyWithoutSubjectNestedInput>;
  Topics?: InputMaybe<TopicUpdateManyWithoutSubjectNestedInput>;
  color?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubjectUpdateWithoutTopicsInput = {
  Notes?: InputMaybe<NoteUpdateManyWithoutSubjectNestedInput>;
  Subtopic?: InputMaybe<SubtopicUpdateManyWithoutSubjectNestedInput>;
  color?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubjectUpsertWithoutNotesInput = {
  create: SubjectCreateWithoutNotesInput;
  update: SubjectUpdateWithoutNotesInput;
  where?: InputMaybe<SubjectWhereInput>;
};

export type SubjectUpsertWithoutSubtopicInput = {
  create: SubjectCreateWithoutSubtopicInput;
  update: SubjectUpdateWithoutSubtopicInput;
  where?: InputMaybe<SubjectWhereInput>;
};

export type SubjectUpsertWithoutTopicsInput = {
  create: SubjectCreateWithoutTopicsInput;
  update: SubjectUpdateWithoutTopicsInput;
  where?: InputMaybe<SubjectWhereInput>;
};

export type SubjectWhereInput = {
  AND?: InputMaybe<Array<SubjectWhereInput>>;
  NOT?: InputMaybe<Array<SubjectWhereInput>>;
  Notes?: InputMaybe<NoteListRelationFilter>;
  OR?: InputMaybe<Array<SubjectWhereInput>>;
  Subtopic?: InputMaybe<SubtopicListRelationFilter>;
  Topics?: InputMaybe<TopicListRelationFilter>;
  color?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type SubjectWhereUniqueInput = {
  AND?: InputMaybe<Array<SubjectWhereInput>>;
  NOT?: InputMaybe<Array<SubjectWhereInput>>;
  Notes?: InputMaybe<NoteListRelationFilter>;
  OR?: InputMaybe<Array<SubjectWhereInput>>;
  Subtopic?: InputMaybe<SubtopicListRelationFilter>;
  Topics?: InputMaybe<TopicListRelationFilter>;
  color?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type Subtopic = {
  __typename?: 'Subtopic';
  Notes?: Maybe<Array<Note>>;
  Subject?: Maybe<Subject>;
  Topic: Topic;
  _count: SubtopicCount;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  subjectId?: Maybe<Scalars['Int']['output']>;
  topicId: Scalars['Int']['output'];
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SubtopicCount = {
  __typename?: 'SubtopicCount';
  Notes: Scalars['Int']['output'];
};

export type SubtopicCreateInput = {
  Notes?: InputMaybe<NoteCreateNestedManyWithoutSubtopicInput>;
  Subject?: InputMaybe<SubjectCreateNestedOneWithoutSubtopicInput>;
  Topic: TopicCreateNestedOneWithoutSubtopicsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubtopicCreateManySubjectInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  topicId: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubtopicCreateManySubjectInputEnvelope = {
  data: Array<SubtopicCreateManySubjectInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SubtopicCreateManyTopicInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  subjectId?: InputMaybe<Scalars['Int']['input']>;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubtopicCreateManyTopicInputEnvelope = {
  data: Array<SubtopicCreateManyTopicInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SubtopicCreateNestedManyWithoutSubjectInput = {
  connect?: InputMaybe<Array<SubtopicWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SubtopicCreateOrConnectWithoutSubjectInput>>;
  create?: InputMaybe<Array<SubtopicCreateWithoutSubjectInput>>;
  createMany?: InputMaybe<SubtopicCreateManySubjectInputEnvelope>;
};

export type SubtopicCreateNestedManyWithoutTopicInput = {
  connect?: InputMaybe<Array<SubtopicWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SubtopicCreateOrConnectWithoutTopicInput>>;
  create?: InputMaybe<Array<SubtopicCreateWithoutTopicInput>>;
  createMany?: InputMaybe<SubtopicCreateManyTopicInputEnvelope>;
};

export type SubtopicCreateNestedOneWithoutNotesInput = {
  connect?: InputMaybe<SubtopicWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SubtopicCreateOrConnectWithoutNotesInput>;
  create?: InputMaybe<SubtopicCreateWithoutNotesInput>;
};

export type SubtopicCreateOrConnectWithoutNotesInput = {
  create: SubtopicCreateWithoutNotesInput;
  where: SubtopicWhereUniqueInput;
};

export type SubtopicCreateOrConnectWithoutSubjectInput = {
  create: SubtopicCreateWithoutSubjectInput;
  where: SubtopicWhereUniqueInput;
};

export type SubtopicCreateOrConnectWithoutTopicInput = {
  create: SubtopicCreateWithoutTopicInput;
  where: SubtopicWhereUniqueInput;
};

export type SubtopicCreateWithoutNotesInput = {
  Subject?: InputMaybe<SubjectCreateNestedOneWithoutSubtopicInput>;
  Topic: TopicCreateNestedOneWithoutSubtopicsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubtopicCreateWithoutSubjectInput = {
  Notes?: InputMaybe<NoteCreateNestedManyWithoutSubtopicInput>;
  Topic: TopicCreateNestedOneWithoutSubtopicsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubtopicCreateWithoutTopicInput = {
  Notes?: InputMaybe<NoteCreateNestedManyWithoutSubtopicInput>;
  Subject?: InputMaybe<SubjectCreateNestedOneWithoutSubtopicInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubtopicListRelationFilter = {
  every?: InputMaybe<SubtopicWhereInput>;
  none?: InputMaybe<SubtopicWhereInput>;
  some?: InputMaybe<SubtopicWhereInput>;
};

export type SubtopicNullableRelationFilter = {
  is?: InputMaybe<SubtopicWhereInput>;
  isNot?: InputMaybe<SubtopicWhereInput>;
};

export type SubtopicScalarWhereInput = {
  AND?: InputMaybe<Array<SubtopicScalarWhereInput>>;
  NOT?: InputMaybe<Array<SubtopicScalarWhereInput>>;
  OR?: InputMaybe<Array<SubtopicScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  subjectId?: InputMaybe<IntNullableFilter>;
  topicId?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type SubtopicUpdateInput = {
  Notes?: InputMaybe<NoteUpdateManyWithoutSubtopicNestedInput>;
  Subject?: InputMaybe<SubjectUpdateOneWithoutSubtopicNestedInput>;
  Topic?: InputMaybe<TopicUpdateOneRequiredWithoutSubtopicsNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubtopicUpdateManyMutationInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubtopicUpdateManyWithWhereWithoutSubjectInput = {
  data: SubtopicUpdateManyMutationInput;
  where: SubtopicScalarWhereInput;
};

export type SubtopicUpdateManyWithWhereWithoutTopicInput = {
  data: SubtopicUpdateManyMutationInput;
  where: SubtopicScalarWhereInput;
};

export type SubtopicUpdateManyWithoutSubjectNestedInput = {
  connect?: InputMaybe<Array<SubtopicWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SubtopicCreateOrConnectWithoutSubjectInput>>;
  create?: InputMaybe<Array<SubtopicCreateWithoutSubjectInput>>;
  createMany?: InputMaybe<SubtopicCreateManySubjectInputEnvelope>;
  delete?: InputMaybe<Array<SubtopicWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SubtopicScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SubtopicWhereUniqueInput>>;
  set?: InputMaybe<Array<SubtopicWhereUniqueInput>>;
  update?: InputMaybe<Array<SubtopicUpdateWithWhereUniqueWithoutSubjectInput>>;
  updateMany?: InputMaybe<Array<SubtopicUpdateManyWithWhereWithoutSubjectInput>>;
  upsert?: InputMaybe<Array<SubtopicUpsertWithWhereUniqueWithoutSubjectInput>>;
};

export type SubtopicUpdateManyWithoutTopicNestedInput = {
  connect?: InputMaybe<Array<SubtopicWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SubtopicCreateOrConnectWithoutTopicInput>>;
  create?: InputMaybe<Array<SubtopicCreateWithoutTopicInput>>;
  createMany?: InputMaybe<SubtopicCreateManyTopicInputEnvelope>;
  delete?: InputMaybe<Array<SubtopicWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SubtopicScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SubtopicWhereUniqueInput>>;
  set?: InputMaybe<Array<SubtopicWhereUniqueInput>>;
  update?: InputMaybe<Array<SubtopicUpdateWithWhereUniqueWithoutTopicInput>>;
  updateMany?: InputMaybe<Array<SubtopicUpdateManyWithWhereWithoutTopicInput>>;
  upsert?: InputMaybe<Array<SubtopicUpsertWithWhereUniqueWithoutTopicInput>>;
};

export type SubtopicUpdateOneWithoutNotesNestedInput = {
  connect?: InputMaybe<SubtopicWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SubtopicCreateOrConnectWithoutNotesInput>;
  create?: InputMaybe<SubtopicCreateWithoutNotesInput>;
  delete?: InputMaybe<SubtopicWhereInput>;
  disconnect?: InputMaybe<SubtopicWhereInput>;
  update?: InputMaybe<SubtopicUpdateToOneWithWhereWithoutNotesInput>;
  upsert?: InputMaybe<SubtopicUpsertWithoutNotesInput>;
};

export type SubtopicUpdateToOneWithWhereWithoutNotesInput = {
  data: SubtopicUpdateWithoutNotesInput;
  where?: InputMaybe<SubtopicWhereInput>;
};

export type SubtopicUpdateWithWhereUniqueWithoutSubjectInput = {
  data: SubtopicUpdateWithoutSubjectInput;
  where: SubtopicWhereUniqueInput;
};

export type SubtopicUpdateWithWhereUniqueWithoutTopicInput = {
  data: SubtopicUpdateWithoutTopicInput;
  where: SubtopicWhereUniqueInput;
};

export type SubtopicUpdateWithoutNotesInput = {
  Subject?: InputMaybe<SubjectUpdateOneWithoutSubtopicNestedInput>;
  Topic?: InputMaybe<TopicUpdateOneRequiredWithoutSubtopicsNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubtopicUpdateWithoutSubjectInput = {
  Notes?: InputMaybe<NoteUpdateManyWithoutSubtopicNestedInput>;
  Topic?: InputMaybe<TopicUpdateOneRequiredWithoutSubtopicsNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubtopicUpdateWithoutTopicInput = {
  Notes?: InputMaybe<NoteUpdateManyWithoutSubtopicNestedInput>;
  Subject?: InputMaybe<SubjectUpdateOneWithoutSubtopicNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubtopicUpsertWithWhereUniqueWithoutSubjectInput = {
  create: SubtopicCreateWithoutSubjectInput;
  update: SubtopicUpdateWithoutSubjectInput;
  where: SubtopicWhereUniqueInput;
};

export type SubtopicUpsertWithWhereUniqueWithoutTopicInput = {
  create: SubtopicCreateWithoutTopicInput;
  update: SubtopicUpdateWithoutTopicInput;
  where: SubtopicWhereUniqueInput;
};

export type SubtopicUpsertWithoutNotesInput = {
  create: SubtopicCreateWithoutNotesInput;
  update: SubtopicUpdateWithoutNotesInput;
  where?: InputMaybe<SubtopicWhereInput>;
};

export type SubtopicWhereInput = {
  AND?: InputMaybe<Array<SubtopicWhereInput>>;
  NOT?: InputMaybe<Array<SubtopicWhereInput>>;
  Notes?: InputMaybe<NoteListRelationFilter>;
  OR?: InputMaybe<Array<SubtopicWhereInput>>;
  Subject?: InputMaybe<SubjectNullableRelationFilter>;
  Topic?: InputMaybe<TopicRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  subjectId?: InputMaybe<IntNullableFilter>;
  topicId?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type SubtopicWhereUniqueInput = {
  AND?: InputMaybe<Array<SubtopicWhereInput>>;
  NOT?: InputMaybe<Array<SubtopicWhereInput>>;
  Notes?: InputMaybe<NoteListRelationFilter>;
  OR?: InputMaybe<Array<SubtopicWhereInput>>;
  Subject?: InputMaybe<SubjectNullableRelationFilter>;
  Topic?: InputMaybe<TopicRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  subjectId?: InputMaybe<IntNullableFilter>;
  topicId?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type Topic = {
  __typename?: 'Topic';
  Notes?: Maybe<Array<Note>>;
  Subject?: Maybe<Subject>;
  Subtopics?: Maybe<Array<Subtopic>>;
  _count: TopicCount;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  subjectId?: Maybe<Scalars['Int']['output']>;
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TopicCount = {
  __typename?: 'TopicCount';
  Notes: Scalars['Int']['output'];
  Subtopics: Scalars['Int']['output'];
};

export type TopicCreateInput = {
  Notes?: InputMaybe<NoteCreateNestedManyWithoutTopicInput>;
  Subject?: InputMaybe<SubjectCreateNestedOneWithoutTopicsInput>;
  Subtopics?: InputMaybe<SubtopicCreateNestedManyWithoutTopicInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TopicCreateManySubjectInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TopicCreateManySubjectInputEnvelope = {
  data: Array<TopicCreateManySubjectInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TopicCreateNestedManyWithoutSubjectInput = {
  connect?: InputMaybe<Array<TopicWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TopicCreateOrConnectWithoutSubjectInput>>;
  create?: InputMaybe<Array<TopicCreateWithoutSubjectInput>>;
  createMany?: InputMaybe<TopicCreateManySubjectInputEnvelope>;
};

export type TopicCreateNestedOneWithoutNotesInput = {
  connect?: InputMaybe<TopicWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TopicCreateOrConnectWithoutNotesInput>;
  create?: InputMaybe<TopicCreateWithoutNotesInput>;
};

export type TopicCreateNestedOneWithoutSubtopicsInput = {
  connect?: InputMaybe<TopicWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TopicCreateOrConnectWithoutSubtopicsInput>;
  create?: InputMaybe<TopicCreateWithoutSubtopicsInput>;
};

export type TopicCreateOrConnectWithoutNotesInput = {
  create: TopicCreateWithoutNotesInput;
  where: TopicWhereUniqueInput;
};

export type TopicCreateOrConnectWithoutSubjectInput = {
  create: TopicCreateWithoutSubjectInput;
  where: TopicWhereUniqueInput;
};

export type TopicCreateOrConnectWithoutSubtopicsInput = {
  create: TopicCreateWithoutSubtopicsInput;
  where: TopicWhereUniqueInput;
};

export type TopicCreateWithoutNotesInput = {
  Subject?: InputMaybe<SubjectCreateNestedOneWithoutTopicsInput>;
  Subtopics?: InputMaybe<SubtopicCreateNestedManyWithoutTopicInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TopicCreateWithoutSubjectInput = {
  Notes?: InputMaybe<NoteCreateNestedManyWithoutTopicInput>;
  Subtopics?: InputMaybe<SubtopicCreateNestedManyWithoutTopicInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TopicCreateWithoutSubtopicsInput = {
  Notes?: InputMaybe<NoteCreateNestedManyWithoutTopicInput>;
  Subject?: InputMaybe<SubjectCreateNestedOneWithoutTopicsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TopicListRelationFilter = {
  every?: InputMaybe<TopicWhereInput>;
  none?: InputMaybe<TopicWhereInput>;
  some?: InputMaybe<TopicWhereInput>;
};

export type TopicNullableRelationFilter = {
  is?: InputMaybe<TopicWhereInput>;
  isNot?: InputMaybe<TopicWhereInput>;
};

export type TopicRelationFilter = {
  is?: InputMaybe<TopicWhereInput>;
  isNot?: InputMaybe<TopicWhereInput>;
};

export type TopicScalarWhereInput = {
  AND?: InputMaybe<Array<TopicScalarWhereInput>>;
  NOT?: InputMaybe<Array<TopicScalarWhereInput>>;
  OR?: InputMaybe<Array<TopicScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  subjectId?: InputMaybe<IntNullableFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type TopicUpdateInput = {
  Notes?: InputMaybe<NoteUpdateManyWithoutTopicNestedInput>;
  Subject?: InputMaybe<SubjectUpdateOneWithoutTopicsNestedInput>;
  Subtopics?: InputMaybe<SubtopicUpdateManyWithoutTopicNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type TopicUpdateManyMutationInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type TopicUpdateManyWithWhereWithoutSubjectInput = {
  data: TopicUpdateManyMutationInput;
  where: TopicScalarWhereInput;
};

export type TopicUpdateManyWithoutSubjectNestedInput = {
  connect?: InputMaybe<Array<TopicWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TopicCreateOrConnectWithoutSubjectInput>>;
  create?: InputMaybe<Array<TopicCreateWithoutSubjectInput>>;
  createMany?: InputMaybe<TopicCreateManySubjectInputEnvelope>;
  delete?: InputMaybe<Array<TopicWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<TopicScalarWhereInput>>;
  disconnect?: InputMaybe<Array<TopicWhereUniqueInput>>;
  set?: InputMaybe<Array<TopicWhereUniqueInput>>;
  update?: InputMaybe<Array<TopicUpdateWithWhereUniqueWithoutSubjectInput>>;
  updateMany?: InputMaybe<Array<TopicUpdateManyWithWhereWithoutSubjectInput>>;
  upsert?: InputMaybe<Array<TopicUpsertWithWhereUniqueWithoutSubjectInput>>;
};

export type TopicUpdateOneRequiredWithoutSubtopicsNestedInput = {
  connect?: InputMaybe<TopicWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TopicCreateOrConnectWithoutSubtopicsInput>;
  create?: InputMaybe<TopicCreateWithoutSubtopicsInput>;
  update?: InputMaybe<TopicUpdateToOneWithWhereWithoutSubtopicsInput>;
  upsert?: InputMaybe<TopicUpsertWithoutSubtopicsInput>;
};

export type TopicUpdateOneWithoutNotesNestedInput = {
  connect?: InputMaybe<TopicWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TopicCreateOrConnectWithoutNotesInput>;
  create?: InputMaybe<TopicCreateWithoutNotesInput>;
  delete?: InputMaybe<TopicWhereInput>;
  disconnect?: InputMaybe<TopicWhereInput>;
  update?: InputMaybe<TopicUpdateToOneWithWhereWithoutNotesInput>;
  upsert?: InputMaybe<TopicUpsertWithoutNotesInput>;
};

export type TopicUpdateToOneWithWhereWithoutNotesInput = {
  data: TopicUpdateWithoutNotesInput;
  where?: InputMaybe<TopicWhereInput>;
};

export type TopicUpdateToOneWithWhereWithoutSubtopicsInput = {
  data: TopicUpdateWithoutSubtopicsInput;
  where?: InputMaybe<TopicWhereInput>;
};

export type TopicUpdateWithWhereUniqueWithoutSubjectInput = {
  data: TopicUpdateWithoutSubjectInput;
  where: TopicWhereUniqueInput;
};

export type TopicUpdateWithoutNotesInput = {
  Subject?: InputMaybe<SubjectUpdateOneWithoutTopicsNestedInput>;
  Subtopics?: InputMaybe<SubtopicUpdateManyWithoutTopicNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type TopicUpdateWithoutSubjectInput = {
  Notes?: InputMaybe<NoteUpdateManyWithoutTopicNestedInput>;
  Subtopics?: InputMaybe<SubtopicUpdateManyWithoutTopicNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type TopicUpdateWithoutSubtopicsInput = {
  Notes?: InputMaybe<NoteUpdateManyWithoutTopicNestedInput>;
  Subject?: InputMaybe<SubjectUpdateOneWithoutTopicsNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type TopicUpsertWithWhereUniqueWithoutSubjectInput = {
  create: TopicCreateWithoutSubjectInput;
  update: TopicUpdateWithoutSubjectInput;
  where: TopicWhereUniqueInput;
};

export type TopicUpsertWithoutNotesInput = {
  create: TopicCreateWithoutNotesInput;
  update: TopicUpdateWithoutNotesInput;
  where?: InputMaybe<TopicWhereInput>;
};

export type TopicUpsertWithoutSubtopicsInput = {
  create: TopicCreateWithoutSubtopicsInput;
  update: TopicUpdateWithoutSubtopicsInput;
  where?: InputMaybe<TopicWhereInput>;
};

export type TopicWhereInput = {
  AND?: InputMaybe<Array<TopicWhereInput>>;
  NOT?: InputMaybe<Array<TopicWhereInput>>;
  Notes?: InputMaybe<NoteListRelationFilter>;
  OR?: InputMaybe<Array<TopicWhereInput>>;
  Subject?: InputMaybe<SubjectNullableRelationFilter>;
  Subtopics?: InputMaybe<SubtopicListRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  subjectId?: InputMaybe<IntNullableFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type TopicWhereUniqueInput = {
  AND?: InputMaybe<Array<TopicWhereInput>>;
  NOT?: InputMaybe<Array<TopicWhereInput>>;
  Notes?: InputMaybe<NoteListRelationFilter>;
  OR?: InputMaybe<Array<TopicWhereInput>>;
  Subject?: InputMaybe<SubjectNullableRelationFilter>;
  Subtopics?: InputMaybe<SubtopicListRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  subjectId?: InputMaybe<IntNullableFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export enum Types {
  Document = 'DOCUMENT',
  Evaluation = 'EVALUATION',
  Practice = 'PRACTICE'
}

export type User = {
  __typename?: 'User';
  File?: Maybe<Array<File>>;
  Group?: Maybe<Array<Group>>;
  Organization: Organization;
  Score?: Maybe<Array<Score>>;
  _count: UserCount;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  externalId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastname: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organizationId: Scalars['Int']['output'];
  role: Role;
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserCount = {
  __typename?: 'UserCount';
  File: Scalars['Int']['output'];
  Group: Scalars['Int']['output'];
  Score: Scalars['Int']['output'];
};

export type UserCreateInput = {
  File?: InputMaybe<FileCreateNestedManyWithoutAuthorInput>;
  Group?: InputMaybe<GroupCreateNestedManyWithoutUsersInput>;
  Organization: OrganizationCreateNestedOneWithoutUsersInput;
  Score?: InputMaybe<ScoreCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  externalId: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  name: Scalars['String']['input'];
  role: Role;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateManyOrganizationInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  externalId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  lastname: Scalars['String']['input'];
  name: Scalars['String']['input'];
  role: Role;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateManyOrganizationInputEnvelope = {
  data: Array<UserCreateManyOrganizationInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserCreateNestedManyWithoutGroupInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutGroupInput>>;
  create?: InputMaybe<Array<UserCreateWithoutGroupInput>>;
};

export type UserCreateNestedManyWithoutOrganizationInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutOrganizationInput>>;
  create?: InputMaybe<Array<UserCreateWithoutOrganizationInput>>;
  createMany?: InputMaybe<UserCreateManyOrganizationInputEnvelope>;
};

export type UserCreateNestedOneWithoutFileInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutFileInput>;
  create?: InputMaybe<UserCreateWithoutFileInput>;
};

export type UserCreateNestedOneWithoutScoreInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutScoreInput>;
  create?: InputMaybe<UserCreateWithoutScoreInput>;
};

export type UserCreateOrConnectWithoutFileInput = {
  create: UserCreateWithoutFileInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutGroupInput = {
  create: UserCreateWithoutGroupInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutOrganizationInput = {
  create: UserCreateWithoutOrganizationInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutScoreInput = {
  create: UserCreateWithoutScoreInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutFileInput = {
  Group?: InputMaybe<GroupCreateNestedManyWithoutUsersInput>;
  Organization: OrganizationCreateNestedOneWithoutUsersInput;
  Score?: InputMaybe<ScoreCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  externalId: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  name: Scalars['String']['input'];
  role: Role;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateWithoutGroupInput = {
  File?: InputMaybe<FileCreateNestedManyWithoutAuthorInput>;
  Organization: OrganizationCreateNestedOneWithoutUsersInput;
  Score?: InputMaybe<ScoreCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  externalId: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  name: Scalars['String']['input'];
  role: Role;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateWithoutOrganizationInput = {
  File?: InputMaybe<FileCreateNestedManyWithoutAuthorInput>;
  Group?: InputMaybe<GroupCreateNestedManyWithoutUsersInput>;
  Score?: InputMaybe<ScoreCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  externalId: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  name: Scalars['String']['input'];
  role: Role;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateWithoutScoreInput = {
  File?: InputMaybe<FileCreateNestedManyWithoutAuthorInput>;
  Group?: InputMaybe<GroupCreateNestedManyWithoutUsersInput>;
  Organization: OrganizationCreateNestedOneWithoutUsersInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  externalId: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  name: Scalars['String']['input'];
  role: Role;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserListRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type UserScalarWhereInput = {
  AND?: InputMaybe<Array<UserScalarWhereInput>>;
  NOT?: InputMaybe<Array<UserScalarWhereInput>>;
  OR?: InputMaybe<Array<UserScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  externalId?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  lastname?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  organizationId?: InputMaybe<IntFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type UserUpdateInput = {
  File?: InputMaybe<FileUpdateManyWithoutAuthorNestedInput>;
  Group?: InputMaybe<GroupUpdateManyWithoutUsersNestedInput>;
  Organization?: InputMaybe<OrganizationUpdateOneRequiredWithoutUsersNestedInput>;
  Score?: InputMaybe<ScoreUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastname?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserUpdateManyMutationInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastname?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserUpdateManyWithWhereWithoutGroupInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithWhereWithoutOrganizationInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithoutGroupNestedInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutGroupInput>>;
  create?: InputMaybe<Array<UserCreateWithoutGroupInput>>;
  delete?: InputMaybe<Array<UserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
  update?: InputMaybe<Array<UserUpdateWithWhereUniqueWithoutGroupInput>>;
  updateMany?: InputMaybe<Array<UserUpdateManyWithWhereWithoutGroupInput>>;
  upsert?: InputMaybe<Array<UserUpsertWithWhereUniqueWithoutGroupInput>>;
};

export type UserUpdateManyWithoutOrganizationNestedInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutOrganizationInput>>;
  create?: InputMaybe<Array<UserCreateWithoutOrganizationInput>>;
  createMany?: InputMaybe<UserCreateManyOrganizationInputEnvelope>;
  delete?: InputMaybe<Array<UserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
  update?: InputMaybe<Array<UserUpdateWithWhereUniqueWithoutOrganizationInput>>;
  updateMany?: InputMaybe<Array<UserUpdateManyWithWhereWithoutOrganizationInput>>;
  upsert?: InputMaybe<Array<UserUpsertWithWhereUniqueWithoutOrganizationInput>>;
};

export type UserUpdateOneRequiredWithoutFileNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutFileInput>;
  create?: InputMaybe<UserCreateWithoutFileInput>;
  update?: InputMaybe<UserUpdateToOneWithWhereWithoutFileInput>;
  upsert?: InputMaybe<UserUpsertWithoutFileInput>;
};

export type UserUpdateOneRequiredWithoutScoreNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutScoreInput>;
  create?: InputMaybe<UserCreateWithoutScoreInput>;
  update?: InputMaybe<UserUpdateToOneWithWhereWithoutScoreInput>;
  upsert?: InputMaybe<UserUpsertWithoutScoreInput>;
};

export type UserUpdateToOneWithWhereWithoutFileInput = {
  data: UserUpdateWithoutFileInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpdateToOneWithWhereWithoutScoreInput = {
  data: UserUpdateWithoutScoreInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpdateWithWhereUniqueWithoutGroupInput = {
  data: UserUpdateWithoutGroupInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithWhereUniqueWithoutOrganizationInput = {
  data: UserUpdateWithoutOrganizationInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithoutFileInput = {
  Group?: InputMaybe<GroupUpdateManyWithoutUsersNestedInput>;
  Organization?: InputMaybe<OrganizationUpdateOneRequiredWithoutUsersNestedInput>;
  Score?: InputMaybe<ScoreUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastname?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutGroupInput = {
  File?: InputMaybe<FileUpdateManyWithoutAuthorNestedInput>;
  Organization?: InputMaybe<OrganizationUpdateOneRequiredWithoutUsersNestedInput>;
  Score?: InputMaybe<ScoreUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastname?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutOrganizationInput = {
  File?: InputMaybe<FileUpdateManyWithoutAuthorNestedInput>;
  Group?: InputMaybe<GroupUpdateManyWithoutUsersNestedInput>;
  Score?: InputMaybe<ScoreUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastname?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutScoreInput = {
  File?: InputMaybe<FileUpdateManyWithoutAuthorNestedInput>;
  Group?: InputMaybe<GroupUpdateManyWithoutUsersNestedInput>;
  Organization?: InputMaybe<OrganizationUpdateOneRequiredWithoutUsersNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastname?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserUpsertWithWhereUniqueWithoutGroupInput = {
  create: UserCreateWithoutGroupInput;
  update: UserUpdateWithoutGroupInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithWhereUniqueWithoutOrganizationInput = {
  create: UserCreateWithoutOrganizationInput;
  update: UserUpdateWithoutOrganizationInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithoutFileInput = {
  create: UserCreateWithoutFileInput;
  update: UserUpdateWithoutFileInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpsertWithoutScoreInput = {
  create: UserCreateWithoutScoreInput;
  update: UserUpdateWithoutScoreInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  File?: InputMaybe<FileListRelationFilter>;
  Group?: InputMaybe<GroupListRelationFilter>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  Organization?: InputMaybe<OrganizationRelationFilter>;
  Score?: InputMaybe<ScoreListRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  externalId?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  lastname?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  organizationId?: InputMaybe<IntFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type UserWhereUniqueInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  File?: InputMaybe<FileListRelationFilter>;
  Group?: InputMaybe<GroupListRelationFilter>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  Organization?: InputMaybe<OrganizationRelationFilter>;
  Score?: InputMaybe<ScoreListRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  lastname?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  organizationId?: InputMaybe<IntFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type GetSubjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubjectsQuery = { __typename?: 'Query', subjects: Array<{ __typename?: 'Subject', color: string, name: string, id: string, Topics?: Array<{ __typename?: 'Topic', name: string }> | null }> };

export type GetUserQueryVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', name: string, lastname: string, role: Role, organizationId: number, email: string, externalId: string, id: string } };

export type GetSubjectsPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubjectsPathsQuery = { __typename?: 'Query', subjects: Array<{ __typename?: 'Subject', id: string }> };

export type GetSubjectQueryVariables = Exact<{
  subjectId: Scalars['Int']['input'];
  topicId: Scalars['Int']['input'];
}>;


export type GetSubjectQuery = { __typename?: 'Query', subject: { __typename?: 'Subject', id: string, name: string, color: string, Topics?: Array<{ __typename?: 'Topic', name: string, id: string }> | null }, topicAndSubtopic: { __typename?: 'Topic', name: string, id: string, Subtopics?: Array<{ __typename?: 'Subtopic', id: string, name: string, _count: { __typename?: 'SubtopicCount', Notes: number }, Notes?: Array<{ __typename?: 'Note', type: Types, File?: { __typename?: 'File', title: string, externalId: string, id: string } | null }> | null }> | null } };

export type GetNotesQueryVariables = Exact<{
  where?: InputMaybe<NoteWhereInput>;
}>;


export type GetNotesQuery = { __typename?: 'Query', notes: Array<{ __typename?: 'Note', File?: { __typename?: 'File', id: string, title: string } | null }> };

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetUserByEmailQuery = { __typename?: 'Query', userByEmail: { __typename?: 'User', email: string, id: string, lastname: string, name: string, role: Role } };

export type GetUsersQueryVariables = Exact<{
  where?: InputMaybe<UserWhereInput>;
}>;


export type GetUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', lastname: string, name: string, role: Role, email: string }> };

export type GetOrganizationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganizationQuery = { __typename?: 'Query', organizations: Array<{ __typename?: 'Organization', id: string, name: string }> };

export type GetGroupsQueryVariables = Exact<{
  where?: InputMaybe<GroupWhereInput>;
}>;


export type GetGroupsQuery = { __typename?: 'Query', groups: Array<{ __typename?: 'Group', id: string, name: string, Users?: Array<{ __typename?: 'User', name: string, lastname: string, externalId: string, role: Role, email: string }> | null }> };

export type CreateGroupMutationVariables = Exact<{
  createGroupInput: GroupCreateInput;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', name: string } };

export type CreateTopicMutationVariables = Exact<{
  createTopicInput: TopicCreateInput;
}>;


export type CreateTopicMutation = { __typename?: 'Mutation', createTopic: { __typename?: 'Topic', name: string, id: string } };

export type CreateSubtopicMutationVariables = Exact<{
  createSubtopicInput: SubtopicCreateInput;
}>;


export type CreateSubtopicMutation = { __typename?: 'Mutation', createSubtopic: { __typename?: 'Subtopic', id: string, name: string } };

export type UpdateTopicMutationVariables = Exact<{
  updateTopicId: Scalars['Float']['input'];
  updateTopicInput: TopicUpdateInput;
}>;


export type UpdateTopicMutation = { __typename?: 'Mutation', updateTopic: { __typename?: 'Topic', name: string, id: string } };

export type UpdateSubtopicMutationVariables = Exact<{
  updateSubtopicId: Scalars['Float']['input'];
  updateSubtopicInput: SubtopicUpdateInput;
}>;


export type UpdateSubtopicMutation = { __typename?: 'Mutation', updateSubtopic: { __typename?: 'Subtopic', id: string } };

export type UpdateGroupMutationVariables = Exact<{
  updateGroupId: Scalars['Float']['input'];
  updateGroupInput: GroupUpdateInput;
}>;


export type UpdateGroupMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: string, name: string } };

export type UpdateSubjectMutationVariables = Exact<{
  updateSubjectId: Scalars['Float']['input'];
  updateSubjectInput: SubjectUpdateInput;
}>;


export type UpdateSubjectMutation = { __typename?: 'Mutation', updateSubject: { __typename?: 'Subject', name: string, id: string } };

export type CreateSubjectMutationVariables = Exact<{
  createSubjectInput: SubjectCreateInput;
}>;


export type CreateSubjectMutation = { __typename?: 'Mutation', createSubject: { __typename?: 'Subject', id: string, name: string } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: UserCreateInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email: string } };

export type RemoveUserMutationVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', id: string, name: string, lastname: string } };

export type RemoveSubjectMutationVariables = Exact<{
  removeSubjectId: Scalars['Int']['input'];
}>;


export type RemoveSubjectMutation = { __typename?: 'Mutation', removeSubject: { __typename?: 'Subject', id: string, name: string } };

export type RemoveGroupMutationVariables = Exact<{
  removeGroupId: Scalars['Int']['input'];
}>;


export type RemoveGroupMutation = { __typename?: 'Mutation', removeGroup: { __typename?: 'Group', id: string, name: string } };

export type UpdateUserMutationVariables = Exact<{
  where: UserWhereUniqueInput;
  updateUserInput: UserUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string } };

export type RemoveTopicMutationVariables = Exact<{
  removeTopicId: Scalars['Int']['input'];
}>;


export type RemoveTopicMutation = { __typename?: 'Mutation', removeTopic: { __typename?: 'Topic', id: string, name: string } };

export type RemoveSubtopicMutationVariables = Exact<{
  removeSubtopicId: Scalars['Int']['input'];
}>;


export type RemoveSubtopicMutation = { __typename?: 'Mutation', removeSubtopic: { __typename?: 'Subtopic', name: string, id: string } };


export const GetSubjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSubjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"Topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetSubjectsQuery, GetSubjectsQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserWhereUniqueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetSubjectsPathsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSubjectsPaths"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetSubjectsPathsQuery, GetSubjectsPathsQueryVariables>;
export const GetSubjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSubject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subjectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subjectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"Topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"topicAndSubtopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topicId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"Subtopics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Notes"}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"Notes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"File"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSubjectQuery, GetSubjectQueryVariables>;
export const GetNotesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNotes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NoteWhereInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"File"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<GetNotesQuery, GetNotesQueryVariables>;
export const GetUserByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
export const GetUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserWhereInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
export const GetOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrganization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetOrganizationQuery, GetOrganizationQueryVariables>;
export const GetGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GroupWhereInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"Users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<GetGroupsQuery, GetGroupsQueryVariables>;
export const CreateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createGroupInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GroupCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createGroupInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createGroupInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateGroupMutation, CreateGroupMutationVariables>;
export const CreateTopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createTopicInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TopicCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createTopicInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createTopicInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateTopicMutation, CreateTopicMutationVariables>;
export const CreateSubtopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSubtopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createSubtopicInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubtopicCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSubtopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createSubtopicInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createSubtopicInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateSubtopicMutation, CreateSubtopicMutationVariables>;
export const UpdateTopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateTopicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateTopicInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TopicUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateTopicId"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateTopicInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateTopicInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateTopicMutation, UpdateTopicMutationVariables>;
export const UpdateSubtopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSubtopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateSubtopicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateSubtopicInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubtopicUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSubtopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateSubtopicId"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateSubtopicInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateSubtopicInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateSubtopicMutation, UpdateSubtopicMutationVariables>;
export const UpdateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateGroupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateGroupInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GroupUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateGroupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateGroupInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateGroupInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const UpdateSubjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSubject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateSubjectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateSubjectInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubjectUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSubject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateSubjectId"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateSubjectInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateSubjectInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateSubjectMutation, UpdateSubjectMutationVariables>;
export const CreateSubjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSubject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createSubjectInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubjectCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSubject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createSubjectInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createSubjectInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateSubjectMutation, CreateSubjectMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const RemoveUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserWhereUniqueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}}]}}]} as unknown as DocumentNode<RemoveUserMutation, RemoveUserMutationVariables>;
export const RemoveSubjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveSubject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeSubjectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSubject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeSubjectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RemoveSubjectMutation, RemoveSubjectMutationVariables>;
export const RemoveGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeGroupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeGroupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RemoveGroupMutation, RemoveGroupMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserWhereUniqueInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const RemoveTopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeTopicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeTopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeTopicId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<RemoveTopicMutation, RemoveTopicMutationVariables>;
export const RemoveSubtopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeSubtopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeSubtopicId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSubtopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeSubtopicId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveSubtopicMutation, RemoveSubtopicMutationVariables>;