const useGetWeekDay = () => {
  return (timestamp) => {
    const day = new Date(timestamp).toLocaleString('pt-BR', {
      weekday: 'short',
    });

    return day[0].toLocaleUpperCase() + day.slice(1, 3);
  };
};

export default useGetWeekDay;
