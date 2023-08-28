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

export type Doc = {
  __typename?: 'Doc';
  Author: User;
  Score?: Maybe<Array<Score>>;
  Subject: Subject;
  Subtopic?: Maybe<Subtopic>;
  Topic: Topic;
  _count: DocCount;
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  externalId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  privacity: Privacity;
  subjectId: Scalars['Int']['output'];
  subtopicId?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
  topicId: Scalars['Int']['output'];
  type: DocTypes;
  updateAt?: Maybe<Scalars['DateTime']['output']>;
  userId: Scalars['Int']['output'];
};

export type DocCount = {
  __typename?: 'DocCount';
  Score: Scalars['Int']['output'];
};

export type DocCreateInput = {
  Author: UserCreateNestedOneWithoutDocInput;
  Score?: InputMaybe<ScoreCreateNestedManyWithoutDocumentInput>;
  Subject: SubjectCreateNestedOneWithoutDocsInput;
  Subtopic?: InputMaybe<SubtopicCreateNestedOneWithoutDocsInput>;
  Topic: TopicCreateNestedOneWithoutDocsInput;
  content: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  externalId: Scalars['String']['input'];
  privacity: Privacity;
  title: Scalars['String']['input'];
  type: DocTypes;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DocCreateManyAuthorInput = {
  content: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  externalId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  privacity: Privacity;
  subjectId: Scalars['Int']['input'];
  subtopicId?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  topicId: Scalars['Int']['input'];
  type: DocTypes;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DocCreateManyAuthorInputEnvelope = {
  data: Array<DocCreateManyAuthorInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DocCreateManySubjectInput = {
  content: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  externalId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  privacity: Privacity;
  subtopicId?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  topicId: Scalars['Int']['input'];
  type: DocTypes;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['Int']['input'];
};

export type DocCreateManySubjectInputEnvelope = {
  data: Array<DocCreateManySubjectInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DocCreateManySubtopicInput = {
  content: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  externalId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  privacity: Privacity;
  subjectId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  topicId: Scalars['Int']['input'];
  type: DocTypes;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  userId: Scalars['Int']['input'];
};

export type DocCreateManySubtopicInputEnvelope = {
  data: Array<DocCreateManySubtopicInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DocCreateManyTopicInput = {
  content: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  externalId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  privacity: Privacity;
  subjectId: Scalars['Int']['input'];
  subtopicId?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  type: DocTypes;
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

export type DocCreateNestedManyWithoutSubjectInput = {
  connect?: InputMaybe<Array<DocWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DocCreateOrConnectWithoutSubjectInput>>;
  create?: InputMaybe<Array<DocCreateWithoutSubjectInput>>;
  createMany?: InputMaybe<DocCreateManySubjectInputEnvelope>;
};

export type DocCreateNestedManyWithoutSubtopicInput = {
  connect?: InputMaybe<Array<DocWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DocCreateOrConnectWithoutSubtopicInput>>;
  create?: InputMaybe<Array<DocCreateWithoutSubtopicInput>>;
  createMany?: InputMaybe<DocCreateManySubtopicInputEnvelope>;
};

export type DocCreateNestedManyWithoutTopicInput = {
  connect?: InputMaybe<Array<DocWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DocCreateOrConnectWithoutTopicInput>>;
  create?: InputMaybe<Array<DocCreateWithoutTopicInput>>;
  createMany?: InputMaybe<DocCreateManyTopicInputEnvelope>;
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

export type DocCreateOrConnectWithoutScoreInput = {
  create: DocCreateWithoutScoreInput;
  where: DocWhereUniqueInput;
};

export type DocCreateOrConnectWithoutSubjectInput = {
  create: DocCreateWithoutSubjectInput;
  where: DocWhereUniqueInput;
};

export type DocCreateOrConnectWithoutSubtopicInput = {
  create: DocCreateWithoutSubtopicInput;
  where: DocWhereUniqueInput;
};

export type DocCreateOrConnectWithoutTopicInput = {
  create: DocCreateWithoutTopicInput;
  where: DocWhereUniqueInput;
};

export type DocCreateWithoutAuthorInput = {
  Score?: InputMaybe<ScoreCreateNestedManyWithoutDocumentInput>;
  Subject: SubjectCreateNestedOneWithoutDocsInput;
  Subtopic?: InputMaybe<SubtopicCreateNestedOneWithoutDocsInput>;
  Topic: TopicCreateNestedOneWithoutDocsInput;
  content: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  externalId: Scalars['String']['input'];
  privacity: Privacity;
  title: Scalars['String']['input'];
  type: DocTypes;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DocCreateWithoutScoreInput = {
  Author: UserCreateNestedOneWithoutDocInput;
  Subject: SubjectCreateNestedOneWithoutDocsInput;
  Subtopic?: InputMaybe<SubtopicCreateNestedOneWithoutDocsInput>;
  Topic: TopicCreateNestedOneWithoutDocsInput;
  content: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  externalId: Scalars['String']['input'];
  privacity: Privacity;
  title: Scalars['String']['input'];
  type: DocTypes;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DocCreateWithoutSubjectInput = {
  Author: UserCreateNestedOneWithoutDocInput;
  Score?: InputMaybe<ScoreCreateNestedManyWithoutDocumentInput>;
  Subtopic?: InputMaybe<SubtopicCreateNestedOneWithoutDocsInput>;
  Topic: TopicCreateNestedOneWithoutDocsInput;
  content: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  externalId: Scalars['String']['input'];
  privacity: Privacity;
  title: Scalars['String']['input'];
  type: DocTypes;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DocCreateWithoutSubtopicInput = {
  Author: UserCreateNestedOneWithoutDocInput;
  Score?: InputMaybe<ScoreCreateNestedManyWithoutDocumentInput>;
  Subject: SubjectCreateNestedOneWithoutDocsInput;
  Topic: TopicCreateNestedOneWithoutDocsInput;
  content: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  externalId: Scalars['String']['input'];
  privacity: Privacity;
  title: Scalars['String']['input'];
  type: DocTypes;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DocCreateWithoutTopicInput = {
  Author: UserCreateNestedOneWithoutDocInput;
  Score?: InputMaybe<ScoreCreateNestedManyWithoutDocumentInput>;
  Subject: SubjectCreateNestedOneWithoutDocsInput;
  Subtopic?: InputMaybe<SubtopicCreateNestedOneWithoutDocsInput>;
  content: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  externalId: Scalars['String']['input'];
  privacity: Privacity;
  title: Scalars['String']['input'];
  type: DocTypes;
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
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  externalId?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  privacity?: InputMaybe<EnumPrivacityFilter>;
  subjectId?: InputMaybe<IntFilter>;
  subtopicId?: InputMaybe<IntNullableFilter>;
  title?: InputMaybe<StringFilter>;
  topicId?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumDocTypesFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<IntFilter>;
};

export enum DocTypes {
  Evaluation = 'EVALUATION',
  Exercises = 'EXERCISES',
  Notes = 'NOTES'
}

export type DocUpdateInput = {
  Author?: InputMaybe<UserUpdateOneRequiredWithoutDocNestedInput>;
  Score?: InputMaybe<ScoreUpdateManyWithoutDocumentNestedInput>;
  Subject?: InputMaybe<SubjectUpdateOneRequiredWithoutDocsNestedInput>;
  Subtopic?: InputMaybe<SubtopicUpdateOneWithoutDocsNestedInput>;
  Topic?: InputMaybe<TopicUpdateOneRequiredWithoutDocsNestedInput>;
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  privacity?: InputMaybe<EnumPrivacityFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumDocTypesFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type DocUpdateManyMutationInput = {
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  privacity?: InputMaybe<EnumPrivacityFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumDocTypesFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type DocUpdateManyWithWhereWithoutAuthorInput = {
  data: DocUpdateManyMutationInput;
  where: DocScalarWhereInput;
};

export type DocUpdateManyWithWhereWithoutSubjectInput = {
  data: DocUpdateManyMutationInput;
  where: DocScalarWhereInput;
};

export type DocUpdateManyWithWhereWithoutSubtopicInput = {
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

export type DocUpdateManyWithoutSubjectNestedInput = {
  connect?: InputMaybe<Array<DocWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DocCreateOrConnectWithoutSubjectInput>>;
  create?: InputMaybe<Array<DocCreateWithoutSubjectInput>>;
  createMany?: InputMaybe<DocCreateManySubjectInputEnvelope>;
  delete?: InputMaybe<Array<DocWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<DocScalarWhereInput>>;
  disconnect?: InputMaybe<Array<DocWhereUniqueInput>>;
  set?: InputMaybe<Array<DocWhereUniqueInput>>;
  update?: InputMaybe<Array<DocUpdateWithWhereUniqueWithoutSubjectInput>>;
  updateMany?: InputMaybe<Array<DocUpdateManyWithWhereWithoutSubjectInput>>;
  upsert?: InputMaybe<Array<DocUpsertWithWhereUniqueWithoutSubjectInput>>;
};

export type DocUpdateManyWithoutSubtopicNestedInput = {
  connect?: InputMaybe<Array<DocWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DocCreateOrConnectWithoutSubtopicInput>>;
  create?: InputMaybe<Array<DocCreateWithoutSubtopicInput>>;
  createMany?: InputMaybe<DocCreateManySubtopicInputEnvelope>;
  delete?: InputMaybe<Array<DocWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<DocScalarWhereInput>>;
  disconnect?: InputMaybe<Array<DocWhereUniqueInput>>;
  set?: InputMaybe<Array<DocWhereUniqueInput>>;
  update?: InputMaybe<Array<DocUpdateWithWhereUniqueWithoutSubtopicInput>>;
  updateMany?: InputMaybe<Array<DocUpdateManyWithWhereWithoutSubtopicInput>>;
  upsert?: InputMaybe<Array<DocUpsertWithWhereUniqueWithoutSubtopicInput>>;
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

export type DocUpdateOneRequiredWithoutScoreNestedInput = {
  connect?: InputMaybe<DocWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DocCreateOrConnectWithoutScoreInput>;
  create?: InputMaybe<DocCreateWithoutScoreInput>;
  update?: InputMaybe<DocUpdateToOneWithWhereWithoutScoreInput>;
  upsert?: InputMaybe<DocUpsertWithoutScoreInput>;
};

export type DocUpdateToOneWithWhereWithoutScoreInput = {
  data: DocUpdateWithoutScoreInput;
  where?: InputMaybe<DocWhereInput>;
};

export type DocUpdateWithWhereUniqueWithoutAuthorInput = {
  data: DocUpdateWithoutAuthorInput;
  where: DocWhereUniqueInput;
};

export type DocUpdateWithWhereUniqueWithoutSubjectInput = {
  data: DocUpdateWithoutSubjectInput;
  where: DocWhereUniqueInput;
};

export type DocUpdateWithWhereUniqueWithoutSubtopicInput = {
  data: DocUpdateWithoutSubtopicInput;
  where: DocWhereUniqueInput;
};

export type DocUpdateWithWhereUniqueWithoutTopicInput = {
  data: DocUpdateWithoutTopicInput;
  where: DocWhereUniqueInput;
};

export type DocUpdateWithoutAuthorInput = {
  Score?: InputMaybe<ScoreUpdateManyWithoutDocumentNestedInput>;
  Subject?: InputMaybe<SubjectUpdateOneRequiredWithoutDocsNestedInput>;
  Subtopic?: InputMaybe<SubtopicUpdateOneWithoutDocsNestedInput>;
  Topic?: InputMaybe<TopicUpdateOneRequiredWithoutDocsNestedInput>;
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  privacity?: InputMaybe<EnumPrivacityFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumDocTypesFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type DocUpdateWithoutScoreInput = {
  Author?: InputMaybe<UserUpdateOneRequiredWithoutDocNestedInput>;
  Subject?: InputMaybe<SubjectUpdateOneRequiredWithoutDocsNestedInput>;
  Subtopic?: InputMaybe<SubtopicUpdateOneWithoutDocsNestedInput>;
  Topic?: InputMaybe<TopicUpdateOneRequiredWithoutDocsNestedInput>;
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  privacity?: InputMaybe<EnumPrivacityFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumDocTypesFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type DocUpdateWithoutSubjectInput = {
  Author?: InputMaybe<UserUpdateOneRequiredWithoutDocNestedInput>;
  Score?: InputMaybe<ScoreUpdateManyWithoutDocumentNestedInput>;
  Subtopic?: InputMaybe<SubtopicUpdateOneWithoutDocsNestedInput>;
  Topic?: InputMaybe<TopicUpdateOneRequiredWithoutDocsNestedInput>;
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  privacity?: InputMaybe<EnumPrivacityFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumDocTypesFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type DocUpdateWithoutSubtopicInput = {
  Author?: InputMaybe<UserUpdateOneRequiredWithoutDocNestedInput>;
  Score?: InputMaybe<ScoreUpdateManyWithoutDocumentNestedInput>;
  Subject?: InputMaybe<SubjectUpdateOneRequiredWithoutDocsNestedInput>;
  Topic?: InputMaybe<TopicUpdateOneRequiredWithoutDocsNestedInput>;
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  privacity?: InputMaybe<EnumPrivacityFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumDocTypesFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type DocUpdateWithoutTopicInput = {
  Author?: InputMaybe<UserUpdateOneRequiredWithoutDocNestedInput>;
  Score?: InputMaybe<ScoreUpdateManyWithoutDocumentNestedInput>;
  Subject?: InputMaybe<SubjectUpdateOneRequiredWithoutDocsNestedInput>;
  Subtopic?: InputMaybe<SubtopicUpdateOneWithoutDocsNestedInput>;
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  privacity?: InputMaybe<EnumPrivacityFieldUpdateOperationsInput>;
  title?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumDocTypesFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type DocUpsertWithWhereUniqueWithoutAuthorInput = {
  create: DocCreateWithoutAuthorInput;
  update: DocUpdateWithoutAuthorInput;
  where: DocWhereUniqueInput;
};

export type DocUpsertWithWhereUniqueWithoutSubjectInput = {
  create: DocCreateWithoutSubjectInput;
  update: DocUpdateWithoutSubjectInput;
  where: DocWhereUniqueInput;
};

export type DocUpsertWithWhereUniqueWithoutSubtopicInput = {
  create: DocCreateWithoutSubtopicInput;
  update: DocUpdateWithoutSubtopicInput;
  where: DocWhereUniqueInput;
};

export type DocUpsertWithWhereUniqueWithoutTopicInput = {
  create: DocCreateWithoutTopicInput;
  update: DocUpdateWithoutTopicInput;
  where: DocWhereUniqueInput;
};

export type DocUpsertWithoutScoreInput = {
  create: DocCreateWithoutScoreInput;
  update: DocUpdateWithoutScoreInput;
  where?: InputMaybe<DocWhereInput>;
};

export type DocWhereInput = {
  AND?: InputMaybe<Array<DocWhereInput>>;
  Author?: InputMaybe<UserRelationFilter>;
  NOT?: InputMaybe<Array<DocWhereInput>>;
  OR?: InputMaybe<Array<DocWhereInput>>;
  Score?: InputMaybe<ScoreListRelationFilter>;
  Subject?: InputMaybe<SubjectRelationFilter>;
  Subtopic?: InputMaybe<SubtopicNullableRelationFilter>;
  Topic?: InputMaybe<TopicRelationFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  externalId?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  privacity?: InputMaybe<EnumPrivacityFilter>;
  subjectId?: InputMaybe<IntFilter>;
  subtopicId?: InputMaybe<IntNullableFilter>;
  title?: InputMaybe<StringFilter>;
  topicId?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumDocTypesFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type DocWhereUniqueInput = {
  AND?: InputMaybe<Array<DocWhereInput>>;
  Author?: InputMaybe<UserRelationFilter>;
  NOT?: InputMaybe<Array<DocWhereInput>>;
  OR?: InputMaybe<Array<DocWhereInput>>;
  Score?: InputMaybe<ScoreListRelationFilter>;
  Subject?: InputMaybe<SubjectRelationFilter>;
  Subtopic?: InputMaybe<SubtopicNullableRelationFilter>;
  Topic?: InputMaybe<TopicRelationFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  privacity?: InputMaybe<EnumPrivacityFilter>;
  subjectId?: InputMaybe<IntFilter>;
  subtopicId?: InputMaybe<IntNullableFilter>;
  title?: InputMaybe<StringFilter>;
  topicId?: InputMaybe<IntFilter>;
  type?: InputMaybe<EnumDocTypesFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type EnumDocTypesFieldUpdateOperationsInput = {
  set?: InputMaybe<DocTypes>;
};

export type EnumDocTypesFilter = {
  equals?: InputMaybe<DocTypes>;
  in?: InputMaybe<Array<DocTypes>>;
  not?: InputMaybe<NestedEnumDocTypesFilter>;
  notIn?: InputMaybe<Array<DocTypes>>;
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

export type Grade = {
  __typename?: 'Grade';
  School: School;
  Users?: Maybe<Array<User>>;
  _count: GradeCount;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  schoolId: Scalars['Int']['output'];
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type GradeCount = {
  __typename?: 'GradeCount';
  Users: Scalars['Int']['output'];
};

export type GradeCreateInput = {
  School: SchoolCreateNestedOneWithoutGradesInput;
  Users?: InputMaybe<UserCreateNestedManyWithoutGradeInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GradeCreateManySchoolInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GradeCreateManySchoolInputEnvelope = {
  data: Array<GradeCreateManySchoolInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GradeCreateNestedManyWithoutSchoolInput = {
  connect?: InputMaybe<Array<GradeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GradeCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<GradeCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<GradeCreateManySchoolInputEnvelope>;
};

export type GradeCreateNestedOneWithoutUsersInput = {
  connect?: InputMaybe<GradeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GradeCreateOrConnectWithoutUsersInput>;
  create?: InputMaybe<GradeCreateWithoutUsersInput>;
};

export type GradeCreateOrConnectWithoutSchoolInput = {
  create: GradeCreateWithoutSchoolInput;
  where: GradeWhereUniqueInput;
};

export type GradeCreateOrConnectWithoutUsersInput = {
  create: GradeCreateWithoutUsersInput;
  where: GradeWhereUniqueInput;
};

export type GradeCreateWithoutSchoolInput = {
  Users?: InputMaybe<UserCreateNestedManyWithoutGradeInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GradeCreateWithoutUsersInput = {
  School: SchoolCreateNestedOneWithoutGradesInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type GradeListRelationFilter = {
  every?: InputMaybe<GradeWhereInput>;
  none?: InputMaybe<GradeWhereInput>;
  some?: InputMaybe<GradeWhereInput>;
};

export type GradeRelationFilter = {
  is?: InputMaybe<GradeWhereInput>;
  isNot?: InputMaybe<GradeWhereInput>;
};

export type GradeScalarWhereInput = {
  AND?: InputMaybe<Array<GradeScalarWhereInput>>;
  NOT?: InputMaybe<Array<GradeScalarWhereInput>>;
  OR?: InputMaybe<Array<GradeScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  schoolId?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type GradeUpdateInput = {
  School?: InputMaybe<SchoolUpdateOneRequiredWithoutGradesNestedInput>;
  Users?: InputMaybe<UserUpdateManyWithoutGradeNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type GradeUpdateManyMutationInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type GradeUpdateManyWithWhereWithoutSchoolInput = {
  data: GradeUpdateManyMutationInput;
  where: GradeScalarWhereInput;
};

export type GradeUpdateManyWithoutSchoolNestedInput = {
  connect?: InputMaybe<Array<GradeWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GradeCreateOrConnectWithoutSchoolInput>>;
  create?: InputMaybe<Array<GradeCreateWithoutSchoolInput>>;
  createMany?: InputMaybe<GradeCreateManySchoolInputEnvelope>;
  delete?: InputMaybe<Array<GradeWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<GradeScalarWhereInput>>;
  disconnect?: InputMaybe<Array<GradeWhereUniqueInput>>;
  set?: InputMaybe<Array<GradeWhereUniqueInput>>;
  update?: InputMaybe<Array<GradeUpdateWithWhereUniqueWithoutSchoolInput>>;
  updateMany?: InputMaybe<Array<GradeUpdateManyWithWhereWithoutSchoolInput>>;
  upsert?: InputMaybe<Array<GradeUpsertWithWhereUniqueWithoutSchoolInput>>;
};

export type GradeUpdateOneRequiredWithoutUsersNestedInput = {
  connect?: InputMaybe<GradeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GradeCreateOrConnectWithoutUsersInput>;
  create?: InputMaybe<GradeCreateWithoutUsersInput>;
  update?: InputMaybe<GradeUpdateToOneWithWhereWithoutUsersInput>;
  upsert?: InputMaybe<GradeUpsertWithoutUsersInput>;
};

export type GradeUpdateToOneWithWhereWithoutUsersInput = {
  data: GradeUpdateWithoutUsersInput;
  where?: InputMaybe<GradeWhereInput>;
};

export type GradeUpdateWithWhereUniqueWithoutSchoolInput = {
  data: GradeUpdateWithoutSchoolInput;
  where: GradeWhereUniqueInput;
};

export type GradeUpdateWithoutSchoolInput = {
  Users?: InputMaybe<UserUpdateManyWithoutGradeNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type GradeUpdateWithoutUsersInput = {
  School?: InputMaybe<SchoolUpdateOneRequiredWithoutGradesNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type GradeUpsertWithWhereUniqueWithoutSchoolInput = {
  create: GradeCreateWithoutSchoolInput;
  update: GradeUpdateWithoutSchoolInput;
  where: GradeWhereUniqueInput;
};

export type GradeUpsertWithoutUsersInput = {
  create: GradeCreateWithoutUsersInput;
  update: GradeUpdateWithoutUsersInput;
  where?: InputMaybe<GradeWhereInput>;
};

export type GradeWhereInput = {
  AND?: InputMaybe<Array<GradeWhereInput>>;
  NOT?: InputMaybe<Array<GradeWhereInput>>;
  OR?: InputMaybe<Array<GradeWhereInput>>;
  School?: InputMaybe<SchoolRelationFilter>;
  Users?: InputMaybe<UserListRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  schoolId?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type GradeWhereUniqueInput = {
  AND?: InputMaybe<Array<GradeWhereInput>>;
  NOT?: InputMaybe<Array<GradeWhereInput>>;
  OR?: InputMaybe<Array<GradeWhereInput>>;
  School?: InputMaybe<SchoolRelationFilter>;
  Users?: InputMaybe<UserListRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<StringFilter>;
  schoolId?: InputMaybe<IntFilter>;
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
  createDoc: Doc;
  createGrade: Grade;
  createSchool: School;
  createScore: Score;
  createSubject: Subject;
  createSubtopic: Subtopic;
  createTopic: Topic;
  createUser: User;
  removeDoc: Doc;
  removeGrade: Grade;
  removeSchool: School;
  removeScore: Score;
  removeSubject: Subject;
  removeSubtopic: Subtopic;
  removeTopic: Topic;
  removeUser: User;
  updateDoc: Doc;
  updateGrade: Grade;
  updateSchool: School;
  updateScore: Score;
  updateSubject: Subject;
  updateSubtopic: Subtopic;
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


export type MutationCreateSubtopicArgs = {
  createSubtopicInput: SubtopicCreateInput;
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


export type MutationRemoveSubtopicArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTopicArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUserArgs = {
  where: UserWhereUniqueInput;
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


export type MutationUpdateSubtopicArgs = {
  id: Scalars['Float']['input'];
  updateSubtopicInput: SubtopicUpdateInput;
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

export type NestedEnumDocTypesFilter = {
  equals?: InputMaybe<DocTypes>;
  in?: InputMaybe<Array<DocTypes>>;
  not?: InputMaybe<NestedEnumDocTypesFilter>;
  notIn?: InputMaybe<Array<DocTypes>>;
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

export enum Privacity {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Query = {
  __typename?: 'Query';
  doc: Doc;
  docs: Array<Doc>;
  grade: Grade;
  grades: Array<Grade>;
  school: School;
  schools: Array<School>;
  score: Score;
  scores: Array<Score>;
  subject: Subject;
  subjects: Array<Subject>;
  subtopic: Subtopic;
  subtopics: Array<Subtopic>;
  topic: Topic;
  topics: Array<Topic>;
  user: User;
  userByEmail: User;
  users: Array<User>;
};


export type QueryDocArgs = {
  where: DocWhereUniqueInput;
};


export type QueryDocsArgs = {
  where: DocWhereInput;
};


export type QueryGradeArgs = {
  id: Scalars['Int']['input'];
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


export type QuerySubtopicArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySubtopicsArgs = {
  where: SubtopicWhereInput;
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


export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
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

export type School = {
  __typename?: 'School';
  Grades?: Maybe<Array<Grade>>;
  Users?: Maybe<Array<User>>;
  _count: SchoolCount;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updateAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SchoolCount = {
  __typename?: 'SchoolCount';
  Grades: Scalars['Int']['output'];
  Users: Scalars['Int']['output'];
};

export type SchoolCreateInput = {
  Grades?: InputMaybe<GradeCreateNestedManyWithoutSchoolInput>;
  Users?: InputMaybe<UserCreateNestedManyWithoutSchoolInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SchoolCreateNestedOneWithoutGradesInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutGradesInput>;
  create?: InputMaybe<SchoolCreateWithoutGradesInput>;
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

export type SchoolCreateOrConnectWithoutUsersInput = {
  create: SchoolCreateWithoutUsersInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolCreateWithoutGradesInput = {
  Users?: InputMaybe<UserCreateNestedManyWithoutSchoolInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SchoolCreateWithoutUsersInput = {
  Grades?: InputMaybe<GradeCreateNestedManyWithoutSchoolInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SchoolRelationFilter = {
  is?: InputMaybe<SchoolWhereInput>;
  isNot?: InputMaybe<SchoolWhereInput>;
};

export type SchoolUpdateInput = {
  Grades?: InputMaybe<GradeUpdateManyWithoutSchoolNestedInput>;
  Users?: InputMaybe<UserUpdateManyWithoutSchoolNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SchoolUpdateOneRequiredWithoutGradesNestedInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutGradesInput>;
  create?: InputMaybe<SchoolCreateWithoutGradesInput>;
  update?: InputMaybe<SchoolUpdateToOneWithWhereWithoutGradesInput>;
  upsert?: InputMaybe<SchoolUpsertWithoutGradesInput>;
};

export type SchoolUpdateOneRequiredWithoutUsersNestedInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SchoolCreateOrConnectWithoutUsersInput>;
  create?: InputMaybe<SchoolCreateWithoutUsersInput>;
  update?: InputMaybe<SchoolUpdateToOneWithWhereWithoutUsersInput>;
  upsert?: InputMaybe<SchoolUpsertWithoutUsersInput>;
};

export type SchoolUpdateToOneWithWhereWithoutGradesInput = {
  data: SchoolUpdateWithoutGradesInput;
  where?: InputMaybe<SchoolWhereInput>;
};

export type SchoolUpdateToOneWithWhereWithoutUsersInput = {
  data: SchoolUpdateWithoutUsersInput;
  where?: InputMaybe<SchoolWhereInput>;
};

export type SchoolUpdateWithoutGradesInput = {
  Users?: InputMaybe<UserUpdateManyWithoutSchoolNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SchoolUpdateWithoutUsersInput = {
  Grades?: InputMaybe<GradeUpdateManyWithoutSchoolNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SchoolUpsertWithoutGradesInput = {
  create: SchoolCreateWithoutGradesInput;
  update: SchoolUpdateWithoutGradesInput;
  where?: InputMaybe<SchoolWhereInput>;
};

export type SchoolUpsertWithoutUsersInput = {
  create: SchoolCreateWithoutUsersInput;
  update: SchoolUpdateWithoutUsersInput;
  where?: InputMaybe<SchoolWhereInput>;
};

export type SchoolWhereInput = {
  AND?: InputMaybe<Array<SchoolWhereInput>>;
  Grades?: InputMaybe<GradeListRelationFilter>;
  NOT?: InputMaybe<Array<SchoolWhereInput>>;
  OR?: InputMaybe<Array<SchoolWhereInput>>;
  Users?: InputMaybe<UserListRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type SchoolWhereUniqueInput = {
  AND?: InputMaybe<Array<SchoolWhereInput>>;
  Grades?: InputMaybe<GradeListRelationFilter>;
  NOT?: InputMaybe<Array<SchoolWhereInput>>;
  OR?: InputMaybe<Array<SchoolWhereInput>>;
  Users?: InputMaybe<UserListRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type Score = {
  __typename?: 'Score';
  User: User;
  alternatives: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  docId: Scalars['Int']['output'];
  document: Doc;
  id: Scalars['ID']['output'];
  score: Scalars['Int']['output'];
  updateAt?: Maybe<Scalars['DateTime']['output']>;
  userId: Scalars['Int']['output'];
};

export type ScoreCreateInput = {
  User: UserCreateNestedOneWithoutScoreInput;
  alternatives: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  document: DocCreateNestedOneWithoutScoreInput;
  score: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
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
  User: UserCreateNestedOneWithoutScoreInput;
  alternatives: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  score: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
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
  User?: InputMaybe<UserUpdateOneRequiredWithoutScoreNestedInput>;
  alternatives?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  document?: InputMaybe<DocUpdateOneRequiredWithoutScoreNestedInput>;
  score?: InputMaybe<IntFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
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
  User?: InputMaybe<UserUpdateOneRequiredWithoutScoreNestedInput>;
  alternatives?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  score?: InputMaybe<IntFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
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
  User?: InputMaybe<UserRelationFilter>;
  alternatives?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  docId?: InputMaybe<IntFilter>;
  document?: InputMaybe<DocRelationFilter>;
  id?: InputMaybe<IntFilter>;
  score?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type ScoreWhereUniqueInput = {
  AND?: InputMaybe<Array<ScoreWhereInput>>;
  NOT?: InputMaybe<Array<ScoreWhereInput>>;
  OR?: InputMaybe<Array<ScoreWhereInput>>;
  User?: InputMaybe<UserRelationFilter>;
  alternatives?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  docId?: InputMaybe<IntFilter>;
  document?: InputMaybe<DocRelationFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
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
  Docs?: Maybe<Array<Doc>>;
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
  Docs: Scalars['Int']['output'];
  Subtopic: Scalars['Int']['output'];
  Topics: Scalars['Int']['output'];
};

export type SubjectCreateInput = {
  Docs?: InputMaybe<DocCreateNestedManyWithoutSubjectInput>;
  Subtopic?: InputMaybe<SubtopicCreateNestedManyWithoutSubjectInput>;
  Topics?: InputMaybe<TopicCreateNestedManyWithoutSubjectInput>;
  color: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubjectCreateNestedOneWithoutDocsInput = {
  connect?: InputMaybe<SubjectWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SubjectCreateOrConnectWithoutDocsInput>;
  create?: InputMaybe<SubjectCreateWithoutDocsInput>;
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

export type SubjectCreateOrConnectWithoutDocsInput = {
  create: SubjectCreateWithoutDocsInput;
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

export type SubjectCreateWithoutDocsInput = {
  Subtopic?: InputMaybe<SubtopicCreateNestedManyWithoutSubjectInput>;
  Topics?: InputMaybe<TopicCreateNestedManyWithoutSubjectInput>;
  color: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubjectCreateWithoutSubtopicInput = {
  Docs?: InputMaybe<DocCreateNestedManyWithoutSubjectInput>;
  Topics?: InputMaybe<TopicCreateNestedManyWithoutSubjectInput>;
  color: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubjectCreateWithoutTopicsInput = {
  Docs?: InputMaybe<DocCreateNestedManyWithoutSubjectInput>;
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

export type SubjectRelationFilter = {
  is?: InputMaybe<SubjectWhereInput>;
  isNot?: InputMaybe<SubjectWhereInput>;
};

export type SubjectUpdateInput = {
  Docs?: InputMaybe<DocUpdateManyWithoutSubjectNestedInput>;
  Subtopic?: InputMaybe<SubtopicUpdateManyWithoutSubjectNestedInput>;
  Topics?: InputMaybe<TopicUpdateManyWithoutSubjectNestedInput>;
  color?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubjectUpdateOneRequiredWithoutDocsNestedInput = {
  connect?: InputMaybe<SubjectWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SubjectCreateOrConnectWithoutDocsInput>;
  create?: InputMaybe<SubjectCreateWithoutDocsInput>;
  update?: InputMaybe<SubjectUpdateToOneWithWhereWithoutDocsInput>;
  upsert?: InputMaybe<SubjectUpsertWithoutDocsInput>;
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

export type SubjectUpdateToOneWithWhereWithoutDocsInput = {
  data: SubjectUpdateWithoutDocsInput;
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

export type SubjectUpdateWithoutDocsInput = {
  Subtopic?: InputMaybe<SubtopicUpdateManyWithoutSubjectNestedInput>;
  Topics?: InputMaybe<TopicUpdateManyWithoutSubjectNestedInput>;
  color?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubjectUpdateWithoutSubtopicInput = {
  Docs?: InputMaybe<DocUpdateManyWithoutSubjectNestedInput>;
  Topics?: InputMaybe<TopicUpdateManyWithoutSubjectNestedInput>;
  color?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubjectUpdateWithoutTopicsInput = {
  Docs?: InputMaybe<DocUpdateManyWithoutSubjectNestedInput>;
  Subtopic?: InputMaybe<SubtopicUpdateManyWithoutSubjectNestedInput>;
  color?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubjectUpsertWithoutDocsInput = {
  create: SubjectCreateWithoutDocsInput;
  update: SubjectUpdateWithoutDocsInput;
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
  Docs?: InputMaybe<DocListRelationFilter>;
  NOT?: InputMaybe<Array<SubjectWhereInput>>;
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
  Docs?: InputMaybe<DocListRelationFilter>;
  NOT?: InputMaybe<Array<SubjectWhereInput>>;
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
  Docs?: Maybe<Array<Doc>>;
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
  Docs: Scalars['Int']['output'];
};

export type SubtopicCreateInput = {
  Docs?: InputMaybe<DocCreateNestedManyWithoutSubtopicInput>;
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

export type SubtopicCreateNestedOneWithoutDocsInput = {
  connect?: InputMaybe<SubtopicWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SubtopicCreateOrConnectWithoutDocsInput>;
  create?: InputMaybe<SubtopicCreateWithoutDocsInput>;
};

export type SubtopicCreateOrConnectWithoutDocsInput = {
  create: SubtopicCreateWithoutDocsInput;
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

export type SubtopicCreateWithoutDocsInput = {
  Subject?: InputMaybe<SubjectCreateNestedOneWithoutSubtopicInput>;
  Topic: TopicCreateNestedOneWithoutSubtopicsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubtopicCreateWithoutSubjectInput = {
  Docs?: InputMaybe<DocCreateNestedManyWithoutSubtopicInput>;
  Topic: TopicCreateNestedOneWithoutSubtopicsInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubtopicCreateWithoutTopicInput = {
  Docs?: InputMaybe<DocCreateNestedManyWithoutSubtopicInput>;
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
  Docs?: InputMaybe<DocUpdateManyWithoutSubtopicNestedInput>;
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

export type SubtopicUpdateOneWithoutDocsNestedInput = {
  connect?: InputMaybe<SubtopicWhereUniqueInput>;
  connectOrCreate?: InputMaybe<SubtopicCreateOrConnectWithoutDocsInput>;
  create?: InputMaybe<SubtopicCreateWithoutDocsInput>;
  delete?: InputMaybe<SubtopicWhereInput>;
  disconnect?: InputMaybe<SubtopicWhereInput>;
  update?: InputMaybe<SubtopicUpdateToOneWithWhereWithoutDocsInput>;
  upsert?: InputMaybe<SubtopicUpsertWithoutDocsInput>;
};

export type SubtopicUpdateToOneWithWhereWithoutDocsInput = {
  data: SubtopicUpdateWithoutDocsInput;
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

export type SubtopicUpdateWithoutDocsInput = {
  Subject?: InputMaybe<SubjectUpdateOneWithoutSubtopicNestedInput>;
  Topic?: InputMaybe<TopicUpdateOneRequiredWithoutSubtopicsNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubtopicUpdateWithoutSubjectInput = {
  Docs?: InputMaybe<DocUpdateManyWithoutSubtopicNestedInput>;
  Topic?: InputMaybe<TopicUpdateOneRequiredWithoutSubtopicsNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type SubtopicUpdateWithoutTopicInput = {
  Docs?: InputMaybe<DocUpdateManyWithoutSubtopicNestedInput>;
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

export type SubtopicUpsertWithoutDocsInput = {
  create: SubtopicCreateWithoutDocsInput;
  update: SubtopicUpdateWithoutDocsInput;
  where?: InputMaybe<SubtopicWhereInput>;
};

export type SubtopicWhereInput = {
  AND?: InputMaybe<Array<SubtopicWhereInput>>;
  Docs?: InputMaybe<DocListRelationFilter>;
  NOT?: InputMaybe<Array<SubtopicWhereInput>>;
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
  Docs?: InputMaybe<DocListRelationFilter>;
  NOT?: InputMaybe<Array<SubtopicWhereInput>>;
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
  Docs?: Maybe<Array<Doc>>;
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
  Docs: Scalars['Int']['output'];
  Subtopics: Scalars['Int']['output'];
};

export type TopicCreateInput = {
  Docs?: InputMaybe<DocCreateNestedManyWithoutTopicInput>;
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

export type TopicCreateNestedOneWithoutDocsInput = {
  connect?: InputMaybe<TopicWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TopicCreateOrConnectWithoutDocsInput>;
  create?: InputMaybe<TopicCreateWithoutDocsInput>;
};

export type TopicCreateNestedOneWithoutSubtopicsInput = {
  connect?: InputMaybe<TopicWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TopicCreateOrConnectWithoutSubtopicsInput>;
  create?: InputMaybe<TopicCreateWithoutSubtopicsInput>;
};

export type TopicCreateOrConnectWithoutDocsInput = {
  create: TopicCreateWithoutDocsInput;
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

export type TopicCreateWithoutDocsInput = {
  Subject?: InputMaybe<SubjectCreateNestedOneWithoutTopicsInput>;
  Subtopics?: InputMaybe<SubtopicCreateNestedManyWithoutTopicInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TopicCreateWithoutSubjectInput = {
  Docs?: InputMaybe<DocCreateNestedManyWithoutTopicInput>;
  Subtopics?: InputMaybe<SubtopicCreateNestedManyWithoutTopicInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name: Scalars['String']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TopicCreateWithoutSubtopicsInput = {
  Docs?: InputMaybe<DocCreateNestedManyWithoutTopicInput>;
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
  Docs?: InputMaybe<DocUpdateManyWithoutTopicNestedInput>;
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

export type TopicUpdateOneRequiredWithoutDocsNestedInput = {
  connect?: InputMaybe<TopicWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TopicCreateOrConnectWithoutDocsInput>;
  create?: InputMaybe<TopicCreateWithoutDocsInput>;
  update?: InputMaybe<TopicUpdateToOneWithWhereWithoutDocsInput>;
  upsert?: InputMaybe<TopicUpsertWithoutDocsInput>;
};

export type TopicUpdateOneRequiredWithoutSubtopicsNestedInput = {
  connect?: InputMaybe<TopicWhereUniqueInput>;
  connectOrCreate?: InputMaybe<TopicCreateOrConnectWithoutSubtopicsInput>;
  create?: InputMaybe<TopicCreateWithoutSubtopicsInput>;
  update?: InputMaybe<TopicUpdateToOneWithWhereWithoutSubtopicsInput>;
  upsert?: InputMaybe<TopicUpsertWithoutSubtopicsInput>;
};

export type TopicUpdateToOneWithWhereWithoutDocsInput = {
  data: TopicUpdateWithoutDocsInput;
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

export type TopicUpdateWithoutDocsInput = {
  Subject?: InputMaybe<SubjectUpdateOneWithoutTopicsNestedInput>;
  Subtopics?: InputMaybe<SubtopicUpdateManyWithoutTopicNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type TopicUpdateWithoutSubjectInput = {
  Docs?: InputMaybe<DocUpdateManyWithoutTopicNestedInput>;
  Subtopics?: InputMaybe<SubtopicUpdateManyWithoutTopicNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
};

export type TopicUpdateWithoutSubtopicsInput = {
  Docs?: InputMaybe<DocUpdateManyWithoutTopicNestedInput>;
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

export type TopicUpsertWithoutDocsInput = {
  create: TopicCreateWithoutDocsInput;
  update: TopicUpdateWithoutDocsInput;
  where?: InputMaybe<TopicWhereInput>;
};

export type TopicUpsertWithoutSubtopicsInput = {
  create: TopicCreateWithoutSubtopicsInput;
  update: TopicUpdateWithoutSubtopicsInput;
  where?: InputMaybe<TopicWhereInput>;
};

export type TopicWhereInput = {
  AND?: InputMaybe<Array<TopicWhereInput>>;
  Docs?: InputMaybe<DocListRelationFilter>;
  NOT?: InputMaybe<Array<TopicWhereInput>>;
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
  Docs?: InputMaybe<DocListRelationFilter>;
  NOT?: InputMaybe<Array<TopicWhereInput>>;
  OR?: InputMaybe<Array<TopicWhereInput>>;
  Subject?: InputMaybe<SubjectNullableRelationFilter>;
  Subtopics?: InputMaybe<SubtopicListRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  subjectId?: InputMaybe<IntNullableFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
};

export type User = {
  __typename?: 'User';
  Doc?: Maybe<Array<Doc>>;
  Grade: Grade;
  School: School;
  Score?: Maybe<Array<Score>>;
  _count: UserCount;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  externalId: Scalars['String']['output'];
  gradeId: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  role: Role;
  schoolId: Scalars['Int']['output'];
  updateAt?: Maybe<Scalars['DateTime']['output']>;
  username: Scalars['String']['output'];
};

export type UserCount = {
  __typename?: 'UserCount';
  Doc: Scalars['Int']['output'];
  Score: Scalars['Int']['output'];
};

export type UserCreateInput = {
  Doc?: InputMaybe<DocCreateNestedManyWithoutAuthorInput>;
  Grade: GradeCreateNestedOneWithoutUsersInput;
  School: SchoolCreateNestedOneWithoutUsersInput;
  Score?: InputMaybe<ScoreCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  externalId: Scalars['String']['input'];
  role: Role;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  username: Scalars['String']['input'];
};

export type UserCreateManyGradeInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  externalId: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  role: Role;
  schoolId: Scalars['Int']['input'];
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  username: Scalars['String']['input'];
};

export type UserCreateManyGradeInputEnvelope = {
  data: Array<UserCreateManyGradeInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserCreateManySchoolInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  externalId: Scalars['String']['input'];
  gradeId: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  role: Role;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  username: Scalars['String']['input'];
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
  Grade: GradeCreateNestedOneWithoutUsersInput;
  School: SchoolCreateNestedOneWithoutUsersInput;
  Score?: InputMaybe<ScoreCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  externalId: Scalars['String']['input'];
  role: Role;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  username: Scalars['String']['input'];
};

export type UserCreateWithoutGradeInput = {
  Doc?: InputMaybe<DocCreateNestedManyWithoutAuthorInput>;
  School: SchoolCreateNestedOneWithoutUsersInput;
  Score?: InputMaybe<ScoreCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  externalId: Scalars['String']['input'];
  role: Role;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  username: Scalars['String']['input'];
};

export type UserCreateWithoutSchoolInput = {
  Doc?: InputMaybe<DocCreateNestedManyWithoutAuthorInput>;
  Grade: GradeCreateNestedOneWithoutUsersInput;
  Score?: InputMaybe<ScoreCreateNestedManyWithoutUserInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  externalId: Scalars['String']['input'];
  role: Role;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  username: Scalars['String']['input'];
};

export type UserCreateWithoutScoreInput = {
  Doc?: InputMaybe<DocCreateNestedManyWithoutAuthorInput>;
  Grade: GradeCreateNestedOneWithoutUsersInput;
  School: SchoolCreateNestedOneWithoutUsersInput;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  externalId: Scalars['String']['input'];
  role: Role;
  updateAt?: InputMaybe<Scalars['DateTime']['input']>;
  username: Scalars['String']['input'];
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
  gradeId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  schoolId?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
  username?: InputMaybe<StringFilter>;
};

export type UserUpdateInput = {
  Doc?: InputMaybe<DocUpdateManyWithoutAuthorNestedInput>;
  Grade?: InputMaybe<GradeUpdateOneRequiredWithoutUsersNestedInput>;
  School?: InputMaybe<SchoolUpdateOneRequiredWithoutUsersNestedInput>;
  Score?: InputMaybe<ScoreUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateManyMutationInput = {
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
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
  update?: InputMaybe<UserUpdateToOneWithWhereWithoutDocInput>;
  upsert?: InputMaybe<UserUpsertWithoutDocInput>;
};

export type UserUpdateOneRequiredWithoutScoreNestedInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  connectOrCreate?: InputMaybe<UserCreateOrConnectWithoutScoreInput>;
  create?: InputMaybe<UserCreateWithoutScoreInput>;
  update?: InputMaybe<UserUpdateToOneWithWhereWithoutScoreInput>;
  upsert?: InputMaybe<UserUpsertWithoutScoreInput>;
};

export type UserUpdateToOneWithWhereWithoutDocInput = {
  data: UserUpdateWithoutDocInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpdateToOneWithWhereWithoutScoreInput = {
  data: UserUpdateWithoutScoreInput;
  where?: InputMaybe<UserWhereInput>;
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
  Grade?: InputMaybe<GradeUpdateOneRequiredWithoutUsersNestedInput>;
  School?: InputMaybe<SchoolUpdateOneRequiredWithoutUsersNestedInput>;
  Score?: InputMaybe<ScoreUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutGradeInput = {
  Doc?: InputMaybe<DocUpdateManyWithoutAuthorNestedInput>;
  School?: InputMaybe<SchoolUpdateOneRequiredWithoutUsersNestedInput>;
  Score?: InputMaybe<ScoreUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutSchoolInput = {
  Doc?: InputMaybe<DocUpdateManyWithoutAuthorNestedInput>;
  Grade?: InputMaybe<GradeUpdateOneRequiredWithoutUsersNestedInput>;
  Score?: InputMaybe<ScoreUpdateManyWithoutUserNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type UserUpdateWithoutScoreInput = {
  Doc?: InputMaybe<DocUpdateManyWithoutAuthorNestedInput>;
  Grade?: InputMaybe<GradeUpdateOneRequiredWithoutUsersNestedInput>;
  School?: InputMaybe<SchoolUpdateOneRequiredWithoutUsersNestedInput>;
  createdAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  externalId?: InputMaybe<StringFieldUpdateOperationsInput>;
  role?: InputMaybe<EnumRoleFieldUpdateOperationsInput>;
  updateAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
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
  where?: InputMaybe<UserWhereInput>;
};

export type UserUpsertWithoutScoreInput = {
  create: UserCreateWithoutScoreInput;
  update: UserUpdateWithoutScoreInput;
  where?: InputMaybe<UserWhereInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  Doc?: InputMaybe<DocListRelationFilter>;
  Grade?: InputMaybe<GradeRelationFilter>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  School?: InputMaybe<SchoolRelationFilter>;
  Score?: InputMaybe<ScoreListRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  externalId?: InputMaybe<StringFilter>;
  gradeId?: InputMaybe<IntFilter>;
  id?: InputMaybe<IntFilter>;
  role?: InputMaybe<EnumRoleFilter>;
  schoolId?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
  username?: InputMaybe<StringFilter>;
};

export type UserWhereUniqueInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  Doc?: InputMaybe<DocListRelationFilter>;
  Grade?: InputMaybe<GradeRelationFilter>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  School?: InputMaybe<SchoolRelationFilter>;
  Score?: InputMaybe<ScoreListRelationFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['String']['input']>;
  gradeId?: InputMaybe<IntFilter>;
  id?: InputMaybe<Scalars['Int']['input']>;
  role?: InputMaybe<EnumRoleFilter>;
  schoolId?: InputMaybe<IntFilter>;
  updateAt?: InputMaybe<DateTimeNullableFilter>;
  username?: InputMaybe<StringFilter>;
};

export type GetSubjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubjectsQuery = { __typename?: 'Query', subjects: Array<{ __typename?: 'Subject', color: string, name: string, id: string, _count: { __typename?: 'SubjectCount', Docs: number }, Topics?: Array<{ __typename?: 'Topic', name: string }> | null }> };

export type GetSubjectsPathsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubjectsPathsQuery = { __typename?: 'Query', subjects: Array<{ __typename?: 'Subject', id: string }> };

export type GetSubjectQueryVariables = Exact<{
  subjectId: Scalars['Int']['input'];
}>;


export type GetSubjectQuery = { __typename?: 'Query', subject: { __typename?: 'Subject', name: string, color: string, Topics?: Array<{ __typename?: 'Topic', id: string, name: string, _count: { __typename?: 'TopicCount', Docs: number }, Subtopics?: Array<{ __typename?: 'Subtopic', name: string, Docs?: Array<{ __typename?: 'Doc', externalId: string, title: string }> | null }> | null }> | null } };

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetUserByEmailQuery = { __typename?: 'Query', userByEmail: { __typename?: 'User', email: string, gradeId: number, id: string, username: string, role: Role } };

export type UpdateDocMutationVariables = Exact<{
  updateDocId: Scalars['Float']['input'];
  updateDocInput: DocUpdateInput;
}>;


export type UpdateDocMutation = { __typename?: 'Mutation', updateDoc: { __typename?: 'Doc', id: string } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: UserCreateInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, email: string } };

export type RemoveUserMutationVariables = Exact<{
  where: UserWhereUniqueInput;
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', id: string } };

export type GetDocQueryVariables = Exact<{
  where: DocWhereUniqueInput;
}>;


export type GetDocQuery = { __typename?: 'Query', doc: { __typename?: 'Doc', content: string, title: string, privacity: Privacity, externalId: string, id: string, type: DocTypes, Subject: { __typename?: 'Subject', name: string }, Topic: { __typename?: 'Topic', name: string }, Subtopic?: { __typename?: 'Subtopic', name: string } | null } };

export type CreateDocMutationVariables = Exact<{
  createDocInput: DocCreateInput;
}>;


export type CreateDocMutation = { __typename?: 'Mutation', createDoc: { __typename?: 'Doc', id: string } };


export const GetSubjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSubjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Docs"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetSubjectsQuery, GetSubjectsQueryVariables>;
export const GetSubjectsPathsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSubjectsPaths"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetSubjectsPathsQuery, GetSubjectsPathsQueryVariables>;
export const GetSubjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSubject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subjectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subjectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"Topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"_count"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"Docs"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Subtopics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"Docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSubjectQuery, GetSubjectQueryVariables>;
export const GetUserByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"gradeId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
export const UpdateDocDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateDoc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateDocId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateDocInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDoc"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateDocId"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateDocInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateDocInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateDocMutation, UpdateDocMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createUserInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const RemoveUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserWhereUniqueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveUserMutation, RemoveUserMutationVariables>;
export const GetDocDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDoc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocWhereUniqueInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"doc"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"privacity"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"Subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"Subtopic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetDocQuery, GetDocQueryVariables>;
export const CreateDocDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDoc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createDocInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DocCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDoc"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createDocInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createDocInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateDocMutation, CreateDocMutationVariables>;