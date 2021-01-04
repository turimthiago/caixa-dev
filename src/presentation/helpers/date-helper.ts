export const DateHelper = {
  stringToDate(strDate: string): Date {
    return new Date(strDate.replace(/(\d{2})\-(\d{2})\-(\d{4})/, "$3-$2-$1"));
  },
};
