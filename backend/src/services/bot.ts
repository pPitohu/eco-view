import { defaultAuthor, initialSuggestedMessages, Message, paper, plastic, websiteInfo, whatBotCan } from '../constants/botMessages'
// the WORST bot implementation is here, ladies and gentlemans
// i could implement chatgpt, but i'm lazy..
export class BotService {
  public static handleRecievedMessage = async (userMessage: Message): Promise<{
    message: Message,
    suggestedMessages: string[]
  }> => {
    const suggestedMessages = initialSuggestedMessages.filter(msg => msg !== userMessage.text)
    suggestedMessages.push('Бумага')

    const message = {
      author: defaultAuthor,
      datetime: new Date().toLocaleString('ru-RU'),
      text: 'Прости, я тебя не понял :(',
    }

    if (userMessage.text === 'Привет, что ты можешь?')
      message.text = whatBotCan

    if (userMessage.text === 'Расскажи о сайте')
      message.text = websiteInfo
    
    if (userMessage.text === 'Как выбрасывать пластик?')
      message.text = plastic
    
    if (userMessage.text === 'Бумага')
      message.text = paper

    return {
      message,
      suggestedMessages
    }
  }
} 
