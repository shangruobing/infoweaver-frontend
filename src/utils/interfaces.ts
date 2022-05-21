/* eslint-disable no-unused-vars */
export interface Message {
  type?: string
  author?: string
  data: {
    text?: string
    meta?: string
    emoji?: string
    url?: string
    preview?: boolean
    rate?: boolean
  }
}
export interface Notice {
  id?: string
  name?: string
  url?: string
  mysql_id?: string
}

export interface ChatRecord {
  question: string
  has_history: boolean
  history: any
}

export type SearchResult = Array<Notice> | string

export interface ChatReply {
  answer_type: string
  results: SearchResult
}

export enum AnswerType {
  BAIDU = 'baidu',
  DATABASE = 'database_search',
  CHAT = 'chat',
  LOCAL = 'local',
  BERT = 'bert',
  UNKNOWN = 'unknown'
}
