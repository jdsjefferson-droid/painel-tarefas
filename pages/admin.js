
import React from "react";
import { carregarTarefas, salvarTarefas, statusConfig, prioridadeConfig } from "./_shared";

const campoStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: 12,
  border: "1px solid #cbd5e1",
  fontSize: 18,
  outline: "none",
  boxSizing: "border-box",
};

export default function Admin() {
  const [tarefas, setTarefas] = React.useState([]);

  React.useEffect(() => {
    setTarefas(carregarTarefas());
  }, []);

  const persistir = (novas) => {
    setTarefas(novas);
    salvarTarefas(novas);
  };

  const atualizarCampo = (id, campo, valor) => {
    const novas = tarefas.map((t) => (t.id === id ? { ...t, [campo]: valor } : t));
    persistir(novas);
  };

  const adicionar = () => {
    const nova = {
      id: Date.now(),
      unidade: "",
      tarefa: "",
      tecnico: "",
      status: "pendente",
      prioridade: "media",
    };
    persistir([nova, ...tarefas]);
  };

  const excluir = (id) => {
    persistir(tarefas.filter((t) => t.id !== id));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#eef2f7", fontFamily: "Arial, sans-serif", padding: 24, color: "#0f172a" }}>
      <div style={{ maxWidth: 1600, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 48, margin: 0 }}>Cadastro de tarefas</h1>
            <p style={{ fontSize: 20, color: "#475569", marginTop: 8 }}>Tela da analista para alimentar o painel da TV</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="/" style={{ textDecoration: "none", background: "#0f172a", color: "#fff", padding: "14px 18px", borderRadius: 12, fontSize: 18, fontWeight: 700 }}>
              Abrir TV
            </a>
            <button onClick={adicionar} style={{ background: "#2563eb", color: "#fff", border: "none", padding: "14px 18px", borderRadius: 12, fontSize: 18, fontWeight: 700, cursor: "pointer" }}>
              + Nova tarefa
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {tarefas.map((t) => {
            const status = statusConfig[t.status];
            const prioridade = prioridadeConfig[t.prioridade];

            return (
              <div key={t.id} style={{ background: "#fff", borderRadius: 18, padding: 18, boxShadow: "0 8px 24px rgba(15,23,42,0.08)", borderLeft: `10px solid ${status.bg}` }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr 1.5fr 1.3fr 1.2fr auto", gap: 12, alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 14, color: "#64748b", marginBottom: 6 }}>Unidade</div>
                    <input value={t.unidade} onChange={(e) => atualizarCampo(t.id, "unidade", e.target.value)} placeholder="Ex.: UBS Jd Maricá" style={campoStyle} />
                  </div>

                  <div>
                    <div style={{ fontSize: 14, color: "#64748b", marginBottom: 6 }}>Tarefa</div>
                    <input value={t.tarefa} onChange={(e) => atualizarCampo(t.id, "tarefa", e.target.value)} placeholder="Descreva a tarefa" style={campoStyle} />
                  </div>

                  <div>
                    <div style={{ fontSize: 14, color: "#64748b", marginBottom: 6 }}>Técnico</div>
                    <input value={t.tecnico} onChange={(e) => atualizarCampo(t.id, "tecnico", e.target.value)} placeholder="Nome do técnico" style={campoStyle} />
                  </div>

                  <div>
                    <div style={{ fontSize: 14, color: "#64748b", marginBottom: 6 }}>Status</div>
                    <select value={t.status} onChange={(e) => atualizarCampo(t.id, "status", e.target.value)} style={{ ...campoStyle, background: status.bg, color: "#fff", fontWeight: 700 }}>
                      <option value="pendente">Pendente</option>
                      <option value="execucao">Em andamento</option>
                      <option value="concluida">Concluído</option>
                    </select>
                  </div>

                  <div>
                    <div style={{ fontSize: 14, color: "#64748b", marginBottom: 6 }}>Prioridade</div>
                    <select value={t.prioridade} onChange={(e) => atualizarCampo(t.id, "prioridade", e.target.value)} style={{ ...campoStyle, background: prioridade.bg, color: prioridade.color, fontWeight: 700 }}>
                      <option value="alta">Alta</option>
                      <option value="media">Média</option>
                      <option value="baixa">Baixa</option>
                    </select>
                  </div>

                  <div style={{ display: "flex", alignItems: "end", height: "100%" }}>
                    <button onClick={() => excluir(t.id)} style={{ background: "#dc2626", color: "#fff", border: "none", padding: "14px 18px", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 24, background: "#fff", borderRadius: 16, padding: 18, color: "#475569", fontSize: 18 }}>
          Use <strong>/admin</strong> para cadastrar e <strong>/</strong> para exibir na TV. As alterações são salvas no navegador e refletem automaticamente na tela aberta no mesmo navegador/dispositivo.
        </div>
      </div>
    </div>
  );
}
