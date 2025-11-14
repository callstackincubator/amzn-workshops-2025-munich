export const MessageFormatClassic = {
  format: (message: string, args: Map<string, unknown>): string => {
    let formattedMessage = message;
    args.forEach((value, key) => {
      const regex = new RegExp(`\\{${key}\\}`, 'g');
      formattedMessage = formattedMessage.replace(regex, String(value));
    });
    return formattedMessage;
  },
};
