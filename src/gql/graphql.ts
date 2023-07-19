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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
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

export type Doc = {
  __typename?: 'Doc';
  Score?: Maybe<Array<Score>>;
  _count: DocCount;
  author: User;
  content: Scalars['JSON']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  grades?: Maybe<Array<GradesOnDocs>>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  topic: Topic;
  topicId: Scalars['Int']['output'];
  type: Scalars['String']['output'];
  updateAt?: Maybe<Scalars['DateTime']['output']>;
  userId: Scalars['Int']['output'];
};

export type DocCount = {
  __typename?: 'DocCount';
  Score: Scalars['Int']['output'];
  grades: Scalars['Int']['output'];
};

export type DocCreateInput = {
  Score?: InputMaybe<ScoreCreateNestedManyWithoutDocumentInput>;
  author: UserCreateNestedOneWithoutDocInput;
  content: Scalars['JSON']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  grades?: InputMaybe<GradesOnDocsCreateNestedManyWithoutDocInput>;
  title: Scalars['String']['input'];
  topic: TopicCreateNestedOneWithoutDocInput;
  type: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DocCreateManyAuthorInput = {
  content: Scalars['JSON']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  topicId: Scalars['Int']['input'];
  type: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DocCreateManyAuthorInputEnvelope = {
  data: Array<DocCreateManyAuthorInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DocCreateManyTopicInput = {
  content: Scalars['JSON']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['Int']['input'];
};

export type DocCreateManyTopicInputEnvelope = {
  data: Array<DocCreateManyTopicInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DocCreateNestedManyWithoutAuthorInput = {
  connect?: InputMaybe<Array<DocWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DocCreateOrConnectWithoutAuthorInput>>;
  create?: InputMaybe<Array<DocCreateWithoutAuthorInput>>;
  createMany?: InputMaybe<DocCreateManyAuthorInputEnvelope>;
};

export type DocCreateNestedManyWithoutTopicInput = {
  connect?: InputMaybe<Array<DocWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DocCreateOrConnectWithoutTopicInput>>;
  create?: InputMaybe<Array<DocCreateWithoutTopicInput>>;
  createMany?: InputMaybe<DocCreateManyTopicInputEnvelope>;
};

export type DocCreateNestedOneWithoutGradesInput = {
  connect?: InputMaybe<DocWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DocCreateOrConnectWithoutGradesInput>;
  create?: InputMaybe<DocCreateWithoutGradesInput>;
};

export type DocCreateNestedOneWithoutScoreInput = {
  connect?: InputMaybe<DocWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DocCreateOrConnectWithoutScoreInput>;
  create?: InputMaybe<DocCreateWithoutScoreInput>;
};

export type DocCreateOrConnectWithoutAuthorInput = {
  create: DocCreateWithoutAuthorInput;
  where: DocWhereUniqueInput;
};

export type DocCreateOrConnectWithoutGradesInput = {
  create: DocCreateWithoutGradesInput;
  where: DocWhereUniqueInput;
};

export type DocCreateOrConnectWithoutScoreInput = {
  create: DocCreateWithoutScoreInput;
  where: DocWhereUniqueInput;
};

export type DocCreateOrConnectWithoutTopicInput = {
  create: DocCreateWithoutTopicInput;
  where: DocWhereUniqueInput;
};

export type DocCreateWithoutAuthorInput = {
  Score?: InputMaybe<ScoreCreateNestedManyWithoutDocumentInput>;
  content: Scalars['JSON']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  grades?: InputMaybe<GradesOnDocsCreateNestedManyWithoutDocInput>;
  title: Scalars['String']['input'];
  topic: TopicCreateNestedOneWithoutDocInput;
  type: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DocCreateWithoutGradesInput = {
  Score?: InputMaybe<ScoreCreateNestedManyWithoutDocumentInput>;
  author: UserCreateNestedOneWithoutDocInput;
  content: Scalars['JSON']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  title: Scalars['String']['input'];
  topic: TopicCreateNestedOneWithoutDocInput;
  type: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DocCreateWithoutScoreInput = {
  author: UserCreateNestedOneWithoutDocInput;
  content: Scalars['JSON']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  grades?: InputMaybe<GradesOnDocsCreateNestedManyWithoutDocInput>;
  title: Scalars['String']['input'];
  topic: TopicCreateNestedOneWithoutDocInput;
  type: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DocCreateWithoutTopicInput = {
  Score?: InputMaybe<ScoreCreateNestedManyWithoutDocumentInput>;
  author: UserCreateNestedOneWithoutDocInput;
  content: Scalars['JSON']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  grades?: InputMaybe<GradesOnDocsCreateNestedManyWithoutDocInput>;
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DocListRelationFilter = {
  every?: InputMaybe<DocWhereInput>;
  none?: InputMaybe<DocWhereInput>;
  some?: InputMaybe<DocWhereInput>;
};

export type DocRelationFilter = {
  is?: InputMaybe<DocWhereInput>;
  isNot?: InputMaybe<DocWhereInput>;
};

export type DocScalarWhereInput = {
  AND?: InputMaybe<Array<DocScalarWhereInput>>;
  NOT?: InputMaybe<Array<DocScalarWhereInput>>;
  OR?: InputMaybe<Array<DocScalarWhereInput>>;
  content?: InputMaybe<JsonFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IntFilter>;
  title?: InputMaybe<StringFilter>;
  topicId?: InputMaybe<IntFilter>;
  type?: InputMaybe<StringFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type DocUpdateInput = {
  Score?: InputMaybe<ScoreUpdateManyWithoutDocumentNestedInput>;
  author?: InputMaybe<UserUpdateOneRequiredWithoutDocNestedInput>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  grades?: InputMaybe<GradesOnDocsUpdateManyWithoutDocNestedInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  topic?: InputMaybe<TopicUpdateOneRequiredWithoutDocNestedInput>;
  type?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type DocUpdateManyMutationInput = {
  content?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type DocUpdateManyWithWhereWithoutAuthorInput = {
  data: DocUpdateManyMutationInput;
  where: DocScalarWhereInput;
};

export type DocUpdateManyWithWhereWithoutTopicInput = {
  data: DocUpdateManyMutationInput;
  where: DocScalarWhereInput;
};

export type DocUpdateManyWithoutAuthorNestedInput = {
  connect?: InputMaybe<Array<DocWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DocCreateOrConnectWithoutAuthorInput>>;
  create?: InputMaybe<Array<DocCreateWithoutAuthorInput>>;
  createMany?: InputMaybe<DocCreateManyAuthorInputEnvelope>;
  delete?: InputMaybe<Array<DocWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<DocScalarWhereInput>>;
  disconnect?: InputMaybe<Array<DocWhereUniqueInput>>;
  set?: InputMaybe<Array<DocWhereUniqueInput>>;
  update?: InputMaybe<Array<DocUpdateWithWhereUniqueWithoutAuthorInput>>;
  updateMany?: InputMaybe<Array<DocUpdateManyWithWhereWithoutAuthorInput>>;
  upsert?: InputMaybe<Array<DocUpsertWithWhereUniqueWithoutAuthorInput>>;
};

export type DocUpdateManyWithoutTopicNestedInput = {
  connect?: InputMaybe<Array<DocWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DocCreateOrConnectWithoutTopicInput>>;
  create?: InputMaybe<Array<DocCreateWithoutTopicInput>>;
  createMany?: InputMaybe<DocCreateManyTopicInputEnvelope>;
  delete?: InputMaybe<Array<DocWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<DocScalarWhereInput>>;
  disconnect?: InputMaybe<Array<DocWhereUniqueInput>>;
  set?: InputMaybe<Array<DocWhereUniqueInput>>;
  update?: InputMaybe<Array<DocUpdateWithWhereUniqueWithoutTopicInput>>;
  updateMany?: InputMaybe<Array<DocUpdateManyWithWhereWithoutTopicInput>>;
  upsert?: InputMaybe<Array<DocUpsertWithWhereUniqueWithoutTopicInput>>;
};

export type DocUpdateOneRequiredWithoutGradesNestedInput = {
  connect?: InputMaybe<DocWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DocCreateOrConnectWithoutGradesInput>;
  create?: InputMaybe<DocCreateWithoutGradesInput>;
  update?: InputMaybe<DocUpdateWithoutGradesInput>;
  upsert?: InputMaybe<DocUpsertWithoutGradesInput>;
};

export type DocUpdateOneRequiredWithoutScoreNestedInput = {
  connect?: InputMaybe<DocWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DocCreateOrConnectWithoutScoreInput>;
  create?: InputMaybe<DocCreateWithoutScoreInput>;
  update?: InputMaybe<DocUpdateWithoutScoreInput>;
  upsert?: InputMaybe<DocUpsertWithoutScoreInput>;
};

export type DocUpdateWithWhereUniqueWithoutAuthorInput = {
  data: DocUpdateWithoutAuthorInput;
  where: DocWhereUniqueInput;
};

export type DocUpdateWithWhereUniqueWithoutTopicInput = {
  data: DocUpdateWithoutTopicInput;
  where: DocWhereUniqueInput;
};

export type DocUpdateWithoutAuthorInput = {
  Score?: InputMaybe<ScoreUpdateManyWithoutDocumentNestedInput>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  grades?: InputMaybe<GradesOnDocsUpdateManyWithoutDocNestedInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  topic?: InputMaybe<TopicUpdateOneRequiredWithoutDocNestedInput>;
  type?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type DocUpdateWithoutGradesInput = {
  Score?: InputMaybe<ScoreUpdateManyWithoutDocumentNestedInput>;
  author?: InputMaybe<UserUpdateOneRequiredWithoutDocNestedInput>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  topic?: InputMaybe<TopicUpdateOneRequiredWithoutDocNestedInput>;
  type?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type DocUpdateWithoutScoreInput = {
  author?: InputMaybe<UserUpdateOneRequiredWithoutDocNestedInput>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  grades?: InputMaybe<GradesOnDocsUpdateManyWithoutDocNestedInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  topic?: InputMaybe<TopicUpdateOneRequiredWithoutDocNestedInput>;
  type?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type DocUpdateWithoutTopicInput = {
  Score?: InputMaybe<ScoreUpdateManyWithoutDocumentNestedInput>;
  author?: InputMaybe<UserUpdateOneRequiredWithoutDocNestedInput>;
  content?: InputMaybe<Scalars['JSON']['input']>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  grades?: InputMaybe<GradesOnDocsUpdateManyWithoutDocNestedInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type DocUpsertWithWhereUniqueWithoutAuthorInput = {
  create: DocCreateWithoutAuthorInput;
  update: DocUpdateWithoutAuthorInput;
  where: DocWhereUniqueInput;
};

export type DocUpsertWithWhereUniqueWithoutTopicInput = {
  create: DocCreateWithoutTopicInput;
  update: DocUpdateWithoutTopicInput;
  where: DocWhereUniqueInput;
};

export type DocUpsertWithoutGradesInput = {
  create: DocCreateWithoutGradesInput;
  update: DocUpdateWithoutGradesInput;
};

export type DocUpsertWithoutScoreInput = {
  create: DocCreateWithoutScoreInput;
  update: DocUpdateWithoutScoreInput;
};

export type DocWhereInput = {
  AND?: InputMaybe<Array<DocWhereInput>>;
  NOT?: InputMaybe<Array<DocWhereInput>>;
  OR?: InputMaybe<Array<DocWhereInput>>;
  Score?: InputMaybe<ScoreListRelationFilter>;
  author?: InputMaybe<UserRelationFilter>;
  content?: InputMaybe<JsonFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  grades?: InputMaybe<GradesOnDocsListRelationFilter>;
  id?: InputMaybe<IntFilter>;
  title?: InputMaybe<StringFilter>;
  topic?: InputMaybe<TopicRelationFilter>;
  topicId?: InputMaybe<IntFilter>;
  type?: InputMaybe<StringFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type DocWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type Grade = {
  __typename?: 'Grade';
  _count: GradeCount;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  docs?: Maybe<Array<GradesOnDocs>>;
  grade: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  schools?: Maybe<Array<GradesOnSchools>>;
  updateAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<Array<User>>;
};

export type GradeCount = {
  __typename?: 'GradeCount';
  docs: Scalars['Int']['output'];
  schools: Scalars['Int']['output'];
  users: Scalars['Int']['output'];
};

export type GradeCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  docs?: InputMaybe<GradesOnDocsCreateNestedManyWithoutGradeInput>;
  grade: Scalars['String']['input'];
  schools?: InputMaybe<GradesOnSchoolsCreateNestedManyWithoutGradeInput>;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  users?: InputMaybe<UserCreateNestedManyWithoutGradeInput>;
};

export type GradeCreateNestedOneWithoutDocsInput = {
  connect?: InputMaybe<GradeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GradeCreateOrConnectWithoutDocsInput>;
  create?: InputMaybe<GradeCreateWithoutDocsInput>;
};

export type GradeCreateNestedOneWithoutSchoolsInput = {
  connect?: InputMaybe<GradeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GradeCreateOrConnectWithoutSchoolsInput>;
  create?: InputMaybe<GradeCreateWithoutSchoolsInput>;
};

export type GradeCreateNestedOneWithoutUsersInput = {
  connect?: InputMaybe<GradeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GradeCreateOrConnectWithoutUsersInput>;
  create?: InputMaybe<GradeCreateWithoutUsersInput>;
};

export type GradeCreateOrConnectWithoutDocsInput = {
  create: GradeCreateWithoutDocsInput;
  where: GradeWhereUniqueInput;
};

export type GradeCreateOrConnectWithoutSchoolsInput = {
  create: GradeCreateWithoutSchoolsInput;
  where: GradeWhereUniqueInput;
};

export type GradeCreateOrConnectWithoutUsersInput = {
  create: GradeCreateWithoutUsersInput;
  where: GradeWhereUniqueInput;
};

export type GradeCreateWithoutDocsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  grade: Scalars['String']['input'];
  schools?: InputMaybe<GradesOnSchoolsCreateNestedManyWithoutGradeInput>;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  users?: InputMaybe<UserCreateNestedManyWithoutGradeInput>;
};

export type GradeCreateWithoutSchoolsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  docs?: InputMaybe<GradesOnDocsCreateNestedManyWithoutGradeInput>;
  grade: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  users?: InputMaybe<UserCreateNestedManyWithoutGradeInput>;
};

export type GradeCreateWithoutUsersInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  docs?: InputMaybe<GradesOnDocsCreateNestedManyWithoutGradeInput>;
  grade: Scalars['String']['input'];
  schools?: InputMaybe<GradesOnSchoolsCreateNestedManyWithoutGradeInput>;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GradeRelationFilter = {
  is?: InputMaybe<GradeWhereInput>;
  isNot?: InputMaybe<GradeWhereInput>;
};

export type GradeUpdateInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  docs?: InputMaybe<GradesOnDocsUpdateManyWithoutGradeNestedInput>;
  grade?: InputMaybe<StringFieldUpdateOperationsInput>;
  schools?: InputMaybe<GradesOnSchoolsUpdateManyWithoutGradeNestedInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutGradeNestedInput>;
};

export type GradeUpdateOneRequiredWithoutDocsNestedInput = {
  connect?: InputMaybe<GradeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GradeCreateOrConnectWithoutDocsInput>;
  create?: InputMaybe<GradeCreateWithoutDocsInput>;
  update?: InputMaybe<GradeUpdateWithoutDocsInput>;
  upsert?: InputMaybe<GradeUpsertWithoutDocsInput>;
};

export type GradeUpdateOneRequiredWithoutSchoolsNestedInput = {
  connect?: InputMaybe<GradeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GradeCreateOrConnectWithoutSchoolsInput>;
  create?: InputMaybe<GradeCreateWithoutSchoolsInput>;
  update?: InputMaybe<GradeUpdateWithoutSchoolsInput>;
  upsert?: InputMaybe<GradeUpsertWithoutSchoolsInput>;
};

export type GradeUpdateOneRequiredWithoutUsersNestedInput = {
  connect?: InputMaybe<GradeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GradeCreateOrConnectWithoutUsersInput>;
  create?: InputMaybe<GradeCreateWithoutUsersInput>;
  update?: InputMaybe<GradeUpdateWithoutUsersInput>;
  upsert?: InputMaybe<GradeUpsertWithoutUsersInput>;
};

export type GradeUpdateWithoutDocsInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  grade?: InputMaybe<StringFieldUpdateOperationsInput>;
  schools?: InputMaybe<GradesOnSchoolsUpdateManyWithoutGradeNestedInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutGradeNestedInput>;
};

export type GradeUpdateWithoutSchoolsInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  docs?: InputMaybe<GradesOnDocsUpdateManyWithoutGradeNestedInput>;
  grade?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutGradeNestedInput>;
};

export type GradeUpdateWithoutUsersInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  docs?: InputMaybe<GradesOnDocsUpdateManyWithoutGradeNestedInput>;
  grade?: InputMaybe<StringFieldUpdateOperationsInput>;
  schools?: InputMaybe<GradesOnSchoolsUpdateManyWithoutGradeNestedInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type GradeUpsertWithoutDocsInput = {
  create: GradeCreateWithoutDocsInput;
  update: GradeUpdateWithoutDocsInput;
};

export type GradeUpsertWithoutSchoolsInput = {
  create: GradeCreateWithoutSchoolsInput;
  update: GradeUpdateWithoutSchoolsInput;
};

export type GradeUpsertWithoutUsersInput = {
  create: GradeCreateWithoutUsersInput;
  update: GradeUpdateWithoutUsersInput;
};

export type GradeWhereInput = {
  AND?: InputMaybe<Array<GradeWhereInput>>;
  NOT?: InputMaybe<Array<GradeWhereInput>>;
  OR?: InputMaybe<Array<GradeWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  docs?: InputMaybe<GradesOnDocsListRelationFilter>;
  grade?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  schools?: InputMaybe<GradesOnSchoolsListRelationFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type GradeWhereUniqueInput = {
  grade?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type GradesOnDocs = {
  __typename?: 'GradesOnDocs';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  doc: Doc;
  docId: Scalars['Int']['output'];
  grade: Grade;
  gradeId: Scalars['Int']['output'];
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type GradesOnDocsCreateManyDocInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  gradeId: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GradesOnDocsCreateManyDocInputEnvelope = {
  data: Array<GradesOnDocsCreateManyDocInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GradesOnDocsCreateManyGradeInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  docId: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GradesOnDocsCreateManyGradeInputEnvelope = {
  data: Array<GradesOnDocsCreateManyGradeInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GradesOnDocsCreateNestedManyWithoutDocInput = {
  connect?: InputMaybe<Array<GradesOnDocsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GradesOnDocsCreateOrConnectWithoutDocInput>>;
  create?: InputMaybe<Array<GradesOnDocsCreateWithoutDocInput>>;
  createMany?: InputMaybe<GradesOnDocsCreateManyDocInputEnvelope>;
};

export type GradesOnDocsCreateNestedManyWithoutGradeInput = {
  connect?: InputMaybe<Array<GradesOnDocsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GradesOnDocsCreateOrConnectWithoutGradeInput>>;
  create?: InputMaybe<Array<GradesOnDocsCreateWithoutGradeInput>>;
  createMany?: InputMaybe<GradesOnDocsCreateManyGradeInputEnvelope>;
};

export type GradesOnDocsCreateOrConnectWithoutDocInput = {
  create: GradesOnDocsCreateWithoutDocInput;
  where: GradesOnDocsWhereUniqueInput;
};

export type GradesOnDocsCreateOrConnectWithoutGradeInput = {
  create: GradesOnDocsCreateWithoutGradeInput;
  where: GradesOnDocsWhereUniqueInput;
};

export type GradesOnDocsCreateWithoutDocInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  grade: GradeCreateNestedOneWithoutDocsInput;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GradesOnDocsCreateWithoutGradeInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  doc: DocCreateNestedOneWithoutGradesInput;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GradesOnDocsGradeIdDocIdCompoundUniqueInput = {
  docId: Scalars['Int']['input'];
  gradeId: Scalars['Int']['input'];
};

export type GradesOnDocsListRelationFilter = {
  every?: InputMaybe<GradesOnDocsWhereInput>;
  none?: InputMaybe<GradesOnDocsWhereInput>;
  some?: InputMaybe<GradesOnDocsWhereInput>;
};

export type GradesOnDocsScalarWhereInput = {
  AND?: InputMaybe<Array<GradesOnDocsScalarWhereInput>>;
  NOT?: InputMaybe<Array<GradesOnDocsScalarWhereInput>>;
  OR?: InputMaybe<Array<GradesOnDocsScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  docId?: InputMaybe<IntFilter>;
  gradeId?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type GradesOnDocsUpdateManyMutationInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type GradesOnDocsUpdateManyWithWhereWithoutDocInput = {
  data: GradesOnDocsUpdateManyMutationInput;
  where: GradesOnDocsScalarWhereInput;
};

export type GradesOnDocsUpdateManyWithWhereWithoutGradeInput = {
  data: GradesOnDocsUpdateManyMutationInput;
  where: GradesOnDocsScalarWhereInput;
};

export type GradesOnDocsUpdateManyWithoutDocNestedInput = {
  connect?: InputMaybe<Array<GradesOnDocsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GradesOnDocsCreateOrConnectWithoutDocInput>>;
  create?: InputMaybe<Array<GradesOnDocsCreateWithoutDocInput>>;
  createMany?: InputMaybe<GradesOnDocsCreateManyDocInputEnvelope>;
  delete?: InputMaybe<Array<GradesOnDocsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<GradesOnDocsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<GradesOnDocsWhereUniqueInput>>;
  set?: InputMaybe<Array<GradesOnDocsWhereUniqueInput>>;
  update?: InputMaybe<Array<GradesOnDocsUpdateWithWhereUniqueWithoutDocInput>>;
  updateMany?: InputMaybe<Array<GradesOnDocsUpdateManyWithWhereWithoutDocInput>>;
  upsert?: InputMaybe<Array<GradesOnDocsUpsertWithWhereUniqueWithoutDocInput>>;
};

export type GradesOnDocsUpdateManyWithoutGradeNestedInput = {
  connect?: InputMaybe<Array<GradesOnDocsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GradesOnDocsCreateOrConnectWithoutGradeInput>>;
  create?: InputMaybe<Array<GradesOnDocsCreateWithoutGradeInput>>;
  createMany?: InputMaybe<GradesOnDocsCreateManyGradeInputEnvelope>;
  delete?: InputMaybe<Array<GradesOnDocsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<GradesOnDocsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<GradesOnDocsWhereUniqueInput>>;
  set?: InputMaybe<Array<GradesOnDocsWhereUniqueInput>>;
  update?: InputMaybe<Array<GradesOnDocsUpdateWithWhereUniqueWithoutGradeInput>>;
  updateMany?: InputMaybe<Array<GradesOnDocsUpdateManyWithWhereWithoutGradeInput>>;
  upsert?: InputMaybe<Array<GradesOnDocsUpsertWithWhereUniqueWithoutGradeInput>>;
};

export type GradesOnDocsUpdateWithWhereUniqueWithoutDocInput = {
  data: GradesOnDocsUpdateWithoutDocInput;
  where: GradesOnDocsWhereUniqueInput;
};

export type GradesOnDocsUpdateWithWhereUniqueWithoutGradeInput = {
  data: GradesOnDocsUpdateWithoutGradeInput;
  where: GradesOnDocsWhereUniqueInput;
};

export type GradesOnDocsUpdateWithoutDocInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  grade?: InputMaybe<GradeUpdateOneRequiredWithoutDocsNestedInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type GradesOnDocsUpdateWithoutGradeInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  doc?: InputMaybe<DocUpdateOneRequiredWithoutGradesNestedInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type GradesOnDocsUpsertWithWhereUniqueWithoutDocInput = {
  create: GradesOnDocsCreateWithoutDocInput;
  update: GradesOnDocsUpdateWithoutDocInput;
  where: GradesOnDocsWhereUniqueInput;
};

export type GradesOnDocsUpsertWithWhereUniqueWithoutGradeInput = {
  create: GradesOnDocsCreateWithoutGradeInput;
  update: GradesOnDocsUpdateWithoutGradeInput;
  where: GradesOnDocsWhereUniqueInput;
};

export type GradesOnDocsWhereInput = {
  AND?: InputMaybe<Array<GradesOnDocsWhereInput>>;
  NOT?: InputMaybe<Array<GradesOnDocsWhereInput>>;
  OR?: InputMaybe<Array<GradesOnDocsWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  doc?: InputMaybe<DocRelationFilter>;
  docId?: InputMaybe<IntFilter>;
  grade?: InputMaybe<GradeRelationFilter>;
  gradeId?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type GradesOnDocsWhereUniqueInput = {
  gradeId_docId?: InputMaybe<GradesOnDocsGradeIdDocIdCompoundUniqueInput>;
};

export type GradesOnSchools = {
  __typename?: 'GradesOnSchools';
  Grade: Grade;
  School: School;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  gradeId: Scalars['Int']['output'];
  schoolId: Scalars['Int']['output'];
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type GradesOnSchoolsCreateManyGradeInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  schoolId: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GradesOnSchoolsCreateManyGradeInputEnvelope = {
  data: Array<GradesOnSchoolsCreateManyGradeInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GradesOnSchoolsCreateManySchoolInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  gradeId: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GradesOnSchoolsCreateManySchoolInputEnvelope = {
  data: Array<GradesOnSchoolsCreateManySchoolInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GradesOnSchoolsCreateNestedManyWithoutGradeInput = {
  connect?: InputMaybe<Array<GradesOnSchoolsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GradesOnSchoolsCreateOrConnectWithoutGradeInput>>;
  create?: InputMaybe<Array<GradesOnSchoolsCreateWithoutGradeInput>>;
  createMany?: InputMaybe<GradesOnSchoolsCreateManyGradeInputEnvelope>;
};

export type GradesOnSchoolsCreateNestedManyWithoutSchoolInput = {
  connect?: InputMaybe<Array<GradesOnSchoolsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GradesOnSchoolsCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<GradesOnSchoolsCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<GradesOnSchoolsCreateManySchoolInputEnvelope>;
};

export type GradesOnSchoolsCreateOrConnectWithoutGradeInput = {
  create: GradesOnSchoolsCreateWithoutGradeInput;
  where: GradesOnSchoolsWhereUniqueInput;
};

export type GradesOnSchoolsCreateOrConnectWithoutSchoolInput = {
  create: GradesOnSchoolsCreateWithoutSchoolInput;
  where: GradesOnSchoolsWhereUniqueInput;
};

export type GradesOnSchoolsCreateWithoutGradeInput = {
  School: SchoolCreateNestedOneWithoutGradesInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GradesOnSchoolsCreateWithoutSchoolInput = {
  Grade: GradeCreateNestedOneWithoutSchoolsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GradesOnSchoolsGradeIdSchoolIdCompoundUniqueInput = {
  gradeId: Scalars['Int']['input'];
  schoolId: Scalars['Int']['input'];
};

export type GradesOnSchoolsListRelationFilter = {
  every?: InputMaybe<GradesOnSchoolsWhereInput>;
  none?: InputMaybe<GradesOnSchoolsWhereInput>;
  some?: InputMaybe<GradesOnSchoolsWhereInput>;
};

export type GradesOnSchoolsScalarWhereInput = {
  AND?: InputMaybe<Array<GradesOnSchoolsScalarWhereInput>>;
  NOT?: InputMaybe<Array<GradesOnSchoolsScalarWhereInput>>;
  OR?: InputMaybe<Array<GradesOnSchoolsScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  gradeId?: InputMaybe<IntFilter>;
  schoolId?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type GradesOnSchoolsUpdateManyMutationInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type GradesOnSchoolsUpdateManyWithWhereWithoutGradeInput = {
  data: GradesOnSchoolsUpdateManyMutationInput;
  where: GradesOnSchoolsScalarWhereInput;
};

export type GradesOnSchoolsUpdateManyWithWhereWithoutSchoolInput = {
  data: GradesOnSchoolsUpdateManyMutationInput;
  where: GradesOnSchoolsScalarWhereInput;
};

export type GradesOnSchoolsUpdateManyWithoutGradeNestedInput = {
  connect?: InputMaybe<Array<GradesOnSchoolsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GradesOnSchoolsCreateOrConnectWithoutGradeInput>>;
  create?: InputMaybe<Array<GradesOnSchoolsCreateWithoutGradeInput>>;
  createMany?: InputMaybe<GradesOnSchoolsCreateManyGradeInputEnvelope>;
  delete?: InputMaybe<Array<GradesOnSchoolsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<GradesOnSchoolsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<GradesOnSchoolsWhereUniqueInput>>;
  set?: InputMaybe<Array<GradesOnSchoolsWhereUniqueInput>>;
  update?: InputMaybe<Array<GradesOnSchoolsUpdateWithWhereUniqueWithoutGradeInput>>;
  updateMany?: InputMaybe<Array<GradesOnSchoolsUpdateManyWithWhereWithoutGradeInput>>;
  upsert?: InputMaybe<Array<GradesOnSchoolsUpsertWithWhereUniqueWithoutGradeInput>>;
};

export type GradesOnSchoolsUpdateManyWithoutSchoolNestedInput = {
  connect?: InputMaybe<Array<GradesOnSchoolsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GradesOnSchoolsCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<GradesOnSchoolsCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<GradesOnSchoolsCreateManySchoolInputEnvelope>;
  delete?: InputMaybe<Array<GradesOnSchoolsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<GradesOnSchoolsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<GradesOnSchoolsWhereUniqueInput>>;
  set?: InputMaybe<Array<GradesOnSchoolsWhereUniqueInput>>;
  update?: InputMaybe<Array<GradesOnSchoolsUpdateWithWhereUniqueWithoutSchoolInput>>;
  updateMany?: InputMaybe<Array<GradesOnSchoolsUpdateManyWithWhereWithoutSchoolInput>>;
  upsert?: InputMaybe<Array<GradesOnSchoolsUpsertWithWhereUniqueWithoutSchoolInput>>;
};

export type GradesOnSchoolsUpdateWithWhereUniqueWithoutGradeInput = {
  data: GradesOnSchoolsUpdateWithoutGradeInput;
  where: GradesOnSchoolsWhereUniqueInput;
};

export type GradesOnSchoolsUpdateWithWhereUniqueWithoutSchoolInput = {
  data: GradesOnSchoolsUpdateWithoutSchoolInput;
  where: GradesOnSchoolsWhereUniqueInput;
};

export type GradesOnSchoolsUpdateWithoutGradeInput = {
  School?: InputMaybe<SchoolUpdateOneRequiredWithoutGradesNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type GradesOnSchoolsUpdateWithoutSchoolInput = {
  Grade?: InputMaybe<GradeUpdateOneRequiredWithoutSchoolsNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type GradesOnSchoolsUpsertWithWhereUniqueWithoutGradeInput = {
  create: GradesOnSchoolsCreateWithoutGradeInput;
  update: GradesOnSchoolsUpdateWithoutGradeInput;
  where: GradesOnSchoolsWhereUniqueInput;
};

export type GradesOnSchoolsUpsertWithWhereUniqueWithoutSchoolInput = {
  create: GradesOnSchoolsCreateWithoutSchoolInput;
  update: GradesOnSchoolsUpdateWithoutSchoolInput;
  where: GradesOnSchoolsWhereUniqueInput;
};

export type GradesOnSchoolsWhereInput = {
  AND?: InputMaybe<Array<GradesOnSchoolsWhereInput>>;
  Grade?: InputMaybe<GradeRelationFilter>;
  NOT?: InputMaybe<Array<GradesOnSchoolsWhereInput>>;
  OR?: InputMaybe<Array<GradesOnSchoolsWhereInput>>;
  School?: InputMaybe<SchoolRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  gradeId?: InputMaybe<IntFilter>;
  schoolId?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type GradesOnSchoolsWhereUniqueInput = {
  gradeId_schoolId?: InputMaybe<GradesOnSchoolsGradeIdSchoolIdCompoundUniqueInput>;
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

export type JsonFilter = {
  array_contains?: InputMaybe<Scalars['JSON']['input']>;
  array_ends_with?: InputMaybe<Scalars['JSON']['input']>;
  array_starts_with?: InputMaybe<Scalars['JSON']['input']>;
  equals?: InputMaybe<Scalars['JSON']['input']>;
  gt?: InputMaybe<Scalars['JSON']['input']>;
  gte?: InputMaybe<Scalars['JSON']['input']>;
  lt?: InputMaybe<Scalars['JSON']['input']>;
  lte?: InputMaybe<Scalars['JSON']['input']>;
  not?: InputMaybe<Scalars['JSON']['input']>;
  path?: InputMaybe<Array<Scalars['String']['input']>>;
  string_contains?: InputMaybe<Scalars['String']['input']>;
  string_ends_with?: InputMaybe<Scalars['String']['input']>;
  string_starts_with?: InputMaybe<Scalars['String']['input']>;
};

export type LoginResult = {
  __typename?: 'LoginResult';
  token: Scalars['String']['output'];
};

export type LoginUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDoc: Doc;
  createGrade: Grade;
  createSchool: School;
  createScore: Score;
  createSubject: Subject;
  createTopic: Topic;
  createUser: User;
  removeDoc: Doc;
  removeGrade: Grade;
  removeSchool: School;
  removeScore: Score;
  removeSubject: Subject;
  removeTopic: Topic;
  removeUser: User;
  updateDoc: Doc;
  updateGrade: Grade;
  updateSchool: School;
  updateScore: Score;
  updateSubject: Subject;
  updateTopic: Topic;
  updateUser: User;
};


export type MutationCreateDocArgs = {
  createDocInput: DocCreateInput;
};


export type MutationCreateGradeArgs = {
  createGradeInput: GradeCreateInput;
};


export type MutationCreateSchoolArgs = {
  createSchoolInput: SchoolCreateInput;
};


export type MutationCreateScoreArgs = {
  createScoreInput: ScoreCreateInput;
};


export type MutationCreateSubjectArgs = {
  createSubjectInput: SubjectCreateInput;
};


export type MutationCreateTopicArgs = {
  createTopicInput: TopicCreateInput;
};


export type MutationCreateUserArgs = {
  createUserInput: UserCreateInput;
};


export type MutationRemoveDocArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveGradeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveSchoolArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveScoreArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveSubjectArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTopicArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateDocArgs = {
  id: Scalars['Float']['input'];
  updateDocInput: DocUpdateInput;
};


export type MutationUpdateGradeArgs = {
  id: Scalars['Float']['input'];
  updateGradeInput: GradeUpdateInput;
};


export type MutationUpdateSchoolArgs = {
  id: Scalars['Float']['input'];
  updateSchoolInput: SchoolUpdateInput;
};


export type MutationUpdateScoreArgs = {
  id: Scalars['Float']['input'];
  updateScoreInput: ScoreUpdateInput;
};


export type MutationUpdateSubjectArgs = {
  id: Scalars['Float']['input'];
  updateSubjectInput: SubjectUpdateInput;
};


export type MutationUpdateTopicArgs = {
  id: Scalars['Float']['input'];
  updateTopicInput: TopicUpdateInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['Float']['input'];
  updateUserInput: UserUpdateInput;
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

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Query = {
  __typename?: 'Query';
  doc: Doc;
  docs: Array<Doc>;
  grade: Grade;
  grades: Array<Grade>;
  login: LoginResult;
  school: School;
  schools: Array<School>;
  score: Score;
  scores: Array<Score>;
  stars: Array<User>;
  subject: Subject;
  subjects: Array<Subject>;
  topic: Topic;
  topics: Array<Topic>;
  user: User;
  users: Array<User>;
};


export type QueryDocArgs = {
  id: Scalars['Int']['input'];
};


export type QueryDocsArgs = {
  where: DocWhereInput;
};


export type QueryGradeArgs = {
  id: Scalars['Int']['input'];
};


export type QueryLoginArgs = {
  user: LoginUserInput;
};


export type QuerySchoolArgs = {
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


export type QuerySubjectsArgs = {
  where: SubjectWhereInput;
};


export type QueryTopicArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTopicsArgs = {
  where: TopicWhereInput;
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type School = {
  __typename?: 'School';
  _count: SchoolCount;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  grades?: Maybe<Array<GradesOnSchools>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  subjects?: Maybe<Array<SubjectsOnSchools>>;
  updateAt?: Maybe<Scalars['DateTime']['output']>;
  users?: Maybe<Array<User>>;
};

export type SchoolCount = {
  __typename?: 'SchoolCount';
  grades: Scalars['Int']['output'];
  subjects: Scalars['Int']['output'];
  users: Scalars['Int']['output'];
};

export type SchoolCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  grades?: InputMaybe<GradesOnSchoolsCreateNestedManyWithoutSchoolInput>;
  name: Scalars['String']['input'];
  subjects?: InputMaybe<SubjectsOnSchoolsCreateNestedManyWithoutSchoolInput>;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  users?: InputMaybe<UserCreateNestedManyWithoutSchoolInput>;
};

export type SchoolCreateNestedOneWithoutGradesInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutGradesInput>;
  create?: InputMaybe<SchoolCreateWithoutGradesInput>;
};

export type SchoolCreateNestedOneWithoutSubjectsInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutSubjectsInput>;
  create?: InputMaybe<SchoolCreateWithoutSubjectsInput>;
};

export type SchoolCreateNestedOneWithoutUsersInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutUsersInput>;
  create?: InputMaybe<SchoolCreateWithoutUsersInput>;
};

export type SchoolCreateOrConnectWithoutGradesInput = {
  create: SchoolCreateWithoutGradesInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateOrConnectWithoutSubjectsInput = {
  create: SchoolCreateWithoutSubjectsInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateOrConnectWithoutUsersInput = {
  create: SchoolCreateWithoutUsersInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateWithoutGradesInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  subjects?: InputMaybe<SubjectsOnSchoolsCreateNestedManyWithoutSchoolInput>;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  users?: InputMaybe<UserCreateNestedManyWithoutSchoolInput>;
};

export type SchoolCreateWithoutSubjectsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  grades?: InputMaybe<GradesOnSchoolsCreateNestedManyWithoutSchoolInput>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  users?: InputMaybe<UserCreateNestedManyWithoutSchoolInput>;
};

export type SchoolCreateWithoutUsersInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  grades?: InputMaybe<GradesOnSchoolsCreateNestedManyWithoutSchoolInput>;
  name: Scalars['String']['input'];
  subjects?: InputMaybe<SubjectsOnSchoolsCreateNestedManyWithoutSchoolInput>;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SchoolRelationFilter = {
  is?: InputMaybe<SchoolWhereInput>;
  isNot?: InputMaybe<SchoolWhereInput>;
};

export type SchoolUpdateInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  grades?: InputMaybe<GradesOnSchoolsUpdateManyWithoutSchoolNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  subjects?: InputMaybe<SubjectsOnSchoolsUpdateManyWithoutSchoolNestedInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutSchoolNestedInput>;
};

export type SchoolUpdateOneRequiredWithoutGradesNestedInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutGradesInput>;
  create?: InputMaybe<SchoolCreateWithoutGradesInput>;
  update?: InputMaybe<SchoolUpdateWithoutGradesInput>;
  upsert?: InputMaybe<SchoolUpsertWithoutGradesInput>;
};

export type SchoolUpdateOneRequiredWithoutUsersNestedInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutUsersInput>;
  create?: InputMaybe<SchoolCreateWithoutUsersInput>;
  update?: InputMaybe<SchoolUpdateWithoutUsersInput>;
  upsert?: InputMaybe<SchoolUpsertWithoutUsersInput>;
};

export type SchoolUpdateOneWithoutSubjectsNestedInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutSubjectsInput>;
  create?: InputMaybe<SchoolCreateWithoutSubjectsInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<SchoolUpdateWithoutSubjectsInput>;
  upsert?: InputMaybe<SchoolUpsertWithoutSubjectsInput>;
};

export type SchoolUpdateWithoutGradesInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  subjects?: InputMaybe<SubjectsOnSchoolsUpdateManyWithoutSchoolNestedInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutSchoolNestedInput>;
};

export type SchoolUpdateWithoutSubjectsInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  grades?: InputMaybe<GradesOnSchoolsUpdateManyWithoutSchoolNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  users?: InputMaybe<UserUpdateManyWithoutSchoolNestedInput>;
};

export type SchoolUpdateWithoutUsersInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  grades?: InputMaybe<GradesOnSchoolsUpdateManyWithoutSchoolNestedInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  subjects?: InputMaybe<SubjectsOnSchoolsUpdateManyWithoutSchoolNestedInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SchoolUpsertWithoutGradesInput = {
  create: SchoolCreateWithoutGradesInput;
  update: SchoolUpdateWithoutGradesInput;
};

export type SchoolUpsertWithoutSubjectsInput = {
  create: SchoolCreateWithoutSubjectsInput;
  update: SchoolUpdateWithoutSubjectsInput;
};

export type SchoolUpsertWithoutUsersInput = {
  create: SchoolCreateWithoutUsersInput;
  update: SchoolUpdateWithoutUsersInput;
};

export type SchoolWhereInput = {
  AND?: InputMaybe<Array<SchoolWhereInput>>;
  NOT?: InputMaybe<Array<SchoolWhereInput>>;
  OR?: InputMaybe<Array<SchoolWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  grades?: InputMaybe<GradesOnSchoolsListRelationFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  subjects?: InputMaybe<SubjectsOnSchoolsListRelationFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
  users?: InputMaybe<UserListRelationFilter>;
};

export type SchoolWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Score = {
  __typename?: 'Score';
  alternatives: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  docId: Scalars['Int']['output'];
  document: Doc;
  id: Scalars['ID']['output'];
  score: Scalars['Int']['output'];
  updateAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
  userId: Scalars['Int']['output'];
};

export type ScoreCreateInput = {
  alternatives: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  document: DocCreateNestedOneWithoutScoreInput;
  score: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutScoreInput;
};

export type ScoreCreateManyDocumentInput = {
  alternatives: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  score: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['Int']['input'];
};

export type ScoreCreateManyDocumentInputEnvelope = {
  data: Array<ScoreCreateManyDocumentInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ScoreCreateManyUserInput = {
  alternatives: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  docId: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  score: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ScoreCreateManyUserInputEnvelope = {
  data: Array<ScoreCreateManyUserInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ScoreCreateNestedManyWithoutDocumentInput = {
  connect?: InputMaybe<Array<ScoreWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ScoreCreateOrConnectWithoutDocumentInput>>;
  create?: InputMaybe<Array<ScoreCreateWithoutDocumentInput>>;
  createMany?: InputMaybe<ScoreCreateManyDocumentInputEnvelope>;
};

export type ScoreCreateNestedManyWithoutUserInput = {
  connect?: InputMaybe<Array<ScoreWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ScoreCreateOrConnectWithoutUserInput>>;
  create?: InputMaybe<Array<ScoreCreateWithoutUserInput>>;
  createMany?: InputMaybe<ScoreCreateManyUserInputEnvelope>;
};

export type ScoreCreateOrConnectWithoutDocumentInput = {
  create: ScoreCreateWithoutDocumentInput;
  where: ScoreWhereUniqueInput;
};

export type ScoreCreateOrConnectWithoutUserInput = {
  create: ScoreCreateWithoutUserInput;
  where: ScoreWhereUniqueInput;
};

export type ScoreCreateWithoutDocumentInput = {
  alternatives: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  score: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  user: UserCreateNestedOneWithoutScoreInput;
};

export type ScoreCreateWithoutUserInput = {
  alternatives: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  document: DocCreateNestedOneWithoutScoreInput;
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
  docId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  score?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type ScoreUpdateInput = {
  alternatives?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  document?: InputMaybe<DocUpdateOneRequiredWithoutScoreNestedInput>;
  score?: InputMaybe<IntFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutScoreNestedInput>;
};

export type ScoreUpdateManyMutationInput = {
  alternatives?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  score?: InputMaybe<IntFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type ScoreUpdateManyWithWhereWithoutDocumentInput = {
  data: ScoreUpdateManyMutationInput;
  where: ScoreScalarWhereInput;
};

export type ScoreUpdateManyWithWhereWithoutUserInput = {
  data: ScoreUpdateManyMutationInput;
  where: ScoreScalarWhereInput;
};

export type ScoreUpdateManyWithoutDocumentNestedInput = {
  connect?: InputMaybe<Array<ScoreWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ScoreCreateOrConnectWithoutDocumentInput>>;
  create?: InputMaybe<Array<ScoreCreateWithoutDocumentInput>>;
  createMany?: InputMaybe<ScoreCreateManyDocumentInputEnvelope>;
  delete?: InputMaybe<Array<ScoreWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ScoreScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ScoreWhereUniqueInput>>;
  set?: InputMaybe<Array<ScoreWhereUniqueInput>>;
  update?: InputMaybe<Array<ScoreUpdateWithWhereUniqueWithoutDocumentInput>>;
  updateMany?: InputMaybe<Array<ScoreUpdateManyWithWhereWithoutDocumentInput>>;
  upsert?: InputMaybe<Array<ScoreUpsertWithWhereUniqueWithoutDocumentInput>>;
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

export type ScoreUpdateWithWhereUniqueWithoutDocumentInput = {
  data: ScoreUpdateWithoutDocumentInput;
  where: ScoreWhereUniqueInput;
};

export type ScoreUpdateWithWhereUniqueWithoutUserInput = {
  data: ScoreUpdateWithoutUserInput;
  where: ScoreWhereUniqueInput;
};

export type ScoreUpdateWithoutDocumentInput = {
  alternatives?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  score?: InputMaybe<IntFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  user?: InputMaybe<UserUpdateOneRequiredWithoutScoreNestedInput>;
};

export type ScoreUpdateWithoutUserInput = {
  alternatives?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  document?: InputMaybe<DocUpdateOneRequiredWithoutScoreNestedInput>;
  score?: InputMaybe<IntFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type ScoreUpsertWithWhereUniqueWithoutDocumentInput = {
  create: ScoreCreateWithoutDocumentInput;
  update: ScoreUpdateWithoutDocumentInput;
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
  OR?: InputMaybe<Array<ScoreWhereInput>>;
  alternatives?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  docId?: InputMaybe<IntFilter>;
  document?: InputMaybe<DocRelationFilter>;
  id?: InputMaybe<IntFilter>;
  score?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type ScoreWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
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
  _count: SubjectCount;
  color: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  schools?: Maybe<Array<SubjectsOnSchools>>;
  topics?: Maybe<Array<Topic>>;
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SubjectCount = {
  __typename?: 'SubjectCount';
  schools: Scalars['Int']['output'];
  topics: Scalars['Int']['output'];
};

export type SubjectCreateInput = {
  color: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  schools?: InputMaybe<SubjectsOnSchoolsCreateNestedManyWithoutSubjectInput>;
  topics?: InputMaybe<TopicCreateNestedManyWithoutSubjectInput>;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubjectCreateNestedOneWithoutSchoolsInput = {
  connect?: InputMaybe<SubjectWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SubjectCreateOrConnectWithoutSchoolsInput>;
  create?: InputMaybe<SubjectCreateWithoutSchoolsInput>;
};

export type SubjectCreateNestedOneWithoutTopicsInput = {
  connect?: InputMaybe<SubjectWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SubjectCreateOrConnectWithoutTopicsInput>;
  create?: InputMaybe<SubjectCreateWithoutTopicsInput>;
};

export type SubjectCreateOrConnectWithoutSchoolsInput = {
  create: SubjectCreateWithoutSchoolsInput;
  where: SubjectWhereUniqueInput;
};

export type SubjectCreateOrConnectWithoutTopicsInput = {
  create: SubjectCreateWithoutTopicsInput;
  where: SubjectWhereUniqueInput;
};

export type SubjectCreateWithoutSchoolsInput = {
  color: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  topics?: InputMaybe<TopicCreateNestedManyWithoutSubjectInput>;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubjectCreateWithoutTopicsInput = {
  color: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  schools?: InputMaybe<SubjectsOnSchoolsCreateNestedManyWithoutSubjectInput>;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubjectRelationFilter = {
  is?: InputMaybe<SubjectWhereInput>;
  isNot?: InputMaybe<SubjectWhereInput>;
};

export type SubjectUpdateInput = {
  color?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  schools?: InputMaybe<SubjectsOnSchoolsUpdateManyWithoutSubjectNestedInput>;
  topics?: InputMaybe<TopicUpdateManyWithoutSubjectNestedInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubjectUpdateOneWithoutSchoolsNestedInput = {
  connect?: InputMaybe<SubjectWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SubjectCreateOrConnectWithoutSchoolsInput>;
  create?: InputMaybe<SubjectCreateWithoutSchoolsInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<SubjectUpdateWithoutSchoolsInput>;
  upsert?: InputMaybe<SubjectUpsertWithoutSchoolsInput>;
};

export type SubjectUpdateOneWithoutTopicsNestedInput = {
  connect?: InputMaybe<SubjectWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SubjectCreateOrConnectWithoutTopicsInput>;
  create?: InputMaybe<SubjectCreateWithoutTopicsInput>;
  delete?: InputMaybe<Scalars['Boolean']['input']>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
  update?: InputMaybe<SubjectUpdateWithoutTopicsInput>;
  upsert?: InputMaybe<SubjectUpsertWithoutTopicsInput>;
};

export type SubjectUpdateWithoutSchoolsInput = {
  color?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  topics?: InputMaybe<TopicUpdateManyWithoutSubjectNestedInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubjectUpdateWithoutTopicsInput = {
  color?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  schools?: InputMaybe<SubjectsOnSchoolsUpdateManyWithoutSubjectNestedInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubjectUpsertWithoutSchoolsInput = {
  create: SubjectCreateWithoutSchoolsInput;
  update: SubjectUpdateWithoutSchoolsInput;
};

export type SubjectUpsertWithoutTopicsInput = {
  create: SubjectCreateWithoutTopicsInput;
  update: SubjectUpdateWithoutTopicsInput;
};

export type SubjectWhereInput = {
  AND?: InputMaybe<Array<SubjectWhereInput>>;
  NOT?: InputMaybe<Array<SubjectWhereInput>>;
  OR?: InputMaybe<Array<SubjectWhereInput>>;
  color?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  schools?: InputMaybe<SubjectsOnSchoolsListRelationFilter>;
  topics?: InputMaybe<TopicListRelationFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type SubjectWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type SubjectsOnSchools = {
  __typename?: 'SubjectsOnSchools';
  School?: Maybe<School>;
  Subject?: Maybe<Subject>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  schoolId: Scalars['Int']['output'];
  subjectId: Scalars['Int']['output'];
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SubjectsOnSchoolsCreateManySchoolInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  subjectId: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubjectsOnSchoolsCreateManySchoolInputEnvelope = {
  data: Array<SubjectsOnSchoolsCreateManySchoolInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SubjectsOnSchoolsCreateManySubjectInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  schoolId: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubjectsOnSchoolsCreateManySubjectInputEnvelope = {
  data: Array<SubjectsOnSchoolsCreateManySubjectInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SubjectsOnSchoolsCreateNestedManyWithoutSchoolInput = {
  connect?: InputMaybe<Array<SubjectsOnSchoolsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SubjectsOnSchoolsCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<SubjectsOnSchoolsCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<SubjectsOnSchoolsCreateManySchoolInputEnvelope>;
};

export type SubjectsOnSchoolsCreateNestedManyWithoutSubjectInput = {
  connect?: InputMaybe<Array<SubjectsOnSchoolsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SubjectsOnSchoolsCreateOrConnectWithoutSubjectInput>>;
  create?: InputMaybe<Array<SubjectsOnSchoolsCreateWithoutSubjectInput>>;
  createMany?: InputMaybe<SubjectsOnSchoolsCreateManySubjectInputEnvelope>;
};

export type SubjectsOnSchoolsCreateOrConnectWithoutSchoolInput = {
  create: SubjectsOnSchoolsCreateWithoutSchoolInput;
  where: SubjectsOnSchoolsWhereUniqueInput;
};

export type SubjectsOnSchoolsCreateOrConnectWithoutSubjectInput = {
  create: SubjectsOnSchoolsCreateWithoutSubjectInput;
  where: SubjectsOnSchoolsWhereUniqueInput;
};

export type SubjectsOnSchoolsCreateWithoutSchoolInput = {
  Subject?: InputMaybe<SubjectCreateNestedOneWithoutSchoolsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubjectsOnSchoolsCreateWithoutSubjectInput = {
  School?: InputMaybe<SchoolCreateNestedOneWithoutSubjectsInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubjectsOnSchoolsListRelationFilter = {
  every?: InputMaybe<SubjectsOnSchoolsWhereInput>;
  none?: InputMaybe<SubjectsOnSchoolsWhereInput>;
  some?: InputMaybe<SubjectsOnSchoolsWhereInput>;
};

export type SubjectsOnSchoolsScalarWhereInput = {
  AND?: InputMaybe<Array<SubjectsOnSchoolsScalarWhereInput>>;
  NOT?: InputMaybe<Array<SubjectsOnSchoolsScalarWhereInput>>;
  OR?: InputMaybe<Array<SubjectsOnSchoolsScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  schoolId?: InputMaybe<IntFilter>;
  subjectId?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type SubjectsOnSchoolsSubjectIdSchoolIdCompoundUniqueInput = {
  schoolId: Scalars['Int']['input'];
  subjectId: Scalars['Int']['input'];
};

export type SubjectsOnSchoolsUpdateManyMutationInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubjectsOnSchoolsUpdateManyWithWhereWithoutSchoolInput = {
  data: SubjectsOnSchoolsUpdateManyMutationInput;
  where: SubjectsOnSchoolsScalarWhereInput;
};

export type SubjectsOnSchoolsUpdateManyWithWhereWithoutSubjectInput = {
  data: SubjectsOnSchoolsUpdateManyMutationInput;
  where: SubjectsOnSchoolsScalarWhereInput;
};

export type SubjectsOnSchoolsUpdateManyWithoutSchoolNestedInput = {
  connect?: InputMaybe<Array<SubjectsOnSchoolsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SubjectsOnSchoolsCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<SubjectsOnSchoolsCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<SubjectsOnSchoolsCreateManySchoolInputEnvelope>;
  delete?: InputMaybe<Array<SubjectsOnSchoolsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SubjectsOnSchoolsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SubjectsOnSchoolsWhereUniqueInput>>;
  set?: InputMaybe<Array<SubjectsOnSchoolsWhereUniqueInput>>;
  update?: InputMaybe<Array<SubjectsOnSchoolsUpdateWithWhereUniqueWithoutSchoolInput>>;
  updateMany?: InputMaybe<Array<SubjectsOnSchoolsUpdateManyWithWhereWithoutSchoolInput>>;
  upsert?: InputMaybe<Array<SubjectsOnSchoolsUpsertWithWhereUniqueWithoutSchoolInput>>;
};

export type SubjectsOnSchoolsUpdateManyWithoutSubjectNestedInput = {
  connect?: InputMaybe<Array<SubjectsOnSchoolsWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<SubjectsOnSchoolsCreateOrConnectWithoutSubjectInput>>;
  create?: InputMaybe<Array<SubjectsOnSchoolsCreateWithoutSubjectInput>>;
  createMany?: InputMaybe<SubjectsOnSchoolsCreateManySubjectInputEnvelope>;
  delete?: InputMaybe<Array<SubjectsOnSchoolsWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<SubjectsOnSchoolsScalarWhereInput>>;
  disconnect?: InputMaybe<Array<SubjectsOnSchoolsWhereUniqueInput>>;
  set?: InputMaybe<Array<SubjectsOnSchoolsWhereUniqueInput>>;
  update?: InputMaybe<Array<SubjectsOnSchoolsUpdateWithWhereUniqueWithoutSubjectInput>>;
  updateMany?: InputMaybe<Array<SubjectsOnSchoolsUpdateManyWithWhereWithoutSubjectInput>>;
  upsert?: InputMaybe<Array<SubjectsOnSchoolsUpsertWithWhereUniqueWithoutSubjectInput>>;
};

export type SubjectsOnSchoolsUpdateWithWhereUniqueWithoutSchoolInput = {
  data: SubjectsOnSchoolsUpdateWithoutSchoolInput;
  where: SubjectsOnSchoolsWhereUniqueInput;
};

export type SubjectsOnSchoolsUpdateWithWhereUniqueWithoutSubjectInput = {
  data: SubjectsOnSchoolsUpdateWithoutSubjectInput;
  where: SubjectsOnSchoolsWhereUniqueInput;
};

export type SubjectsOnSchoolsUpdateWithoutSchoolInput = {
  Subject?: InputMaybe<SubjectUpdateOneWithoutSchoolsNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubjectsOnSchoolsUpdateWithoutSubjectInput = {
  School?: InputMaybe<SchoolUpdateOneWithoutSubjectsNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubjectsOnSchoolsUpsertWithWhereUniqueWithoutSchoolInput = {
  create: SubjectsOnSchoolsCreateWithoutSchoolInput;
  update: SubjectsOnSchoolsUpdateWithoutSchoolInput;
  where: SubjectsOnSchoolsWhereUniqueInput;
};

export type SubjectsOnSchoolsUpsertWithWhereUniqueWithoutSubjectInput = {
  create: SubjectsOnSchoolsCreateWithoutSubjectInput;
  update: SubjectsOnSchoolsUpdateWithoutSubjectInput;
  where: SubjectsOnSchoolsWhereUniqueInput;
};

export type SubjectsOnSchoolsWhereInput = {
  AND?: InputMaybe<Array<SubjectsOnSchoolsWhereInput>>;
  NOT?: InputMaybe<Array<SubjectsOnSchoolsWhereInput>>;
  OR?: InputMaybe<Array<SubjectsOnSchoolsWhereInput>>;
  School?: InputMaybe<SchoolRelationFilter>;
  Subject?: InputMaybe<SubjectRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  schoolId?: InputMaybe<IntFilter>;
  subjectId?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type SubjectsOnSchoolsWhereUniqueInput = {
  subjectId_schoolId?: InputMaybe<SubjectsOnSchoolsSubjectIdSchoolIdCompoundUniqueInput>;
};

export type Topic = {
  __typename?: 'Topic';
  Doc?: Maybe<Array<Doc>>;
  _count: TopicCount;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  subject?: Maybe<Subject>;
  subjectId?: Maybe<Scalars['Int']['output']>;
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TopicCount = {
  __typename?: 'TopicCount';
  Doc: Scalars['Int']['output'];
};

export type TopicCreateInput = {
  Doc?: InputMaybe<DocCreateNestedManyWithoutTopicInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  subject?: InputMaybe<SubjectCreateNestedOneWithoutTopicsInput>;
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

export type TopicCreateNestedOneWithoutDocInput = {
  connect?: InputMaybe<TopicWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TopicCreateOrConnectWithoutDocInput>;
  create?: InputMaybe<TopicCreateWithoutDocInput>;
};

export type TopicCreateOrConnectWithoutDocInput = {
  create: TopicCreateWithoutDocInput;
  where: TopicWhereUniqueInput;
};

export type TopicCreateOrConnectWithoutSubjectInput = {
  create: TopicCreateWithoutSubjectInput;
  where: TopicWhereUniqueInput;
};

export type TopicCreateWithoutDocInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  subject?: InputMaybe<SubjectCreateNestedOneWithoutTopicsInput>;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TopicCreateWithoutSubjectInput = {
  Doc?: InputMaybe<DocCreateNestedManyWithoutTopicInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TopicListRelationFilter = {
  every?: InputMaybe<TopicWhereInput>;
  none?: InputMaybe<TopicWhereInput>;
  some?: InputMaybe<TopicWhereInput>;
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
  Doc?: InputMaybe<DocUpdateManyWithoutTopicNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  subject?: InputMaybe<SubjectUpdateOneWithoutTopicsNestedInput>;
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

export type TopicUpdateOneRequiredWithoutDocNestedInput = {
  connect?: InputMaybe<TopicWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TopicCreateOrConnectWithoutDocInput>;
  create?: InputMaybe<TopicCreateWithoutDocInput>;
  update?: InputMaybe<TopicUpdateWithoutDocInput>;
  upsert?: InputMaybe<TopicUpsertWithoutDocInput>;
};

export type TopicUpdateWithWhereUniqueWithoutSubjectInput = {
  data: TopicUpdateWithoutSubjectInput;
  where: TopicWhereUniqueInput;
};

export type TopicUpdateWithoutDocInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  subject?: InputMaybe<SubjectUpdateOneWithoutTopicsNestedInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type TopicUpdateWithoutSubjectInput = {
  Doc?: InputMaybe<DocUpdateManyWithoutTopicNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type TopicUpsertWithWhereUniqueWithoutSubjectInput = {
  create: TopicCreateWithoutSubjectInput;
  update: TopicUpdateWithoutSubjectInput;
  where: TopicWhereUniqueInput;
};

export type TopicUpsertWithoutDocInput = {
  create: TopicCreateWithoutDocInput;
  update: TopicUpdateWithoutDocInput;
};

export type TopicWhereInput = {
  AND?: InputMaybe<Array<TopicWhereInput>>;
  Doc?: InputMaybe<DocListRelationFilter>;
  NOT?: InputMaybe<Array<TopicWhereInput>>;
  OR?: InputMaybe<Array<TopicWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  subject?: InputMaybe<SubjectRelationFilter>;
  subjectId?: InputMaybe<IntNullableFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type TopicWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  Doc?: Maybe<Array<Doc>>;
  Score?: Maybe<Array<Score>>;
  _count: UserCount;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  grade: Grade;
  gradeId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  lastname: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nickname: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Scalars['String']['output'];
  school: School;
  schoolId: Scalars['Int']['output'];
  stars: Scalars['Int']['output'];
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserCount = {
  __typename?: 'UserCount';
  Doc: Scalars['Int']['output'];
  Score: Scalars['Int']['output'];
};

export type UserCreateInput = {
  Doc?: InputMaybe<DocCreateNestedManyWithoutAuthorInput>;
  Score?: InputMaybe<ScoreCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  grade: GradeCreateNestedOneWithoutUsersInput;
  lastname: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
  school: SchoolCreateNestedOneWithoutUsersInput;
  stars: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateManyGradeInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  lastname: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
  schoolId: Scalars['Int']['input'];
  stars: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateManyGradeInputEnvelope = {
  data: Array<UserCreateManyGradeInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserCreateManySchoolInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  gradeId: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  lastname: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
  stars: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateManySchoolInputEnvelope = {
  data: Array<UserCreateManySchoolInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserCreateNestedManyWithoutGradeInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutGradeInput>>;
  create?: InputMaybe<Array<UserCreateWithoutGradeInput>>;
  createMany?: InputMaybe<UserCreateManyGradeInputEnvelope>;
};

export type UserCreateNestedManyWithoutSchoolInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<UserCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<UserCreateManySchoolInputEnvelope>;
};

export type UserCreateNestedOneWithoutDocInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutDocInput>;
  create?: InputMaybe<UserCreateWithoutDocInput>;
};

export type UserCreateNestedOneWithoutScoreInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutScoreInput>;
  create?: InputMaybe<UserCreateWithoutScoreInput>;
};

export type UserCreateOrConnectWithoutDocInput = {
  create: UserCreateWithoutDocInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutGradeInput = {
  create: UserCreateWithoutGradeInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutSchoolInput = {
  create: UserCreateWithoutSchoolInput;
  where: UserWhereUniqueInput;
};

export type UserCreateOrConnectWithoutScoreInput = {
  create: UserCreateWithoutScoreInput;
  where: UserWhereUniqueInput;
};

export type UserCreateWithoutDocInput = {
  Score?: InputMaybe<ScoreCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  grade: GradeCreateNestedOneWithoutUsersInput;
  lastname: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
  school: SchoolCreateNestedOneWithoutUsersInput;
  stars: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateWithoutGradeInput = {
  Doc?: InputMaybe<DocCreateNestedManyWithoutAuthorInput>;
  Score?: InputMaybe<ScoreCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
  school: SchoolCreateNestedOneWithoutUsersInput;
  stars: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateWithoutSchoolInput = {
  Doc?: InputMaybe<DocCreateNestedManyWithoutAuthorInput>;
  Score?: InputMaybe<ScoreCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  grade: GradeCreateNestedOneWithoutUsersInput;
  lastname: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
  stars: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateWithoutScoreInput = {
  Doc?: InputMaybe<DocCreateNestedManyWithoutAuthorInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  grade: GradeCreateNestedOneWithoutUsersInput;
  lastname: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Scalars['String']['input'];
  school: SchoolCreateNestedOneWithoutUsersInput;
  stars: Scalars['Int']['input'];
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
  gradeId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  lastname?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nickname?: InputMaybe<StringFilter>;
  password?: InputMaybe<StringFilter>;
  role?: InputMaybe<StringFilter>;
  schoolId?: InputMaybe<IntFilter>;
  stars?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type UserUpdateInput = {
  Doc?: InputMaybe<DocUpdateManyWithoutAuthorNestedInput>;
  Score?: InputMaybe<ScoreUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  grade?: InputMaybe<GradeUpdateOneRequiredWithoutUsersNestedInput>;
  lastname?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  nickname?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<StringFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutUsersNestedInput>;
  stars?: InputMaybe<IntFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserUpdateManyMutationInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastname?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  nickname?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<StringFieldUpdateOperationsInput>;
  stars?: InputMaybe<IntFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserUpdateManyWithWhereWithoutGradeInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithWhereWithoutSchoolInput = {
  data: UserUpdateManyMutationInput;
  where: UserScalarWhereInput;
};

export type UserUpdateManyWithoutGradeNestedInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutGradeInput>>;
  create?: InputMaybe<Array<UserCreateWithoutGradeInput>>;
  createMany?: InputMaybe<UserCreateManyGradeInputEnvelope>;
  delete?: InputMaybe<Array<UserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
  update?: InputMaybe<Array<UserUpdateWithWhereUniqueWithoutGradeInput>>;
  updateMany?: InputMaybe<Array<UserUpdateManyWithWhereWithoutGradeInput>>;
  upsert?: InputMaybe<Array<UserUpsertWithWhereUniqueWithoutGradeInput>>;
};

export type UserUpdateManyWithoutSchoolNestedInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<UserCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<UserCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<UserCreateManySchoolInputEnvelope>;
  delete?: InputMaybe<Array<UserWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<UserScalarWhereInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
  update?: InputMaybe<Array<UserUpdateWithWhereUniqueWithoutSchoolInput>>;
  updateMany?: InputMaybe<Array<UserUpdateManyWithWhereWithoutSchoolInput>>;
  upsert?: InputMaybe<Array<UserUpsertWithWhereUniqueWithoutSchoolInput>>;
};

export type UserUpdateOneRequiredWithoutDocNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutDocInput>;
  create?: InputMaybe<UserCreateWithoutDocInput>;
  update?: InputMaybe<UserUpdateWithoutDocInput>;
  upsert?: InputMaybe<UserUpsertWithoutDocInput>;
};

export type UserUpdateOneRequiredWithoutScoreNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutScoreInput>;
  create?: InputMaybe<UserCreateWithoutScoreInput>;
  update?: InputMaybe<UserUpdateWithoutScoreInput>;
  upsert?: InputMaybe<UserUpsertWithoutScoreInput>;
};

export type UserUpdateWithWhereUniqueWithoutGradeInput = {
  data: UserUpdateWithoutGradeInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithWhereUniqueWithoutSchoolInput = {
  data: UserUpdateWithoutSchoolInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateWithoutDocInput = {
  Score?: InputMaybe<ScoreUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  grade?: InputMaybe<GradeUpdateOneRequiredWithoutUsersNestedInput>;
  lastname?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  nickname?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<StringFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutUsersNestedInput>;
  stars?: InputMaybe<IntFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutGradeInput = {
  Doc?: InputMaybe<DocUpdateManyWithoutAuthorNestedInput>;
  Score?: InputMaybe<ScoreUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastname?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  nickname?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<StringFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutUsersNestedInput>;
  stars?: InputMaybe<IntFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutSchoolInput = {
  Doc?: InputMaybe<DocUpdateManyWithoutAuthorNestedInput>;
  Score?: InputMaybe<ScoreUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  grade?: InputMaybe<GradeUpdateOneRequiredWithoutUsersNestedInput>;
  lastname?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  nickname?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<StringFieldUpdateOperationsInput>;
  stars?: InputMaybe<IntFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutScoreInput = {
  Doc?: InputMaybe<DocUpdateManyWithoutAuthorNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  grade?: InputMaybe<GradeUpdateOneRequiredWithoutUsersNestedInput>;
  lastname?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  nickname?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<StringFieldUpdateOperationsInput>;
  school?: InputMaybe<SchoolUpdateOneRequiredWithoutUsersNestedInput>;
  stars?: InputMaybe<IntFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type UserUpsertWithWhereUniqueWithoutGradeInput = {
  create: UserCreateWithoutGradeInput;
  update: UserUpdateWithoutGradeInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithWhereUniqueWithoutSchoolInput = {
  create: UserCreateWithoutSchoolInput;
  update: UserUpdateWithoutSchoolInput;
  where: UserWhereUniqueInput;
};

export type UserUpsertWithoutDocInput = {
  create: UserCreateWithoutDocInput;
  update: UserUpdateWithoutDocInput;
};

export type UserUpsertWithoutScoreInput = {
  create: UserCreateWithoutScoreInput;
  update: UserUpdateWithoutScoreInput;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  Doc?: InputMaybe<DocListRelationFilter>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  Score?: InputMaybe<ScoreListRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  grade?: InputMaybe<GradeRelationFilter>;
  gradeId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  lastname?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nickname?: InputMaybe<StringFilter>;
  password?: InputMaybe<StringFilter>;
  role?: InputMaybe<StringFilter>;
  school?: InputMaybe<SchoolRelationFilter>;
  schoolId?: InputMaybe<IntFilter>;
  stars?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type GetBasicDataQueryVariables = Exact<{
  where: TopicWhereInput;
  subjectsWhere2: SubjectWhereInput;
}>;


export type GetBasicDataQuery = { __typename?: 'Query', subjects: Array<{ __typename?: 'Subject', id: string, name: string }>, topics: Array<{ __typename?: 'Topic', id: string, name: string, Doc?: Array<{ __typename?: 'Doc', title: string, id: string }> | null }> };

export type GetSubjectsIdsQueryVariables = Exact<{
  where: SubjectWhereInput;
}>;


export type GetSubjectsIdsQuery = { __typename?: 'Query', subjects: Array<{ __typename?: 'Subject', id: string }> };

export type GetDocQueryVariables = Exact<{
  docId: Scalars['Int']['input'];
}>;


export type GetDocQuery = { __typename?: 'Query', doc: { __typename?: 'Doc', content: any } };

export type CreateDocMutationVariables = Exact<{
  createDocInput: DocCreateInput;
}>;


export type CreateDocMutation = { __typename?: 'Mutation', createDoc: { __typename?: 'Doc', id: string } };


export const GetBasicDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBasicData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TopicWhereInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subjectsWhere2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubjectWhereInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subjectsWhere2"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"Doc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetBasicDataQuery, GetBasicDataQueryVariables>;
export const GetSubjectsIdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSubjectsIds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubjectWhereInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetSubjectsIdsQuery, GetSubjectsIdsQueryVariables>;
export const GetDocDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDoc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"docId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"doc"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"docId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]} as unknown as DocumentNode<GetDocQuery, GetDocQueryVariables>;
export const CreateDocDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDoc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createDocInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDoc"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createDocInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createDocInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateDocMutation, CreateDocMutationVariables>;