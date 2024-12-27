export function formatDate(data: Date) {
    const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    const day = data.getDate();   
  
    const month = months[data.getMonth()];
    const year = data.getFullYear();   
  
  
    return `${day} de ${month} de ${year}`;
  }