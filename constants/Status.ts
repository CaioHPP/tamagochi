/*
status dos bichinhos é calculado através da soma dos atributos
0: status “morto”
De 1 a 50: status “crítico”
De 51 a 100: status “muito triste”
De 101 - 150: status “triste”
De 151 - 200: status “ok”
De 201 - 250: status “bem”
de 252 - 300: status “muito bem”

*/
export function statusMap(fome: number, sono: number, diversao: number) {
  const status = fome + sono + diversao;
  if (status === 0) return "Morto";
  if (status < 51) return "Crítico";
  if (status < 101) return "Muito\nTriste";
  if (status < 151) return "Triste";
  if (status < 201) return "Ok";
  if (status < 251) return "Bem";
  return "Muito Bem";
}
