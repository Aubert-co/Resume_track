export const getDaysAgo = (dateString: string): number => {
  const created = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - created.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return days;
};
