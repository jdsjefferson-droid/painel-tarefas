
import React from "react";
import { carregarTarefas, statusConfig, prioridadeConfig } from "./shared";

export default function Home() {
  const [tarefas, setTarefas] = React.useState([]);

  React.useEffect(() => {
    const atualizar = () => setTarefas(carregarTarefas());
    atualizar();
    window.addEventListener("storage", atualizar);
    window.addEventListener("tarefas-atualizadas", atualizar);
    const timer = setInterval(atualizar, 3000);
    return () => {
      window.removeEventListener("storage", atualizar);
      window.removeEventListener("tarefas-atualizadas", atualizar);
      clearInterval(timer);
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#e5e7eb", fontFamily: "Arial, sans-serif", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, padding: "18px 24px", background: "#111827", border: "1px solid #1f2937", borderRadius: 16 }}>
        <div>
          <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: "-1px" }}>PAINEL OPERACIONAL DA EQUIPE</div>
          <div style={{ fontSize: 24, color: "#94a3b8", marginTop: 6 }}>Tela automática para TV</div>
        </div>
        <div style={{ fontSize: 22, color: "#93c5fd", fontWeight: 700 }}>ATUALIZAÇÃO AUTOMÁTICA</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "5fr 2fr 2fr 1.5fr", gap: 16, marginBottom: 18, padding: "0 8px", fontSize: 28, fontWeight: 700, color: "#cbd5e1" }}>
        <div>TAREFA</div>
        <div>TÉCNICO</div>
        <div>STATUS</div>
        <div>PRIORIDADE</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {tarefas.map((t) => {
          const status = statusConfig[t.status];
          const prioridade = prioridadeConfig[t.prioridade];
          return (
            <div key={t.id} style={{ display: "grid", gridTemplateColumns: "5fr 2fr 2fr 1.5fr", gap: 16, background: "#111827", border: "1px solid #1f2937", borderLeft: `14px solid ${status.bg}`, borderRadius: 18, padding: 22, boxShadow: "0 10px 24px rgba(0,0,0,0.25)" }}>
              <div>
                <div style={{ fontSize: 38, fontWeight: 800, color: "#f8fafc", lineHeight: 1.1 }}>{t.unidade}</div>
                <div style={{ fontSize: 34, fontWeight: 700, color: "#e2e8f0", marginTop: 10, lineHeight: 1.2 }}>{t.tarefa}</div>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "100%", background: "#1f2937", borderRadius: 14, padding: "18px 16px", textAlign: "center", fontSize: 30, fontWeight: 700, color: "#f8fafc" }}>
                  {t.tecnico || "—"}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "100%", background: status.bg, color: "white", borderRadius: 14, padding: "18px 16px", textAlign: "center", fontSize: 28, fontWeight: 800, letterSpacing: "0.5px" }}>
                  {status.label}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "100%", background: prioridade.bg, color: prioridade.color, borderRadius: 14, padding: "18px 16px", textAlign: "center", fontSize: 26, fontWeight: 800 }}>
                  {prioridade.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
