export interface Message {
  author: string,
  datetime: string,
  text: string
}

const defaultAuthor = 'eco-view'

export const initialMessages = <Message[]>[
  {
    author: defaultAuthor,
    datetime: new Date().toLocaleString('ru-RU'),
    text: `Здравствуй 🤗 
    Я твой Персональный помощник по сортировке мусора 🤖`
  },
  {
    author: defaultAuthor,
    datetime: new Date().toLocaleString('ru-RU'),
    text: `Чтобы общаться со мной, используй кнопки или задай вопрос 😉
    Как задать мне вопрос:
    🎯 лаконично и просто
    ❗️ОДИН вопрос за раз
    Например:
    - полиэтиленовые пакеты
    или:
    - куда мне выбросить бутылку?
    Что тебя интересует? 🤔 Нажимай на соответствующую кнопку или задай свой вопрос 👇`
  }
]
