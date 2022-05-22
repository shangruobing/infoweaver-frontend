/* eslint-disable no-unused-vars */
export declare interface Message {
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
export declare interface Notice {
  id?: string
  name?: string
  url?: string
  mysql_id?: string
}

export declare interface ChatRecord {
  question: string
  has_history: boolean
  history: any
}

export type SearchResult = Array<Notice> | string

export declare interface ChatReply {
  answer_type: string
  results: SearchResult
}

export const enum AnswerType {
  BAIDU = 'baidu',
  DATABASE = 'database_search',
  CHAT = 'chat',
  LOCAL = 'local',
  BERT = 'bert',
  UNKNOWN = 'unknown'
}
