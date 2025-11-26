export interface Tab {
  id: string
  title: string
  type: "home" | "chat"
}

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export interface Chat {
  id: string
  title: string
  messages: Message[]
}

