
export const STORAGE_KEY = "painel_tarefas_noc_v1";

export const tarefasIniciais = [
  {
    id: 1,
    unidade: "CAPS 2",
    tarefa: "Instalar roteador na farmácia e verificar ponto de rede da recepção",
    tecnico: "",
    status: "pendente",
    prioridade: "alta",
  },
  {
    id: 2,
    unidade: "UBS Jd Maricá",
    tarefa: "Executar 4 novos pontos de rede na recepção",
    tecnico: "Severino",
    status: "execucao",
    prioridade: "alta",
  },
  {
    id: 3,
    unidade: "UBS Mineração",
    tarefa: "Novo ponto de rede na recepção",
    tecnico: "Hugo",
    status: "execucao",
    prioridade: "media",
  },
  {
    id: 4,
    unidade: "UBS Jd Ivete",
    tarefa: "Executar 2 novos pontos de rede",
    tecnico: "Karla",
    status: "concluida",
    prioridade: "media",
  },
];

export function carregarTarefas() {
  if (typeof window === "undefined") return tarefasIniciais;
  const dados = window.localStorage.getItem(STORAGE_KEY);
  if (!dados) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefasIniciais));
    return tarefasIniciais;
  }
  try {
    return JSON.parse(dados);
  } catch {
    return tarefasIniciais;
  }
}

export function salvarTarefas(tarefas) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
  window.dispatchEvent(new Event("tarefas-atualizadas"));
}

export const statusConfig = {
  pendente: { label: "PENDENTE", bg: "#dc2626" },
  execucao: { label: "EM ANDAMENTO", bg: "#ea580c" },
  concluida: { label: "CONCLUÍDO", bg: "#16a34a" },
};

export const prioridadeConfig = {
  alta: { label: "ALTA", bg: "#7f1d1d", color: "#fecaca" },
  media: { label: "MÉDIA", bg: "#78350f", color: "#fde68a" },
  baixa: { label: "BAIXA", bg: "#1e293b", color: "#cbd5e1" },
};
